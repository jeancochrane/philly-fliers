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
    props: {
        types: {
            type: Array,
            default: () => [],
        }
    },
    computed: mapState({
        activeType: state => state.filters.activeType,
    }),
    methods: {
        updateActiveType(e) {
            this.$store.commit('updateActiveType', e.target.value);
        }
    }
}
</script>
