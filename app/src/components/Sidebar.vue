<template>
    <div class="row">
        <div class="col-sm-12">
            <h3 class="mt-3">Filters</h3>
            <hr />
            <fliers-filters/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import FliersFilters from './Filters';


export default {
    name: 'FliersSidebar',
    components: {
        'fliers-filters': FliersFilters,
    }
}
</script>
