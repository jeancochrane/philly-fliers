(function () {
    'use strict';

    /* ngInject */
    function DetailsField() {
        var module = {
            restrict: 'AE',
            scope: {
              compact: '=',
              data: '=',
              property: '=',
              record: '='
            },
            templateUrl: 'scripts/details/details-field-partial.html',
            bindToController: true,
            controller: 'DetailsFieldController',
            controllerAs: 'ctl'
        };
        return module;
    }

    angular.module('ase.details')
    .directive('aseDetailsField', DetailsField);

})();
