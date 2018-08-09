'use strict';

describe('ase.views.recordtype: RTRelatedAdd', function () {

    beforeEach(module('ase.auth'));
    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.templates'));
    beforeEach(module('ase.views.recordtype'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var ResourcesMock;
    var AuthService;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_,
                                _ResourcesMock_, _AuthService_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        ResourcesMock = _ResourcesMock_;

        AuthService = _AuthService_;
        spyOn(AuthService, 'isAuthenticated').and.callFake(function() {
            return true;
        });
    }));

    it('should load directive', function () {
        var recordTypeUrl = /api\/recordtypes\/\?limit=all/;
        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordType);

        var scope = $rootScope.$new();
        var element = $compile('<ase-rt-related></ase-rt-related>')(scope);
        $rootScope.$apply();

        angular.extend(scope, {
            rt: {
                currentSchema: ResourcesMock.RecordSchema
            }
        });
        $rootScope.$apply();

        // Check for existence of 'Add new content' button
        expect(element.find('button').length).toEqual(1);
    });

    it('should reflect multiple rows', function () {
        var scope = $rootScope.$new();

        var recordTypeUrl = /api\/recordtypes\/\?limit=all/;
        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordType);

        var element = $compile('<ase-rt-related></ase-rt-related>')(scope);
        $rootScope.$apply();

        angular.extend(scope, {
            rt: {
                currentSchema: ResourcesMock.RecordSchema
            }
        });
        $rootScope.$apply();

        // There shouldn't be any rows denoted as 'multiple'
        expect(element.find('.multiple').length).toEqual(0);

        // Setting a related type as multiple should be reflected in the html
        scope.rt.currentSchema.schema.definitions.Firearm.multiple = true;
        $rootScope.$apply();
        expect(element.find('.multiple').length).toEqual(1);
    });
});
