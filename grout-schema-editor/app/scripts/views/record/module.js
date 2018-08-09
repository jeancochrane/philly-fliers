// This is an ugly import, but because the module is not packaged for npm, we
// can't resolve it directly by name and have to use a path instead.
import '../../../../node_modules/angular-bootstrap-datetimepicker-directive/angular-bootstrap-datetimepicker-directive';
import 'angular-uuid';

import '../../map-layers/module';
import '../../localization/module';
import '../../leaflet/module';


(function () {
    'use strict';

    /* ngInject */
    function StateConfig($stateProvider) {
        $stateProvider.state('record', {
            abstract: true,
            url: '',
            parent: 'sidebar',
            template: '<ui-view></ui-view>'
        });
        $stateProvider.state('record.add', {
            url: '/record/add/:recordtype',
            template: '<record-add-edit></record-add-edit>',
            label: 'Add a Record',
            showInNavbar: false
        });
        $stateProvider.state('record.edit', {
            url: '/record/edit/:recorduuid',
            template: '<record-add-edit></record-add-edit>',
            label: 'Edit a Record',
            showInNavbar: false
        });
        $stateProvider.state('record.list', {
            url: '/record/list/:recordtype',
            template: '<record-list></record-list>',
            label: 'View all Records',
            showInNavbar: true
        });
        $stateProvider.state('record.details', {
            url: '/record/details/:recorduuid',
            template: '<record-details></record-details>',
            label: 'Record Details',
            showInNavbar: false
        });
    }

    angular.module('ase.views.record', [
        'ngSanitize',
        'ase.auth',
        'ase.notifications',
        'ase.resources',
        'ase.schemas',
        'ase.map-layers',
        'ase.localization',
        'datetimepicker',
        'Leaflet',
        'json-editor',
        'ui.bootstrap',
        'ui.router',
        'angular-uuid'
    ]).config(StateConfig);

})();
