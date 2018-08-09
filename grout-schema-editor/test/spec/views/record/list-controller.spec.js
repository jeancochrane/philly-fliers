'use strict';

describe('ase.views.record: ListController', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.views.record'));

    var $controller;
    var $httpBackend;
    var $rootScope;
    var $scope;
    var Controller;
    var ResourcesMock;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _ResourcesMock_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        ResourcesMock = _ResourcesMock_;

        var recordTypeUuid = ResourcesMock.RecordType.uuid;
        var recordTypeUrl = new RegExp('api/recordtypes/' + recordTypeUuid);

        var recordSchema = ResourcesMock.RecordSchema;
        var recordSchemaIdUrl = new RegExp('api/recordschemas/' + recordSchema.uuid);

        var baseRecordUrl = 'api/records/\\?archived=False&limit=50&offset=0&record_type=';
        var recordUrl = new RegExp(baseRecordUrl + recordTypeUuid);

        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordType);
        $httpBackend.expectGET(recordSchemaIdUrl).respond(200, recordSchema);
        $httpBackend.expectGET(recordUrl).respond(200, ResourcesMock.RecordResponse);

        Controller = $controller('RecordListController', {
            $scope: $scope,
            $rootScope: $rootScope,
            $stateParams: { 'recordtype': recordTypeUuid }
        });
        $scope.$apply();

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('should have header keys', function () {
        expect(Controller.headerKeys.length).toBeGreaterThan(0);
    });

    it('should make offset requests for pagination', function () {
        Controller.getNextRecords();
        var recordOffsetUrl = new RegExp('api/records/\\?.*limit=50.*offset=50.*');
        $httpBackend.expectGET(recordOffsetUrl).respond(200, ResourcesMock.RecordResponse);
        $httpBackend.flush();

        Controller.getPreviousRecords();
        recordOffsetUrl = new RegExp('api/records/\\?.*limit=50.*');
        $httpBackend.expectGET(recordOffsetUrl).respond(200, ResourcesMock.RecordResponse);
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingRequest();
    });
});
