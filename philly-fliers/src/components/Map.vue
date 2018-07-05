<template>
    <div
         id="map"
         style="height:500px"></div>
</template>

<script>
import L from 'leaflet';

export default {
    name: 'LeafletMap',
    data () {
        return {
            map: null,
        };
    },
    mounted () {
        this.initialize();
    },
    methods: {
        initialize () {
            // Initialize a map.
            this.map = new L.map('map', {
                center: [39.95, -75.16],
                zoom: 12,
                dragging: true,
                touchZoom: true,
                tap: true,
                scrollWheelZoom: false
            });

            // Add tile layers from OSM.
            let tiles = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Contributors',
                maxZoom: 18,
            }).addTo(this.map);
        }
    }
}


</script>
