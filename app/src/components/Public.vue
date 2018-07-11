<template>
    <div class="row">
        <div class="col-sm-8 col-xl-9">
            <leaflet-map
                ref="map"
                :types="types"
            />
        </div>
        <div class="col-sm-4 col-xl-3">
            <fliers-sidebar
                :types="types"
            />
        </div>
        <fliers-modal/>
    </div>
</template>

<script>
import LeafletMap from './Map';
import FliersSidebar from './Sidebar';
import FliersModal from './Modal';
import Grout from '@/api.js';

export default {
    name: 'FliersPublic',
    components: {
        'leaflet-map': LeafletMap,
        'fliers-sidebar': FliersSidebar,
        'fliers-modal': FliersModal,
    },
    data() {
        return {
            types: [],  // Store active RecordTypes.
        }
    },
    mounted() {
        // Populate the app with the available RecordTypes.
        Grout.types.all()
            .then(data => {
                this.types = data.results;
            })
            .catch(error => {
                console.log(`Failed to load RecordTypes: ${error}`);
            });
    }
}
</script>
