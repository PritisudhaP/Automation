db.correlation.update(
    {"displayName": "shipmentRequestTableConfig”},
{
    $set: {
        value: {
            "status" : {
                "order" : 6.0,
                    "visible" : true
            },
            "pickTicketPrintCount" : {
                "order" : 5.0,
                    "visible" : true
            },
            "fromOrganization" : {
                "order" : 7.0,
                    "visible" : true
            },
            "pickupWindowStartTime" : {
                "order" : 8.0,
                    "visible" : false
            },
            "siteRefName" : {
                "order" : 9.0,
                    "visible" : true
            },
            "createDate" : {
                "order" : 10.0,
                    "visible" : true
            },
            "originalOrderNumber" : {
                "order" : 11.0,
                    "visible" : true
            },
            "shipmentRequestNumber" : {
                "order" : 13.0,
                    "visible" : true
            },
            "orderSubType" : {
                "order" : 12.0,
                    "visible" : true
            },
            "reship" : {
                "order" : 14.0,
                    "visible" : true
            },
            "refName" : {
                "order" : 15.0,
                    "visible" : true
            },
            "customer" : {
                "order" : 16.0,
                    "visible" : true
            },
            "totalItemsSold" : {
                "order" : 17.0,
                    "visible" : true
            },
            "numItems" : {
                "order" : 18.0,
                    "visible" : true
            },
            "fulfillmentType" : {
                "order" : 19.0,
                    "visible" : true
            },
            "carrier" : {
                "order" : 20.0,
                    "visible" : true
            },
            "carrierServiceType" : {
                "order" : 21.0,
                    "visible" : true
            },
            "totalAmountDue" : {
                "order" : 22.0,
                    "visible" : true
            },
            "releaseDate" : {
                "order" : 23.0,
                    "visible" : true
            }
        }
    }
}
);
