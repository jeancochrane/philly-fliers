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

}


class Form {
    /*
     * A data structure for storing information about a form (group of Fields)
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


class Field {
    /*
     * A data structure for storing information about a filterable field on
     * a RecordSchema.
     *
     * @property {string} form - The ID of the Form that this Field is a part of.
     *                           (typically a slugified version of the Form
     *                           name). Useful if you want to group Fields by Form.
     * @property {string} name - The name of the Field.
     * @property {string} type - The data type of this Field, (one of `number`,
     *                           `integer`, `text`, `selectlist`, `image`, or
     *                           `reference`)
     * @property {number} order - The position of this Field in the Form (which
     *                            number Field it is). Useful if you want to
     *                            display fields in the same order they are
     *                            defined in the schema.
     * @property {boolean} multiple - Whether or not a Record can contain
     *                                multiple instances of this Field.
     */
    constructor(form, name, type, order, multiple) {
        this.form = form;
        this.name = name;
        this.type = type;
        this.order = order;
        this.multiple = (multiple) ? multiple : false;
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
     * @property {string} field - The name of the Field that this filter should
     *                            be applied to.
     * @property {string|number} value - The value that the user wants to
     *                           filter by.
     * @property {string} rule - The query rule (one of `single`,
     *                           `multiple`, or `range`).
     */
    constructor(field, value, rule) {
        this.form = form;
        this.field = field;
        this.value = value;
        this.rule = rule;
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

    getFields(uuid) {
        /*
         * Returns the filterable fields for a RecordSchema given its UUID.
         *
         * @param {string} uuid - The UUID for the RecordSchema whose fields
         *                        should be returned.
         * @returns {Promise.<Field[]>} - If the query is successful, returns
         *                                an array of fields that can be filtered.
         *                                Otherwise, throws an error.
         */
        return new Promise((resolve, reject) => {
            this.get(uuid)
                .then(schema => {
                    const definitions = this._parseDefinitions(schema);
                    const fields = this._parseFields(definitions);
                    resolve(fields);
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

    _parseFields(definitions) {
        /*
         * Private helper method to parse a set of filterable fields given
         * RecordSchema field definitions and format the fields for easy display.
         *
         * @param {Object} definitions - A set of fields structured as a JSONSchema
         *                               `definitions` object.
         * @returns {Array.<Field>} - An array of Field objects corresponding to the
         *                            filterable fields for this schema.
         */
        // Initialize an array for the output.
        let fields = [];

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
                    // Fields are initialized with the parameters:
                    // `form`, `name`, `type`, `order`, `multiple`
                    /* eslint-disable indent */
                    const field = new Field(formName,
                                            fieldName,
                                            fieldData.fieldType,
                                            fieldData.propertyOrder,
                                            formData.multiple);
                    /* eslint-enable indent */

                    fields.push(field);
                }
            });
        });

        return fields;
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
        // mapping the form name to its corresponding data, including the fields
        // contained in it. Iterate the keys of the field definitions object in
        // order to extract fields for each form.
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

        return forms;
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

    getFields(uuid) {
        /*
         * Returns the filterable fields for the current schema of a RecordType
         * given the RecordType's UUID.
         *
         * @param {string} uuid - The UUID for the RecordType whose active
         *                         schema's fields should be returned.
         * @returns {Promise.<Field[]>} - If the query is successful, returns an array
         *                                of fields that can be filtered. Otherwise, throws
         *                                an error.
         */
        return new Promise((resolve, reject) => {
            this.get(uuid)
                .then(type => {
                    // Create a Schema instance in order to proxy its
                    // `getFilters` method.
                    const schemas = new Schema(this.baseUrl);
                    schemas.getFields(type.current_schema)
                        .then(fields => filters{
                            resolve(fields);
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
