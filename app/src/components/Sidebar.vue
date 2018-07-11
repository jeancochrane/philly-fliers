<template>
    <div class="row">
        <div class="col-xs-12">
            <address-search ref="address"/>
            <fliers-filters
                :types="types"
            />
            <h4>{{ activeType }}</h4>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import AddressSearch from './filters/Address';
import FliersFilters from './Filters';


export default {
    name: 'FliersSidebar',
    components: {
        'address-search': AddressSearch,
        'fliers-filters': FliersFilters,
    },
    props: {
        types: {
            type: Array,
            default: () => [],
        }
    },
    computed: mapState({
        activeType: state => state.filters.activeType
    }),
}
</script>
