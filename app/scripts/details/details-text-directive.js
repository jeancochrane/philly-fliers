(function () {
    'use strict';

    /* ngInject */
    function DetailsText() {
        var module = {
            restrict: 'AE',
            scope: {
              property: '=',
              data: '=',
              compact: '='
            },
            templateUrl: 'scripts/details/details-text-partial.html',
            bindToController: true,
            controller: 'DetailsTextController',
            controllerAs: 'ctl'
        };
        return module;
    }

    angular.module('ase.details')
    .directive('aseDetailsText', DetailsText);

})();
