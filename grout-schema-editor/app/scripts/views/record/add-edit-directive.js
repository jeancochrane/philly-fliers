(function () {
    'use strict';

    /* ngInject */
    function RecordAddEdit() {
        var module = {
            restrict: 'E',
            templateUrl: 'scripts/views/record/add-edit-partial.html',
            controller: 'RecordAddEditController',
            controllerAs: 'ctl',
            bindToController: true
        };
        return module;
    }

    angular.module('ase.views.record')
    .directive('recordAddEdit', RecordAddEdit);

})();
