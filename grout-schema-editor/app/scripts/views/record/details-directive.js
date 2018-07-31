(function () {
    'use strict';

    /* ngInject */
    function RecordDetails() {
        var module = {
            restrict: 'E',
            templateUrl: 'scripts/views/record/details-partial.html',
            controller: 'RecordDetailsController',
            controllerAs: 'ctl',
            bindToController: true
        };
        return module;
    }

    angular.module('ase.views.record')
    .directive('recordDetails', RecordDetails);

})();
