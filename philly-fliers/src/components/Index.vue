<template>
    <leaflet-map/>
</template>

<script>
import LeafletMap from './Map';

export default {
    name: 'IndexView',
    components: {
        'leaflet-map': LeafletMap,
    }
}
</script>
