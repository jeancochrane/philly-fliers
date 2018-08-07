'use strict';

describe('ase.views.record: RecordDetails', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.mock.resources.grout'));
    beforeEach(module('ase.resources'));
    beforeEach(module('ase.views.record'));
    beforeEach(module('ase.templates'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var $stateParams;
    var RecordTypes;
    var GroutResourcesMock;
    var ResourcesMock;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_, _$stateParams_,
                                _GroutResourcesMock_, _RecordTypes_, _ResourcesMock_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $stateParams = _$stateParams_;
        GroutResourcesMock = _GroutResourcesMock_;
        RecordTypes = _RecordTypes_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should load directive', function () {
        var recordId = GroutResourcesMock.RecordResponse.results[0].uuid;
        $stateParams.recorduuid = recordId;
        var recordSchema = ResourcesMock.RecordSchema;

        var allRecordTypesUrl = new RegExp('api/recordtypes/');
        var recordTypeUrl = new RegExp('api/recordtypes/.*record=' + recordId);
        var recordUrl = new RegExp('api/records/' + recordId);
        var recordSchemaIdUrl = new RegExp('api/recordschemas/' + recordSchema.uuid);

        $httpBackend.expectGET(allRecordTypesUrl).respond(200, ResourcesMock.RecordTypeResponse);
        $httpBackend.expectGET(recordUrl).respond(200, GroutResourcesMock.RecordResponse);
        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordTypeResponse);
        $httpBackend.expectGET(recordSchemaIdUrl).respond(200, recordSchema);

        var scope = $rootScope.$new();
        var element = $compile('<ase-record-details></ase-record-details>')(scope);
        $rootScope.$apply();

        expect(element.find('.form-area-heading').length).toEqual(1);

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
