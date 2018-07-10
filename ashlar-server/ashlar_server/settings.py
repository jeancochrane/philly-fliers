"""
Django settings for ashlar_server project.
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

import django

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Retrieve secret variables from the environment, defined in the .env file.
SECRET_KEY = os.environ.get('SECRET_KEY', 'extra-secret')

# Check for allowed hosts, defined as a comma-separated bash string in the
# .env file.
ALLOWED_HOSTS = [path for path in os.environ.get('ALLOWED_HOSTS', '').split(',') if path]

# DEBUG and DEVELOP default to false. They should be represented as Pythonic
# booleans in the .env file (i.e. caps first), but allow them to be lower case just
# in case.
DEBUG = False
if os.environ.get('DEBUG') and os.environ.get('DEBUG').lower() == 'true':
    DEBUG = True

DEVELOP = False
if os.environ.get('DEVELOP') and os.environ.get('DEVELOP').lower() == 'true':
    DEVELOP = True

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'django_extensions',
    'django_filters',
    'ashlar',
    'ashlar_server',
    'ashlar_auth',
    'corsheaders',
    'rest_framework_gis',
)

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
]

ROOT_URLCONF = 'ashlar_server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Default database variables correspond to the development database set up
# in docker-compose.yml
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ.get('DB_NAME', 'postgres'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'HOST': os.environ.get('DB_HOST', 'db'),
        'PASSWORD': os.environ.get('DB_PASS', ''),
        'PORT': os.environ.get('DB_PORT', '5432')
    }
}

WSGI_APPLICATION = 'ashlar_server.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'

if DEBUG:
    CORS_ORIGIN_ALLOW_ALL = True
else:
    # Allow CORS requests only from the loopback interface
    CORS_ORIGIN_REGEX_WHITELIST = (
        r'^http://127.0.0.1:\d+',
        r'^http://localhost:\d+'
    )

# Configure Django REST Framework authentication settings
REST_FRAMEWORK = {
    # NB: session auth must appear before token auth for both to work.
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend','rest_framework.filters.OrderingFilter'),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10,
}

# Ashlar authentication settings
DEFAULT_ADMIN_EMAIL = os.environ.get("ASHLAR_ADMIN_EMAIL", 'systems+ashlar@azavea.com')
DEFAULT_ADMIN_USERNAME = os.environ.get("ASHLAR_ADMIN_USERNAME", 'admin')
DEFAULT_ADMIN_PASSWORD = os.environ.get("ASHLAR_ADMIN_PASSWORD", 'admin')
USER_GROUPS = {
    'READ_ONLY': os.environ.get('ASHLAR_READ_ONLY_GROUP', 'public'),
    'READ_WRITE': os.environ.get('ASHLAR_READ_WRITE_GROUP', 'staff'),
    'ADMIN': os.environ.get('ASHLAR_ADMIN_GROUP', 'admin')
}

# Ashlar-specific global variables
ASHLAR = { 'SRID': 4326 }
