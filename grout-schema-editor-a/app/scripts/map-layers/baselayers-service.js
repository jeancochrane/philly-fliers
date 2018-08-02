(function () {
    'use strict';

    /* Service for sharing baselayer configuration.
     */

    /* ngInject */
    function BaseLayersService() {

        var module = {
            streets: streets,
            satellite: satellite,
            baseLayers: baseLayers
        };
        return module;

        function streets() {
            var layer = new L.tileLayer(
                'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
                {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
                    detectRetina: false,
                    zIndex: 1
                }
            );
            return layer;
        }

        function satellite() {
            var layer = new L.tileLayer(
                '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                    detectRetina: false,
                    zIndex: 1
                }            );
            return layer;
        }

        function baseLayers() {
            return [
                {
                    slugLabel: 'streets',
                    label: 'Streets',
                    layer: streets()
                },
                {
                    slugLabel: 'satellite',
                    label: 'Satellite',
                    layer: satellite()
                }
            ];
        }
    }

    angular.module('ase.map-layers')
    .factory('BaseLayersService', BaseLayersService);
})();
