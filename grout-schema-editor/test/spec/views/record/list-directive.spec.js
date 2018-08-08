'use strict';

describe('ase.views.record: RecordList', function () {

    beforeEach(module('ase.resources'));
    beforeEach(module('ase.templates'));
    beforeEach(module('ase.views.record'));

    var $compile;
    var $rootScope;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should load empty directive without an active RecordType', function () {
        /* When $stateParms is undefined, the directive should not load any
         * Records, since it relies on $stateParams.recordtype to determine
         * which Records to load.
         */
        var scope = $rootScope.$new();
        $compile('<record-list></record-list>')(scope);

        var expectedErr = 'Possibly unhandled rejection: Unable to load record schema: no RecordType specified.';
        expect(function() { $rootScope.$apply(); }).toThrow(expectedErr);
    });
});
