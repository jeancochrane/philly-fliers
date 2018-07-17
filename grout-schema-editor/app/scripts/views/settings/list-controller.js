(function() {
    'use strict';

    /**
     * @ngInject
     */
    function SettingsListController () {
        /* Currently empty; in the future, can be used to control
         * a  settings page.
         */
        initialize();

        function initialize() {
            return;
        }
    }

    angular.module('ase.views.settings')
        .controller('SettingsListController', SettingsListController);

})();
