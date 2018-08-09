import 'angular-cookies';

import '~/scripts/config';
import '~/scripts/userdata/module';


(function () {
'use strict';

    /* ngInject */
    function InterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('LogoutInterceptor');
    }

    angular.module('ase.auth', [
        'ase.config',
        'ase.userdata',
        'ngCookies'
      ]).config(InterceptorConfig);
})();
