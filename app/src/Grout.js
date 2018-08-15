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
         * @param {string} baseUrl - The base URL for the Grout API server. For
         *                           an app running on the same server as the API,
         *                           this might be e.g. 'localhost:8000/api'.
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

    active() {
        throw new Error(`
            Children of AbstractApiClass must implement the 'active' method.
        `);
    }
}


class Form {
    /*
     * A data structure for storing information about a form (group of Filters)
     * on a RecordSchema.
     *
     * @property {string} id - A unique identifier for this Form, typically
     *                         a slugified version of the name.
     * @property {string} name - The display name for the Form.
     * @property {string} plural - The plural display name for the Form.
     * @property {string} description - A short description of this Form.
     * @property {string} order - The position of this Form among other Forms in
     *                            the schema. Useful if you want to display
     *                            Forms in the same order they are defined in
     *                            the schema.
     */
    constructor(id, name, plural, description, order) {
        this.id = id;
        this.name = name;
        this.plural = plural;
        this.description = description;
        this.order = order;
    }
}


class Filter {
    /*
     * A data structure for storing information about a filter to be applied on
     * a RecordSchema field.
     *
     * @property {string} form - The ID of the Form that this filter should be
     *                           applied to (typically a slugified version of
     *                           the Form's name).
     * @property {string} name - The name of the Filter that this filter should
     *                           be applied to.
     * @property {string} fieldType - The data type of this Filter, (one of `number`,
     *                                `integer`, `text`, `selectlist`, `image`, or
     *                                `reference`)
     * @property {number} order - The position of this Filter in the Form (which
     *                            number Filter it is). Useful if you want to
     *                            display filters in the same order they are
     *                            defined in the schema.
     * @property {boolean} multiple - Whether or not a Record can contain
     *                                multiple instances of this Filter.
     * @property {string|number} query - The value that will be used for the
     *                                   filter query.
     */
    constructor(form, name, fieldType, order, rule, multiple, query) {
        this.form = form;
        this.name = name;

        // Check that `type` is a valid type identifier.
        const validTypes = ['number', 'text', 'selectlist', 'image', 'reference'];
        if (validTypes.includes(fieldType)) {
            this.fieldType = fieldType;
        } else {
            throw new Error("Filter type '${fieldType}' is invalid. Type must be one of: ${validTypes}");
        }

        this.order = order;
        this.multiple = (multiple) ? multiple : false;
        this.query = (query) ? query : '';
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
         * @param {string} uuid - The UUID for the RecordSchema whose fields
         *                        should be returned.
         * @returns {Promise.<Filter[]>} - If the query is successful, returns
         *                                an array of fields that can be filtered.
         *                                Otherwise, throws an error.
         */
        return new Promise((resolve, reject) => {
            this.get(uuid)
                .then(schema => {
                    const definitions = this._parseDefinitions(schema);
                    const filters = this._parseFilters(definitions);
                    resolve(filters);
                })
                .catch(error => reject(error));
        });
    }

    getForms(uuid) {
        /*
         * Returns the forms that contain the filterable fields for this
         * RecordSchema given its UUID. (Forms are an optional way of grouping
         * fields.)
         *
         * @param {string} uuid - The UUID for the RecordSchema whose forms
         *                        should be returned.
         * @returns {Promise.<Form[]>} - If the query is successful, returns
         *                               an array of Forms. Otherwise, throws
         *                               an error.
         */
        return new Promise((resolve, reject) => {
            this.get(uuid)
                .then(schema => {
                    const definitions = this._parseDefinitions(schema);
                    const forms = this._parseForms(definitions);
                    resolve(forms);
                })
                .catch(error => reject(error));
        });
    }

    _parseDefinitions(schema) {
        /*
         * Private helper method to parse a set of field definitions given
         * a RecordSchema object.
         *
         * @param {Object} schema - A RecordSchema object returned from the
         *                          Grout API.
         * @returns {Object} definitions - If the schema has any field definitions,
         *                                 returns a a definitions object
         *                                 according to the JSONSchema spec.
         */
        // Each RecordSchema stores its field specifications in a nested object
        // inside of the `schema.definitions` object, so check to make sure that
        // those definitions exist. If they don't, the object will be empty,
        // and most of the logic of this method will be skipped.
        let definitions = {};
        if (schema.schema && schema.schema.definitions) {
            definitions = schema.schema.definitions;
        }

        return definitions;
    }

    _parseFilters(definitions) {
        /*
         * Private helper method to parse a set of filterable fields given
         * RecordSchema field definitions and format the fields for easy display.
         *
         * @param {Object} definitions - A set of fields structured as a JSONSchema
         *                               `definitions` object.
         * @returns {Array.<Filter>} - An array of Filter objects corresponding to the
         *                             filterable fields for this schema.
         */
        // Initialize an array for the output.
        let filters = [];

        // The field definitions are mapped to a form name, to allow admins to
        // create multiple forms for a given schema (the default form is
        // "${RecordType.label}Details"). These are stored as key-value pairs
        // mapping the form name to its corresponding data, including the fields
        // contained in it. Iterate the keys of the field definitions object in
        // order to extract fields for each form.
        Object.entries(definitions).forEach(([formName, formData]) => {
            // The `properties` object stores the fields on this form. Iterate
            // this object in order to format fields.
            Object.entries(formData.properties).forEach(([fieldName, fieldData]) => {
                // The `isSearchable` flag determines whether the field can
                // be filtered or not. Skip any fields that are not filterable.
                if (fieldData.isSearchable) {
                    // Filters are initialized with the parameters:
                    // `form`, `name`, `type`, `order`, `multiple`
                    /* eslint-disable indent */
                    const filter = new Filter(formName,
                                              fieldName,
                                              fieldData.fieldType,
                                              fieldData.propertyOrder,
                                              formData.multiple);
                    /* eslint-enable indent */

                    filters.push(filter);
                }
            });
        });

        return this._reorder(filters);
    }

    _reorder(arr) {
        /*
         * Private helper method to reorder an array of `Form` or `Filter` objects
         * based on the `order` property of the contained objects.
         *
         * @param {Array.<Form>|Array.<Filter>} - An array of Form or Filter objects
         *                                        to reorder.
         * @returns {Array.<Form>|Array.<Filter>} - The reordered array of Form
         *                                          or Filter objects.
         */
        // Validate the input.
        if (!Array.isArray(arr)) {
            throw new Error('The _reorder method requires an Array as input, ' +
                            'not' + typeof(arr));
        }

        // Create an empty output array of the same length as the input array.
        let output = new Array(arr.length);

        // Iterate the input and reorder elements based on their `order`
        // attribute.
        arr.forEach(elem => {
            // Validate the type of the element.
            if (!(elem instanceof Form || elem instanceof Filter)) {
                throw new Error('All elements of the input array must be instances of the ' +
                                'Form or Filter class, not ' + elem.constructor.name);
            }

            // `order` attributes are 1-indexed, but JS is 0-indexed.
            let index = elem.order - 1;

            output.splice(index, 1, elem);
        });

        return output;
    }

    _parseForms(definitions) {
        /*
         * Private helper method to parse a set of forms given a
         * RecordSchema field definitions object.
         *
         * @param {Object} definitions - A set of fields structured as a JSONSchema
         *                               `definitions` object.
         * @returns {Array.<Form>} - An array of Form objects corresponding to the
         *                           forms for this schema.
         */
        // Initialize an array for the output.
        let forms = [];

        // The field definitions are mapped to a form name, to allow admins to
        // create multiple forms for a given schema (the default form is
        // "${RecordType.label}Details"). These are stored as key-value pairs
        // mapping the form name to its corresponding data.
        Object.entries(definitions).forEach(([formName, formData]) => {
            // Forms are initialized with the property order:
            // `id`, `name`, `plural`, `description`, `order`
            /* eslint-disable indent */
            const form = new Form(formName,
                                  formData.title,
                                  formData.plural_title,
                                  formData.description,
                                  formData.propertyOrder);
            /* eslint-enable indent */

            forms.push(form);
        });

        return this._reorder(forms);
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
         * @param {string} uuid - The UUID for the RecordType whose active
         *                        schema's fields should be returned.
         * @returns {Promise.<Filter[]>} - If the query is successful, returns an array
         *                                of fields that can be filtered. Otherwise, throws
         *                                an error.
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

    active() {
        /*
         * Retrieve all RecordTypes from the Grout API that
         * are currently active (not marked as deleted or superceded).
         *
         * @returns {Promise} - If successful, the promise contains an array of
         *                      all data type instances, represented by JSON blobs.
         *                      If unsuccessful, the promise throws an error.
         */
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}?limit=all&active=True`)
                .then(response => {
                    resolve(response.data.results);
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

    query(...filters) {
        /*
         * Send a query to the Grout API including an optional set of filters,
         * returning an array of Records that match the query.
         *
         * @param {...*} filters - Optional filters to restrict the query.
         *                         Filters must be formatted as Filter data
         *                         structures.
         * @returns {Promise.Array} - An array of Grout Records.
         */
        const hasFilters = filters.length > 0;
        if (!hasFilters) {
            return this.all();
        } else {
            let data = {};  // Build an object for formatting query parameters.

            filters.forEach(filter => {
                // Validate that the filter is formatted appropriately.
                // First, check the pre-defined filters (type, date/time, and
                // polygon).
                if (filter.type || filter.from || filter.to || filter.polygon) {
                    if (filter.type) {
                        data.record_type = filter.type;
                    }
                    if (filter.from) {
                        data.occurred_min = filter.from;
                    }
                    if (filter.to) {
                        data.occurred_max = filter.to;
                    }
                    if (filter.polygon) {
                        // Polygons should be passed in as GeoJSON objects.
                        data.polygon = JSON.stringify(filter.polygon);
                    }
                } else {
                    // Dynamic query -- build the nested query structure.
                    let jsonb = {};
                    jsonb[filter.form] = {};
                    jsonb[filter.form][filter.name] = {};

                    // Construct the actual query.
                    let nestedQuery = {};
                    switch(filter.fieldType) {
                        case 'text':
                            nestedQuery._rule_type = 'containment';
                            nestedQuery.contains = [filter.query];
                            break;

                        case 'select':
                            nestedQuery._rule_type = 'containment';
                            nestedQuery.contains = [filter.query];
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
                                Filter type "${filter.type}" is not registered
                                as a valid type of query.
                            `)
                    }

                    // Reassign the updated nested query to the proper field.
                    jsonb[filter.form][filter.name] = nestedQuery;

                    // Update the params object.
                    // (Turn the JSONB query into a string, since that's how the
                    // Grout API expects to receive it.)
                    data.jsonb = JSON.stringify(jsonb);
                }
            });

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
