(function() {
    'use strict';

    /**
     * @ngInject
     */
    function AuthInterceptor ($q, $cookies) {

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
    }

    angular.module('ase.auth').factory('AuthInterceptor', AuthInterceptor);

})();
