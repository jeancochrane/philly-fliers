'use strict';

describe('ase.resources: Records', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.resources'));

    var $httpBackend;
    var Records;
    var ResourcesMock;

    beforeEach(inject(function (_$httpBackend_, _Records_, _ResourcesMock_) {
        $httpBackend = _$httpBackend_;
        Records = _Records_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should extract records from paginated response', function () {
        var requestUrl = /\/api\/records/;
        $httpBackend.whenGET(requestUrl).respond(ResourcesMock.RecordResponse);
        Records.query({ active: 'True' }).$promise.then(function (data) {
            expect(data.length).toBe(3);

            var record = data[0];
            expect(record.schema).toEqual(jasmine.any(String));
        });
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
