(function () {
    'use strict';
    angular.module('app').config(['$labelDesignerProvider',function($labelDesignerProvider) {
        $labelDesignerProvider.setConfig({
            //DO NOT USE TRAILING ( / ) IN BELOW PATHS
            //ONLY USE A LEADING ( / ) IF THE PATH NEEDS TO BE APPENDED TO THE ROOT URL.

            // EXAMPLE:
            // '/api/v1/labelDesign' = http://localhost:9797/api/v1/labelDesign
            // 'api/v1/labelDesign'  = http://localhost:9797/enspire-oms/dev/api/v1/labelDesign

            apiRef  : 'id', //property that will be looked at and used in api path templates. Examples are refKey, refName, id.
            apiPaths : {
                "create"    : '/api/v1/labelDesign/',
                "update"    : '/api/v1/labelDesign/id/{{id}}',
                "delete"    : '/api/v1/labelDesign/id/{{id}}',
                "get"       : '/api/v1/labelDesign/id/{{id}}',
                "list"      : '/api/v1/labelDesign',
                "labelTypes": '/api/v1/labelDesign/types',
                "dataSample": '/api/v1/labelDesign/dataSource/{{type}}'
            },


            // The "types" and "dataSources" properties below should be dynamically auto set by the labelDesigner after
            // it pulls the "apiPaths.dataSample" and "apiPaths.labelTypes", but can be set here if no api exists
            // for those yet.
            // There should be a dataSources[typesName] object that matches each one of the "types".
            // After the 2 noted API paths are added/configured/fixed, you can remove these 2 config options. Leaving
            // them here and setting them this way will override any api calls to get server data.
            types               : [
                "product",
                "customer",
                "site",
                "vendor",
                "shipping",
                "return"
            ],
            dataSources         : {
                "product": {
                    "productInfo": 'Dummy product dataSource'
                },
                "customer": {
                    "customerInfo": 'Dummy customer dataSource'
                },
                "site": {
                    "siteInfo": 'Dummy site dataSource'
                },
                "vendor": {
                    "vendorInfo": 'Dummy vendor dataSource'
                },
                "shipping": {
                    "shippingInfo": 'Dummy shipping dataSource'
                },
                "return": {
                    "returnInfo": 'Dummy return dataSource'
                }
            }
        });
        /*
        ##########################
        ### apiPath ##############
        ##########################

        @Example        : 'labels'
        @Path Appendages: apiPath + '/{labelRefkey}/' [GET]     Pull Single Label
                          apiPath + '/{labelRefkey}/' [PUT]     Update Label
                          apiPath + '/{labelRefkey}'  [DELETE]  Delete label
                          apiPath + '/'               [POST]    Save New Label
                          apiPath + ''                [LIST]    Pull list of labels

        @Desc           : Path used to pull label lists', save labels, delete labels, get single labels, etc.
        @Methods        : GET, PUT, POST, DELETE, LIST(GET)


        ##########################
        ### apiLabelTypesPath ####
        ##########################

        @Desc           : API Path used to get a list of all label types.
        @Example        : 'enum/labels/type'

        @Methods        : GET
        @RtnObj         : {
                           "table": "labels",
                           "field": "type",
                           "enum" : ["product", "customer", "site", "vendor", "shipping", "return"]
                          }


        ##########################
        ### apiDataSourcesPath ###
        ##########################
        @Desc           : API Path used to pull a data source object based on a labels type property.
                          Ex: label.type='shipping' ... api appends path and calls 'labels/dataSource/shipping'
                          The return object should be a CLEAN object with no server side garbage added to it.  It should
                          also contain example values for each property.  Example values are displayed in the visual designer,
                          while the property keys are displayed in a layers properties panel. Every property returned in this object
                          will be selectable by the end user to data bind text or barcodes to.

                          Example values are NOT converted by the designer. Any and ALL example property values are displayed exactly
                          as they are received. So if you dont want something like a timestamp being shown, you need to have the date formatted
                          in the example value BEFORE sending it to the UI.

                          DO NOT USE REAL VALUES. USE SAMPLE VALUES FOR THIS RETURN OBJECT.


        @Example        : 'labels/dataSource'
        @Path Appendages: apiDataSourcesPath + '/{labelType}' [GET] Pull single datasource object.

        @Methods        : GET
        @RtnObj         : {
                            "id"         : "a1712520-4dbe-11e5-a667-e975ccf10bfb",
                            "refName"    : "a1712521-4dbe-11e5-a667-e975ccf10bfb",
                            "refKey"     : "bbf90bc2f24d14828940226489e769db",
                            "sequential" : 1832,
                            "name"       : {"last": "Doe", "first": "John", "middle": "M.", "suffix": "Mr", "salutation": "Jr."},
                            "companyName": "Company Name",
                            "fullName"   : "Full Name",
                            "email"      : "email@company.com",
                            "createdDate": 1440720000000,
                            "contacts"   : [],
                            "settings"   : {},
                            "attributes" : {},
                            "tags"       : [],
                            "updated"    : 1442355002000,
                            "address"    : {
                                "line1"  : "660 Grand Reserve Dr",
                                "line2"  : "Address line 2",
                                "line3"  : "Address line 3",
                                "city"   : "Suwanee",
                                "state"  : "GA",
                                "zip"    : "30024",
                                "country": "US"
                            },
                            "upload"     : {
                                "refKey"          : "bf20ed61f3613eb9e9babbb68f4f584f",
                                "fileName"        : "fileName.png",
                                "originalFileName": "originalFileName",
                                "width"           : 180,
                                "height"          : 180,
                                "resourceType"    : "media",
                                "format"          : "png",
                                "url"             : "http://res.cloudinary.com/johndoe/image/upload/v1442739160/bf20ed61f3613eb9e9babbb68f4f584f.png",
                                "secureUrl"       : "https://res.cloudinary.com/johndoe/image/upload/v1442739160/bf20ed61f3613eb9e9babbb68f4f584f.png",
                                "bytes"           : "29268",
                                "metadata"        : {
                                    "title"      : "Image Title",
                                    "public"     : false,
                                    "altText"    : "Image ALt",
                                    "caption"    : "Image Caption",
                                    "description": "Image Description"
                                },
                                "tags"            : []
                            }
                        }
        */
    }]);
})();


var sdSchema = {
    "type"      : "object",
    "id"        : "urn:jsonschema:com:eis:ssit:api:v1:model:LabelDesign",
    "properties": {
        "sequential"   : {
            "type": "integer"
        },
        "displayName"  : {
            "type": "string"
        },
        "txId"         : {
            "type": "string"
        },
        "units"        : {
            "type": "string"
        },
        "versionHash"  : {
            "type": "string"
        },
        "refKey"       : {
            "type": "string"
        },
        "uiactions"    : {
            "type" : "array",
            "items": {
                "type": "string"
            }
        },
        "type"         : {
            "type": "string"
        },
        "requiredData" : {
            "type" : "array",
            "items": {
                "type": "string"
            }
        },
        "auditInfo"    : {
            "type": "object",
            "$ref": "urn:jsonschema:com:eis:core:api:v1:model:AuditInfo"
        },
        "archived"     : {
            "type": "boolean"
        },
        "current"      : {
            "type": "boolean"
        },
        "layers"       : {
            "type" : "array",
            "items": {
                "type"      : "object",
                "id"        : "urn:jsonschema:com:eis:ssit:api:v1:model:LabelDesignLayer",
                "properties": {
                    "rotate"       : {
                        "type": "integer"
                    },
                    "hidden"       : {
                        "type": "boolean"
                    },
                    "displayName"  : {
                        "type": "string"
                    },
                    "txId"         : {
                        "type": "string"
                    },
                    "refKey"       : {
                        "type": "string"
                    },
                    "uiactions"    : {
                        "type" : "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "auditInfo"    : {
                        "type"      : "object",
                        "id"        : "urn:jsonschema:com:eis:core:api:v1:model:AuditInfo",
                        "properties": {
                            "updateUser": {
                                "type": "string"
                            },
                            "createUser": {
                                "type": "string"
                            },
                            "updateTs"  : {
                                "type"  : "integer",
                                "format": "UTC_MILLISEC"
                            },
                            "creationTs": {
                                "type"  : "integer",
                                "format": "UTC_MILLISEC"
                            }
                        }
                    },
                    "current"      : {
                        "type": "boolean"
                    },
                    "translateY"   : {
                        "type": "integer"
                    },
                    "translateX"   : {
                        "type": "integer"
                    },
                    "dynAttributes": {
                        "type"      : "object",
                        "id"        : "urn:jsonschema:java:util:LinkedHashMap<java:lang:String,java:lang:Object>",
                        "properties": {
                            "entry": {
                                "type" : "array",
                                "items": {
                                    "type"      : "object",
                                    "id"        : "urn:jsonschema:com:eis:annotations:MapAdapter:MapElement<java:lang:Object,java:lang:Object>",
                                    "properties": {
                                        "value": {
                                            "type": "any"
                                        },
                                        "key"  : {
                                            "type": "any"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "id"           : {
                        "type": "string"
                    },
                    "text"         : {
                        "type": "string"
                    },
                    "refName"      : {
                        "type"    : "string",
                        "required": true
                    },
                    "value"        : {
                        "type": "string"
                    },
                    "height"       : {
                        "type": "integer"
                    },
                    "schemaVersion": {
                        "type"    : "string",
                        "required": true
                    },
                    "invert"       : {
                        "type": "boolean"
                    },
                    "rows"         : {
                        "type": "integer"
                    },
                    "version"      : {
                        "type": "string"
                    },
                    "dataDomain"   : {
                        "type"    : "array",
                        "required": true,
                        "items"   : {
                            "type": "string"
                        }
                    },
                    "name"         : {
                        "type": "string"
                    },
                    "x"            : {
                        "type": "integer"
                    },
                    "width"        : {
                        "type": "integer"
                    },
                    "y"            : {
                        "type": "integer"
                    },
                    "fontSize"     : {
                        "type": "string"
                    },
                    "fontAlign"    : {
                        "type": "string"
                    },
                    "z"            : {
                        "type": "integer"
                    },
                    "editingName"  : {
                        "type": "boolean"
                    },
                    "font"         : {
                        "type": "string"
                    }
                }
            }
        },
        "dynAttributes": {
            "type": "object",
            "$ref": "urn:jsonschema:java:util:LinkedHashMap<java:lang:String,java:lang:Object>"
        },
        "id"           : {
            "type": "string"
        },
        "refName"      : {
            "type"    : "string",
            "required": true
        },
        "height"       : {
            "type": "string"
        },
        "schemaVersion": {
            "type"    : "string",
            "required": true
        },
        "version"      : {
            "type": "string"
        },
        "tags"         : {
            "type" : "array",
            "items": {
                "type": "string"
            }
        },
        "createdDate"  : {
            "type"  : "integer",
            "format": "UTC_MILLISEC"
        },
        "dataDomain"   : {
            "type"    : "array",
            "required": true,
            "items"   : {
                "type": "string"
            }
        },
        "name"         : {
            "type": "string"
        },
        "width"        : {
            "type": "string"
        },
        "updated"      : {
            "type"  : "integer",
            "format": "UTC_MILLISEC"
        }
    }
};
