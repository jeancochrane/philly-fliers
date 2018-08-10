import 'angular-cookies';

import '@/config';
import '@/userdata/module';


(function () {
'use strict';

    /* ngInject */
    function InterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push(function($q, $cookies) {

            var module = {};
            module.request = function(config) {
                // set auth header for api requests if not already set
                var needsToken = (
                    config.url.indexOf('api/') > -1 &&  // All API routes...
                    config.url.indexOf('api/auth/token/post') === -1 &&  // ...except the token route...
                    !config.headers.Authorization  // ...where a header isn't set
                );
                if (needsToken) {
                    config.headers.Authorization = 'Token ' + $cookies.getObject('AuthService.token');
                }
                return config || $q.when(config);
            };

            return module;
        });

        $httpProvider.interceptors.push(function($q, $rootScope) {

            var module = {};

            var events = {
                logOutUser: 'ASE:Auth:LogOutUser'
            };

            module.events = events;
            module.responseError =  function(response) {
                if (response.status === 401) {
                    $rootScope.$broadcast(events.logOutUser);
                }
                return $q.reject(response);
            };

            return module;
        });
    }

    angular.module('ase.auth', [
        'ase.config',
        'ase.userdata',
        'ngCookies'
      ]).config(InterceptorConfig);
})();
