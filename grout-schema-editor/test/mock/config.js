(function () {
    'use strict';

    var config = {
        debug: true,
        html5Mode: {
            enabled: false,
            prefix: '!'
        },
        api: {
            hostname: 'http://localhost:7000',
            groups: {
                admin: 'admin',
                readOnly: 'public',
                readWrite: 'analyst'
            }
        },
        record: {
            limit: 50
        },
        localization: {
            timeZone: 'America/New_York'
        }
    };

    angular.module('ase.config', [])
    .constant('ASEConfig', config);
})();
