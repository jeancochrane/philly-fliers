(function () {
    'use strict';

    /* ngInject */
    function DetailsMultiple() {
        var module = {
            restrict: 'AE',
            scope: {
                data: '=',
                properties: '=',
                record: '=',
                definition: '='
            },
            templateUrl: 'scripts/details/details-multiple-partial.html',
            bindToController: true,
            controller: 'DetailsMultipleController',
            controllerAs: 'ctl'
        };
        return module;
    }

    angular.module('ase.details')
    .directive('aseDetailsMultiple', DetailsMultiple);

})();
