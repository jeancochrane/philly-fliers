<template>
    <form>
        <select
            :value="activeTypeId"
            @change="selectNewType"
        >
            <option
                disabled
                value=""
            >
                Select a record type
            </option>
            <option
                v-for="type in types"
                :key="type.uuid"
                :value="type.uuid"
            >
                {{ type.label }}
            </option>
        </select>
        <filter-container :filters="filters"/>
    </form>
</template>

<script>
import { mapState } from 'vuex';

import Grout from '@/api';
import FilterContainer from './filters/Container';


export default {
    name: 'FliersFilters',
    components: {
        'filter-container': FilterContainer,
    },
    data() {
        return {
            filters: {
                type: Array,
                default: [],
            },
        }
    },
    computed: mapState({
        types: state => state.filters.types,
        activeTypeId: state => state.filters.activeTypeId,
    }),
    watch: {
        activeTypeId: function(oldType, newType) {
            this.updateFilters();
        }
    },
    methods: {
        selectNewType(e) {
            /*
             * Update global state when a new RecordType is selected.
             */
            // Update the currently-selected RecordType in the datastore.
            this.$store.commit('updateActiveTypeId', e.target.value);

            // Clear existing filters.
            this.$store.commit('clearFilters');

            // Use the currently-selected RecordType to update the array of
            // Records in the datastore.
            this.$store.dispatch('updateRecords');
        },

        updateFilters() {
            /*
             * Update the filter form based on the schema of the global type.
             */
            Grout.types.getFilters(this.activeTypeId)
                .then(filters => {
                    this.filters = filters;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
