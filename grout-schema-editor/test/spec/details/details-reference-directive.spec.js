'use strict';

describe('ase.details: DetailsReference', function () {

    beforeEach(module('ase.templates'));
    beforeEach(module('ase.details'));

    var $compile;
    var $httpBackend;
    var $rootScope;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    it('should render reference', function () {
        var scope = $rootScope.$new();
        scope.property = {
            fieldType: 'reference',
            propertyName: 'A reference field'
        };
        scope.data = '2ed9a5f0-b5de-4b93-9972-353b85dd7837';
        scope.record = { data: null };

        var element = $compile('<ase-details-reference ' +
                               'property="property" data="data" record="record">' +
                               '</ase-details-reference>')(scope);
        $rootScope.$apply();

        expect(element.find('.value.reference').length).toEqual(1);
    });
});
