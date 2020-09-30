myApp.controller('InvoiceSelectShipmentsCtrl', ['$scope', '$enApi', function($scope, $enApi) {

	 $scope.catalogId = '';
     $scope.activeFilters = {
        "Sites"  : {
            name: 'Sites', filters: ['Store #1234', 'DC #12', 'Store #4321']
        }
        ,
        "Type" : {
            name: 'Type', filters: ['Site-to-Site']
        },
        "Status" : {
            name: 'Status', filters: ['Pending']
        }
    };

    $scope.inventoryPools = ['Backroom'];

    /** *
     * @function addShipToModel()
     * @description currently, add shipTo shippingCarrier, serviceType and promiseDate to line item
     * @param {String} modelName - name of input's model
     * @param {String} nameId - nameId of current shipTo
     * @param {Object} selected - nameId assigned to shipTo
     */
    $scope.addShipToModel = function(modelName,  selected) {
        var lineItemsModel = $scope.transferOrder.data.lineItems;
        var lngLineItems = lineItemsModel.length;

        for(var i = 0; i < lngLineItems; i++) {
                lineItemsModel[i][modelName] = selected;
        }
    };

    $scope.determineCarrierServices = function() {
        $scope.determineCarrierServices = function() {
            $scope.carriersServices = [];

            var carrier = 'FEDEX';
            if (angular.isDefined($scope.salesOrder.data.header.shippingCarrier)) {
                carrier = $scope.salesOrder.data.header.shippingCarrier;
            } else if (angular.isDefined($rootScope.shippingCarrier)) {
                carrier = $rootScope.shippingCarrier;
            }

            $rootScope.shippingCarrier = carrier;
            $scope.salesOrder.data.header.shippingCarrier = carrier;

            $scope.carriers =  $scope.availableCarrierAndServices.data.key;
            var services =  $scope.availableCarrierAndServices.data.value;

            var carrierIndex = $scope.carriers.indexOf(carrier);
            $scope.carrierServices = services[carrierIndex];

        };

    };

    $scope.removeFilter = function(filterName, item){
        var arr = $scope.activeFilters[filterName].filters;

        arr.splice(item, 1);

        if(arr.length === 0){
            //self.activeFilters.splice(filter, 1);
            delete $scope.activeFilters[filterName];
        }

        if(Object.keys($scope.activeFilters).length === 0) {
            $scope.activeFilterLength = 0;
        }
    };

    $scope.afterDelete = function(){
        $scope.showScreen('/orders/transfers/');
    }

    $scope.selectSiteToTransferFrom = function(selected, type) {
        console.log(selected);

        if(!$scope.transferOrder) {
           $scope.transferOrder = {};
        }
        if(!$scope.transferOrder.data) {
           $scope.transferOrder.data = {};
        }

        if(!$scope.transferOrder.data.header) {
			$scope.transferOrder.data.header = {};
        }
        $scope.transferFromSite = selected;
		$scope.transferOrder.data.header.transferFromSite =  {'refName':selected.refName,'dataDomain':selected.dataDomains[0]};

        $scope.fromInventoryPools.path = '/api/v1/inventoryPool?filter=siteId:'+selected.id;
        $scope.fromInventoryPools.get();

        if(type === 'within-site') {
        	$scope.transferToSite = selected;
			$scope.transferOrder.data.header.transferToSite =  {'refName':selected.refName,'dataDomain':selected.dataDomains[0]};
        	$scope.toInventoryPools.path = '/api/v1/inventoryPool?filter=siteId:'+selected.id;
        	$scope.toInventoryPools.get();
        }
     };

     $scope.selectSiteToTransferTo = function(selected, type) {
        console.log(selected);
        if(!$scope.transferOrder) {
           $scope.transferOrder = {};
        }
        if(!$scope.transferOrder.data) {
           $scope.transferOrder.data = {};
        }
        if(!$scope.transferOrder.data.header) {
			$scope.transferOrder.data.header = {};
        }
        $scope.transferToSite = selected;
		$scope.transferOrder.data.header.transferToSite =  {'refName':selected.refName,'dataDomain':selected.dataDomains[0]};
        $scope.toInventoryPools.path = '/api/v1/inventoryPool?filter=siteId:'+selected.id;
        $scope.toInventoryPools.get();
     };


	$scope.createInventoryMap = function(inventorySearch, so) {
        $scope.inventoryList = [];
        angular.forEach(so.lineItems, function(item) {
            if(item.status === 'OPEN' || item.status === 'BACKORDER' || item.status === 'REJECTED' || item.status === 'FAILED_TO_ALLOCATE') {
                var mapping = {};
                mapping.name = item.systemCatalogProductIdentifier + ":"+item.itemTitle;
                mapping.needed = item.itemQty - item.shippedQty;
                mapping.available = 0;
                angular.forEach(inventorySearch.data, function(inventory) {
                    if (item.systemCatalogProductIdentifier === inventory.inventoryPoolEntry.productIdentifier) {
                        mapping.available = inventory.inventoryPoolEntry.availableQty;
                    }
                });
                if (mapping.needed > mapping.available) {
                    mapping.warn = true;
                }
                $scope.inventoryList.push(mapping);
                }
            });
        return $scope.inventoryList;
    };

    $scope.createToInventoryMap = function(toInventorySearch, to) {
       $scope.toInventoryMap = {};
        angular.forEach(to.lineItems, function(item) {
            if(item.status === 'OPEN' || item.status === 'BACKORDER' || item.status === 'REJECTED' || item.status === 'FAILED_TO_ALLOCATE') {
                var mapping = {};
                mapping.warn = false;
                mapping.available = 0;
                mapping.needed = item.requestedQty;
                angular.forEach(toInventorySearch.data, function(inventory) {
                    if (item.systemCatalogProductIdentifier === inventory.inventoryPoolEntry.productIdentifier) {
                        mapping.available = inventory.inventoryPoolEntry.availableQty;
                        if (mapping.needed > mapping.available) {
                            mapping.warn = true;
                    	}
                    }
                    $scope.toInventoryMap[item.systemCatalogProductIdentifier] = mapping;
                });
            }
        });
        return $scope.toInventoryMap;
    };

    $scope.createFromInventoryMap = function(fromInventorySearch, to) {
		$scope.fromInventoryMap = {};
        angular.forEach(to.lineItems, function(item) {
            if(item.status === 'OPEN' || item.status === 'BACKORDER' || item.status === 'REJECTED' || item.status === 'FAILED_TO_ALLOCATE') {
                var mapping = {};
                mapping.available = 0;
                mapping.warn = false;
                mapping.needed = item.itemQty;
                angular.forEach(fromInventorySearch.data, function(inventory) {
                    if (item.systemCatalogProductIdentifier === inventory.inventoryPoolEntry.productIdentifier) {
						mapping.available = inventory.inventoryPoolEntry.availableQty;
                        if (mapping.needed > mapping.available) {
                            mapping.warn = true;
                    	}
                    }
                    $scope.fromInventoryMap[item.systemCatalogProductIdentifier] = mapping;
                });
            }
        });
        return $scope.fromInventoryMap;
    };

    $scope.getProducts = function(items) {
        $scope.productIdentifiers = {};
        angular.forEach(items, function(item) {
            $scope.productIdentifiers[item.systemCatalogProductIdentifier] = item.itemQty;
        });
        $scope.setlimits();
        return $scope.productIdentifiers;
        //$scope.query.channel = $scope.salesOrder.data.header.salesChannel;
    };
    $scope.setlimits = function() {
        if (angular.isDefined($scope.fromInventorySearch)) {
            $scope.fromInventorySearch.params.offset = 0;
            $scope.fromInventorySearch.limit = $scope.transferOrder.data.lineItems.length;
        }
        if (angular.isDefined($scope.toInventorySearch)) {
            $scope.toInventorySearch.params.offset = 0;
            $scope.toInventorySearch.limit = $scope.transferOrder.data.lineItems.length;
        }
    };


    /**
     *
     */
    $scope.getIdByRefName = function(objectList, refName) {
        for (var i = 0; i < objectList.length; i++) {
            if (objectList[i].refName === refName) {
              return objectList[i].id;
            }
        }
    };

    /**
     *
     */
    $scope.getCatalogIdForInventoryPool = function(objectList, refName) {
        for (var i = 0; i < objectList.length; i++) {
            if (objectList[i].refName === refName && objectList[i].catalog) {
              return objectList[i].catalog.id;
            } else if (objectList[i].refName === refName && objectList[i].channel) {
                return objectList[i].channel.currentCatalog.id;
            }
        }
    };

    /**
     * PRODUCTS
     */
    $scope.addProduct = function(selected) {
        if (!angular.isDefined($scope.selectedProducts)) {$scope.selectedProducts = [];}
        if(angular.isDefined(selected)) {
            var lngSelected = selected.length;
            var amountIncreased = 0;
            for(var i=0; i < lngSelected; i++) {
                var item = selected[i];
                if(item.orderQty > 0) {
                    var obj = {
                        "systemCatalogProductIdentifier": item.product.productIdentifier,
                        "itemQty": Number(item.orderQty),
                        "itemTitle": item.product.refName,
                        "status":"OPEN",
                        "shipToAddressName":$scope.transferOrder.data.header.transferToSite.refName
                    };
                    $scope.transferOrder.data.lineItems.push(obj);
                    $scope.selectedProducts.push(selected[i]);
                }
            }
        }$scope.setlimits();
        $scope.fromInventorySearch.get();
        $scope.toInventorySearch.get();
    };


    $scope.transfer = $enApi.object({
        name: 'sendTransfer',
        path: 'inventoryTransfers',
        method: 'post',
        // dev only
        //onBeforePost: function(){
        //    $scope.showScreen('inventory/transfers/id/');
        //},
        onPost: function(data){
            $scope.showScreen('inventory/transfers/' + data.id);
        }
    });

    $scope.saveTransferOrder = function(type) {
        if(type === 'saveOrder') {
            $scope.saveOrder();
        } else if (type === 'saveAndRelease') {
            $scope.saveAndRelease();
        }
    };

    $scope.saveAndRelease = function() {
        $scope.showModal('orders/transfers/submit-transfer-request', $scope.transferOrder.data, $scope.showScreen('orders/transfers/'));
    };

    $scope.saveOrder = function() {
        $scope.showScreen('orders/transfers/');
    };
    $scope.setPools = function() {
        if(angular.isDefined($scope.toInventoryPools.data)) {
            if ($scope.toInventoryPools.data.length === 1) {
                $scope.selectedTransferToInventoryPool = $scope.toInventoryPools.data[0];
                if(!angular.isDefined($scope.transferOrder.data.header.transferToInventoryPool)) {
                    $scope.transferOrder.data.header.transferToInventoryPool = {};
                }
                $scope.transferOrder.data.header.transferToInventoryPool.refName = $scope.selectedTransferToInventoryPool.refName;
                $scope.transferOrder.data.header.transferToInventoryPool.dataDomain = $scope.selectedTransferToInventoryPool.dataDomains[0];
            }
        }

        if(angular.isDefined($scope.fromInventoryPools.data)) {
            if ($scope.fromInventoryPools.data.length === 1) {
                $scope.selectedTransferFromInventoryPool = $scope.fromInventoryPools.data[0];
                if(!angular.isDefined($scope.transferOrder.data.header.transferFromInventoryPool)) {
                    $scope.transferOrder.data.header.transferFromInventoryPool = {};
                }
                $scope.transferOrder.data.header.transferFromInventoryPool.refName = $scope.selectedTransferFromInventoryPool.refName;
                $scope.transferOrder.data.header.transferFromInventoryPool.dataDomain = $scope.selectedTransferFromInventoryPool.dataDomains[0];
            }
        }
    }
    $scope.setParams = function(filter) {
        if(!angular.isDefined($scope.sites)) {
         $scope.sites = $enApi.object({
             name: 'sites',
             path: '/api/v1/shipment',
             method: 'list',
             trigger: false
         });
        }
        if(angular.isDefined(filter)) {
            $scope.sites.filterMap = {id:'!' + filter.id};
        }
        $scope.sites.get();
    }

    $scope.setProductFilter = function() {
        if(!angular.isDefined($scope.sites)) {
            $scope.sites = $enApi.object({
                name: 'sites',
                path: '/api/v1/shipments',
                method: 'list',
                trigger: false
            });
        }
        if(angular.isDefined(filter)) {
            $scope.sites.filterMap = {id:'!' + filter.id};
        }
        $scope.sites.get();
    }
}]);
