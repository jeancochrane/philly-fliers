(function () {
    'use strict';

    /* ngInject */
    function RecordDetailsController($stateParams, Records, RecordTypes, RecordSchemas) {
        var ctl = this;
        initialize();

        function initialize() {
            loadRecord().then(loadRecordSchema);
        }

        function loadRecord () {
            return Records.get({ id: $stateParams.recorduuid })
                .$promise.then(function(record) {
                    ctl.record = record;
                });
        }

        function loadRecordSchema() {
            return RecordTypes.query({ record: $stateParams.recorduuid }).$promise
                .then(function (result) {
                    ctl.recordType = result[0];

                    // TODO: Figure out whether we can remove all "secondary
                    // types" logic. Till then, set everything to secondary.
                    ctl.isSecondary = true;
                    ctl.record.isSecondary = ctl.isSecondary;

                    /* jshint camelcase: false */
                    return RecordSchemas.get({ id: ctl.recordType.current_schema }).$promise
                        .then(function(recordSchema) { ctl.recordSchema = recordSchema; });
                    /* jshint camelcase: true */
                });
        }
    }

    angular.module('ase.views.record')
    .controller('RecordDetailsController', RecordDetailsController);

})();
