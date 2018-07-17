(function () {
    'use strict';

    /* ngInject */
    function DetailsNumber() {
        var module = {
            restrict: 'AE',
            scope: {
              property: '=',
              data: '=',
              compact: '='
            },
            templateUrl: 'scripts/details/details-number-partial.html',
            bindToController: true,
            controller: 'DetailsNumberController',
            controllerAs: 'ctl'
        };
        return module;
    }

    angular.module('ase.details')
    .directive('aseDetailsNumber', DetailsNumber);

})();
