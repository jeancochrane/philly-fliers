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
    constructor(url) {
        /*
         * The constructor function for AbstractApiClass.
         *
         * @params {string} url - The base URL for the Grout API endpoint. For
         *                        an app running on the same server as the API,
         *                        this might be e.g. 'localhost:8000/api'.
         */
        this.url = url;
    }

    get(uuid) {
        /*
         * Retrieve an instance of a data type from the Grout API based on its
         * UUID.
         *
         * @param {string} uuid - A unique identifier for the data type instance.
         * @returns {object} - The JSON blob corresponding to the instance.
         */
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${uuid}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    create() {
        throw new Exception(`
            Children of AbstractApiClass must implement the 'create' method.
        `);
    }

    query () {
        throw new Exception(`
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


class Type extends AbstractApiClass {
    /*
     * API query methods for the RecordType data type.
     *
     * @class
     */
    constructor(...args) {
        super(...args);
        this.url = `${this.url}/recordtypes/`;
    }
}


class Schema extends AbstractApiClass {}


class Record extends AbstractApiClass {
    /*
     * API query methods for the Record data type.
     *
     * @class
     */
    constructor(...args) {
        super(...args);
        this.url = `${this.url}/records/`;
    }

    query(params = {}) {
        /*
         * Send a query to the Grout API, returning an array of Records
         * that match the query.
         *
         * @param {object} params - A list of query parameters (filters) to
         *                          apply. If this object is empty or if the
         *                          argument is undefined, the method will
         *                          default to returning all RecordTypes.
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
                data.json = params.filters;
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
     * instance once and then have access to each type of query.
     */
    constructor(...args) {
        super(...args);
        this.types = new Type(this.url);
        this.schemas = new Schema(this.url);
        this.records = new Record(this.url);
    }
}


export default Grout;
