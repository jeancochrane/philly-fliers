(function () {
    'use strict';

    /* ngInject */
    function RecordListController($scope, $rootScope, $log, $modal, $state, AuthService,
                                  Notifications, RecordSchemas, Records, ASEConfig,
                                  $stateParams, $q, RecordTypes) {
        var ctl = this;
        ctl.currentOffset = 0;
        ctl.numRecordsPerPage = ASEConfig.record.limit;
        ctl.maxDataColumns = 4; // Max number of dynamic data columns to show
        ctl.getPreviousRecords = getPreviousRecords;
        ctl.getNextRecords = getNextRecords;
        ctl.showDetailsModal = showDetailsModal;
        ctl.isInitialized = false;
        ctl.userCanWrite = false;

        init();

        function init() {
            ctl.isInitialized = false;
            ctl.userCanWrite = AuthService.hasWriteAccess();

            if (typeof($stateParams.recordtype) !== 'undefined') {
                var recordTypeUuid = $stateParams.recordtype;
                loadRecordSchema(recordTypeUuid);
            } else {
                ctl.error = 'Unable to load record schema: no RecordType specified.';
                return $q.reject(ctl.error);
            }
        }

        function loadRecordSchema(recordTypeUuid) {
            RecordTypes.get({ id: recordTypeUuid }).$promise.then(function (result) {
                var recordType = result;
                if (recordType) {
                    ctl.recordType = recordType;
                    /* jshint camelcase: false */
                    return RecordSchemas.get({ id: ctl.recordType.current_schema }).$promise
                    /* jshint camelcase: true */
                        .then(function(recordSchema) { ctl.recordSchema = recordSchema; })
                        .then(onSchemaLoaded)
                        .then(loadRecords);
                } else {
                    ctl.error = 'Unable to load record schema.';
                    return $q.reject(ctl.error);
                }
            });
        }

        /*
         * Loads a page of records from the API
         * @param {int} offset Optional offset value, relative to current offset, used
         *                     for pulling paginated results. May be positive or negative.
         * @return {promise} Promise to load records
         */
        function loadRecords(offset) {
            ctl.loadingRecords = true;
            var newOffset;
            if (offset) {
                newOffset = ctl.currentOffset + offset;
            } else {
                newOffset = 0;
            }

            var params = {
                offset: newOffset,
                limit: ASEConfig.record.limit,
                /* jshint camelcase: false */
                record_type: ctl.recordType.uuid
                /* jshint camelcase: true */
            };

            Records.get(params).$promise
            .then(function(records) {
                ctl.records = records;
                ctl.currentOffset = newOffset;
            }).finally(function() {
                ctl.loadingRecords = false;
            });
        }

        function onSchemaLoaded() {
            var detailsDefinitions = _.filter(ctl.recordSchema.schema.definitions,
                function(val, key) {
                    if (key.indexOf('Details') > -1) {
                        // keep the actual field name
                        // for lookup on ctl.recordSchema.schema.definitions
                        ctl.detailsPropertyKey = key;
                        return val;
                    }
                });
            if (detailsDefinitions.length !== 1) {
                $log.error('Expected one details definition, found ' + detailsDefinitions.length);
                return;
            }

            // Get the property names -- sorted by propertyOrder
            ctl.headerKeys = _(detailsDefinitions[0].properties)
                .omit('_localId')
                .map(function(obj, propertyName) {
                    obj.propertyName = propertyName;
                    return obj;
                })
                .sortBy('propertyOrder')
                .map('propertyName')
                .value();
        }

        // Loads the previous page of paginated record results
        function getPreviousRecords() {
            loadRecords(-ctl.numRecordsPerPage);
        }

        // Loads the next page of paginated record results
        function getNextRecords() {
            loadRecords(ctl.numRecordsPerPage);
        }

        // Show a details modal for the given record
        function showDetailsModal(record) {
            $modal.open({
                templateUrl: 'scripts/views/record/details-modal-partial.html',
                controller: 'RecordDetailsModalController as modal',
                size: 'lg',
                resolve: {
                    record: function() {
                         return record;
                    },
                    recordType: function() {
                        return ctl.recordType;
                    },
                    recordSchema: function() {
                        return ctl.recordSchema;
                    },
                    userCanWrite: function() {
                        return ctl.userCanWrite;
                    }
                }
            });
        }
    }

    angular.module('ase.views.record')
    .controller('RecordListController', RecordListController);

})();
