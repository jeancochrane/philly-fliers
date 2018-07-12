<template>
    <div class="row">
        <div class="col-xs-12">
            <address-search ref="address"/>
            <fliers-filters/>
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
    computed: mapState({
        types: state => state.filters.types,
        activeType: state => state.filters.activeType
    }),
}
</script>
