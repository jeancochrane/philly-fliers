(function () {
    'use strict';

    /* ngInject */
    function RecordList() {
        var module = {
            restrict: 'E',
            templateUrl: 'scripts/views/record/list-partial.html',
            controller: 'RecordListController',
            controllerAs: 'ctl',
            bindToController: true
        };
        return module;
    }

    angular.module('ase.views.record')
    .directive('recordList', RecordList);

})();
