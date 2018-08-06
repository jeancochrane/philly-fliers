<template>
    <div class="row">
        <div class="col-sm-12">
            <h3 class="mt-3">
                <font-awesome-icon
                    icon="filter"
                    size="xs"
                />
                Filters
            </h3>
            <hr />
            <fliers-filters/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import FliersFilters from './Filters';


export default {
    name: 'FliersSidebar',
    components: {
        'fliers-filters': FliersFilters,
        'font-awesome-icon': FontAwesomeIcon
    }
}
</script>
