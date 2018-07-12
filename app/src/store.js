import Vuex from 'vuex';
import Vue from 'vue';

import Grout from '@/api';


// Configure Vue to use Vuex.
Vue.use(Vuex);

const filterState = {
    /*
     * State module for the Grout filters.
     */
    state: {
        types: [],  // List of available RecordTypes in the Grout API.
        activeType: '',  // The RecordType that the user has currently selected.
        records: [],  // List of records that are currently being displayed.
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

        updateActiveType(state, type) {
            /*
             * Set the active (currently selected) RecordType.
             *
             * @param {string} type - The UUID for the RecordType that should be
             *                        set to `active`.
             */
            state.activeType = type;
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
        }

    },
    actions: {

        loadTypes(context) {
            /*
             * Retrieve the currently available RecordTypes from the Grout API,
             * and set the first returned RecordType to `active`.
             */
            return new Promise((resolve, reject) => {
                Grout.types.all()
                    .then(types => {
                        context.commit('updateTypes', types);

                        // Select the first returned Type and set it to `active`.
                        let initialType = types[0].uuid;
                        context.commit('updateActiveType', initialType);

                        resolve(initialType);
                    })
                    .catch(error => {
                        reject(`Failed to load RecordTypes: ${error}`);
                    });
            });
        },

        loadRecords(context) {
            /*
             * Retrieve the all Record for the currently active RecordType
             * from the Grout API.
             */
            return new Promise((resolve, reject) => {
                context.dispatch('loadTypes')
                    .then((initialType) => {
                        // Successfully loaded RecordTypes -- use the currently-
                        // selected RecordType to load Records.
                        Grout.records.query({type: initialType})
                            .then(records => {
                                context.commit('updateRecords', records);
                                resolve(records);
                            })
                            .catch(error => {
                                reject(`Failed to load Records: ${error}`);
                            });
                    })
                    .catch(error => {
                        reject(`Failed to load Records: ${error}`);
                    })
            });
        },
    },
    getters: {}
}

const store = new Vuex.Store({
    modules: {
        filters: filterState
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;
