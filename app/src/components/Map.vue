<template>
    <div
        ref="map"
        style="height:500px">
    </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    name: 'LeafletMap',
    props: {
        id: {
            type: String,
            default: 'map',
        },
    },
    data() {
        return {
            map: null,
        };
    },
    mounted() {
        this.initMap();
        this.initLayers();
    },
    methods: {
        initMap() {
            //
            // Initialize a Leaflet map in this component.
            //
            this.map = new L.map(this.$refs.map, {
                center: [39.95, -75.16],
                zoom: 12,
                dragging: true,
                touchZoom: true,
                tap: true,
                scrollWheelZoom: false
            });
        },

        initLayers() {
            //
            // Add tile layers from OSM to the map.
            //
            const streets = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
                maxZoom: 18,
            }).addTo(this.map);
        },
    }
}


</script>