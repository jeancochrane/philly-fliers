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
        fieldName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            query: '',  // The user's query value for the filter.
        }
    },
    computed: {
        schemaName: function() {
            // The fieldName stores information about the schemaName and the
            // field itself.
            return this.fieldName.split('#')[0];
        },
        field: function() {
            return this.fieldName.split('#')[1];
        }
    },
    methods: {
        updateFilterState() {
            /*
             * Update the filters in the datastore to reflect the changes to this
             * filter.
             */
            const payload = {
                'schemaName': this.schemaName,
                'fieldName': this.field,
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
