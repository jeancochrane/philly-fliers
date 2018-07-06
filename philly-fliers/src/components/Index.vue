<template>
    <div class="index-container">
        <fliers-navbar/>
        <leaflet-map
            ref="map"
        />
        <fliers-sidebar/>
        <fliers-footer/>
    </div>
</template>

<script>
import FliersNavbar from './Navbar';
import LeafletMap from './Map';
import FliersSidebar from './Sidebar';
import FliersFooter from './Footer';

export default {
    name: 'IndexView',
    components: {
        'fliers-navbar': FliersNavbar,
        'leaflet-map': LeafletMap,
        'fliers-sidebar': FliersSidebar,
        'fliers-footer': FliersFooter,
    }
}
</script>
