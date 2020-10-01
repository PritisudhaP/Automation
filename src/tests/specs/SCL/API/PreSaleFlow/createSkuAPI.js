const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
var moment = require('moment');
var NowMoment = moment();
var value =NowMoment.format('YYMMDDHHmmss');
var productId = "aa8fb8424e25d"+"ca"+value+"c12de8e";

describe("Create product and sku through API", function () {


    it("create sku and product", done =>{

        var options = {
            method: 'POST',
            url: 'https://project4-qa.enspirecommerce.com/api/v1/skus',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body:{

            "refName": prodName,
            "refKey": "",
            "displayName": prodName,
            "current": true,
            "keywords": [
                prodName
        ],
            "tags": [],

            "uiactions": [
            "Delete",
            "AddIssue",
            "Create",
            "Internal",
            "UI-View",
            "List",
            "Update",
            "View",
            "Reconcile"
        ],
            "forced": false,
            "objRef": false,
            "doNotAudit": false,
            "logicallyDeleted": false,
            "create": false,
            "dynAttributes": {},
            "internal": false,
            "referenceData": [],
            "attributeSet": {
            "attributes": {}
        },
            "galleryImageRefs": [],
            "galleryImageUrls": [],
            "id": prodID,
            "title": prodName,
            "localeTitles": {},
            "productIdentifier": prodName,
            "productIdentifierType": "SKU",
            "retailPrice": 0,
            "listPrice": 0,
            "unitPrice": 0,
            "currency": "USD",
            "ecomExclusive": false,
            "retailExclusive": false,
            "airShipEligible": false,
            "shippable": false,
            "expediteable": false,
            "deliveryAllowed": false,
            "pickable": false,
            "returnable": false,
            "breakable": false,
            "exportable": false,
            "canGift": false,
            "giftWrapEligible": false,
            "taxable": false,
            "backorderable": false,
            "preorderable": false,
            "overSize": false,
            "overWeight": false,
            "giftcard": false,
            "donation": false,
            "bundle": false,
            "localeLongDescriptions": {},
            "catalogCategoryReferences": {
            "1e1907fd-aeab-4f09-a95c-f97dfabfbb68": [
                {
                    "catalogId": "1e1907fd-aeab-4f09-a95c-f97dfabfbb68",
                    "catalogRefName": "thkcatalog",
                    "categoryRefName": "GENERAL",
                    "price": 0,
                    "compareToPrice": 0
                }
            ]
        },
            "complementaryProductRefs": [],
            "alternativeProductRefs": [],
            "kitComponents": [],
            "service": false,
            "sellable": true,
            "purchasable": true,
            "shipAlone": false,
            "shipmentRequestAlone": false,
            "shelfLifeRequired": false,
            "active": true,
            "nonInventoryItem": false,
            "localeDescriptions": {},
            "msrp": 0,
            "height": 0,
            "width": 0,
            "length": 0,
            "weight": 0,
            "dimensionalWeight": 0,
            "packagingUOM": "EACH",
            "uomConversions": [],
            "vendors": [],
            "references": [],
            "skuGroups": [],
            "variantAttributes": [],
            "organizationReference": {
            "refName": "TheHonestKitchen-Organization-",
                "refKey": "aa8fb8424e25d2524c4728c12de8e",
                "displayName": "TheHonestKitchen-Organization-",
                "dataDomain": "com.thk",
                "type": "com.eis.core.api.v1.model.Organization",
                "nullable": false,
                "internal": false,
                "parentId": prodID,
                "parentType": "com.eis.ssit.api.v1.model.Product"
        },
            "hazardousMaterial": false,
            "coveragePlan": false,
            "freeFreight": false,
            "canShipParcel": false,
            "groundShipOnly": false,
            "discontinued": false,
            "bopusIneligible": false,
            "trackInventory": true,
            "skuId": prodName,
            "productRefKey": prodID,
            "attributeSets": {},
            "skuGroupReferences": [],
            "openIssueCount": 0,
            "skuIssues": [],
            "skuState": "Approved",
            "exported": false,
            "lastModified": 1597337830707,
            "skuStateHistory": [
            {
                "toState": "Approved",
                "timestamp": 1597337847083,
                "actor": "System"
            }
        ],
            "skuGroupTitles": [],
            "uomBase": false,
            "presales": [ ],
            "presale": false,
            "dropShipProduct": false,
            "dataDomains": [
            "com.thk"
        ],
            "isDropShipProduct": false

            }
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                console.log("sku details ",body);
                global.skuName = body.refName;
                console.log("sku Name is", skuName);

                done();

            });



    });



});
