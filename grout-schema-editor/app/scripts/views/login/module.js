import template from './login-partial.html';

(function () {
    'use strict';

    /**
     * @ngInject
     */
    function StateConfig($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            template: template,
            controller: 'AuthController',
        });
    }

    /**
     * @ngdoc overview
     * @name driver.views
     * @description
     * # driver
     */
    angular
      .module('ase.views.login', [
        'ui.router',
        'ase.auth'
      ]).config(StateConfig);

})();
