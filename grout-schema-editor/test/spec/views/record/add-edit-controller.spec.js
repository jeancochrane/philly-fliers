'use strict';

describe('ase.views.record: AddEditController', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.views.record'));

    var $controller;
    var $httpBackend;
    var $rootScope;
    var $scope;
    var $window;
    var Controller;
    var ResourcesMock;
    var StateMock = {
        go: angular.noop,
        current: {}
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_, _$window_,
                                _ResourcesMock_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $window = _$window_;
        ResourcesMock = _ResourcesMock_;

        var recordId = ResourcesMock.RecordResponse.results[0].uuid;
        var recordSchema = ResourcesMock.RecordSchema;

        var recordSchemaIdUrl = new RegExp('api/recordschemas/' + recordSchema.uuid);
        var recordTypeUrl = new RegExp('api/recordtypes/.*record=' + recordId);
        var recordUrl = new RegExp('api/records/' + recordId + '/\\?archived=False');

        $httpBackend.expectGET(recordUrl).respond(200, ResourcesMock.RecordResponse.results[0]);
        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordTypeResponse);
        $httpBackend.expectGET(recordSchemaIdUrl).respond(200, recordSchema);

        Controller = $controller('RecordAddEditController', {
            $scope: $scope,
            $stateParams: { recorduuid: recordId },
            $state: StateMock,
        });
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
        $scope.$apply();
    }));

    it('should fill in _localIds', function () {
        // Mock the editor so we can receive the value updates
        var editorValue = null;
        var editor = {
            setValue: function(val) {
                editorValue = val;
            }
        };
        var testUuid = '4cde1cc9-2cd2-487b-983d-ae1de1d6198c';
        var uuidR = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';

        // Send the updated data
        Controller.onDataChange({
            Details: {
                'abc': '123',
                _localId: ''
            },
            Person: [{
                'abc': '123',
                _localId: testUuid
            }]
        }, [], editor);

        // Empty _localId fields should be filled in with uuids
        expect(editorValue).toEqual(jasmine.any(Object));
        expect(editorValue.Details._localId).toMatch(uuidR);
        expect(editorValue.Person[0]._localId).toEqual(testUuid);

        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should allow editing a record', function () {
        // Should submit a PATCH request to record endpoint
        var recordEndpoint = new RegExp('api/records/');
        $httpBackend.expectPATCH(recordEndpoint).respond(200);

        spyOn(StateMock, 'go');

        Controller.onSaveClicked();

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();

        var params = {'recordtype': ResourcesMock.RecordType.uuid};
        expect(StateMock.go).toHaveBeenCalledWith('record.list', params);
    });

    it('should allow deleting a record', function () {
        // Deleting a record causes a confirmation dialog. This fakes the click.
        spyOn($window, 'confirm').and.callFake(function () {
            return true;
        });
        spyOn(StateMock, 'go');

        // Should submit a PATCH request to record endpoint
        var recordEndpoint = new RegExp('api/records/');
        $httpBackend.expectPATCH(recordEndpoint).respond(200);

        Controller.onDeleteClicked();

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();

        var params = {'recordtype': ResourcesMock.RecordType.uuid};
        expect(StateMock.go).toHaveBeenCalledWith('record.list', params);

        expect($window.confirm).toHaveBeenCalled();
    });

    it('should allow adding a new record', function () {
        // Should submit a PUT request to record endpoint
        var recordEndpoint = new RegExp('api/records/');
        Controller.record = null;
        spyOn(StateMock, 'go');

        $httpBackend.expectPOST(recordEndpoint).respond(201);

        Controller.onSaveClicked();

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();

        var params = {'recordtype': ResourcesMock.RecordType.uuid};
        expect(StateMock.go).toHaveBeenCalledWith('record.list', params);
    });

    it('should fix occurredFrom for date pickers', function () {
        var original = new Date(Controller.occurredFrom);
        Controller.fixOccurredDTForPickers();
        // Occured from should be changed after applying the fix
        expect(Controller.occurredFrom).not.toEqual(original);
        Controller.fixOccurredDTForPickers(true);
        // Occured from should equal original after reverting the fix
        expect(Controller.occurredFrom).toEqual(original);

        $httpBackend.verifyNoOutstandingRequest();
    });

});
