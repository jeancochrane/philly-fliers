<template>
    <form>
        <h5>Show me:</h5>
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
                {{ type.plural_label }}
            </option>
        </select>
        <div class="my-2">
            <datetime-picker/>
        </div>
        <p>Use the map controls to filter by region&nbsp;<strong>&#8594;</strong></p>
        <filter-container :filters="filters"/>
    </form>
</template>

<script>
import { mapState } from 'vuex';

import Grout from '@/api';
import Datetime from './filters/Datetime';
import FilterContainer from './filters/Container';


export default {
    name: 'FliersFilters',
    components: {
        'filter-container': FilterContainer,
        'datetime-picker': Datetime,
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

            // Clear existing Record selection.
            this.$store.commit('updateActiveRecordId', '');

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

<style>
.mx-datepicker-popup {
    /* Override the datepicker popup z-index to make sure it always shows up
       on top of map elements (which have a max z-index of 1000) */
    z-index: 1001;
}
</style>
