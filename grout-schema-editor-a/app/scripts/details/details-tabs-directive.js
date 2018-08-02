(function () {
    'use strict';

    /* ngInject */
    function DetailsTabs() {
        var module = {
            restrict: 'AE',
            scope: {
                recordSchema: '=',
                record: '=',
                userCanWrite: '='
            },
            templateUrl: 'scripts/details/details-tabs-partial.html',
            bindToController: true,
            controller: 'DetailsTabsController',
            controllerAs: 'ctl'
        };
        return module;
    }

    angular.module('ase.details')
    .directive('aseDetailsTabs', DetailsTabs);

})();
