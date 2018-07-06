<template>
    <div class="index-container">
        <fliers-navbar/>
        <leaflet-map
            ref="map"
        />
    </div>
</template>

<script>
import LeafletMap from './Map';
import FliersNavbar from './Navbar';

export default {
    name: 'IndexView',
    components: {
        'leaflet-map': LeafletMap,
        'fliers-navbar': FliersNavbar,
    }
}
</script>
