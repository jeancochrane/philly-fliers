(function () {
    'use strict';

    /* ngInject */
    function DetailsConstantsController() {
        var ctl = this;
        ctl.dateFormat = 'long';
    }

    angular.module('ase.details')
    .controller('DetailsConstantsController', DetailsConstantsController);

})();
