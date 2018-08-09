'use strict';

describe('ase.views.record: RecordDetailsModalController', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.views.record'));

    var $controller;
    var $httpBackend;
    var $rootScope;
    var $scope;
    var Controller;
    var ResourcesMock;
    var ModalInstance;

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _ResourcesMock_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        ResourcesMock = _ResourcesMock_;
        ModalInstance = {
            close: jasmine.createSpy('ModalInstance.close')
        };
    }));

    it('should initialize the modal controller and be able to close it', function () {
        var allRecordTypesUrl = new RegExp('api/recordtypes/');
        $httpBackend.expectGET(allRecordTypesUrl).respond(200, ResourcesMock.RecordTypeResponse);

        Controller = $controller('RecordDetailsModalController', {
            $scope: $scope,
            $modalInstance: ModalInstance,
            record: ResourcesMock.RecordResponse,
            recordType: ResourcesMock.RecordTypeResponse,
            recordSchema: ResourcesMock.RecordSchema,
            userCanWrite: true
        });
        $scope.$apply();
        $httpBackend.verifyNoOutstandingRequest();

        expect(Controller.record).toEqual(ResourcesMock.RecordResponse);
        expect(Controller.recordType).toEqual(ResourcesMock.RecordTypeResponse);
        expect(Controller.recordSchema).toEqual(ResourcesMock.RecordSchema);

        Controller.close();
        expect(ModalInstance.close).toHaveBeenCalled();
    });
});
