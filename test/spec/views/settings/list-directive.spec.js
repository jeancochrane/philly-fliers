'use strict';

describe('ase.views.settings: settingsList', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.templates'));
    beforeEach(module('ase.views.settings'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var ResourcesMock;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_,
                                _ResourcesMock_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should load directive', function () {
        var scope = $rootScope.$new();
        var element = $compile('<ase-settings-list></ase-settings-list>')(scope);
        $rootScope.$apply();

        // Currently the settings are empty. For now, just make sure that the
        // directive loads the empty form.
        expect(element.find('.form-area').length).toEqual(1);
    });

});
