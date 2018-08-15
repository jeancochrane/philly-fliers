<template>
    <div
        ref="map"
        style="height:500px">
    </div>
</template>

<script>
import { mapState } from 'vuex';

import JQuery from 'jquery';
import fecha from 'fecha';
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
        this.map.whenReady(this.updateLayers);
    },
    methods: {
        initMap() {
            /*
             * Initialize a Leaflet map in this component.
             */
            // Use a cleaner default basemap.
            const basemapUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png';
            const attribution = 'Map styles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>, ' +
                                'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> Contributors';
            const basemap = L.tileLayer(basemapUrl, {
                attribution: attribution,
            });

            this.map = new L.map(this.$refs.map, {
                center: [39.95, -75.2129],
                zoom: 15,
                dragging: true,
                touchZoom: true,
                tap: true,
                layers: [basemap],
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
            });

            // When a user opens a popup, bind a listener to the "Show more"
            // button to trigger the modal on click
            this.map.on('popupopen', event => {
                // Set the event listener for the modal trigger on the button.
                JQuery('.show-more').click(e => {
                    e.preventDefault();
                    JQuery('.modal').modal('show');
                });
                // Show the button.
                JQuery('.show-more').removeClass('disabled');
                JQuery('.show-more').attr('aria-disabled', 'false');
            });
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

            // Alias the $store so that we can dispatch actions and commit
            // mutations in event handlers.
            const store = this.$store;

            // Create a marker layer from the set of active Records.
            let markers = [];
            for (let record of this.records) {
                // Extract location data for display as a marker.
                const coords = record.geom.coordinates;
                const lat = coords[0];
                const lng = coords[1];

                // Extract date/time data.
                const from = this.displayDateTime(record.occurred_from);
                const to = this.displayDateTime(record.occurred_to);
                const dateRange = (from === to) ? from : `${from} - ${to}`;

                let title = '';
                let shortDescription = '';
                let image = false;
                if (record.data.driverPosterDetails) {
                    title = record.data.driverPosterDetails['Event name'];
                    shortDescription = record.data.driverPosterDetails['Short description'];
                    image = record.data.driverPosterDetails['Image'];
                } else if (record.data.driverEventDetails) {
                    title = record.data.driverEventDetails['Title'];
                    shortDescription = record.data.driverEventDetails['Short description'];
                    image = false;
                }

                let popup = `
                    <h5>${title}</h5>
                    <h6>${dateRange}</h6>
                    <hr/>
                    ${ (image) ? `<img src="${image}" class="img img-fluid poster-thumbnail mb-3"/>` : '' }
                    <p>
                        ${shortDescription}
                    </p>
                    <button
                        type="button"
                        class="show-more btn btn-link pl-0 disabled"
                        aria-disabled="true"
                    >
                        Show more details &#8594;
                    </a>
                `;

                let marker = new L.marker([lng, lat]).bindPopup(popup);
                marker.record = record;
                marker.on('click', event => {
                    // When the user clicks a marker, update the global store
                    // to register the selected record.
                    store.commit('updateActiveRecordId', event.target.record.uuid);
                });
                markers.push(marker);
            }

            // Add the layer to the map.
            this.activeLayer = new L.layerGroup(markers);
            this.map.addLayer(this.activeLayer);
        },

        setStyle(attr, val) {
            /*
             * Set the style of the map for a given CSS `attr` to `val`.
             */
            this.$refs.map.style[attr] = val;
        },

        displayDateTime(dt) {
            /*
             * Format an ISO 8601 timestamp for human-readable display.
             */
            const inputFormat = 'YYYY-MM-DDTHH:mm:ssZ';
            const outputFormat = 'MMMM Do, YYYY';

            const parsedDate = fecha.parse(dt, inputFormat);
            return fecha.format(parsedDate, outputFormat);
        },
    }
}
</script>

<style>
.poster-thumbnail {
    height: 200px;
}
</style>
