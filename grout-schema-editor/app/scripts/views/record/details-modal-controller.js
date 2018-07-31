(function () {
    'use strict';

    /* ngInject */
    function RecordDetailsModalController($modalInstance, record, recordType,
                                          recordSchema, userCanWrite) {
        var ctl = this;
        initialize();

        function initialize() {
            ctl.record = record;
            ctl.recordType = recordType;
            ctl.recordSchema = recordSchema;
            ctl.userCanWrite = userCanWrite;

            ctl.close = function () {
                $modalInstance.close();
            };

            // TODO: Figure out if we can remove secondary type logic. Till
            // then, set all records to secondary.
            ctl.record.isSecondary = true;
        }
    }

    angular.module('ase.views.record')
    .controller('RecordDetailsModalController', RecordDetailsModalController);

})();
