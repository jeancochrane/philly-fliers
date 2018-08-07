'use strict';

describe('ase.details: DetailsConstants', function () {

    beforeEach(module('ase.templates'));
    beforeEach(module('ase.details'));
    beforeEach(module('ase.mock.resources'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var ResourcesMock;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_, _ResourcesMock_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should render constants', function () {
        var scope = $rootScope.$new();
        scope.record = ResourcesMock.RecordResponse.results[0];

        var element = $compile('<ase-details-constants record="record">' +
                               '</ase-details-constants>')(scope);
        $rootScope.$apply();

        expect(element.find('.map').length).toEqual(1);
        expect(element.find('.value.created').length).toEqual(1);
        expect(element.find('.value.latitude').length).toEqual(1);
        expect(element.find('.value.longitude').length).toEqual(1);
        expect(element.find('.value.occurred').length).toEqual(1);
    });
});
