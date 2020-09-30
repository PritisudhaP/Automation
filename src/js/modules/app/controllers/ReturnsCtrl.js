(function() {
    angular.module('app')
        .controller('ReturnsCtrl', ['$rootScope', '$scope', '$http', '$httpParamSerializer','growl', '$enApi', '$filter', function($rootScope, $scope, $http, $httpParamSerializer,growl, $enApi, $filter) {
            $scope.today = Date.now();
            $scope.returnBy = Date.now();
            //$scope.returnBy.setDate($scope.returnBy.getDate() + 30);
            $scope.filteredChannelObjects = [];
            $scope.channelFilterString = "";
            $scope.setHours = function(item) {
                var formattedDate = new Date(item);
                formattedDate.setHours(0, 0, 0, 0);
                return Date.parse(formattedDate);
            };

            /**
             * @function buildChannelFilterString
             * @description builds a filter string of channels for the filteredChannels derived from
             a ReturnChannels correlation
             * @param none
             */
            $scope.buildChannelFilterString = function() {
                if ($scope.filteredChannels.data.value && $scope.filteredChannels.data.value.length > 0) {

                    $scope.channelFilterString = "&&(";
                    for (var i = 0; i < $scope.filteredChannels.data.value.length; i++) {
                        var channelName = $scope.filteredChannels.data.value[i];
                        $scope.channelFilterString = $scope.channelFilterString + "header.salesChannel:" + channelName + "||";
                    }

                    $scope.channelFilterString = $scope.channelFilterString.substring(0, $scope.channelFilterString.length - 2);
                    $scope.channelFilterString = $scope.channelFilterString + ")";
                } else {
                    $scope.channelFilterString = "";
                }

            };
            
            $scope.filterEligibleSalesOrders = function() {
            	
            	var eligibleOrders = [];
            	for(var x = 0; x < $scope.customerSales.data.length; x++) {	
	            	var order = $scope.customerSales.data[x];
	            	for (var i = 0; i < order.lineItems.length; i++) {
	            		var line = order.lineItems[i];
	            		var returnableCount = line.shippedQty - line.returnedQty;
	            		if(returnableCount > 0) {
	            			eligibleOrders.push(order);
	            			break;
	            		}
	            	}
	            }
            	
            	$scope.customerSales.data = eligibleOrders;
            	$scope.customerSales.data.length = eligibleOrders.length;
            	
        	};
            
           
            $scope.updateExpectedReceipts = function(item, note) {

                if (!item.notes) {
                    item.notes = [];
                }
                item.notes.push(note);
                item.status = 'CANCELED';

                var expectedReceipt = $enApi.object({
                    name: 'expectedReceipt',
                    path: '/api/v1/expectedReceipt/id/' + item.id,
                    data: item,
                    method: 'get',
                    trigger: false,
                    config: {
                        'showGrowl403': true
                    },
                    onPut: function() {
                        $scope.expectedReceipts.refresh();
                    },
                    onError: function() {}
                });
                expectedReceipt.put();
            };

            /**
             * addReference() adds reference object to shipments view
             *
             * @param  reference current reference being built
             */
            $scope.addReference = function(item) {
                if (angular.isDefined(item)) {
                    item.systemInd = 'N';
                    $scope.expectedReceipt.data.referenceData.push(item);
                    if ($scope.expectedReceiptAction !== 'new') {
                        $scope.expectedReceipt.put();
                    }
                }
            };

            /**
             * removeArrayItem() remove reference object from shipments view
             *
             * @param  idx index of array
             */
            $scope.removeReference = function(idx) {
                if (angular.isDefined(idx)) {
                    $scope.expectedReceipt.data.referenceData.splice(idx, 1);
                    if ($scope.expectedReceiptAction !== 'new') {
                        $scope.expectedReceipt.put();
                    }
                }
            };


            /**
             * @function getFilteredChannelObjects()
             * @description builds a list of channels for the filteredChannels derived from
             a ReturnChannels correlation
             * @param none
             */
            $scope.getFilteredChannelObjects = function() {
                for (var i = 0; i < $scope.filteredChannels.data.value.length; i++) {
                    var channel = $scope.filteredChannels.data.value[i];
                    $scope.selectedChannelByRefname.path = '/api/v1/channel/' + channel;
                    $scope.selectedChannelByRefname.get().then(function() {
                        $scope.filteredChannelObjects.push($scope.selectedChannelByRefname.data);
                    });
                }
            };

            /**
             * @function addCustomer()
             * @description adds existing customer as buyer
             * @param selected contact object
             */
            $scope.addCustomer = function(selected) {
                if (angular.isDefined(selected)) {
                    var returnModel = $scope.return.data;

                    returnModel.customer = selected;
                    $scope.customer.path = '/api/v1/customer/id/' + selected.id;
                    $scope.customer.get().then(function() {
                        $scope.customerSelected = true;
                        if ($scope.return.data.rmaType === 'ORDER_BASED') {
                            $scope.getStats();
                        }

                    });
                }
            };
            /**
             * @function selectCustomer()
             * @description adds existing customer as buyer
             * @param selected contact object
             */
            $scope.selectCustomer = function(selected) {
                if (angular.isDefined(selected)) {
                    var returnModel = $scope.return.data;

                    returnModel.customer = selected[0];
                    $scope.customer.path = '/api/v1/customer/id/' + selected[0].id;
                    $scope.customer.get().then(function() {
                        $scope.customerSelected = true;
                        if ($scope.return.data.rmaType === 'ORDER_BASED') {
                            $scope.getStats();
                        }
                        //if ($scope.filterAddresses($scope.customer.data.contacts, ['billto']).length === 0) {
                        //    $scope.salesOrder.data.header.billToContactInfo = $scope.salesOrder.data.header.buyerContactInfo;
                        //}
                    });

                }
            };

            $scope.filterDomains = function() {
                $scope.domains = {};
                if (angular.isDefined($scope.orgs.data)) {
                    angular.forEach($scope.orgs.data, function(org) {
                        $scope.domains[org.dataDomains[0]] = org.dataDomains[0];
                    });
                }
            };
            $scope.setNumber = function() {
                $scope.return.data.rmaNumber = $scope.nextNumber.data;
                $scope.return.data.refName = $scope.nextNumber.data;
                if (angular.isDefined($scope.return.data.refName)) {
                    $scope.return.post();
                }

            };
            $scope.getNumber = function() {
                $scope.rmaNumber = $http({
                    'method': 'GET',
                    'url': '/api/v1/businessNumberGenerator/rmaNumber?prefix=RMA&length=10',
                    responseType: 'text',
                    transformResponse: [function(data) {
                        return data;
                    }]
                }).then(function(data) {
                    $scope.return.data.rmaNumber = data.data;
                    $scope.return.data.refName = data.data;
                    if (angular.isDefined($scope.return.data.refName)) {
                        $scope.return.post();
                    }
                });
            };
            $scope.applyLocation = function() {
                for (var i = 0; i < $scope.return.data.items.length; i++) {
                    $scope.return.data.items[i].returnLocation = $scope.return.data.returnLocation;
                }
            };
            
            $scope.getSalesOrderLineData = function(salesOrder, lineItemNumber) {
            	var lineItem = {};
            	for(var x = 0; x < salesOrder.lineItems.length; x++) {
            		lineItem = salesOrder.lineItems[x];
            		if(lineItemNumber === lineItem.omsLineNumber) {
            			break;	
            		}
            	}	
            	
            	return lineItem; 
            }

            /**
             * @function addProduct()
             * @description Adds product to lineItems array
             * @param selected product object
             */
            $scope.addProduct = function(selected, catalogId) {
                if (!angular.isDefined($scope.creditAmount)) {
                    $scope.creditAmount = 0;
                }

                if (angular.isDefined(selected)) {
                    var lngSelected = selected.length;
                    var amountIncreased = 0;
                    for (var i = 0; i < lngSelected; i++) {
                        var item = selected[i];
                        //if (!angular.isDefined(item.tax)) {
                        //    item.tax.lineTax = 0;
                        //}
                        if (item.orderQty > 0) {
                            var obj = {
                                "authorizingUserId": $scope.return.data.authorizingUserId,
                                "sKUReference": {
                                    refName: item.refName,
                                    //displayName: item.displayName,
                                    dataDomains: item.dataDomains,
                                    //catalogCategoryReferences: item.catalogCategoryReferences,
                                    productIdentifier: item.productIdentifier,
                                    retailPrice: item.retailPrice
                                },
                                "qty": item.orderQty,
                                "creditAmount": item.retailPrice * item.orderQty,
                                "creditTaxAmount": 0, //TODO: change to tax amount on product
                                "creditCurrency": 'USD',
                                "returnLocation": $scope.return.data.returnLocation,
                                "transactionDate": $scope.return.data.transactionDate,
                                "itemDescription": item.displayName
                            };

                            amountIncreased += (item.orderQty * item.retailPrice); //TODO: add tax calc here

                            $scope.return.data.items.push(obj);
                        }
                    }
                    $scope.creditAmount += amountIncreased;
                } else {
                    growl.error('No items were selected')
                }
            };
            /**
             * @function addSelectedItems()
             * @description Adds product to lineItems array
             * @param selected product object
             */
            $scope.addSelectedItems = function(selected, order) {
                if (!angular.isDefined($scope.creditAmount)) {
                    $scope.creditAmount = 0;
                }

                if (angular.isDefined(selected)) {
                    var lngSelected = selected.length;
                    var amountIncreased = 0;
                    if (!angular.isDefined($scope.return.data.items)) {
                        $scope.return.data.items = [];
                    }
                    var skus = [];
                    for (var i = 0; i < lngSelected; i++) {
                        var item = selected[i];
                        skus.push(item.systemCatalogProductIdentifier);
                    }

                    $http({
                        'method': 'GET',
                        'url': '/api/v1/skus?filter=skuId:'+encodeURIComponent('^['+skus+']'),
                        'showGrowlError': false
                    }).success(function(data) {
                        var skuMap = {};
                        for(var x = 0; x < data.items.length; x++) {
                            var sku = data.items[x];
                            skuMap[sku.skuId] = sku;
                        }
                        for (var i = 0; i < lngSelected; i++) {
                            var item = selected[i];
                            if (!angular.isDefined(item.tax)) {
                                item.tax = {
                                    lineTax: 0
                                };
                            }

                            if (item.shippedQty > 0) {
                                var skuObj = skuMap[item.systemCatalogProductIdentifier];
                                var obj = {
                                    "authorizingUserId": $rootScope.authUser.data.refName,
                                    "sKUReference": {
                                        refName: skuObj.refName,
                                        //displayName: item.displayName,
                                        dataDomains: skuObj.dataDomains,
                                        //catalogCategoryReferences: item.catalogCategoryReferences,
                                        productIdentifier: skuObj.productIdentifier,
                                        skuId: skuObj.skuId,
                                        retailPrice: skuObj.retailPrice
                                    },
                                    salesorder: order,
                                    salesOrderLineNumber: item.omsLineNumber,
                                    "qty": item.shippedQty - item.returnedQty,
                                    //"creditAmount":((item.itemUnitPrice - item.itemUnitDiscount) * (item.shippedQty - item.returnedQty)),
                                    "creditAmount": item.realPrice * (item.shippedQty - item.returnedQty),
                                    "creditTaxAmount": item.tax.lineTax,
                                    "creditCurrency": 'USD',
                                    "returnLocation": $scope.return.data.returnLocation,
                                    "transactionDate": $scope.today,
                                    "itemDescription": item.itemTitle
                                };

                                if (item.realPrice < -99998) {
                                    obj.sKUReference.retailPrice = item.itemUnitPrice;
                                    obj.creditAmount = ((item.itemUnitPrice - item.itemUnitDiscount) * (item.shippedQty - item.returnedQty));
                                    $scope.priceAltered = true;
                                }
                                amountIncreased += ((obj.sKUReference.retailPrice * obj.qty) + (obj.creditTaxAmount * obj.qty));


                                $scope.return.data.items.push(obj);
                            }
                        }
                        
                        $scope.creditAmount += amountIncreased;
                		$scope.return.data.channel = $filter('filter')($scope.channels.data, {refName: order.header.salesChannel})[0];
                });

                
        } else {
            growl.error('No items were selected')
        }
};


/**
 * @function addAggregateItems()
 * @description Adds product to lineItems array
 * @param selected product object
 */
$scope.addAggregateItems = function(selected) {
    if (!angular.isDefined($scope.creditAmount)) {
        $scope.creditAmount = 0;
    }

    if (angular.isDefined(selected)) {
        var lngSelected = selected.length;
        var amountIncreased = 0;
        if ($scope.action === 'new') {
            $scope.return.data.items = [];
        }
        for (var i = 0; i < lngSelected; i++) {
            var item = selected[i];

            if (!angular.isDefined(item['lineItems.tax.lineTax'])) {
                item['lineItems.tax.lineTax'] = 0;
            }
            if (item['lineItems.shippedQty_SUM'] > 0) {

                var order = $enApi.object({
                    'method': 'get',
                    'name': 'so',
                    'path': '/api/v1/salesOrder/id/' + item['id'],
                    onGet: function() {
                        var obj = {
                            "authorizingUserId": $rootScope.authUser.data.refName,
                            "sKUReference": {
                                refName: item['lineItems.systemCatalogProductIdentifier'],
                                dataDomains: $rootScope.authUser.data.dataDomains,
                                //catalogCategoryReferences: item.catalogCategoryReferences,
                                productIdentifier: item['lineItems.systemCatalogProductIdentifier'],
                                retailPrice: item['lineItems.realPrice']
                            },
                            salesorder: order.data,
                            salesOrderLineNumber: item['lineItems.omsLineNumber'],
                            "qty": item['lineItems.shippedQty_SUM'],
                            "creditAmount": (item['lineItems.realPrice'] * item['lineItems.shippedQty_SUM']),
                            "creditTaxAmount": item['lineItems.tax.lineTax'],
                            "creditCurrency": 'USD',
                            "returnLocation": $scope.return.data.returnLocation,
                            "transactionDate": $scope.today,
                            "itemDescription": item['lineItems.itemTitle']
                        };

                        if (!item['lineItems.realPrice'] || item['lineItems.realPrice'] < -9998) {
                            obj.sKUReference.retailPrice = item['lineItems.itemUnitPrice'];
                            obj.creditAmount = item['lineItems.itemUnitPrice'] * item['lineItems.shippedQty_SUM'];
                            $scope.priceAltered = true;
                        }
                        amountIncreased += ((obj.sKUReference.retailPrice * obj.qty) + (obj.creditTaxAmount * obj.qty));
                        $scope.creditAmount += amountIncreased;

                        if (!angular.isDefined($scope.return.data.items)) {
                            $scope.return.data.items = [];
                        }
                        $scope.return.data.items.push(obj);
                        //$scope.return.data.channel = $filter('filter')($scope.channels.data, {refName: order.data.header.salesChannel})[0];
                    }
                });
                //order.get();
            }
        }
        //$scope.creditAmount += amountIncreased;

    } else {
        growl.error('No items were selected')
    }
};
$scope.calculateTotals = function() {
    if (angular.isDefined($scope.return.data)) {
        if ($scope.return.data.items.length > 0) {
            $scope.creditAmount = 0;
            angular.forEach($scope.return.data.items, function(item) {
                //item.creditAmount = item.qty * item.
                $scope.creditAmount += item.creditAmount;

            });
            $scope.calculateExtraData();
        }
    }
};
$scope.hasOrders = function() {
    if (angular.isDefined($scope.return.data)) {
        if ($scope.return.data.items.length > 0) {
            angular.forEach($scope.return.data.items, function(item) {
                if (angular.isDefined(item.salesorder)) {
                    return true;
                }
            });
        }
    }
    return false;
};
$scope.checkItem = function(item) {
    if (angular.isDefined($scope.return.data.items)) {
        var found = $filter('filter')($scope.return.data.items, {
            'sKUReference.refName': item
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    } else {
        return false;
    }
};
$scope.getTheRest = function() {
    if ($scope.return.data.customer) {
        $scope.customer.path = '/api/v1/customer/' + $scope.return.data.customer.refName;
        $scope.customer.params = {
            'dataDomain': $scope.return.data.customer.dataDomains[0]
        };
        $scope.customer.get();
    }
    $scope.calculateTotals();
    if ($scope.return.data.returnMerchandiseAuthorizationStatus !== 'DRAFT') {
        $scope.expectedReceipts.path = '/api/v1/expectedReceipt/id/' + $scope.return.data.id + '/expectedReceipts';
        $scope.expectedReceipts.get();
    }
};
$scope.getStats = function() {
    $scope.customerSales.filterMap = {
        'customer.refName': $scope.customer.data.refName + '&&customer.dataDomain:' + $scope.customer.data.dataDomains[0] + '&&(header.status:SHIPPED||header.status:PARTIALLY_SHIPPED||header.status:INVOICED)' + $scope.channelFilterString
    };
    $scope.customerSales.get();
    $scope.productHistory.filterMap = {
        'customer.refName': $scope.customer.data.refName + '&&customer.dataDomain:' + $scope.customer.data.dataDomains[0] + '&&(header.status:SHIPPED||header.status:PARTIALLY_SHIPPED||header.status:INVOICED)' + $scope.channelFilterString
    };
    $scope.productHistory.get();
    $scope.orderCount.filterMap = {
        'customer.refName': $scope.customer.data.refName + '&&customer.dataDomain:' + $scope.customer.data.dataDomains[0] + $scope.channelFilterString
    };
    $scope.orderCount.get();
    $scope.stats.filterMap = {
        'customer.refName': $scope.customer.data.refName + '&&customer.dataDomain:' + $scope.customer.data.dataDomains[0] + $scope.channelFilterString
    };
    $scope.stats.get();
};
$scope.saveItem = function(item) {
    $enApi.object({
        'method': 'put',
        'name': 'item',
        'path': '/api/v1/rma/id/' + item.id,
        onPut: function() {
            $scope.returns.refresh();
            growl.success("Return successfully saved");
            //selected = [];
        }
    });
};
$scope.getUnitCount = function() {
    var units = 0;
    if (angular.isDefined($scope.return.data)) {
        for (var i = 0; i < $scope.return.data.items.length; i++) {
            units += $scope.return.data.items[i].qty;
        }
    }
    return units;
};
$scope.calculateExtraData = function() {
    if (angular.isDefined($scope.return.data)) {
        $scope.serviceTotal = 0;
        $scope.shippingTotal = 0;
        for (var i = 0; i < $scope.return.data.items.length; i++) {
            if (angular.isDefined($scope.return.data.items[i].salesorder)) {
                var so = $scope.return.data.items[i].salesorder;
                var serviceSum = 0;
                var shippingSum = so.header.shippingCharges + so.header.handlingCharges;
                var numItems = so.header.totalItemsSold;
                for (var j = 0; j < so.header.fulfillmentServices.length; j++) {
                    serviceSum += so.header.fulfillmentServices[j].fee;
                }
                var unitServiceSum = serviceSum / numItems;
                var unitShippingSum = shippingSum / numItems;
                $scope.serviceTotal += unitServiceSum * $scope.return.data.items[i].qty;
                $scope.shippingTotal += unitShippingSum * $scope.return.data.items[i].qty;
                var lineServiceSum = 0;
                var lineShippingSum = 0;
                for (var j = 0; j < so.lineItems.length; j++) {
                    if (so.lineItems[j].systemItemId === $scope.return.data.items[i].sKUReference.productIdentifier) {
                        for (var k = 0; k < so.lineItems[j].fulfillmentServices.length; k++) {
                            lineServiceSum += so.lineItems[j].fulfillmentServices[k].fee;
                        }
                        lineShippingSum += so.lineItems[j].handlingCharges + so.lineItems[j].shippingCharges;
                    }
                }
                $scope.serviceTotal += lineServiceSum;
                $scope.shippingTotal += lineShippingSum;
            }
        }
    }
};
$scope.saved = function() {
    growl.success('Return successfully saved');
    $scope.return.get();
};
$scope.returnModel = {
    returnMerchandiseAuthorizationStatus: 'DRAFT'
};

$scope.determineCarrierServices = function() {
    $scope.carriersServices = [];

    var carrier = '';

    if (!angular.isDefined($scope.returnPolicyProfile.data)) {
        $scope.returnPolicyProfile.data = {};
    }
    if (angular.isDefined($scope.returnPolicyProfile.data.defaultCarrier)) {
        carrier = $scope.returnPolicyProfile.data.defaultCarrier;
    }
    $scope.returnPolicyProfile.data.defaultCarrier = carrier;

    $scope.carriers = $scope.availableCarrierAndServices.data.key;
    var services = $scope.availableCarrierAndServices.data.value;

    var carrierIndex = $scope.carriers.indexOf(carrier);
    $scope.carrierServices = services[carrierIndex];

};
$scope.returnSearchCriteria = [{
    "name": "Name",
    "field": "refName",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "RMA Number",
    "field": "rmaNumber",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "Status",
    "field": "returnMerchandiseAuthorizationStatus",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "Authorizing User",
    "field": "authorizingUserId",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "Credit Type",
    "field": "creditType",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "From",
    "field": "shipFromContactInfo.name",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}];
$scope.receiptSearchCriteria = [{
    "name": "Name",
    "field": "refName",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "Receipt Number",
    "field": "expectedReceiptNumber",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "RMA Number",
    "field": "rma.refName",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}, {
    "name": "Status",
    "field": "status",
    "group": "Common",
    "define": {
        "type": "text",
        "args": {
            "list": ["contains", "not contains", "is", "is not", "starts with", "ends with"]
        }
    }
}];

}]);
})();