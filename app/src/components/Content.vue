<template>
    <div class="row">
        <div class="col-sm-8 col-xl-9">
            <leaflet-map ref="map"/>
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
    name: 'FliersContent',
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

        // Bind `this` to a separate variable in order to use it in the
        // function scope of the `window` object.
        let localState = this;

        // Bind the height of the map to the full height of the screen.
        const resizeMap = () => {
            const windowHeight = window.innerHeight;
            const offsetTop = document.getElementById('navbar').offsetHeight;
            const offsetBottom = document.getElementById('footer').offsetHeight;
            const offset = `${windowHeight - (offsetTop + offsetBottom)}px`;

            localState.$refs.map.setStyle('height', offset);
        };

        resizeMap();
        window.addEventListener('resize', resizeMap);
    }
}
</script>
