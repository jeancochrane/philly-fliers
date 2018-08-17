(function () {
    'use strict';

    /* ngInject */
    function RecordAddEditController($log, $scope, $state, $stateParams, $window, $q, $timeout,
                                     uuid, AuthService, JsonEditorDefaults,
                                     Notifications, Records, RecordSchemas,
                                     RecordTypes, DateLocalization) {
        var ctl = this;
        var editorData = null;
        var bbox = null;

        ctl.$onInit = initialize();

        // Initialize for either adding or editing, depending on recorduuid being supplied
        function initialize() {
            ctl.combineOccurredFromDateAndTime = combineOccurredFromDateAndTime;
            ctl.combineOccurredToDateAndTime = combineOccurredToDateAndTime;
            ctl.fixOccurredDTForPickers = fixOccurredDTForPickers;
            ctl.goBack = goBack;
            ctl.onDataChange = onDataChange;
            ctl.onDeleteClicked = onDeleteClicked;
            ctl.onSaveClicked = onSaveClicked;
            ctl.onGeomChanged = onGeomChanged;

            ctl.userCanWrite = AuthService.hasWriteAccess();

            // This state attribute will be true when adding secondary records. When editing,
            // this will be set when the record type is loaded.
            ctl.isSecondary = $state.current.secondary;

            ctl.constantFieldErrors = null;
            ctl.geom = {
                lat: null,
                lng: null
            };

            ctl.occurredFromDate = new Date();
            ctl.occurredToDate = new Date();
            ctl.occurredFromTime = new Date();
            ctl.occurredToTime = new Date();

            $scope.$on('ase.views.record:marker-moved', function(event, data) {
                // update location when map marker set
                $scope.$apply(function() {
                    ctl.geom.lat = data[1];
                    ctl.geom.lng = data[0];
                });

                // update whether we have all constant fields or not
                constantFieldsValidationErrors();
            });

            $scope.$on('ase.views.record:map-moved', function(event, data) {
                bbox = data;
            });

            // If there's a record, load it first then get its schema.
            var schemaPromise;
            if ($stateParams.recorduuid) {
                schemaPromise = loadRecord().then(loadRecordSchema);
            } else if ($stateParams.recordtype) {
                schemaPromise = loadRecordSchema($stateParams.recordtype);
                // Besides being friendly, setting a default works around this bug:
                // https://github.com/angular-ui/bootstrap/issues/1114
                ctl.occurredFrom = ctl.occuredTo = new Date();
            }

            schemaPromise.then(function () {
                onSchemaReady();
            });

            $scope.$on('$destroy', function() {
                // let map know to destroy its state
                $scope.$emit('ase.views.record:close');
            });

        }

        function initDateTimePickers() {
            ctl.occurredFromDate = new Date(ctl.occurredFrom);
            ctl.occurredFromTime = new Date(ctl.occurredFrom);
            ctl.occurredToDate = new Date(ctl.occurredTo);
            ctl.occurredToTime = new Date(ctl.occurredTo);
        }

        function combineOccurredFromDateAndTime() {
            var hours = ctl.occurredFromTime.getHours();
            var minutes = ctl.occurredFromTime.getMinutes();
            var newDatetime = new Date(ctl.occurredFromDate);
            newDatetime.setHours(hours);
            newDatetime.setMinutes(minutes);
            ctl.occurredFrom = newDatetime;
            constantFieldsValidationErrors();
        }

        function combineOccurredToDateAndTime() {
            if (ctl.occurredToTime) {
                var hours = ctl.occurredToTime.getHours();
                var minutes = ctl.occurredToTime.getMinutes();
                var newDatetime = new Date(ctl.occurredToDate);
                newDatetime.setHours(hours);
                newDatetime.setMinutes(minutes);
                ctl.occurredTo = newDatetime;
            }
            constantFieldsValidationErrors();
        }

        // tell embed-map-directive to update marker location
        function onGeomChanged(recenter) {
            if (ctl.geom.lat && ctl.geom.lng) {
                $scope.$emit('ase.views.record:location-selected', ctl.geom, recenter);
            }

            // update whether all constant fields are present
            constantFieldsValidationErrors();
        }

        /* Apply timezone fixes to the picker components */
        function fixOccurredDTForPickers(reverse) {
            ctl.occurredFrom = DateLocalization.convertNonTimezoneDate(ctl.occurredFrom, reverse);
            if (ctl.occurredTo) {
                ctl.occurredTo = DateLocalization.convertNonTimezoneDate(ctl.occurredTo, reverse);
            }
        }

        // Helper for loading the record -- only used when in edit mode
        function loadRecord() {
            return Records.get({ id: $stateParams.recorduuid })
                .$promise.then(function(record) {
                    ctl.record = record;

                    /* jshint camelcase: false */
                    ctl.occurredFrom = ctl.record.occurred_from;
                    ctl.occurredTo = ctl.record.occurred_to;
                    /* jshint camelcase: true */

                    // Prep the occurred_from datetime for use with pickers
                    fixOccurredDTForPickers(false);

                    initDateTimePickers();
                    // set lat/lng array into bind-able object
                    ctl.geom.lat = ctl.record.geom.coordinates[1];
                    ctl.geom.lng = ctl.record.geom.coordinates[0];

                    // notify map
                    onGeomChanged(false);
                });
        }

        /* Loads the right schema:
         * - If there's a record, loads the latest schema for the record's type
         *   (edit mode)
         * - Otherwise, checks for a record type that can be used to find a schema
         *   (add mode)
         * - If no record type loads (e.g. if someone has navigated to the view
         *   improperly), sets an error and returns a rejected promise.
         */
        function loadRecordSchema(recordTypeUuid) {
            var typePromise,
                recordLoaded;
            if (ctl.record) {
                // If there's a record loaded, get its schema
                typePromise = RecordTypes.query({ record: ctl.record.uuid }).$promise;
                recordLoaded = true;

            } else if (typeof(recordTypeUuid) !== 'undefined') {
                // The user is adding a new record, so retrieve the schema for
                // the record type that they selected
                typePromise = RecordTypes.get({ id: recordTypeUuid }).$promise;
                recordLoaded = false;

            } else {
                ctl.error = 'Unable to load record schema: no Record or RecordType specified.';
                return $q.reject(ctl.error);
            }

            return typePromise.then(function (result) {
                // TODO: Remove secondary logic. For now, default to false.
                ctl.isSecondary = false;

                // The `get` and `query` endpoints return different data types;
                // switch the request based on which endpoint was used
                var recordType = (recordLoaded === true) ? result[0] : result;

                if (recordType) {
                    ctl.recordType = recordType;
                    /* jshint camelcase: false */
                    return RecordSchemas.get({ id: ctl.recordType.current_schema }).$promise
                    /* jshint camelcase: true */
                        .then(function(recordSchema) { ctl.recordSchema = recordSchema; });
                } else {
                    ctl.error = 'Unable to load record schema.';
                    return $q.reject(ctl.error);
                }
            });
        }

        /*
         * Ensures each object in the record contains all appropriate properties available
         * from the schema. This is a workaround for a problem with json-editor. When it
         * saves an item it removes any properties that aren't set, and then when the
         * item is loaded into the editor again, any properties that aren't set aren't
         * rendered even though they exist within the schema. Thus, in the course of
         * editing, if anything is ever removed, or an enum is set to empty, it will never
         * be able to be selected again. This works around those problems.
         */
        function fixEmptyFields() {
            if (!ctl.record) {
                return;
            }

            _.forEach(ctl.recordSchema.schema.definitions, function(definition, defKey) {
                _.forEach(definition.properties, function(property, propKey) {
                    if (!ctl.record.data.hasOwnProperty(defKey)) {
                        ctl.record.data[defKey] = null;
                    }
                    var data = ctl.record.data[defKey];

                    _.forEach(definition.multiple ? data : [data], function(item) {
                        if (item && !item.hasOwnProperty(propKey)) {
                            item[propKey] = null;
                        }
                    });
                });
            });
        }

        function onSchemaReady() {
            fixEmptyFields();

            /* jshint camelcase: false */
            ctl.editor = {
                id: 'new-record-editor',
                options: {
                    schema: ctl.recordSchema.schema,
                    disable_edit_json: true,
                    disable_properties: true,
                    disable_array_delete_all_rows: true,
                    disable_array_delete_last_row: true,
                    disable_array_reorder: true,
                    collapsed: true,
                    theme: 'bootstrap3',
                    iconlib: 'bootstrap3',
                    show_errors: 'change',
                },
                errors: []
            };

            // If a record is loaded, seed the editor with that record.
            if (ctl.record) {
                ctl.editor.startval = ctl.record.data;
            }
            /* jshint camelcase: true */
        }

        /*
         * Recursively sets all empty _localId fields to a new uuid
         * @param {object} obj The object to recursively search
         * @return {bool} True if any changes were made
         */
        function setLocalIds(obj) {
            var changed = false;
            _.each(obj, function(propertyValue, propertyName) {
                if (propertyName === '_localId' && !propertyValue) {
                    obj._localId = uuid.v4();
                    changed = true;
                } else if (propertyValue instanceof Array) {
                    _.each(propertyValue, function(item) {
                        changed = changed || setLocalIds(item);
                    });
                } else if (propertyValue instanceof Object) {
                    changed = changed || setLocalIds(propertyValue);
                }
            });
            return changed;
        }

        function onDataChange(newData, validationErrors, editor) {

            // Fill in all empty _localId fields
            if (setLocalIds(newData)) {
                editor.setValue(newData);
                return;
            }

            // Update editorData reference: used later during save
            editorData = newData;
            ctl.editor.errors = validationErrors;
        }

        /* Validate the constant value fields, which are not handled by json-editor.
         *
         * @returns {String} error message, which is empty if there are no errors
         */
        function constantFieldsValidationErrors() {
            var required = {
                'latitude': ctl.geom.lat,
                'longitude': ctl.geom.lng,
                'occurred': ctl.occurredFrom
            };

            ctl.constantFieldErrors = {};
            angular.forEach(required, function(value, fieldName) {
                if (!value) {
                    // message formatted to match errors from json-editor
                    ctl.constantFieldErrors[fieldName] = fieldName + ': Value required';
                }
            });

            if (ctl.isSecondary && ctl.occurredFrom && ctl.occurredTo &&
                    ctl.occurredFrom > ctl.occurredTo) {
                ctl.constantFieldErrors.occurredTo = 'End date cannot be before start date.';
            }

            // make field errors falsy if empty, for partial to check easily
            if (Object.keys(ctl.constantFieldErrors).length === 0) {
                ctl.constantFieldErrors = null;
                return '';
            } else {
                var errors = _.map(ctl.constantFieldErrors, function(message) {
                    return '<p>' + message + '</p>';
                });
                return errors.join('');
            }
        }

        function goBack() {
            var prevPage = $window.location.href;
            $window.history.back();

            // If going back to the previous page didn't result in any change, then it means
            // this was opened by the edit link which targets a new window. In this case we
            // want the window to be closed.
            // There is not a reliable way to check if this was navigated to via a normal link
            // or a new window link (the referrer value isn't useful due to the way angular loads),
            // so this is just checking to see if going back in history changed anything, and if
            // not it closes the window.
            $timeout(function() {
                if ($window.location.href === prevPage) {
                    $window.close();
                }
            }, 200);
        }

        function onDeleteClicked() {
            if ($window.confirm('Do you really want to delete? This cannot be undone.')) {
                var patchData = {
                    archived: true,
                    uuid: ctl.record.uuid
                };

                Records.update(patchData, function (record) {
                    $log.debug('Deleted record with uuid: ', record.uuid);
                    $state.go('record.list', { recordtype: ctl.recordType.uuid });
                }, function (error) {
                    $log.debug('Error while deleting record:', error);
                    showErrorNotification([
                        '<p>',
                        'Error creating record',
                        '</p><p>',
                        error.status,
                        ': ',
                        error.statusText,
                        '</p>'
                    ].join(''));
                });
            }
        }

        function onSaveClicked() {
            var validationErrorMessage = constantFieldsValidationErrors();

            if (ctl.editor.errors.length > 0) {
                $log.debug('json-editor errors on save:', ctl.editor.errors);
                // Errors array has objects each with message, path, and property,
                // where path looks like 'root.Thing Details.Stuff',
                // property like 'minLength'
                // and message like 'Value required'.
                // Show error as 'Stuff: Value required'
                ctl.editor.errors.forEach(function(err) {
                    // strip the field name from the end of the path
                    var fieldName = err.path.substring(err.path.lastIndexOf('.') + 1);
                    validationErrorMessage += ['<p>',
                        fieldName,
                        ': ',
                        err.message,
                        '</p>'
                    ].join('');
                });
                showErrorNotification(validationErrorMessage);
                return;
            } else if (validationErrorMessage.length > 0) {
                // have constant field errors only
                showErrorNotification(validationErrorMessage);
                return;
            }

            // If there is already a record, set the new editorData and update, else create one
            var saveMethod = null;
            var dataToSave = null;

            // If editing a primary record (where we don't ask for 'to' date) or if 'to' date is
            // blank, set it to be the same as 'from' date.
            if (!ctl.isSecondary || !ctl.occurredTo) {
                ctl.occurredTo = ctl.occurredFrom;
            }

            // Reverse the date and time picker timezone fix to get back to the actual correct time
            fixOccurredDTForPickers(true);

            /* jshint camelcase: false */
            if (ctl.record && ctl.record.geom) {
                // set back coordinates
                ctl.record.geom.coordinates = [ctl.geom.lng, ctl.geom.lat];
                ctl.record.occurred_from = ctl.occurredFrom;
                ctl.record.occurred_to = ctl.occurredTo;

                saveMethod = 'update';
                dataToSave = ctl.record;
                dataToSave.data = editorData;
            } else {
                saveMethod = 'create';
                dataToSave = {
                    data: editorData,
                    schema: ctl.recordSchema.uuid,

                    // constant fields
                    geom: 'POINT(' + ctl.geom.lng + ' ' + ctl.geom.lat + ')',
                    occurred_from: ctl.occurredFrom,
                    occurred_to: ctl.occurredTo
                };
            }
            /* jshint camelcase: true */

            Records[saveMethod](dataToSave, function (record) {
                $log.debug('Saved record with uuid: ', record.uuid);
                if (ctl.isSecondary) {
                    $state.go('map');
                } else {
                    $state.go('record.list', { recordtype: ctl.recordType.uuid });
                }
            }, function (error) {
                $log.debug('Error while creating record:', error);
                var errorMessage = '<p>Error creating record</p><p>';
                if (error.data) {
                    errorMessage += _.flatten(_.values(error.data)).join('<br>');
                } else {
                    errorMessage += (error.status + ': ' + error.statusText);
                }
                errorMessage += '</p>';
                showErrorNotification(errorMessage);
            });
        }

        // helper to display errors when form fails to save
        function showErrorNotification(message) {
            Notifications.show({
                displayClass: 'alert-danger',
                header: 'Record Not Saved',
                html: message
            });
        }

    }

    angular.module('ase.views.record')
    .controller('RecordAddEditController', RecordAddEditController);

})();
