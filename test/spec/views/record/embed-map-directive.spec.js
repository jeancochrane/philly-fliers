'use strict';

describe('ase.views.record: Embedded Map Directive', function () {

    beforeEach(module('ase.mock.resources'));
    beforeEach(module('ase.mock.resources.grout'));
    beforeEach(module('ase.resources'));
    beforeEach(module('ase.templates'));
    beforeEach(module('ase.views.record'));

    var $compile;
    var $httpBackend;
    var $rootScope;
    var $scope;
    var Element;
    var RecordTypes;
    var ResourcesMock;
    var GroutResourcesMock;

    beforeEach(inject(function (_$compile_, _$httpBackend_, _$rootScope_,
                                _RecordTypes_, _GroutResourcesMock_, _ResourcesMock_) {
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        RecordTypes = _RecordTypes_;
        ResourcesMock = _ResourcesMock_;
        GroutResourcesMock = _GroutResourcesMock_;

        // create element with directive
        $scope = $rootScope.$new();
        Element = $compile('<div class="map" leaflet-map ase-embed-map></div>')($scope);
        $rootScope.$apply();
    }));

    it('should load directive with map', function() {
        expect(Element.find('.leaflet-tile-pane').length).toEqual(1);
    });

    it('should not be editable', function() {
        // map is not editable unless directive attribute 'editable' is set to true
        var controller = Element.controller('embedMapController');
        expect(controller.isEditable).toBeFalsy();
    });

    it('should not have location marker set if no initial coordinates provided', function() {
        var controller = Element.controller('embedMapController');
        expect(controller.locationMarker).toBeNull();
    });

    it('should not listen to click events unless editable', function() {
        var controller = Element.controller('embedMapController');

        var lat = 11.3;
        var lng = 124.2;
        var latlng = L.latLng(lat, lng);

        spyOn($rootScope, '$broadcast').and.callThrough();
        controller.map.fireEvent('click', {latlng: latlng});

        expect($rootScope.$broadcast).not.toHaveBeenCalled();
    });
});
