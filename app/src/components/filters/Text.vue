<template>
    <div class="form-row my-2 my-lg-0">
        <div class="input-group">
            <input
                :name="filter.name"
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
        filter: {
            type: Object,
            /* eslint-disable vue/require-valid-default-prop */
            default: {},
            /* eslint-enable vue/require-valid-default-prop */
        }
    },
    data() {
        return {
            query: '',  // The user's query value for the filter.
        }
    },
    computed: {
        payload: function() {
            // Add the user's query onto the filter object in order to update
            // the filter state.
            let payload = Object.assign({}, this.filter);
            payload.query = this.query;
            return payload;
        }
    },
    methods: {
        updateFilterState() {
            /*
             * Update the filters in the datastore to reflect the changes to this
             * filter.
             */
            this.$store.commit('updateFilter', this.payload);
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
