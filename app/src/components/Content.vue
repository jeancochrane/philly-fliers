<template>
    <div class="row">
        <div
            ref="sidebar"
            class="col-sm-4 col-xl-3 sidebar"
        >
            <fliers-sidebar/>
        </div>
        <div class="col-sm-8 col-xl-9">
            <leaflet-map ref="map"/>
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

        // Bind the height of the map and sidebar to the full height of the screen.
        const resizeMap = () => {
            const windowHeight = window.innerHeight;
            const offsetTop = document.getElementById('navbar').offsetHeight;
            const offsetBottom = document.getElementById('footer').offsetHeight;
            const height = `${windowHeight - (offsetTop + offsetBottom)}px`;

            localState.$refs.map.setStyle('height', height);

            // If the window is smaller than the Bootstrap 4 smallest breakpoint
            // (540px), set the sidebar to be the same height as the map to
            // make it scrollable.
            if (window.innerWidth > 540) {
                localState.$refs.sidebar.style.height = height;
            } else {
                localState.$refs.sidebar.style.height = 'auto';
            }

        };

        resizeMap();
        window.addEventListener('resize', resizeMap);
    }
}
</script>
