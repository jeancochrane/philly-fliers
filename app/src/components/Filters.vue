<template>
    <form>
        <select
            :value="activeType"
            @change="updateActiveType"
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
    </form>
</template>

<script>
import { mapState } from 'vuex';


export default {
    name: 'FliersFilters',
    computed: mapState({
        types: state => state.filters.types,
        activeType: state => state.filters.activeType,
    }),
    methods: {
        updateActiveType(e) {
            // Update the currently-selected RecordType in the datastore.
            this.$store.commit('updateActiveType', e.target.value);

            // Use the currently-selected RecordType to update the array of
            // Records in the datastore.
            this.$store.dispatch('updateRecords');
        }
    }
}
</script>
