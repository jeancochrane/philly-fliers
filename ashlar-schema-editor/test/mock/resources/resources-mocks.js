
(function () {
    'use strict';

    function ResourcesMock () {
        var GeographyResponse = {
            'count': 1,
            'next': null,
            'previous': null,
            'results': [{
                'uuid': '80c10057-2cfc-4a32-8e3c-0573e8bf853f',
                'label': 'some_geo',
                'color': 'fuschia',
                'display_field': 'ballparks',
                'data_fields': ['ballparks'],
                'errors': null,
                'created': '2015-05-13T00:22:50.465802Z',
                'modified': '2015-05-13T00:23:28.041375Z',
                'status': 'COMPLETE',
                'source_file': 'http://localhost:7000/media/boundaries/2015/05/13/phila-city_limits_shp_IbasPjb.zip'
            }]
        };

        var BoundaryNoGeomResponse = {
            'count': 1,
            'next': null,
            'previous': null,
            'results': [{
                'uuid': '7c2acfe7-ccf0-4245-9799-f4fa7d80bd9d',
                'data': {
                    'PROVINCE': '',
                    'REGION': 'R2',
                    'REG_DESC': 'CAGAYAN VALLEY REGION'
                },
                'bbox': [
                    {
                        'lat': 19.949404944931022,
                        'lon': 122.1424120222916
                    },
                    {
                        'lat': 19.967709174247037,
                        'lon': 122.16365427955863
                    }
                ],
                'created': '2015-10-02T13:59:15.210040Z',
                'modified': '2015-10-02T13:59:15.210084Z',
                'boundary': '80c10057-2cfc-4a32-8e3c-0573e8bf853f'
            }]
        };

        var RecordSchemaResponse = {
            'count': 1,
            'next': null,
            'previous': null,
            'results': [
                {
                    'uuid': '80c10057-2cfc-4a32-8e3c-0573e8bf8f3f',
                    'schema': {
                        // Note: the format of this is still in flux and will change a bit
                        'description': '',
                        'title': '',
                        'plural_title': '',
                        'definitions': {
                            'Incident Details': {
                                'description': 'Details of incident',
                                'title': 'Incident Details',
                                'plural_title': 'Incident Details',
                                'definitions': {},
                                'type': 'object',
                                'properties': {
                                    'Description': {
                                        'fieldType': 'text',
                                        'format': 'textarea',
                                        'isSearchable': true,
                                        'propertyOrder': 0,
                                        'type': 'string'
                                    }
                                },
                                'details': true
                            },
                            'Firearm': {
                                'description': 'Guns and other projectiles.',
                                'title': 'Firearm',
                                'plural_title': 'Firearms',
                                'definitions': {},
                                'type': 'object',
                                'properties': {}
                            }
                        },
                        'type': 'object',
                        'properties': {
                            'Incident Details': {
                                '$ref': '#/definitions/Incident Details'
                            },
                            'Firearm': {
                                '$ref': '#/definitions/Firearm'
                            }
                        }
                    },
                    'created': '2015-05-13T21:44:28.324760Z',
                    'modified': '2015-05-13T21:44:28.324819Z',
                    'version': 2,
                    'next_version': null,
                    'record_type': '15460346-65d7-4f4d-944d-27324e224691'
                }
            ]
        };

        var RecordTypeResponse = {
            'count': 3,
            'next': null,
            'previous': null,
            'results': [
                {
                    'uuid':'15460346-65d7-4f4d-944d-27324e224691',
                    'current_schema':'80c10057-2cfc-4a32-8e3c-0573e8bf8f3f',
                    'created':'2015-05-13T21:43:29.227598Z',
                    'modified':'2015-05-13T21:43:29.227639Z',
                    'label':'Incident',
                    'plural_label':'Incidents',
                    'description':'An incident.',
                    'active':true
                },
                {
                    'uuid': '99eeb841-31cf-4059-a408-070a0853c875',
                    'current_schema': 'd71e6475-e328-41d3-8e1f-556ab4145129',
                    'created': '2016-02-02T19:10:58.039863Z',
                    'modified': '2016-02-02T19:10:58.039897Z',
                    'label': 'Intervention',
                    'plural_label': 'Interventions',
                    'description': 'Actions to improve traffic safety',
                    'active': true
                },
                {
                    'uuid':'1a8232f4-2fe8-4df0-9c78-786f666b3551',
                    'current_schema':'311791af-409e-40ac-8209-fe9785469479',
                    'created':'2015-05-13T21:43:45.242844Z',
                    'modified':'2015-05-13T21:43:45.242894Z',
                    'label':'Bird Sighting',
                    'plural_label':'Bird Sightings',
                    'description':'Birds and their environments.',
                    'active':true
                }
            ]
        };

        var BlackSpotConfigResponse = {
            'count': 1,
            'next': null,
            'previous': null,
            'results': [
                {
                    'uuid':'aaa60346-65d7-4f4d-944d-27324e224691',
                    'created':'2015-05-13T21:43:29.227598Z',
                    'modified':'2015-05-13T21:43:29.227639Z',
                    'severity_percentile_threshold': 0.95
                }
            ]
        };

        var RecordType = RecordTypeResponse.results[0];

        var SecondaryRecordType = RecordTypeResponse.results[1];

        var RecordSchemaRequest = angular.extend({}, RecordType, {
            definitions: {
                'Incident Details': {
                    type: 'object',
                    title: 'Incident Details',
                    plural_title: 'Incident Details',
                    description: 'Details for Incident',
                    multiple: false,
                    propertyOrder: 0,
                    details: true
                }
            }
        });

        var UserInfoResponse = {
            'id': 2,
            'url': 'http://localhost:7000/api/users/2/',
            'username': '0000000000000000000',
            'email': 'test@azavea.com',
            'groups': ['public'],
            'isAdmin': false,
            'is_staff': false,
            'is_superuser': false
        };

        var AdminUserInfoResponse = {
            'id': 1,
            'url': 'http://localhost:7000/api/users/1/',
            'username': '0000000000000000000',
            'email': 'admin@azavea.com',
            'groups': ['admin'],
            'isAdmin': true,
            'is_staff': false,
            'is_superuser': false
        };

        var UsersResponse = {
            'count': 4,
            'next': null,
            'previous': null,
            'results': [
                {
                    'id': 2,
                    'url': 'http://localhost:7000/api/users/2/',
                    'username': '0000000000000000000',
                    'email': 'test@azavea.com',
                    'groups': ['public'],
                    'isAdmin': false,
                    'is_staff': false,
                    'is_superuser': false
                }, {
                    'id': 1,
                    'url': 'http://localhost:7000/api/users/1/',
                    'username': '0000000000000000000',
                    'email': 'admin@azavea.com',
                    'groups': ['admin'],
                    'isAdmin': true,
                    'is_staff': false,
                    'is_superuser': false
                }
            ]
        };

        var RecordList = [
            {
                'uuid': '35d74ce1-7b08-486b-b791-da9bc1e93cfb',
                'archived': false,
                'data': {
                    'Person': [],
                    'Crime Details': {
                        'County': 'Philadelphia',
                        'Description': 'First test',
                        'District': '13',
                        '_localId': 'e116f30b-e493-4d57-9797-a901abddf7d5'
                    },
                    'Vehicle': []
                },
                'created': '2015-07-30T17:36:29.483160Z',
                'modified': '2015-07-30T17:36:29.483206Z',
                'occurred_from': '2015-07-30T17:36:29.263000Z',
                'occurred_to': '2015-07-30T17:36:29.263000Z',
                'geom': {
                    'type': 'Point',
                    'coordinates': [
                        25.0,
                        75.0
                    ]
                },
                'location_text': '',
                'schema': 'db446730-3d6d-40b3-8699-0027205d54ed'
            },
            {
                'uuid': '57dd6700-6e87-4110-ab11-dc7eefc50c96',
                'archived': false,
                'data': {
                    'Person': [
                        {
                            'Last name': 'John',
                            'First name': 'Smith',
                            'Street address': '3 Test St.',
                            '_localId': '4cde1cc9-2cd2-487b-983d-ae1de1d6198c'
                        },
                        {
                            'Last name': 'Jane',
                            'First name': 'Doe',
                            'Street address': '4 Test Ln.',
                            '_localId': 'b383cf8c-95f2-46de-aaed-d05115db8d4d'
                        }
                    ],
                    'Crime Details': {
                        'County': 'Philadelphia',
                        'Description': 'Second test',
                        'District': '14',
                        '_localId': '2382abab-0958-4aef-a1f6-ccca379ae9a4'
                    },
                    'location_text': '',
                    'schema': 'db446730-3d6d-40b3-8699-0027205d54ed'
                }
            },
            {
                "uuid": "80621b6f-4036-45c5-940b-796f23ea0185",
                "data": {
                    "interventionDetails": {
                        "Type": "Intersection - Roundabout",
                        "_localId": "dddb643b-18ae-4b3d-8eba-e3d59c7fb14f"
                    }
                },
                "created": "2016-02-02T19:11:00.479893Z",
                "modified": "2016-02-02T19:11:00.479924Z",
                "occurred_from": "2016-02-02T06:11:00.395264Z",
                "occurred_to": "2016-02-02T06:11:00.395273Z",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        121.03756381620197,
                        14.644203676970669
                    ]
                },
                "location_text": null,
                "city": null,
                "city_district": null,
                "county": null,
                "neighborhood": null,
                "road": null,
                "state": null,
                "weather": null,
                "light": null,
                "schema": "d71e6475-e328-41d3-8e1f-556ab4145129"
            }
        ];

        var RecordResponse = {
            'count': 3,
            'next': null,
            'previous': null,
            'results': RecordList
        };

        var module = {
            BlackSpotConfigResponse: BlackSpotConfigResponse,
            GeographyResponse: GeographyResponse,
            BoundaryNoGeomResponse: BoundaryNoGeomResponse,
            RecordSchema: RecordSchemaResponse.results[0],
            RecordSchemaResponse: RecordSchemaResponse,
            RecordSchemaRequest: RecordSchemaRequest,
            RecordType: RecordType,
            SecondaryRecordType: SecondaryRecordType,
            RecordTypeResponse: RecordTypeResponse,
            UserInfoResponse: UserInfoResponse,
            AdminUserInfoResponse: AdminUserInfoResponse,
            UsersResponse: UsersResponse,
            RecordResponse: RecordResponse
        };
        return module;
    }

    angular.module('ase.mock.resources', [])
    .factory('ResourcesMock', ResourcesMock);

})();
