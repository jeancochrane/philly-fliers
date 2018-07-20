<template>
    <div class="form-row my-2 my-lg-0">
        <div class="input-group">
            <input
                :name="fieldName"
                v-model.trim="query"
                class="form-control"
                type="search"
                placeholder="Search for keywords"
                aria-label="Search for keywords"
                @change="updateFilterState"
            />
            <div class="input-group-append">
                <button
                    class="btn btn-secondary"
                    @click.prevent="updateRecords"
                >
                    Search
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TextFilter',
    props: {
        fieldName: {  // The name of the field that this component queries.
            type: String,
            default: '',
        },
        form: {  // The ID (slugified name) of the form that this component queries.
            type: String,
            default: '',
        }
    },
    data() {
        return {
            query: '',  // The user's query value for the filter.
        }
    },
    methods: {
        updateFilterState() {
            /*
             * Update the filters in the datastore to reflect the changes to this
             * filter.
             */
            const payload = {
                'schemaName': this.form,
                'fieldName': this.fieldName,
                'fieldType': 'text',
                'query': this.query,
            };

            this.$store.commit('updateFilter', payload);
        },
        updateRecords() {
            /*
             * Trigger a new query in the datastore.
             */
            this.$store.dispatch('updateRecords');
        }
    }
}
</script>
