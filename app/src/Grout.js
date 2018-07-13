const axios = require('axios');
const qs = require('qs');


class AbstractApiClass {
    /*
     * All methods that interact with Grout share a set of common queries, and
     * need to be configured to talk to the API server. This base class provides
     * common methods and configuration options for those classes.
     *
     * @class
     */
    constructor(baseUrl) {
        /*
         * The constructor method for AbstractApiClass.
         *
         * @params {string} baseUrl - The base URL for the Grout API server. For
         *                            an app running on the same server as the API,
         *                            this might be e.g. 'localhost:8000/api'.
         */
        this.url = this.baseUrl = baseUrl;
    }

    get(uuid) {
        /*
         * Retrieve an instance of a data type from the Grout API based on its
         * UUID.
         *
         * @param {string} uuid - A unique identifier for the data type instance.
         * @returns {Object} - The JSON blob corresponding to the instance.
         */
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}${uuid}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    create() {
        throw new Error(`
            Children of AbstractApiClass must implement the 'create' method.
        `);
    }

    query () {
        throw new Error(`
            Children of AbstractApiClass must implement the 'query' method.
        `);
    }

    all() {
        /*
         * Retrieve all instances of a given data type from the Grout API.
         *
         * @returns {Promise} - If successful, the promise contains an array of
         *                      all data type instances, represented by JSON blobs.
         *                      If unsuccessful, the promise throws an error.
         */
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}?limit=all`)
                .then(response => {
                    resolve(response.data.results);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}


class Schema extends AbstractApiClass {
    /*
     * API query methods for the RecordSchema data type.
     *
     * @class
     */
    constructor(...args) {
        super(...args);
        this.url = `${this.baseUrl}/recordschemas/`;
    }

    getFilters(uuid) {
        /*
         * Returns the filterable fields for a RecordSchema given its UUID.
         *
         * @params {string} uuid - The UUID for the RecordSchema whose fields
         *                         should be returned.
         * @returns {Promise} - If the query is successful, returns an array
         *                      of fields that can be filtered. Otherwise, throws
         *                      an error.
         */
        return new Promise((resolve, reject) => {
            this.get(uuid)
                .then(schema => {
                    const filters = this._parseFilters(schema);
                    resolve(filters);
                })
                .catch(error => reject(error));
        });
    }

    _parseFilters(schema) {
        /*
         * Private helper method to parse a set of filterable fields given
         * a RecordSchema object.
         */
        // Each RecordSchema stores its field specifications in a nested object
        // inside of the `schema.definitions` object, so check to make sure that
        // those definitions exist. If they don't, the object will be empty,
        // and most of the logic of this method will be skipped.
        let definitions = {};
        if (schema.schema && schema.schema.definitions) {
            definitions = schema.schema.definitions;
        }

        let schemaFilters = {};

        // The field definitions are mapped to a form name, to allow admins to
        // create multiple forms for a given schema (the default form is
        // "${RecordType.label}Details"). Since there can be multiple forms in
        // a given schema, iterate the keys of the field definitions object in
        // order to extract fields from each form.
        Object.keys(definitions).forEach(key => {
            let schema = definitions[key];
            schemaFilters[schema.title] = {};

            // The `schema.properties` object stores the fields on this form.
            Object.keys(schema.properties).forEach((prop) => {
                let property = schema.properties[prop];
                // The `isSearchable` flag determines whether the field can
                // be filtered or not.
                if (property.isSearchable) {
                    // Merge some information in with the properties to
                    // facilitate queries later on.
                    let propertyAdditions = {
                        multiple: schema.multiple,  // The containment type.
                        field: prop  // The name of the field.
                    }
                    let formattedProperty = Object.assign({}, property, propertyAdditions);

                    // Namespace the filter IDs with `key + # + prop`, in case
                    // multiple forms have the same name for fields.
                    schemaFilters[schema.title][key + '#' + prop] = formattedProperty;
                }
            });
        });

        return schemaFilters;
    }
}


class Type extends AbstractApiClass {
    /*
     * API query methods for the RecordType data type.
     *
     * @class
     */
    constructor(...args) {
        super(...args);
        this.url = `${this.baseUrl}/recordtypes/`;
    }

    getFilters(uuid) {
        /*
         * Returns the filterable fields for the current schema of a RecordType
         * given the RecordType's UUID.
         *
         * @params {string} uuid - The UUID for the RecordType whose active
         *                         schema's fields should be returned.
         * @returns {Promise} - If the query is successful, returns an array
         *                      of fields that can be filtered. Otherwise, throws
         *                      an error.
         */
        return new Promise((resolve, reject) => {
            this.get(uuid)
                .then(type => {
                    // Create a Schema instance in order to proxy its
                    // `getFilters` method.
                    const schemas = new Schema(this.baseUrl);
                    schemas.getFilters(type.current_schema)
                        .then(filters => {
                            resolve(filters);
                        })
                        .catch(error => {
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}


class Record extends AbstractApiClass {
    /*
     * API query methods for the Record data type.
     *
     * @class
     */
    constructor(...args) {
        super(...args);
        this.url = `${this.baseUrl}/records/`;
    }

    query(params = {}) {
        /*
         * Send a query to the Grout API, returning an array of Records
         * that match the query.
         *
         * @param {Object} params - A list of query parameters (filters) to
         *                          apply. If this object is empty or if the
         *                          argument is undefined, the method will
         *                          default to returning all RecordTypes.
         * @param {string} params.type - The UUID of a RecordType. Will restrict
         *                               the returned Records to only those with
         *                               the corresponding RecordType.
         * @param {Object} params.filters - Filters for this query.
         */
        const hasQueryParams = Object.keys(params).length > 0;
        if (!hasQueryParams) {
            return this.all();
        } else {
            let data = {};  // Build an object for formatting query parameters.

            // Check if the user is filtering by RecordType.
            if (params.type) {
                data.record_type = params.type;
            }
            // Check for arbitrary JSON filters.
            if (params.filters) {
                // qs provides some utilities for encoding arbitrarily-nested
                // JSON, but Grout doesn't actually accept input in that format.
                // Instead, transform the object into a string.
                data.jsonb = JSON.stringify(params.filters);
            }

            const queryUrl = `${this.url}?${qs.stringify(data)}`;

            return new Promise((resolve, reject) => {
                axios.get(queryUrl)
                    .then(response => {
                        resolve(response.data.results);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
}


class Grout extends AbstractApiClass {
    /*
     * Container class for this module, allowing the user to configure a Grout
     * instance once and then have access to each query class.
     */
    constructor(...args) {
        super(...args);
        this.types = new Type(this.baseUrl);
        this.schemas = new Schema(this.baseUrl);
        this.records = new Record(this.baseUrl);
    }
}


export default Grout;
