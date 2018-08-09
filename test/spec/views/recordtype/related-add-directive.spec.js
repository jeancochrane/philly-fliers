'use strict';

describe('ase.views.recordtype: RTRelatedAdd', function () {

    beforeEach(module('ase.auth'));
    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.templates'));
    beforeEach(module('ase.views.recordtype'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var RecordTypes;
    var ResourcesMock;
    var AuthService;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_, $q,
                                _RecordTypes_, _ResourcesMock_, _AuthService_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        RecordTypes = _RecordTypes_;
        ResourcesMock = _ResourcesMock_;

        AuthService = _AuthService_;
        spyOn(AuthService, 'isAuthenticated').and.callFake(function() {
            return true;
        });

    }));

    it('should allow adding new related type', function () {
        var recordTypeUrl = /api\/recordtypes\/\?limit=all/;
        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordType);

        var scope = $rootScope.$new();
        var element = $compile('<ase-rt-related-add></ase-rt-related-add>')(scope);
        $rootScope.$apply();

        // Check for existence of 'Save' and 'Cancel' buttons
        expect(element.find('button').length).toEqual(2);
        var saveButton = element.find('button:submit');

        // Helper for testing whether or not the save button is disabled
        var checkSaveButtonDisabled = function(disabled) {
            expect(saveButton.prop('disabled')).toBe(disabled);
        };

        // Save button should be disabled until all the required fields are entered
        checkSaveButtonDisabled(true);
        element.find('#single-title').val('Vehicle').change();
        checkSaveButtonDisabled(true);
        element.find('#plural-title').val('Vehicles').change();
        checkSaveButtonDisabled(true);
        element.find('#description').val('A vehicle').change();
        checkSaveButtonDisabled(false);
    });
});
