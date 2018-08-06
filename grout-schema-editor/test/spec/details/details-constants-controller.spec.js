'use strict';

describe('ase.details: DetailsConstantsController', function () {

    beforeEach(module('ase.details'));

    var $controller;
    var $rootScope;
    var $scope;
    var Controller;

    beforeEach(inject(function (_$controller_, _$httpBackend_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    it('should pass this placeholder test', function () {
        Controller = $controller('DetailsConstantsController', { $scope: $scope });
        $scope.$apply();
    });
});
