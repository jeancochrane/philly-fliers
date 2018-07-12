<template>
    <div class="row">
        <div class="col-sm-8 col-xl-9">
            <leaflet-map ref="map" />
        </div>
        <div class="col-sm-4 col-xl-3">
            <fliers-sidebar/>
        </div>
        <fliers-modal/>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import LeafletMap from './Map';
import FliersSidebar from './Sidebar';
import FliersModal from './Modal';


export default {
    name: 'FliersPublic',
    components: {
        'leaflet-map': LeafletMap,
        'fliers-sidebar': FliersSidebar,
        'fliers-modal': FliersModal,
    },
    mounted() {
        /*
         * Populate the app by retrieving the available RecordTypes and updating
         * the map with records.
         */
        this.$store.dispatch('loadRecords');
    }
}
</script>
