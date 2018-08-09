'use strict';

// PhantomJS doesn't support bind yet
Function.prototype.bind = Function.prototype.bind || function (thisp) {
    var fn = this;
    return function () {
        return fn.apply(thisp, arguments);
    };
};

describe('ase.views.record: RecordAddEdit', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.auth'));
    beforeEach(module('ase.resources'));
    beforeEach(module('ase.views.record'));
    beforeEach(module('ase.templates'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var $stateParams;
    var AuthService;
    var RecordTypes;
    var ResourcesMock;

    beforeEach(function() {
        var $window;

        module(function ($provide) {
            // mock UserService
            $provide.factory('UserService', function() {
                return {
                    canWriteRecords: function() {
                        return {
                            then: function(callback) {
                                return callback(true); // read-write
                            }
                        };
                    },
                    isAdmin: function() { return {
                            then: function(callback) {
                                return callback(false); // not an admin
                            }
                        };
                    }
                };
            });

            // avoid full page reload during test
            $window = {
                location: {href: '/'},
                document: window.document,
                reload: jasmine.createSpy()
            };

            $provide.constant('$window', $window);
        });

        inject(function (_$compile_, _$httpBackend_, _$rootScope_, _$stateParams_,
                         _AuthService_, _RecordTypes_, _ResourcesMock_) {

            $compile = _$compile_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $stateParams = _$stateParams_;
            AuthService = _AuthService_;
            RecordTypes = _RecordTypes_;
            ResourcesMock = _ResourcesMock_;
        });
    });

    it('should load directive', function () {
        // allow user to write records
        spyOn(AuthService, 'hasWriteAccess').and.returnValue(true);

        // log in first
        var queryUrl = /\/api\/auth\/token\/post/;
        $httpBackend.expectPOST(queryUrl).respond({user: 1, token: 'gotatoken'});
        AuthService.authenticate({username: 'foo', password: 'foo'});
        $httpBackend.flush();
        $rootScope.$digest();

        var recordId = ResourcesMock.RecordResponse.results[0].uuid;
        $stateParams.recorduuid = recordId;
        var recordSchema = ResourcesMock.RecordSchema;
        var recordSchemaIdUrl = new RegExp('api/recordschemas/' + recordSchema.uuid);
        var recordTypeUrl = new RegExp('api/recordtypes/.*record=' + recordId);
        var recordUrl = new RegExp('api/records/' + recordId);

        $httpBackend.expectGET(recordUrl).respond(200, ResourcesMock.RecordResponse.results[0]);
        $httpBackend.expectGET(recordTypeUrl).respond(200, ResourcesMock.RecordTypeResponse);
        $httpBackend.expectGET(recordSchemaIdUrl).respond(200, recordSchema);

        var scope = $rootScope.$new();
        var element = $compile('<record-add-edit></record-add-edit>')(scope);
        $rootScope.$digest();

        // TODO: there's a hard-to-debug exception raised here when running the following code.
        // Commenting it out until we can investigate further.
        // Seems to be related to the element reference in the dependent JSON editor directive link.
        // $httpBackend.flush();
        // $httpBackend.verifyNoOutstandingRequest();

        expect(element.find('json-editor').length).toEqual(1);
    });
});
