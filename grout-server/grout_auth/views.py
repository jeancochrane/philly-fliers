import logging

from django.contrib.auth.models import User, Group

from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from grout.pagination import OptionalLimitOffsetPagination

from grout_auth.serializers import UserSerializer, GroupSerializer
from grout_auth.permissions import (IsAdminOrReadSelfOnly, IsAdminOrReadOnly,
                                     is_admin)

# match what auth-service.js looks for
USER_ID_COOKIE = 'AuthService.userId'
TOKEN_COOKIE = 'AuthService.token'
CAN_WRITE_COOKIE = 'AuthService.canWrite'
ADMIN_COOKIE = 'AuthService.isAdmin'

logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    serializer_class = UserSerializer
    permission_classes = (IsAdminOrReadSelfOnly,)
    queryset = User.objects.all().order_by('-date_joined')
    pagination_class = OptionalLimitOffsetPagination

    def get_queryset(self):
        """Limit non-admin users to only see their own info"""
        user = self.request.user
        if is_admin(user):
            return self.queryset
        else:
            return self.queryset.filter(id=user.id)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = OptionalLimitOffsetPagination


class DriverObtainAuthToken(ObtainAuthToken):
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': token.user_id})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


obtain_auth_token = DriverObtainAuthToken.as_view()
