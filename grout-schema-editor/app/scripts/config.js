(function () {
    'use strict';

    // Note: This module is mocked for Travis. If any changes are made to it, they should also
    // be made in: `schema_editor/test/mock/config.js`
    //
    // The web project loads the resources for this project, which includes this config.
    // The web app has its own config.js constant, which is why these are namespaced.

    var config = {
        debug: true,
        html5Mode: {
            enabled: false,
            prefix: '!'
        },
        api: {
            hostname: 'http://localhost:8000',
            // These group names are defined server-side in settings.py
            groups: {
                admin: 'admin',
                readOnly: 'public',
                readWrite: 'staff'
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
