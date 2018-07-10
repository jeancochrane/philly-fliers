(function () {
    'use strict';

    /* ngInject */
    function Records($resource, ASEConfig) {
        var baseUrl = ASEConfig.api.hostname + '/api/records/';
        return $resource(baseUrl + ':id/', {
            id: '@uuid',
            archived: 'False' // Note: a regular 'false' boolean doesn't filter properly in DRF
        }, {
            create: {
                method: 'POST'
            },
            get: {
                method: 'GET'
            },
            query: {
                method: 'GET',
                transformResponse: function(data) { return angular.fromJson(data).results; },
                isArray: true
            },
            update: {
                method: 'PATCH'
            },
            toddow: {
                url: baseUrl + 'toddow/',
                method: 'GET',
                isArray: true
            },
            stepwise: {
                url: baseUrl + 'stepwise/',
                method: 'GET',
                isArray: true
            },
            recentCounts: {
                method: 'GET',
                url: baseUrl + 'recent_counts/'
            },
            report: {
                url: baseUrl + 'crosstabs/',
                method: 'GET'
            },
            socialCosts: {
                url: baseUrl + 'costs/',
                method: 'GET'
            }
        });
    }

    angular.module('ase.resources')
    .factory('Records', Records);

})();
