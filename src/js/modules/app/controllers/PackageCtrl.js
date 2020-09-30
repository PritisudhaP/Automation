myApp.controller('PackageCtrl', [
    '$scope',
    '$rootScope',
    '$cookieStore',
    '$location',
    '$q',
    '$enApi',
    '$enList',
    function ($scope, $rootScope, $cookieStore, $location, $q, $enApi, $enList) {
        var self = this;
        $scope.packageArray = [];
        $scope.signatureType = '';
        $scope.package = {};
        $scope.orders = [];
        $scope.disableLabelGeneration = false;
        $scope.defaultDoNotGenerateLabelsToChecked = false;
        $scope.skipLabelGeneration = false;

        $scope.attributes = $cookieStore.get('attributeSet').attributes;

        function onInit() {
            var ids = $location.search().ids;
            if (angular.isDefined(ids)) {
                ids = ids.split(',');
                var promises = [];
                angular.forEach(ids, function (id) {
                    var promise = $enApi
                        .object({
                            method: 'get',
                            name: 'order',
                            trigger: false,
                            path: '/api/v1/shipmentRequest/id/' + id
                        })
                        .get();
                    promises.push(promise);
                });
                $q.all(promises).then(function (responses) {
                    responses.forEach(function (order, index) {
                        var acceptedLineItems = order.lineItems.filter(function (item) {
                            return item.status !== 'REJECTED';
                        });
                        order.lineItems = acceptedLineItems;

                        order.lineItems.forEach(function (lineItem) {
                            var status = lineItem.status.toLowerCase()
                            if (status === 'open') {
                                lineItem.itemQtyCalc = lineItem.itemQty - lineItem.rejectedQty;
                            } else if (status === 'partially_accepted' || status === 'accepted' || status === 'acknowledged') {
                                lineItem.itemQtyCalc = lineItem.acceptedQty;
                            } else if (status === 'picked') {
                                lineItem.itemQtyCalc = lineItem.pickedQty;
                            }
                            lineItem.originalItemQty = lineItem.itemQtyCalc;
                        });
                        order.lineItemsObject = $enList.object({
                            name: 'lineItems_' + index,
                            data: order.lineItems,
                            limit: 25,
                            onInit: function (obj) { obj.segmentedData = obj.data; },
                            sort: '',
                            q: ''
                        });
                        if (order.header.status === 'SHIPMENT_CREATED') {
                            order.lineItemsObject.setData([]);
                        }

                        order.enableDisableIncludeInPkgBtn = true;
                        order.enableDisableRejectRemaining = true;


                        order.packageLineItemsObject = $enList.object({
                            name: 'packageLineItems_' + index,
                            data: [],
                            limit: 25,
                            onInit: undefined,
                            sort: '',
                            q: ''
                        });

                        order.label = $enApi.object({
                            method: 'post',
                            path: '/api/v1/shipment/printAllDocs/' + order.shipmentId,
                            name: 'label_' + index,
                            trigger: false,
                            onBeforePost: function () {
                                order.loading = true;
                                order.label.path = '/api/v1/shipment/printAllDocs/' + order.shipmentId;
                            },
                            onError: function (data) {
                                order.loading = false;
                            },
                            onPost: function (data) {
                                order.loading = false;
                                $scope.showModal('/fulfillment/requests/view-slip', {
                                    'items': data
                                });
                                // $scope.showModal('fulfillment/package-manager/generate-Label', order.label.data.packages);
                            }
                        });

                        order.completeFulfillment = $enApi.object({
                            method: 'post',
                            path: '/api/v1/shipment/completeFulfillment?generateLabel=true',
                            name: 'completeFulfillment',
                            trigger: false,
                            onBeforePost: function () {
                                order.loading = true;
                            },
                            onError: function (data) {
                                order.loading = false;
                            },
                            onPost: function (data) {
                                order.loading = false;
                                order.enableShowAllDocs = true;
                                order.header.status = 'SHIPMENT_CREATED';
                                order.shipmentId = data.id
                                order.showRemovePackageBtn = false;
                                order.lineItems = [];
                                order.lineItemsObject.setData([]);
                            }
                        });

                        order.packageArray = [];
                        order.package = {};
                        order.showRemovePackageBtn = true;
                        order.loading = false;
                        $scope.orders.push(order);

                        $scope.$watch(function () {
                            return order.lineItemsObject.data;
                        }, function (newData, oldData) {

                            order.lineItemsObject.segmentedData = newData;

                            if (!order.lineItemsObject.selected || order.lineItemsObject.selected.length === 0 ) {
                                return;
                            }

                            for (var i = 0; i < order.lineItemsObject.selected.length; i++) {
                                for(var j = 0; newData.length; j++) {
                                    if (order.lineItemsObject.selected[i].poItemId === newData[j].poItemId) {
                                        order.lineItemsObject.selected[i] = newData[j];
                                        break;
                                    }
                                }
                            }

                        }, true);

                        $scope.$watch(function () {
                            return order.lineItemsObject.selected
                        }, function (newVal, oldVal) {
                            if (newVal !== oldVal) {
                                self.enableDisableIncludeInPkgBtn(newVal, order);
                                self.enableDisableRejectRemaining(newVal, order);
                            }
                        }, true)
                    });
                    $scope.loading = false;
                });
            }
        };

        this.completeFulfillmentCb = function (order) {
            if (order.lineItems.length) {
                $scope.showModal('fulfillment/package-manager/store-portal/acknowledge-shipment', {
                    acknowledgeShipment: function (cancel) {
                        cancel();
                        self.finalShipment(order, 'completeFulfillment');
                        order.completeFulfillment.post();
                    }
                });
            } else {
                self.finalShipment(order, 'completeFulfillment');
                order.completeFulfillment.post();
            }
        };




        this.enableDisableIncludeInPkgBtn = function (selectedLineItems, order) {

            var filteredItems = selectedLineItems.filter(function (item) {
                return item.itemQtyPicked > 0;
            });

            order.enableDisableIncludeInPkgBtn = !(selectedLineItems.length > 0 && filteredItems.length === selectedLineItems.length);
        };

        this.enableDisableRejectRemaining = function (selectedLineItems, order) {

            if (selectedLineItems.length) {
                if ($rootScope.$hasPermission('StorePortal:AcceptPartial')) {
                    var filteredItems = selectedLineItems.filter(function (item) {
                        return item.itemQtyPicked === 0;
                    });

                    order.enableDisableRejectRemaining = !(selectedLineItems.length > 0 && filteredItems.length === selectedLineItems.length);
                } else {

                    if (selectedLineItems.length !== order.lineItems.length) {
                        order.enableDisableRejectRemaining = true;
                    } else {

                        if ((order.packageLineItemsObject.data && order.packageLineItemsObject.data.length === 0) && (order.packageArray && order.packageArray.length === 0)) {
                            for (var i = 0; i < order.lineItems.length; i++) {
                                var currentLineItem = order.lineItems[i];
                                if (currentLineItem.itemQtyPicked) {
                                    order.enableDisableRejectRemaining = true;
                                    return;
                                }
                            }
                        } else {
                            order.enableDisableRejectRemaining = true;
                            return;
                        }
                        order.enableDisableRejectRemaining = false;
                    }
                }
            } else {
                order.enableDisableRejectRemaining = true;
            }
        };

        function doesSkuExist(sku, list) {
            return list.some(function (item) {
                return item.systemItemId === sku;
            });
        }

        function getLineItemWithSku(sku, list, obj) {
            var idx = -1;
            var lineItem = list.filter(function (item, index) {
                if (idx == -1) {
                    idx = item.systemItemId === sku ? index : -1;
                }

                return item.systemItemId === sku;
            });

            if (idx > -1) {
                var lineItemsCopy = angular.copy(list);
                lineItemsCopy.splice(idx, 1);
                obj.setData([]);
                obj.setData(lineItemsCopy);
                idx = -1;
            }

            return lineItem && lineItem.length ? lineItem[0] : {};
        }

        function removeLineItem(line, obj) {
            var idx;
            obj.data.some(function (item, index) {
                if (item.systemItemId === line.systemItemId) {
                    idx = index;
                    return true;
                }
                return false;
            });

            if (idx > -1) {
                var lineItemsCopy = angular.copy(obj.data);
                lineItemsCopy.splice(idx, 1);
                obj.setData([]);
                obj.setData(lineItemsCopy);
                idx = -1;
            }
        }

        function updateObjectData(row, obj) {
            var concat = [].concat(obj.data, [row]);
            obj.setData([]);
            obj.setData(concat);
        }


        this.checkAccountPreferences = function(accountPreferences) {
            if (accountPreferences && accountPreferences.items.length > 0) {
             	accountPreferences.items.forEach(function (accountPreference) {
                   	if(accountPreference.dynAttributes &&  accountPreference.dynAttributes !== null) {
                   		if(accountPreference.dynAttributes['disableLabelGeneration'] &&
                   			accountPreference.dynAttributes['disableLabelGeneration'] !== null &&
                   		     accountPreference.dynAttributes['disableLabelGeneration'].value === 'Y') {
                   			 	$scope.disableLabelGeneration = true;
                   		}
                   	}

                   	if(accountPreference.dynAttributes &&  accountPreference.dynAttributes !== null) {
                   		if(accountPreference.dynAttributes['defaultDoNotGenerateLabelsToChecked'] &&
                   			accountPreference.dynAttributes['defaultDoNotGenerateLabelsToChecked'] !== null &&
                   		     accountPreference.dynAttributes['defaultDoNotGenerateLabelsToChecked'].value === 'Y') {
                   			 	$scope.defaultDoNotGenerateLabelsToChecked = true;
                   			 	$scope.skipLabelGeneration = true;
                   		}

                   	}
                });
            }
        };



        this.handleTab = function (event, order, sku) {
            if (event.keyCode === 9) {
                event.preventDefault();
                var itemIndexToRemove = -1;
                order.lineItems.some(function (line, index) {
                    if (line.systemItemId === sku) {
                        var cloneLine = angular.copy(line);
                        cloneLine.itemQtyCalc = 1;
                        if (line.itemQtyCalc === 1) {
                            itemIndexToRemove = index;
                            if (!doesSkuExist(sku, order.packageLineItemsObject.data)) {
                                updateObjectData(cloneLine, order.packageLineItemsObject);
                            } else {
                                var lineItem = getLineItemWithSku(sku, order.packageLineItemsObject.data, order.packageLineItemsObject);
                                lineItem.itemQtyCalc = lineItem.itemQtyCalc + 1;
                                updateObjectData(lineItem, order.packageLineItemsObject);
                            }
                        } else if (line.itemQtyCalc > 1) {
                            if (!doesSkuExist(sku, order.packageLineItemsObject.data)) {
                                updateObjectData(cloneLine, order.packageLineItemsObject);
                            } else {
                                var lineItem = getLineItemWithSku(sku, order.packageLineItemsObject.data, order.packageLineItemsObject);
                                lineItem.itemQtyCalc = lineItem.itemQtyCalc + 1;
                                updateObjectData(lineItem, order.packageLineItemsObject);
                            }

                        }

                        if (line.itemQtyCalc === 0) {
                            var cloneLine = angular.copy(line);
                            cloneLine.itemQtyCalc = line.itemQty;

                            if (!doesSkuExist(sku, order.packageLineItemsObject.data)) {
                                updateObjectData(cloneLine, order.packageLineItemsObject);
                            } else {
                                var lineItem = getLineItemWithSku(sku, order.packageLineItemsObject.data, order.packageLineItemsObject);
                                lineItem.itemQtyCalc = line.itemQty;
                                updateObjectData(lineItem, order.packageLineItemsObject);
                            }
                        } else {
                            line.itemQtyCalc = line.itemQtyCalc - 1;
                            line.originalItemQty = line.itemQtyCalc;
                        }

                        removeLineItem(line, order.lineItemsObject);

                        if (line.itemQtyCalc > 0) {
                            updateObjectData(line, order.lineItemsObject);
                        }
                        order.lineItems = order.lineItemsObject.data;
                        return true;
                    }
                    return false;
                });

                order.sku = '';
            }
        };

        function addPackage(lineItems, currentPackage) {
            var costOfItems = [],
                itemsInPackage = [],
                totalCostOfItems = 0;

            currentPackage.lineItems = angular.copy(lineItems);

            for (var i = 0; i < currentPackage.lineItems.length; i++) {
                if (
                    typeof currentPackage.lineItems[i].cancelledQty !==
                    undefined
                ) {
                    delete currentPackage.lineItems[i].cancelledQty;
                }
            }

            for (var i = 0; i < lineItems.length; i++) {
                var lineItem = lineItems[i];

                var costOfItem =
                    lineItem.qtyInPackageDefault * lineItem.itemUnitPrice;
                costOfItems.push(costOfItem);

                if (lineItem.qtyInPackageDefault > 0) {
                    itemsInPackage.push(angular.copy(lineItem));
                }
                lineItem.qtyInPackages += lineItem.qtyInPackageDefault;
                lineItem.qtyInPackageDefault = 0;
                // As we are going through the lines lets see should we keep the add package button enabled or disabled:JS
                if (lineItem.qtyInPackageDefault === lineItem.itemQty) {
                    $scope.enablePackage = false;
                } else {
                    $scope.enablePackage = true;
                }
            }

            if (costOfItems.length > 0) {
                for (var x = 0; x < costOfItems.length; x++) {
                    totalCostOfItems += costOfItems[x];
                }
                currentPackage.packageTotalValue = totalCostOfItems;
            }
            currentPackage.id =
                currentPackage.packageType +
                Math.floor(Math.random() * 100000 + 1);

            var packageItem = angular.copy(currentPackage);
            if (itemsInPackage.length > 0) {
                packageItem.itemsInPackage = itemsInPackage;
            }

            return packageItem;
        }

        /**
	     * isPackagingValid() validating package size and weight.
	     *
	     */
	    this.isPackagingValid = function(currentPackage){
        	if(this.isPackagingValidForService(currentPackage) && this.isPackagingValidForBoxType(currentPackage)) {
        		return true;
        	} else {
        		return false;
        	}
    	}

        /**
	     * isPackagingValidForService() validating package size and weight.
	     *
	     */
	    this.isPackagingValidForService = function(currentPackage){
	    	if($scope.shipmentRequest && $scope.shipmentRequest.data && $scope.shipmentRequest.data.header && $scope.shipmentRequest.data.header.carrierServiceType) {
		    	var serviceType = $scope.shipmentRequest.data.header.carrierServiceType;
		        var correlation = $scope.servicePackageSizeRestrictions.data;
		        var valid = true;
		        var length, height, width, girth, weight;
		        if(correlation !== undefined && correlation !== null && correlation.refName !== undefined && correlation.refName !== null && serviceType!== undefined && serviceType !== null) {
		            var keyIndex = correlation.key.indexOf(serviceType);

		            if(keyIndex !== -1) {
			            var value = correlation.value[keyIndex];
			            if(value !== undefined && value !== null) {
				            length= value.length;
		                    girth= value.girth;
		                    weight= value.weight;
		                    height = value.height;
		                    width = value.width;
		                    if(value.validationFunction !== undefined && value.validationFunction !== null && value.validationFunction !== '') {
		                    	var validationFunction = new Function("return " + value.validationFunction)();
		                    	valid = validationFunction(length, width, height, girth, weight,currentPackage);
		                    } else {
				            	valid = this.validatePackageAgainstForService(length, width, height, girth, weight,currentPackage);
				            }
			            } else {
			               valid = true;
			            }
			        } else {
			        	valid = true;
			        }
		        }
		    } else {
		    	valid = true;
		    }
	        this.packageError = valid===true?'':'The dimensions and/or weight entered for the box type are not valid. Enter allowed weight and dimension for the package.';
	        return valid;
	    };


	    /**
	     * isPackagingValidForService() validating package size and weight.
	     *
	     */
	    this.isPackagingValidForBoxType = function(currentPackage){
	    	if($scope.shipmentRequest && $scope.shipmentRequest.data && $scope.shipmentRequest.data.header && $scope.shipmentRequest.data.header.carrierServiceType) {
		    	var serviceType = $scope.shipmentRequest.data.header.carrierServiceType;
		        var correlation = $scope.boxTypePackageSizeRestrictions.data;
		        var valid = true;
		        var length, height, width, girth, weight;
		        if(correlation !== undefined && correlation !== null && correlation.refName !== undefined && correlation.refName !== null && serviceType!== undefined && serviceType !== null) {
		            var keyIndex = correlation.key.indexOf(serviceType);

		            if(keyIndex !== -1) {
			            var value = correlation.value[keyIndex];
			            if(value !== undefined && value !== null) {
				            length= value.length;
		                    girth= value.girth;
		                    weight= value.weight;
		                    height = value.height;
		                    width = value.width;
		                    if(value.validationFunction !== undefined && value.validationFunction !== null && value.validationFunction !== '') {
		                    	var validationFunction = new Function("return " + value.validationFunction)();
		                    	valid = validationFunction(length, width, height, girth, weight,currentPackage);
		                    } else {
				            	valid = this.validatePackageAgainstForBoxType (length, width, height, girth, weight,currentPackage);
				            }
			            } else {
			               valid = true;
			            }
			        } else {
			        	valid = true;
			        }
		        }
		    } else {
		    	valid = true;
		    }
	        this.packageError = valid===true?'':'The dimensions and/or weight entered for the box type are not valid. Enter allowed weight and dimension for the package.';
	        return valid;
	    };



	    /**
     	 *
         *
         */
		    this.validatePackageAgainstForService = function(length, width, height, girth, weight, currentPackage){
		        var currentPackageGirth = (parseInt(currentPackage.length)+(2*parseInt(currentPackage.width))+(2*parseInt(currentPackage.height)));
		        console.log(currentPackageGirth);
		          if(currentPackage.length<= parseInt(length) && currentPackage.weight<=parseInt(weight) && currentPackageGirth<=parseInt(girth))
		          {
		              return true;
		          }
		          return false;
		    };

		/**
     	 *
         *
         */
		    this.validatePackageAgainstForBoxType= function(length, width, height, girth, weight, currentPackage){
		        var currentPackageGirth = (parseInt(currentPackage.length)+(2*parseInt(currentPackage.width))+(2*parseInt(currentPackage.height)));
		        console.log(currentPackageGirth);
		          if(currentPackage.length<= parseInt(length) && currentPackage.weight<=parseInt(weight) && currentPackageGirth<=parseInt(girth))
		          {
		              return true;
		          }
		          return false;
		    };



        onInit();

        this.rejectItems = function (order) {
            var shipmentRequest = {
                id: order.id,
                dataDomains: order.dataDomains,
                lineItems: order.lineItemsObject.selected.map(function (item) {
                    return {
                        lineUID: item.lineUID,
                        rejectedQty: item.itemQtyCalc
                    };
                })
            };

            var itemsNotSelected = (function (selected, lineItems) {
                var deSelected = [];

                lineItems.forEach(function (lItem) {
                    var found = false;
                    selected.forEach(function (sItem) {
                        if (sItem.lineUID === lItem.lineUID) {
                            found = true;
                        }
                    });

                    if (!found) {
                        deSelected.push(lItem);
                    }
                });

                return deSelected;
            })(order.lineItemsObject.selected, order.lineItems);

            $enApi.object({
                method: 'put',
                name: 'rejectReq',
                trigger: false,
                path: '/api/v1/shipmentRequest/statusUpdate/rejected?reason=rejectRemaining&code=rejectRemaining',
                data: [shipmentRequest],
                onError: function () {
                },
                onPut: function (data) {
                    order.lineItems = itemsNotSelected;
                    order.lineItemsObject.setData([]);
                    order.lineItemsObject.setData(itemsNotSelected);
                    order.header.status = data[0].header.status;
                    order.lineItemsObject.selected.length = 0;
                    self.enableDisableRejectRemaining(order.lineItemsObject.selected, order);
                }
            }).put();
        }

        function addPackageToOrder(lineItems, currentPackage) {
            var costOfItems = [],
                itemsInPackage = [],
                totalCostOfItems = 0;

            currentPackage.lineItems = angular.copy(lineItems);

            for (var i = 0; i < currentPackage.lineItems.length; i++) {
                var lineItem = lineItems[i];
                if (
                    typeof currentPackage.lineItems[i].cancelledQty !==
                    undefined
                ) {
                    delete currentPackage.lineItems[i].cancelledQty;
                }

                var costOfItem =
                    lineItem.itemQty * lineItem.itemUnitPrice;
                costOfItems.push(costOfItem);
            }



            if (costOfItems.length > 0) {
                for (var x = 0; x < costOfItems.length; x++) {
                    totalCostOfItems += costOfItems[x];
                }
                currentPackage.packageTotalValue = totalCostOfItems;
            }
            currentPackage.id =
                currentPackage.packageType +
                Math.floor(Math.random() * 100000 + 1);

            var packageItem = angular.copy(currentPackage);
            if (itemsInPackage.length > 0) {
                packageItem.itemsInPackage = itemsInPackage;
            }

            return packageItem;
        }

        this.addPackageToOrder = function (lineItems, currentPackage, order, form) {
            if (form.$valid && this.isPackagingValid(currentPackage)) {
                var packageItem = addPackageToOrder(lineItems, currentPackage);
                order.packageArray.push(packageItem);
                order.packageLineItemsObject.setData([]);
                this.resetPackingInfo(order, form);
            }
            // TODO: Make an API call to add the packaged data to the DB
        };

        this.resetPackingInfo = function (order, form) {
            order.package.packageType = "";
            order.package.length = "";
            order.package.width = "";
            order.package.height = "";
            form.$setPristine();
            form.$setUntouched();
        };


        this.determineCarrierServices = function () {
            $scope.carriersServices = [];

            var carrier = 'FEDEX';
            if (angular.isDefined($scope.shipmentRequest.data) && angular.isDefined($scope.shipmentRequest.data.header) && angular.isDefined($scope.shipmentRequest.data.header.carrier)) {
                carrier = $scope.shipmentRequest.data.header.carrier;
            } else if (angular.isDefined($rootScope.shippingCarrier)) {
                carrier = $rootScope.shippingCarrier;
            }

            $rootScope.shippingCarrier = carrier;
            if (angular.isDefined($scope.shipmentRequest.data) && angular.isDefined($scope.shipmentRequest.data.header) && angular.isDefined($scope.shipmentRequest.data.header.carrier)) {
            	$scope.shipmentRequest.data.header.carrier = carrier;
            }

            $scope.carriers = $scope.availableCarrierAndServices.data.key;
            var services = $scope.availableCarrierAndServices.data.value;

            var carrierIndex = $scope.carriers.indexOf(carrier);
            $scope.carrierServices = services[carrierIndex];
            if (angular.isDefined($scope.shipmentRequest.data) && angular.isDefined($scope.shipmentRequest.data.header) && angular.isDefined($scope.shipmentRequest.data.header.carrier) && angular.isDefined($scope.packageOptionsCorrelation)) {
            	$scope.packageOptionsCorrelation.get();
            	if(angular.isDefined($scope.siteShippingAccounts)) {
            		$scope.siteShippingAccounts.get();
            	}
            }

        };

        /**
         * addPackage() Adds packages into packageArray
         *
         * @param  lineItems current items going into package
         * @param  package current package being built
         */
        this.addPackage = function (lineItems, currentPackage) {
            if (this.isPackagingValid(currentPackage)) {
	            var packageItem = addPackage(lineItems, currentPackage);
	            $scope.packageArray.push(packageItem);
       		 }
        };

        /**
         * finalShipment() finalizes shipment with included packages
         *
         */
        this.finalShipment = function (order, completeFulfillment) {
            var shipmentRequest;
            if (angular.isUndefined(order)) {
                order = $scope;
                if($scope.shipmentRequest && $scope.shipmentRequest.data) {
                	shipmentRequest = $scope.shipmentRequest;
                } else {
                	shipmentRequest = order.shipmentRequest;
            	}
            } else {
                shipmentRequest = { data: order };
            }

            if (angular.isUndefined(completeFulfillment)) {
                completeFulfillment = 'finalShipment';
            }
            var finalShipmentObject = {};
            var copyOfPackageArray = angular.copy(order.packageArray);

            finalShipmentObject.shipmentRequestId = shipmentRequest.data.id;
            finalShipmentObject.orderId = shipmentRequest.data.header.salesOrderId;
            finalShipmentObject.orderNumber = shipmentRequest.data.header.salesOrderNumber;
            finalShipmentObject.senderContactInfo = shipmentRequest.data.header.fromContactInfo;
            finalShipmentObject.recipientContactInfo = shipmentRequest.data.header.shipToContactInfo;
            finalShipmentObject.billToContactInfo = shipmentRequest.data.header.billToContactInfo;

            if ($scope.selectedShippingAccount) {
                finalShipmentObject.shippingAccount = $scope.selectedShippingAccount;
            }
            
            // do not set to the shipmentRequest request date as
            //finalShipmentObject.shipDate = $scope.shipmentRequest.data.header.createDate;

            finalShipmentObject.refName = 'refName' + Math.floor(Math.random() * 100000 + 1);
            finalShipmentObject.carrier = shipmentRequest.data.header.carrier;
            finalShipmentObject.labelType = 'PNG';
            finalShipmentObject.shipmentRequestNumber = shipmentRequest.data.header.shipmentRequestNumber;
            finalShipmentObject.totalShippingCharges = shipmentRequest.data.header.allocatedLineShippingCharges;

            // delete all the properties which are irrelevant to package line item model
            // Note: Ideally it should have been done at backend
            if (copyOfPackageArray) {
                for (var y = 0; y < copyOfPackageArray.length; y++) {
                    delete copyOfPackageArray[y].packageTotalValue;
                    delete copyOfPackageArray[y].itemsInPackage;
                    delete copyOfPackageArray[y].qtyInPackages;
                    delete copyOfPackageArray[y].jasonValue;

                    for (
                        var x = 0;
                        x < copyOfPackageArray[y].lineItems.length;
                        x++
                    ) {
                        // delete lineTotals
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('lineTotals')) {
                            delete copyOfPackageArray[y].lineItems[x].lineTotals;
                        }

                        // delete priceInfo
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('priceInfo')) {
                            delete copyOfPackageArray[y].lineItems[x].priceInfo;
                        }

                        // delete lineCharges
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('lineCharges')) {
                            delete copyOfPackageArray[y].lineItems[x].lineCharges;
                        }

                        // delete lineDiscounts
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('lineDiscounts')) {
                            delete copyOfPackageArray[y].lineItems[x].lineDiscounts;
                        }

                        // delete lineTaxes
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('lineTaxes')) {
                            delete copyOfPackageArray[y].lineItems[x].lineTaxes;
                        }

                        // delete promos
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('promos')) {
                            delete copyOfPackageArray[y].lineItems[x].promos;
                        }

                        // We have to swap these values to submit and finalize shipment
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'qtyInPackageDefault'
                            )
                        ) {
                            copyOfPackageArray[y].lineItems[x].itemQty =
                                copyOfPackageArray[y].lineItems[
                                    x
                                ].qtyInPackageDefault;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'allocatedLineShippingCharges'
                            )
                        ) {
                            copyOfPackageArray[y].baseCharge =
                                copyOfPackageArray[y].lineItems[
                                    x
                                ].allocatedLineShippingCharges;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'qtyInPackageDefault'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .qtyInPackageDefault;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'pickFromStoreSiteId'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .pickFromStoreSiteId;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'shipmentRequestLineStatusTransitions'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .shipmentRequestLineStatusTransitions;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'shipmentIds'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .shipmentIds;
                        }
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'shippedQty'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .shippedQty;
                        }
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'status'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x].status;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'fulfillmentServices'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .fulfillmentServices;
                        }
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'allocatedLineShippingCharges'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .allocatedLineShippingCharges;
                        }
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'allocatedLineHandlingCharges'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .allocatedLineHandlingCharges;
                        }
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'allocatedLineShippingCosts'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .allocatedLineShippingCosts;
                        }
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'rejectionReason'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .rejectionReason;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'rejectionCode'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .rejectionCode;
                        }

                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'qtyInPackages'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .qtyInPackages;
                        }
                        if (
                            copyOfPackageArray[y].lineItems[x].hasOwnProperty(
                                'rejectedQty'
                            )
                        ) {
                            delete copyOfPackageArray[y].lineItems[x]
                                .rejectedQty;
                        }
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('itemQtyPicked')) {
                            delete copyOfPackageArray[y].lineItems[x].itemQtyPicked;
                        }
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('originalItemQty')) {
                            delete copyOfPackageArray[y].lineItems[x].originalItemQty;
                        }
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('sku')) {
                            delete copyOfPackageArray[y].lineItems[x].sku;
                        }
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('pickedQty')) {
                            delete copyOfPackageArray[y].lineItems[x].pickedQty;
                        }
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('acceptedQty')) {
                            delete copyOfPackageArray[y].lineItems[x].acceptedQty;
                        }
                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('itemQtyCalc')) {
                            copyOfPackageArray[y].lineItems[x].itemQty = copyOfPackageArray[y].lineItems[x].itemQtyCalc;
                            delete copyOfPackageArray[y].lineItems[x].itemQtyCalc;
                        }

                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('shipAlone')) {
                            delete copyOfPackageArray[y].lineItems[x].shipAlone;
                        }

                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('shipComplete')) {
                            delete copyOfPackageArray[y].lineItems[x].shipComplete;
                        }

                        if (copyOfPackageArray[y].lineItems[x].hasOwnProperty('shipFromSingleNode')) {
                            delete copyOfPackageArray[y].lineItems[x].shipFromSingleNode;
                        }
                    }
                }
            }

            finalShipmentObject.packages = copyOfPackageArray;
            finalShipmentObject.carrier = shipmentRequest.data.header.carrier;
            finalShipmentObject.serviceType = shipmentRequest.data.header.carrierServiceType;
            order[completeFulfillment].data = finalShipmentObject;
        };

        /**
         * changePackage() onChange event fired when package type changes
         *
         * @param  packageTypeSelected  type of package selected from drop down
         */
        this.changePackage = function (packageTypeSelected, pkgOptions, order) {
            var packageOptions = angular.copy(pkgOptions);
            if (angular.isUndefined(order)) {
                order = $scope;
            }
            var currentPackage = order.package;
            if (
                packageOptions !== undefined &&
                packageOptions.data !== undefined &&
                packageOptions.data.value !== undefined &&
                packageOptions.data.value.length > 0
            ) {
                var keyIndex = packageOptions.data.key.indexOf(
                    packageTypeSelected
                );

                order.package = packageOptions.data.value[keyIndex];
                order.package.signatureType = currentPackage.signatureType;
                order.package.hazardous = currentPackage.hazardous;
            } else {
                var hazardous = currentPackage.hazardous ? currentPackage.hazardous : null;
                var signatureType = currentPackage.signatureType ? currentPackage.signatureType : null;

                if (packageTypeSelected === 'Box') {
                    order.package = {
                        weight: '2',
                        height: '16',
                        length: '18',
                        width: '18',
                        packageType: 'Box',
                        hazardous: hazardous,
                        signatureType: signatureType
                    };
                } else if (packageTypeSelected === 'SmallExpressBox') {
                    order.package = {
                        weight: '1',
                        height: '6',
                        length: '8',
                        width: '16',
                        packageType: 'SmallExpressBox',
                        hazardous: hazardous,
                        signatureType: signatureType
                    };
                } else if (packageTypeSelected === 'Case') {
                    order.package = {
                        weight: '26',
                        height: '20',
                        length: '22',
                        width: '22',
                        packageType: 'Case',
                        hazardous: hazardous,
                        signatureType: signatureType
                    };
                } else if (packageTypeSelected === 'Pallet') {
                    order.package = {
                        weight: '300',
                        height: '30',
                        length: '48',
                        width: '40',
                        packageType: 'Pallet',
                        hazardous: hazardous,
                        signatureType: signatureType
                    };
                }
            }
        };
        // this.changePackage('Box1');

        /**
         * removePackage() removes created packages from shipment
         *
         * @param  packageTypeSelected  type of package selected from drop down
         */
        this.removePackage = function (item, order) {
            var recalculateLine;
            if (angular.isUndefined(order)) {
                recalculateLine = this.recalculateLine;
                order = $scope;
            } else {
                recalculateLine = this.recalculatePackageManager;
            }
            var packageId = item.id;
            for (var i = 0; i < order.packageArray.length; i++) {
                if (order.packageArray[i].id === packageId) {
                    order.packageArray.splice(i, 1);
                    recalculateLine(item, order);
                    break;
                }
            }
        };

        function updateLineItem(line, lineItems) {
            lineItems.forEach(function (item) {
                if (line.lineUID === item.lineUID) {
                    item.itemQtyCalc = item.itemQtyCalc + line.itemQtyCalc;
                    item.originalItemQty = item.itemQtyCalc;
                }
            });
        }

        function doesItemExist(lineUID, list) {
            return list.some(function (item) {
                return item.lineUID === lineUID;
            });
        }
        this.recalculatePackageManager = function (item, order) {
            var lineItemsClone = angular.copy(order.lineItemsObject.data);
            item.lineItems.forEach(function (line) {
                if (doesItemExist(line.lineUID, lineItemsClone)) {
                    updateLineItem(line, lineItemsClone)
                } else {
                    line.originalItemQty = line.itemQtyCalc;
                    lineItemsClone.push(line);
                }
                line.itemQtyPicked = 0;
            });
            order.lineItems = lineItemsClone;
            order.lineItemsObject.setData([]);
            order.lineItemsObject.setData(lineItemsClone);
        }

        this.recalculateLine = function (item) {
            for (var i = 0; i < item.itemsInPackage.length; i++) {
                var uid = item.itemsInPackage[i].lineUID;
                var subQty = item.itemsInPackage[i].qtyInPackageDefault;
                for (
                    var x = 0;
                    x < $scope.shipmentRequest.data.lineItems.length;
                    x++
                ) {
                    if (
                        uid ===
                        $scope.shipmentRequest.data.lineItems[x].lineUID &&
                        $scope.shipmentRequest.data.lineItems[x].status !==
                        'REJECTED'
                    ) {
                        var test =
                            $scope.shipmentRequest.data.lineItems[x]
                                .qtyInPackages - subQty;
                        $scope.shipmentRequest.data.lineItems[
                            x
                        ].qtyInPackages = test;
                        break;
                    }
                }
            }

            //$scope.lineData.rebuild();
        };

        /**
         * enableButtonAction() enables add package button if values are reasonable
         *
         * @param  inputValue  value entered into qty field manually.
         * @param  associatedValue  qty of the line item.
         */
        this.enableButtonAction = function (inputValue, associatedValue) {
            if (inputValue > associatedValue || inputValue === 0) {
                $scope.enablePackage = true;
            } else {
                $scope.enablePackage = false;
            }
        };

        /**
         * disableFinalize() controls button state for finalize button
         *
         * @param  none
         *
         */
        this.disableFinalize = function (order) {
            if (!$rootScope.$hasPermission('StorePortal:AcceptPartial')) {
                if (order && order.lineItems) {
                    if (order.lineItems.length > 0) {
                        return true;
                    } else {
                        if (order.packageLineItemsObject.data.length > 0) {
                            return true;
                        }
                    }

                    return false;
                }
            }

            if (angular.isUndefined(order)) {
                order = $scope;
            }
            if (order.packageArray.length > 0) {
                return false;
            } else {
                return true;
            }
        };

        this.setSelectedShippingAccount = function (shipAccount) {
            $scope.selectedShippingAccount = shipAccount;
        };

        this.changePackage('Box');

        function getIndex(lineItem, lineItems) {
            var idx = -1;
            lineItems.forEach(function (item, index) {
                if (item.lineUID === lineItem.lineUID) {
                    idx = index;
                }
            });

            return idx;
        }

        this.includeInPkg = function (order) {
            var items = angular.copy(order.lineItemsObject.selected);
            items.forEach(function (item, index) {
                item.itemQtyCalc = item.itemQtyPicked;
                order.lineItemsObject.data[getIndex(item, order.lineItems)].itemQtyPicked = 0;
                order.lineItems[getIndex(item, order.lineItems)].itemQtyPicked = 0;
            });
            var packageLineItems = order.packageLineItemsObject;
            var idSelected = items.map(function (selected) {
                return selected.lineUID;
            });

            // manipulate packageLineItems data
            var clonnedPackageLineItemsData = angular.copy(packageLineItems.data);
            if (clonnedPackageLineItemsData.length === 0) {
                clonnedPackageLineItemsData = clonnedPackageLineItemsData.concat(items);
            } else {
                var clonnedLen = clonnedPackageLineItemsData.length;
                while (clonnedLen--) {
                    var item = clonnedPackageLineItemsData[clonnedLen];
                    if (idSelected.indexOf(item.lineUID) > -1) {
                        item.itemQtyCalc = items[idSelected.indexOf(item.lineUID)].itemQtyCalc + item.itemQtyCalc;
                        items.splice(idSelected.indexOf(item.lineUID), 1);
                    }
                }
                clonnedPackageLineItemsData = clonnedPackageLineItemsData.concat(items);

            }
            packageLineItems.setData([]);
            packageLineItems.setData([].concat(clonnedPackageLineItemsData));

            // empty order.lineItemsObject.selected
            order.lineItemsObject.checkAllModel = false;
            order.lineItemsObject.selected.length = 0;

            var len = order.lineItems.length;
            while (len--) {
                if (idSelected.indexOf(order.lineItems[len].lineUID) >= 0) {
                    if (order.lineItems[len].itemQtyCalc == 0) {
                        order.lineItems.splice(len, 1);
                    } else {
                        order.lineItems[len].originalItemQty = order.lineItems[len].itemQtyCalc;
                    }
                }
            }
            order.lineItemsObject.setData(order.lineItems);
        };

        this.printAllDocs = function (order) {
            order.label.post();
        };
    }
]);
