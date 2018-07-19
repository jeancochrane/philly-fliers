import Vuex from 'vuex';
import Vue from 'vue';

import Grout from '@/api';


// Configure Vue to use Vuex.
Vue.use(Vuex);

const filterState = {
    /*
     * State module to facilitate the app's Record filtering mechanism.
     */
    state: {
        types: [],  // Array of available RecordTypes in the Grout API.
        activeTypeId: {},  // The RecordType that the user has currently selected.
        records: [],  // Array of records that are currently being displayed.
        filters: {},  // Map of currently selected filters.
    },
    mutations: {

        updateTypes(state, types) {
            /*
             * Update the array of available RecordTypes.
             *
             * @param {array} types - An array of RecordTypes, formatted as JSON
             *                        blobs, typically returned from the Grout
             *                        API.
             */
            state.types = types;
        },

        updateActiveTypeId(state, type) {
            /*
             * Set the active (currently selected) RecordType.
             *
             * @param {string} type - The UUID for the RecordType object that should be
             *                        set to `active`.
             */
            state.activeTypeId = type;
        },

        updateRecords(state, records) {
            /*
             * Set the array of currently-displayed Records.
             *
             * @param {array} records - An array of Records, formatted as JSON
             *                          blobs, typically returned from the Grout
             *                          API.
             */
            state.records = records;
        },

        updateFilter(state, payload) {
            /*
             * Update the active filters based on user input.
             *
             * @param {Object} payload - Data to update the filter.
             * @param {string} payload.schemaName - The name of the schema (the base
             *                                      key in the `state.filters` object
                     *                              in which to store this data).
             * @param {string} payload.fieldName - The name of the field that this query
             *                                     pertains to.
             * @param {string} payload.fieldType - The type of field represented by this
             *                                     filter (one of 'text', 'select',
             *                                     'min', or 'max').
             * @param {string} payload.query - The user-inputted query value. If
             *                                 this value is falsey, the method
             *                                 will remove the filter.
             */
            // Validate input parameters.
            const schemaName = payload.schemaName;
            const fieldName = payload.fieldName;
            const fieldType = payload.fieldType;

            const paramDict = {
                'schemaName': schemaName,
                'fieldName': fieldName,
                'fieldType': fieldType,
            };

            Object.entries(paramDict).forEach(([paramName, param]) => {
                if (!param) {
                    throw new Error(`
                        Function argument "${paramName}" is required in order
                        to update filters.
                    `)
                }
            });

            // Check if a value exists for the query. If not, the user is
            // clearing this filter.
            const query = payload.query;
            if (query === '') {
                state.filters[schemaName] = {};
                return;
            }

            // Check whether an entry already exists for this schema. If not,
            // initialize it.
            if (!state.filters[schemaName]) {
                state.filters[schemaName] = {};
            }

            // If this is a number query (or another type of field
            // that accepts multiple inputs, like a multiselect)
            // the nested query object may already exist, so check
            // for it before creating it.
            let nestedQuery = {};
            if (!state.filters[schemaName][fieldName]) {
                state.filters[schemaName][fieldName] = {};
            } else {
                nestedQuery = state.filters[schemaName][fieldName];
            }

            // Construct the actual query.
            switch(fieldType) {
                case 'text':
                    nestedQuery = {
                        '_rule_type': 'containment',
                        'contains': [
                            query
                        ]
                    };
                    break;

                case 'select':
                    // Select can have multiple attributes, so
                    // if that's the case, append to the containment
                    // array.
                    if (nestedQuery.contains) {
                        nestedQuery.contains.push(query);
                    } else {
                        nestedQuery._rule_type = 'containment';
                        nestedQuery.contains = [query];
                    }
                    break;

                case 'min':
                    nestedQuery._rule_type = 'intrange';
                    nestedQuery.min = query;
                    break;

                case 'max':
                    nestedQuery._rule_type = 'intrange';
                    nestedQuery.max = query;
                    break;

                default:
                    throw new Error(`
                        Field type "${fieldType}" is not registered
                        as a valid type of query.
                    `)
            }

            // Reassign the updated nested query to the proper field.
            state.filters[schemaName][fieldName] = nestedQuery;
        },

        clearFilters(state){
            /*
             * Clear all filters.
             */
            state.filters = {};
        }

    },
    actions: {

        loadTypes(context) {
            /*
             * Retrieve the currently available RecordTypes from the Grout API,
             * and set the first returned RecordType to `active`. Used to
             * initialize RecordType state in the app.
             */
            return new Promise((resolve, reject) => {
                Grout.types.all()
                    .then(types => {
                        context.commit('updateTypes', types);

                        // Select the first returned Type and set it to `active`.
                        let initialType = types[0].uuid;
                        context.commit('updateActiveTypeId', initialType);

                        resolve(initialType);
                    })
                    .catch(error => {
                        reject(`Failed to load RecordTypes: ${error}`);
                    });
            });
        },

        loadRecords(context) {
            /*
             * Retrieve all the Records for the currently active RecordType
             * from the Grout API. Used to initialize Record state in the app.
             */
            return new Promise((resolve, reject) => {
                context.dispatch('loadTypes')
                    .then(() => {
                        // Successfully loaded RecordTypes -- use the currently-
                        // selected RecordType to load Records.
                        context.dispatch('updateRecords')
                            .then(records => resolve(records))
                            .catch(error => reject(error));
                    })
                    .catch(error => reject(error));
            });
        },

        updateRecords(context) {
            /*
             * Given the current filters, update the array of
             * Records. Useful when a new filter has been selected.
             */
            let queryParams = {
                type: context.state.activeTypeId,
                filters: context.state.filters
            };
            return new Promise((resolve, reject) => {
                Grout.records.query(queryParams)
                    .then(records => {
                        context.commit('updateRecords', records);
                        resolve(records);
                    })
                    .catch(error => {
                        reject(`Failed to load Records: ${error}`);
                    });
            });
        }
    },
    getters: {
        activeType: state => {
            /*
             * Retrieve the Type object with the UUID corresponding to the
             * current activeTypeId.
             */
            return state.types.find(type => { return type.uuid === state.activeTypeId });
        }
    }
}

const store = new Vuex.Store({
    modules: {
        filters: filterState
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;
