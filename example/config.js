(function () {
    'use strict';
    /* Configuration variables for the Grout Schema Editor application.
     *
     * These defaults should work fine for most applications. The most important
     * setting is `config.api.hostname`, which corresponds to the URI of your
     * Grout database server.
     *
     * Development note: This module is mocked for Travis. If any changes are
     * made to the structure of the `config` object, they should also
     * be made in: `schema_editor/test/mock/config.js`
     */
    var config = {
        debug: true,
        html5Mode: {
            enabled: false,
            prefix: '!'
        },
        api: {
            hostname: 'http://localhost:8000',
            groups: {  // These group names should be defined in the settings file for the Grout server.
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
