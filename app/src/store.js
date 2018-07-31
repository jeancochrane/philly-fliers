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
        filters: [],  // Array of currently selected filters.
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

        updateFilter(state, filter) {
            /*
             * Update the active filters based on user input.
             *
             * @param {Filter} filter - A Grout Filter object.
             */
            // Perform a type check on the filter param to make sure it matches
            // the Filter type.
            const form = filter.form;
            const name = filter.name;
            const fieldType = filter.fieldType;
            const order = filter.order;
            const multiple = filter.multiple;
            const query = filter.query;

            const paramDict = {
                'form': form,
                'name': name,
                'fieldType': fieldType,
                'order': order,
                'multiple': multiple,
                // Don't check query, since it's significant if it's missing
                // (that means the user is clearing a filter).
            };

            Object.entries(paramDict).forEach(([paramName, param]) => {
                if (typeof(param) === 'undefined') {
                    throw new Error(`
                        The 'field' parameter is not a valid Field object: it
                        is missing the '${paramName}' attribute.
                    `)
                }
            });

            // Update the filter.
            let updated = false;  // Use this flag to determine if a filter was updated or not.
            // Use a classic for-loop, since Array.forEach doesn't allow
            // breaking.
            for (let idx = 0; idx < state.filters.length; idx++) {
                let filt = state.filters[idx];
                if (filt.form == form && filt.name == name) {
                    // There already exists a filter for this field in the
                    // filters array. Update the old value with the new one.
                    if (query) {
                        // A new filter exists, so replace the old one.
                        state.filters[idx] = filter;
                    } else {
                        // The user must be deleting the filter. Remove the
                        // filter object entirely, instead of updating it.
                        state.filters.splice(idx, 1);
                    }
                    updated = true;
                    break;
                }
            }

            // If a query exists and there isn't already a filter for it in
            // the filters array, add it on.
            if (!updated && query) {
                state.filters.push(filter)
            }

        },

        clearFilters(state){
            /*
             * Clear all filters.
             */
            state.filters = [];
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
            const type = context.state.activeTypeId;
            const filters = context.state.filters;

            return new Promise((resolve, reject) => {
                Grout.records.query({type: type}, ...filters)
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
