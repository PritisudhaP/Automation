const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
var moment = require('moment');
var NowMoment = moment();
var value =NowMoment.format('YYMMDDHHmmss');
var productName = "prod" + value;
var productId = "abc2b0aa-"+"10an"+"-46a3-"+"h4b2-" + value;
var prodrefkey = "aa8fb8424e25d"+"ca"+value+"c12de8e";






describe("Create product and sku through API", function () {



    it("create sku and product", done =>{

        var options = {
            method: 'POST',
            url: 'https://project4-qa.enspirecommerce.com/api/v1/product',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body:{
                "refName": productName,
                "refKey": prodrefkey,
                "displayName": productName,
                "current": true,
                "keywords": [],
                "tags": [],
                "auditInfo": {
                    "creationTs": 1597354382784,
                    "createUser": "devi niveditha"
                },
                "uiactions": [
                    "Delete",
                    "Create",
                    "UI-View",
                    "List",
                    "Update",
                    "View"
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
                "id": productId,
                "title": productName,
                "localeTitles": {},
                "productIdentifier": productName,
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
                "catalogCategoryReferences": {},
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
                    "refKey": "aa8fb8424e25d25aae24c4728c12de8e",
                    "displayName": "TheHonestKitchen-Organization-",
                    "dataDomain": "com.thk",
                    "type": "com.eis.core.api.v1.model.Organization",
                    "nullable": false,
                    "internal": false
                },
                "hazardousMaterial": false,
                "coveragePlan": false,
                "freeFreight": false,
                "canShipParcel": false,
                "groundShipOnly": false,
                "discontinued": false,
                "bopusIneligible": false,
                "dropShipProduct": false,
                "dataDomains": [
                    "com.thk",
                    "app.cantata"
                ],
                "isDropShipProduct": false
            }

        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                //console.log("sku details ",body);
                global.prodName = body.refName;
                console.log("product Name is", prodName);
                global.prodID = body.id;
                console.log("product id is ",prodID)

                done();

            });



    });



});
