<template>
    <div
        ref="map"
        style="height:500px">
    </div>
</template>

<script>
import { mapState } from 'vuex';

import L from 'leaflet';
import leafletDraw from 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// These imports indicate to webpack that it needs to load these Leaflet assets
// into the static files directory. `marker-icon.png` will get loaded automatically
// since the Leaflet source code references it directly, but the
// other assets are not referenced, so we need to force them to load.
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';


export default {
    name: 'LeafletMap',
    props: {
        id: {  // Optional ID to use for the map DOM element.
            type: String,
            default: 'map',
        }
    },
    data() {
        return {
            map: null,  // Reference to this component's L.Map object.
            activeLayer: null,  // Currently-selected marker layer.
        };
    },
    computed: {
        ...mapState({
            types: state => state.filters.types,
            activeTypeId: state => state.filters.activeTypeId,
            records: state => state.filters.records,
        })
    },
    watch: {
        records: function(oldRecords, newRecords) {
            // Update the map whenever the set of active Records changes in the
            // datastore.
            this.updateLayers();
        }
    },
    mounted() {
        this.initMap();
        this.initTiles();
        this.map.whenReady(this.updateLayers);
    },
    methods: {
        initMap() {
            /*
             * Initialize a Leaflet map in this component.
             */
            this.map = new L.map(this.$refs.map, {
                center: [39.95, -75.16],
                zoom: 12,
                dragging: true,
                touchZoom: true,
                tap: true,
                scrollWheelZoom: false,
            });

            // The FeatureGroup for saving filter geometries defined by the user
            // needs to live as local state in this method in
            // order to interact properly with Leaflet, since `this` gets
            // overridden in Leaflet event methods to refer to the object that
            // the event is bound to (e.g. `L.map`). It's not pretty, but
            // it works.
            let filterLayer = new L.featureGroup().addTo(this.map);

            // Initialize Leaflet Draw component for drawing geometries.
            this.map.addControl(new L.Control.Draw({
                edit: {
                    featureGroup: filterLayer,
                    poly: {
                        allowIntersection: false,
                    }
                },
                draw: {
                    marker: false,
                    circle: false,
                    circlemarker: false,
                    polyline: false,
                    polygon: {
                        allowIntersection: false,
                    }
                }
            }));

            // When the user draws a geometry, use it as a filter.
            this.map.on('draw:created', event => {
                // Remove existing filter layer, if one exists.
                filterLayer.clearLayers();

                // Add the new layer that the user has defined to the map.
                filterLayer.addLayer(event.layer);

                // Update Records based on the new filter.
                this.$store.commit('updatePolygon', event.layer.toGeoJSON().geometry);
                this.$store.dispatch('updateRecords');
            });

            // When a user deletes a geometry, rerun queries.
            this.map.on('draw:deleted', event => {
                // Update Records.
                this.$store.commit('updatePolygon', {});
                this.$store.dispatch('updateRecords');
            })
        },

        initTiles() {
            /*
             * Add tile layers from OSM to the map.
             */
            const streets = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors',
                maxZoom: 18,
            }).addTo(this.map);
        },

        updateLayers() {
            /*
             * Update the marker layer on the map using the currently-active
             * set of Records defined in the datastore.
             */
            // If a layer is currently visible, remove it from the map.
            if (this.activeLayer && this.map.hasLayer(this.activeLayer)) {
                this.map.removeLayer(this.activeLayer);
            }

            // Create a marker layer from the set of active Records.
            let markers = [];
            for (let record of this.records) {
                // Extract data for display as a marker.
                const coords = record.geom.coordinates;
                const lat = coords[0];
                const lng = coords[1];

                const details = JSON.stringify({
                    start: record.occurred_from,
                    end: record.occurred_to,
                    data: record.data,
                }, null, 2);

                let popup = `
                    <h3>Details</h3>
                    <hr/>
                    <pre>
                        <code>
                            ${details}
                        </code>
                    </pre>
                `;

                markers.push(new L.marker([lng, lat]).bindPopup(popup));
            }

            // Add the layer to the map.
            this.activeLayer = new L.layerGroup(markers);
            this.map.addLayer(this.activeLayer);
        }
    }
}
</script>
