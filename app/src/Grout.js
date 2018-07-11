const axios = require('axios');

class AbstractApiClass {
    /*
     * All methods that interact with Grout need to be configured to talk to
     * the API server. This base class provides common configuration options.
     *
     * @class
     */
    constructor(url) {
        this.url = url;
    }
}

class Type extends AbstractApiClass {

    constructor(...args) {
        super(...args);
        this.url = `${this.url}/recordtypes/`;
    }

    get(uuid) {
        /*
         * Retrieve a RecordType from the Grout API.
         *
         * @param {string} uuid - A unique identifier for the RecordType.
         * @returns {object} - The JSON blob corresponding to the RecordType. 
         */
    }

    create() {
        /*
         * Make a new RecordType.
         */
    }

    query() {
        /*
         * Send a query to the Grout API, returning an array of RecordTypes
         * that match the query.
         */
    }

    all() {
        /*
         * Retrieve all RecordTypes from the Grout API.
         *
         * @returns {Promise} - If successful, the promise contains a list of
         *                      all RecordTypes, represented by JSON blobs. If
         *                      unsuccessful, the promise throws an error
         *                      message.
         */
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}?limit=all`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

class Schema extends AbstractApiClass {}

class Record extends AbstractApiClass {}

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
