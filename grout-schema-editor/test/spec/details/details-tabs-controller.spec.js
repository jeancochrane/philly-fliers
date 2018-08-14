'use strict';

describe('ase.details: DetailsTabsController', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.templates'));
    beforeEach(module('ase.details'));

    var $compile;
    var $httpBackend;
    var $q;
    var $rootScope;
    var ResourcesMock;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$q_, _$rootScope_,
                                _ResourcesMock_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should pass this placeholder test', function () {
        var scope = $rootScope.$new();
        scope.record = ResourcesMock.RecordResponse.results[0];
        scope.recordSchema = ResourcesMock.RecordSchemaResponse.results[0];

        var recordUrl = /api\/records\//;
        $httpBackend.expectGET(recordUrl).respond(200, ResourcesMock.RecordResponse.results[0]);

        var element = $compile('<ase-details-tabs ' +
                               'record-schema="recordSchema" record="record" user-can-write="true">' +
                               '</ase-details-tabs>')(scope);
        $rootScope.$apply();

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();

        var controller = element.controller('aseDetailsTabs');
        expect(controller).toBeDefined();
    });
});
