myApp.controller('ShipmentRequestsCtrl', [
    '$scope',
    '$rootScope',
    '$enApi',
    '$http',
    '$cookieStore',
    '$location',
    '$q',
    function ($scope, $rootScope, $enApi, $http, $cookieStore, $location, $q) {
        // template to load on the basis of logged in user
        $scope.templateConfig = {
            default:
                'views/screens/fulfillment/requests/id/call-center/index.html',
            'StorePortal:UI-View':
                'views/screens/fulfillment/requests/id/store-portal/index.html'
        };

        // configuration to show hide UI as per logged in User
        $scope.attributes = $cookieStore.get('attributeSet').attributes;

        $scope.requestTemplate = {};
        $scope.dataDomains = [];
        $scope.carrierServices = [
            { code: 'FedExPriorityOvernight', name: 'FedExPriorityOvernight' },
            { code: 'FedExStandardOvernight', name: 'FedExStandardOvernight' },
            {
                code: ' FedExGroundHomeDelivery',
                name: 'FedExGroundHomeDelivery'
            }
        ];

        // flags to enable disable several button for Store Associates
        $scope.loading = true;
        $scope.orders = {};
        $scope.ordersToBeProcessed = [];
        $scope.disablePackNShip = true;
        $scope.disableAccept = true;
        $scope.disableReject = true;
        
        $scope.editContactShippingInfo = false;

        $scope.acceptDisabledMessage = 'No Order Selected';
        $scope.rejectDisabledMessage = 'No Order Selected';
        $scope.packNShipDisabledMessage = 'No Order Selected';

        $scope.enableDisablePackNShip = function () {
            var noOfOrders = $scope.ordersToBeProcessed.length;
            if (noOfOrders) {
                for (var i = 0; i < noOfOrders; i++) {
                    if (
                        $scope.orders[$scope.ordersToBeProcessed[i]].header.status !== 'ACCEPTED'
                        && $scope.orders[$scope.ordersToBeProcessed[i]].header.status !== 'PARTIALLY_ACCEPTED'
                        && $scope.orders[$scope.ordersToBeProcessed[i]].header.status !== 'PICKED'
                    ) {
                        $scope.packNShipDisabledMessage =
                            'One or more selected order(s) is not acknowledged';
                        return ($scope.disablePackNShip = true);
                    }
                }
                $scope.packNShipDisabledMessage = '';
                return ($scope.disablePackNShip = false);
            }
            $scope.packNShipDisabledMessage = 'No Order Selected';
            return ($scope.disablePackNShip = true);
        };
        
        
        $scope.setEditContactShippingInfo = function (value) {
            $scope.editContactShippingInfo = value;
        };
        
       
        $scope.setSignatureRequired = function(){
            if(angular.isDefined($scope.signatureRequired)) {
                if($scope.signatureRequired === 'NoSignatureRequired') {
                    $scope.shipmentRequest.data.header.signatureRequired = false;
                } else {
                    $scope.shipmentRequest.data.header.signatureRequired = true;
                }

            } else {
                $scope.shipmentRequest.data.header.signatureRequired = false;
            }
        };

        
        $scope.determineSignatureRequired = function(){
            if(angular.isDefined($scope.shipmentRequest.data) &&
                angular.isDefined($scope.shipmentRequest.data.header &&
                    angular.isDefined($scope.shipmentRequest.data.header.signatureRequired))) {
                if($scope.shipmentRequest.data.header.signatureRequired === false) {
                    $scope.signatureRequired = 'NoSignatureRequired';
                } else {
                    $scope.signatureRequired = 'SignatureRequired';
                }

            } else {
                $scope.signatureRequired = 'NoSignatureRequired';
            }
        };

        $scope.enableDisableReject = function () {
            var noOfOrders = $scope.ordersToBeProcessed.length;
            if (noOfOrders) {
                for (var i = 0; i < noOfOrders; i++) {
                    if (
                        $scope.orders[$scope.ordersToBeProcessed[i]].header
                            .status !== 'PENDING'
                    ) {
                        $scope.rejectDisabledMessage =
                            'One or more selected order(s) is not in pending state';
                        return ($scope.disableReject = true);
                    }
                }
                $scope.rejectDisabledMessage = '';
                return ($scope.disableReject = false);
            }
            $scope.rejectDisabledMessage = 'No Order Selected';
            return ($scope.disableReject = true);
        };

        $scope.enableDisableAccept = function () {
            var noOfOrders = $scope.ordersToBeProcessed.length;
            if (noOfOrders) {
                for (var i = 0; i < noOfOrders; i++) {
                    if (
                        $scope.orders[$scope.ordersToBeProcessed[i]].header
                            .status !== 'PENDING'
                    ) {
                        $scope.acceptDisabledMessage =
                            'One or more selected order(s) is not in pending state';
                        return ($scope.disableAccept = true);
                    }
                    // if (
                    //     !($scope.disableAccept = !canAcceptFull(
                    //         $scope.orders[$scope.ordersToBeProcessed[i]]
                    //     )) &&
                    //     i !== noOfOrders
                    // ) {
                    //     continue;
                    // } else {
                    //     $scope.acceptDisabledMessage = 'Line item not complete';
                    //     return $scope.disableAccept;
                    // }
                }
                $scope.acceptDisabledMessage = '';
                return ($scope.disableAccept = false);
            }
            $scope.acceptDisabledMessage = 'No Order Selected';
            return ($scope.disableAccept = true);

            //////////////////////////////////////////////

            function canAcceptFull(order) {
                var canAccept = true;
                order.lineItems.forEach(function (line) {
                    if (
                        !(line.status === 'OPEN' || line.status === 'ACCEPTED')
                    ) {
                        canAccept = false;
                    }
                });
                return canAccept;
            }
        };

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
                    responses.forEach(function (order) {
                        $scope.orders[order.id] = order;
                        order.lineItems.forEach(function (lineItem) {
                            var status = order.header.status.toLowerCase();
                            lineItem.itemQtyClone = lineItem.itemQty;
                            if (status === 'pending') {
                                lineItem.pickedQty = lineItem.itemQty - lineItem.rejectedQty;
                            } else if (status === 'acknowledged' || status === 'partially_accepted' || status === 'accepted') {
                                lineItem.pickedQty = lineItem.acceptedQty;
                                lineItem.itemQty = lineItem.acceptedQty;
                            } else if (status === 'picked') {
                                lineItem.pickedQty = lineItem.pickedQty;
                                lineItem.itemQty = lineItem.pickedQty;
                            } else if (status === 'shipment_created') {
                                lineItem.itemQtyClone = 0;
                                lineItem.itemQty = 0;
                                lineItem.pickedQty = 0;
                            }
                            // lineItem.pickedQty = status === 'acknowledged' || status === 'partially_accepted' ? lineItem.acceptedQty : status === 'picked' ? lineItem.pickedQty : lineItem.itemQty;
                        });
                    });
                    $scope.loading = false;
                    $scope.enableDisableAccept();
                    $scope.enableDisableReject();
                    $scope.enableDisablePackNShip();
                });
            }
        }

        onInit();

        function createDataForStatusChange(ids) {
            var data = [];
            angular.forEach(ids, function (id) {
                var shipmentRequest = {
                    id: $scope.orders[id].id,
                    dataDomains: $scope.orders[id].dataDomains,
                    lineItems: $scope.orders[id].lineItems.filter(function (item) {
                        return item.status.toLowerCase() !== 'rejected';
                    }).map(function (item) {
                        return {
                            lineUID: item.lineUID,
                            pickedQty: item.pickedQty,
                            acceptedQty: item.pickedQty
                        };
                    })
                };
                data.push(shipmentRequest);
            });
            return data;
        }

        $scope.navigateToPickNPack = function () {
            var ids = $scope.ordersToBeProcessed;
            if (angular.isDefined(ids)) {
                var pickedIds = [];
                for (var i = ids.length - 1; i >= 0; i--) {
                    if ($scope.orders[ids[i]].header.status.toLowerCase() == 'picked') {
                        pickedIds.push(ids[i]);
                        ids.splice(i, 1);
                    }
                }

                if (ids.length) {
                    $enApi.object({
                        method: 'put',
                        name: 'pickShipmentRequest',
                        trigger: false,
                        path: '/api/v1/shipmentRequest/statusUpdate/picked',
                        data: createDataForStatusChange(ids),
                        onError: function () {
                        },
                        onPut: function () {
                            $rootScope.showScreen('/fulfillment/package-manager/id/?type=store&ids=' + ids.concat(pickedIds));
                        }
                    }).put();
                } else {
                    $rootScope.showScreen('/fulfillment/package-manager/id/?type=store&ids=' + pickedIds);
                }

            }

        };

        $scope.acknowledgeOrders = function (cancelModal) {
            var ids = $scope.ordersToBeProcessed;
            if (angular.isDefined(ids)) {
                $enApi.object({
                    method: 'put',
                    name: 'acknowledgeShipmentRequest',
                    trigger: false,
                    path: '/api/v1/shipmentRequest/statusUpdate/accepted',
                    data: createDataForStatusChange(ids),
                    onError: function () {
                        cancelModal();
                    },
                    onPut: function () {
                        cancelModal();
                        $scope.$applyAsync(onInit);
                    }
                }).put();
            }
        };

        $scope.rejectOrders = function (modalObject, cancelModal) {
            var ids = $scope.ordersToBeProcessed;
            if (angular.isDefined(ids)) {
                $enApi.object({
                    method: 'put',
                    name: 'rejectShipmentRequest',
                    trigger: false,
                    path: '/api/v1/shipmentRequest/statusUpdate/rejected?reason=' + modalObject.reason + '&code=' + modalObject.reasonCode,
                    data: createDataForStatusChange(ids),
                    onError: function () {
                        cancelModal();
                    },
                    onPut: function () {
                        cancelModal();
                        $scope.$applyAsync(onInit);
                    }
                }).put();
            }
        };

        $scope.onQuantityPickedChange = function (item) {
            item.isInComplete =
                item.pickedQty === item.itemQty && item.isInComplete
                    ? false
                    : true;
        };

        $scope.determineCarrierServices = function () {
            $scope.carriersServices = [];

            var carrier = 'FEDEX';
            if (angular.isDefined($scope.shipmentRequest.data.header.carrier)) {
                carrier = $scope.shipmentRequest.data.header.carrier;
            } else if (angular.isDefined($rootScope.shippingCarrier)) {
                carrier = $rootScope.shippingCarrier;
            }

            $rootScope.shippingCarrier = carrier;
            $scope.shipmentRequest.data.header.carrier = carrier;

            $scope.carriers = $scope.availableCarrierAndServices.data.key;
            var services = $scope.availableCarrierAndServices.data.value;

            var carrierIndex = $scope.carriers.indexOf(carrier);
            $scope.carrierServices = services[carrierIndex];
            
            if (angular.isDefined($scope.shipmentRequest.data) && angular.isDefined($scope.shipmentRequest.data.header) && angular.isDefined($scope.shipmentRequest.data.header.carrier)) {
            	
            	if(angular.isDefined($scope.siteShippingAccounts)) {
            		$scope.siteShippingAccounts.get();
            	}
            }
        };

        $scope.setUpOPV = function () {
            if (
                angular.isDefined($scope.opvCorrelation.data.value) &&
                $scope.opvCorrelation.data.value.length > 0
            ) {
                $scope.additionalReferenceDataTypes = [
                    'OrderProcessingVariation'
                ];
                var opvDropdown = [];
                angular.forEach($scope.opvCorrelation.data.value, function (
                    opv
                ) {
                    opvDropdown.push({ value: opv.id, label: opv.label });
                });
                $scope.additionalReferenceDataSelect = {
                    OrderProcessingVariation: opvDropdown
                };
            } else {
                $scope.additionalReferenceDataTypes = [];
            }
        };
        $scope.getLabel = function (item) {
            return item.type.replace('_', ' ').toLowerCase();
        };
        $scope.setComplete = function (item) {
            //TODO: make an API call for pickup which sets the right status
            //$scope.save = $enApi.object({
            //    name: 'save',
            //    path: '/api/v1/shipmentRequest/id/' + item.id,
            //    method: 'put',
            //    trigger: false,
            //    onPut: function () {
            //        $scope.closeModal();
            //    }
            //});
            //item.header.status = 'FULFILLED';
            //$scope.save.data = item;
            //$scope.save.put();
            console.log('Saving the following item: ' + item.id);
        };

        /**
         * addProduct() adds line item object to line items table
         *
         * @param  selected  item selected in the modal
         */
        $scope.addProduct = function (selected) {
            if (selected) {
                if (angular.isDefined(selected)) {
                    var lngSelected = selected.length;
                    var amountIncreased = 0;
                    for (var i = 0; i < lngSelected; i++) {
                        var item = selected[i];
                        if (item.orderQty > 0) {
                            var obj = {
                                itemDescription: item.refName,
                                itemQty: item.orderQty,
                                itemUnitPrice: item.msrp,
                                itemWeight: item.weight,
                                itemWeightType: 'lbs',
                                shippedQty: 0,
                                status: 'OPEN',
                                systemItemId: item.productIdentifier
                            };
                            amountIncreased += item.orderQty * item.msrp;
                            if (
                                !$scope.shipmentRequest.data.hasOwnProperty(
                                    'lineItems'
                                )
                            ) {
                                $scope.shipmentRequest.data.lineItems = [];
                            }
                            $scope.shipmentRequest.data.lineItems.push(obj);
                        }
                    }
                }
            }
        };

        $scope.canAcceptFull = function () {
            var canAccept = true;
            if (
                $scope.shipmentRequest &&
                $scope.shipmentRequest.data &&
                $scope.shipmentRequest.data.header
            ) {
                if ($scope.shipmentRequest.data.header.status !== 'PENDING') {
                    canAccept = false;
                } else {
                    $scope.shipmentRequest.data.lineItems.forEach(function (
                        line
                    ) {
                        if (
                            !(
                                line.status === 'OPEN' ||
                                line.status === 'ACCEPTED'
                            )
                        ) {
                            canAccept = false;
                        }
                    });
                }
            } else {
                canAccept = false;
            }
            return canAccept;
        };

        $scope.services = [
            {
                type: 'GIFT_WRAP',
                value: 'Gift Wrap'
            },
            {
                type: 'GIFT_MESSAGE',
                value: 'Gift Message'
            }
        ];
        $scope.removeService = function (item, index, svc) {
            if ($scope.shipmentRequest.data.header.fulfillmentServices) {
                for (
                    var i = 0;
                    i <
                    $scope.shipmentRequest.data.header.fulfillmentServices
                        .length;
                    i++
                ) {
                    if (
                        $scope.shipmentRequest.data.header.fulfillmentServices[
                            i
                        ].type == item.fulfillmentServices[index].type &&
                        $scope.shipmentRequest.data.header.fulfillmentServices[
                            i
                        ].fee == item.fulfillmentServices[index].fee
                    ) {
                        $scope.shipmentRequest.data.header.fulfillmentServices.splice(
                            i,
                            1
                        );
                        break;
                    }
                }
            }

            item.fulfillmentServices.splice(index, 1);
            //$scope.applyServicesToHeader();
            //$scope.calculateTotalAmount();
            if ($scope.shipmentRequestAction !== 'new') {
                $scope.refreshScreen = true;
                $scope.shipmentRequest.put();
            }
        };
        $scope.addService = function (item, data) {
            if (angular.isDefined(item)) {
                var itemfound = false;
                //item.referenceNumber = data.index;

                if ($scope.shipmentRequest.data.header.fulfillmentServices) {
                    var found = false;
                    for (
                        var i = 0;
                        i <
                        $scope.shipmentRequest.data.header.fulfillmentServices
                            .length;
                        i++
                    ) {
                        if (data.item.fulfillmentServices) {
                            for (
                                var j = 0;
                                j < data.item.fulfillmentServices.length;
                                j++
                            ) {
                                if (
                                    $scope.shipmentRequest.data.header
                                        .fulfillmentServices[i].type ==
                                    item.type
                                ) {
                                    if (
                                        $scope.shipmentRequest.data.header
                                            .fulfillmentServices[i].fee ==
                                        data.item.fulfillmentServices[j].fee
                                    ) {
                                        found = true;
                                        $scope.shipmentRequest.data.header.fulfillmentServices.splice(
                                            i,
                                            1
                                        );
                                        $scope.shipmentRequest.data.header.fulfillmentServices.push(
                                            item
                                        );
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (!found) {
                        $scope.shipmentRequest.data.header.fulfillmentServices.push(
                            item
                        );
                    }
                } else {
                    $scope.shipmentRequest.data.header.fulfillmentServices = [];
                    $scope.shipmentRequest.data.header.fulfillmentServices.push(
                        item
                    );
                }
                if (data.item.fulfillmentServices) {
                    for (
                        var x = 0;
                        x < data.item.fulfillmentServices.length;
                        x++
                    ) {
                        if (
                            data.item.fulfillmentServices[x].type == item.type
                        ) {
                            itemfound = true;
                            data.item.fulfillmentServices[x] = item;
                            break;
                        }
                    }
                    if (!itemfound) {
                        data.item.fulfillmentServices.push(item);
                    }
                } else {
                    data.item.fulfillmentServices = [];
                    data.item.fulfillmentServices.push(item);
                }
                //$scope.applyServicesToHeader();
                //$scope.calculateTotalAmount();
                if ($scope.shipmentRequestAction !== 'new') {
                    $scope.refreshScreen = true;
                    $scope.shipmentRequest.put();
                }
            }
        };

        /**
         * addReference() adds reference object to shipments view
         *
         * @param  reference current reference being built
         */
        $scope.addReference = function (item) {
            if (angular.isDefined(item)) {
                item.systemInd = 'N';
                $scope.shipmentRequest.data.referenceData.push(item);
                if ($scope.shipmentRequestAction !== 'new') {
                    $scope.shipmentRequest.put();
                }
            }
        };

        /**
         * removeArrayItem() remove reference object from shipments view
         *
         * @param  idx index of array
         */
        $scope.removeReference = function (idx) {
            if (angular.isDefined(idx)) {
                $scope.shipmentRequest.data.referenceData.splice(idx, 1);
                if ($scope.shipmentRequestAction !== 'new') {
                    $scope.shipmentRequest.put();
                }
            }
        };
        $scope.today = new Date();
        $scope.isEditableState = function (item) {
            if (item) {
                if (
                    ($rootScope.$hasPermission('Shipment:Create') ||
                        $rootScope.$hasPermission('ShipmentRequest:Update')) &&
                    !(
                        item.header.status === 'REJECTED' ||
                        item.header.status === 'SHIPMENT_REQUEST_SENT' ||
                        item.header.status === 'SHIPMENT_CREATED' ||
                        item.header.status === 'CANCELLED'
                    )
                ) {
                    return true;
                }
                return false;
            } else {
                if (angular.isDefined($scope.shipmentRequest.data)) {
                    if (
                        ($rootScope.$hasPermission('Shipment:Create') ||
                            $rootScope.$hasPermission(
                                'ShipmentRequest:Update'
                            )) &&
                        !(
                            $scope.shipmentRequest.data.header.status ===
                            'REJECTED' ||
                            $scope.shipmentRequest.data.header.status ===
                            'SHIPMENT_REQUEST_SENT' ||
                            $scope.shipmentRequest.data.header.status ===
                            'SHIPMENT_CREATED' ||
                            $scope.shipmentRequest.data.header.status ===
                            'CANCELLED'
                        )
                    ) {
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            }
        };
        $scope.determineSave = function () {
            if (
                angular.isDefined($scope.shipmentRequest.data) &&
                angular.isDefined($scope.shipmentRequest.data.id)
            ) {
                $scope.shipmentRequest.put();
            }
        };
        $scope.refreshShipmentsAfterShipDateChange = function () {
            $scope.shipments.selected = [];
            $scope.shipments.refresh();
        };

        $scope.ShipmentsAfterShipDateChange = function () {
            $scope.shipmentRequests.selected = [];
            $scope.shipmentRequests.refresh();
        };

        $scope.shipmentRequestsPdfs = [];
        $scope.printShipment = function (id) {
            var shipmentId = id;
            //var printObj = $scope.shipmentRequestPrint;
            $scope.shipmentRequestPrint.path =
                '/api/v1/shipmentRequest/id/' + shipmentId + '/print';
            $scope.shipmentRequestPrint.put();
        };

        $scope.callPdf = function () {
            $scope.showModal(
                '/fulfillment/requests/view-slip',
                {
                    items: $scope.shipmentRequestPrint.data.header.printableView
                },
                $scope.shipmentRequests.refresh()
            );
        };

        $scope.refreshDataAgain = function () {
            $timeout(function () {
                $scope.shipments.refresh();
            }, 800);
        };

        $scope.printBulkShipment = function (shipmentRequests) {
            var shipmentRequestIds = [];
            angular.forEach(shipmentRequests, function (shipment) {
                shipmentRequestIds.push(shipment.id);
            });

            var url = '/api/v1/shipmentRequest/printBulk';
            $http({
                method: 'PUT',
                url: url,
                data: shipmentRequestIds
            })
                .success(function (data) {
                    var myPdf = data;
                    $scope.showModal(
                        '/fulfillment/requests/view-slip',
                        {
                            items: myPdf
                        },
                        $scope.shipmentRequest.refresh()
                    );
                })
                .error(function (err, status) { })
                .finally(function () {
                    // $scope.files is ngModel, use $rootScope or change ngModel name
                });
        };

        $scope.printShipmentsBulk = function (shipments) {
            var shipmentIds = [];
            angular.forEach(shipments, function (shipment) {
                shipmentIds.push(shipment.id);
            });

            var url = '/api/v1/shipment/printBulk';
            $http({
                method: 'PUT',
                url: url,
                data: shipmentIds
            })
                .success(function (data) {
                    var myPdf = data;
                    $scope.showModal(
                        '/fulfillment/requests/view-slip',
                        {
                            items: myPdf
                        },
                        $scope.shipments.refresh()
                    );
                })
                .error(function (err, status) { })
                .finally(function () {
                    // $scope.files is ngModel, use $rootScope or change ngModel name
                });
        };

        $scope.printShipmentsPackingBulk = function (shipments) {
            var shipmentOrders = [];
            angular.forEach(shipments, function (shipment) {
                shipmentOrders.push(shipment.id);
            });

            var url = '/api/v1/packingSlip/bulk';
            $http({
                method: 'PUT',
                url: url,
                data: shipmentOrders
            })
                .success(function (data) {
                    var myPdf = data;
                    $scope.showModal(
                        '/fulfillment/requests/view-slip',
                        {
                            items: myPdf
                        },
                        $scope.shipments.refresh()
                    );
                })
                .error(function (err, status) { })
                .finally(function () {
                    // $scope.files is ngModel, use $rootScope or change ngModel name
                });
        };

        $scope.printSummaryShipment = function (shipmentRequests) {
            var shipmentRequestIds = [];
            angular.forEach(shipmentRequests, function (shipment) {
                shipmentRequestIds.push(shipment.id);
            });

            var url = '/api/v1/shipmentRequest/printSummary';
            $http({
                method: 'PUT',
                url: url,
                data: shipmentRequestIds
            })
                .success(function (data) {
                    var myPdf = data;

                    $scope.showModal(
                        '/fulfillment/requests/view-slip',
                        {
                            items: myPdf
                        },
                        $scope.shipmentRequest.refresh()
                    );
                })
                .error(function (err, status) { })
                .finally(function () {
                    // $scope.files is ngModel, use $rootScope or change ngModel name
                });
        };

        $scope.printPickList = function (id) {
            var shipmentRequestIds = [];
            shipmentRequestIds.push(id);
            if ($rootScope.$hasPermission('StorePortal:UI-View')) {
                $scope.shipmentRequest.data.header.status = 'PICK_LIST_PRINTED';
            }

            var url = '/api/v1/shipmentRequest/printPickList/order';
            $http({
                method: 'PUT',
                url: url,
                data: shipmentRequestIds
            })
                .success(function (data) {
                    var myPdf = data;

                    $scope.showModal(
                        '/fulfillment/requests/view-slip',
                        {
                            items: myPdf
                        }
                        // $scope.shipmentRequest.refresh()
                    );
                })
                .error(function (err, status) { })
                .finally(function () {
                    // $scope.files is ngModel, use $rootScope or change ngModel name
                });
        };

        $scope.printPickListBulk = function (shipmentRequests) {
            var shipmentRequestIds = [];
            angular.forEach(shipmentRequests, function (shipment) {
                shipmentRequestIds.push(shipment.id);
            });

            var url = '/api/v1/shipmentRequest/printPickList/order';
            $http({
                method: 'PUT',
                url: url,
                data: shipmentRequestIds
            })
                .success(function (data) {
                    var myPdf = data;

                    $scope.showModal(
                        '/fulfillment/requests/view-slip',
                        {
                            items: myPdf
                        },
                        $scope.shipmentRequests.refresh()
                    );
                })
                .error(function (err, status) { })
                .finally(function () {
                    // $scope.files is ngModel, use $rootScope or change ngModel name
                });
        };

        /**
         * Create tracking link
         */
        $scope.createTrackingLink = function (carrier, trackingId) {
            /**
             * Get more visit:
             * http://www.track-trace.com/
             * http://goo.gl/uqJBez
             */
            var correlation = $scope.ShipmentTrackingUrl.data;
            var keyIndex = correlation.key.indexOf(carrier);
            var url = $scope.ShipmentTrackingUrl.data.value[keyIndex];
            if (!url|| trackingId === undefined) {
                return '#';
            }
            return url.replace('{{trackingId}}', trackingId);
        };

        $scope.today = new Date().setHours(0, 0, 0, 0);
        $scope.setHours = function (item) {
            var formattedDate = new Date(item);
            formattedDate.setHours(0, 0, 0, 0);
            return Date.parse(formattedDate);
        };
        $scope.requestStat = {
            shipmentRequest: {
                total: {
                    searchConditionType: 'or',
                    exactMatches: false,
                    searchFields: {
                        attributes: {}
                    }
                },
                totalCount: {
                    searchConditionType: 'or',
                    exactMatches: false,
                    searchFields: {
                        attributes: {}
                    }
                },
                value: {
                    searchConditionType: 'and',
                    exactMatches: false,
                    aggregationType: 'sum',
                    fieldToAggregate: 'header.totalAmountDue',
                    searchFields: {
                        attributes: {}
                    }
                },
                units: {
                    searchConditionType: 'and',
                    exactMatches: false,
                    aggregationType: 'sum',
                    fieldToAggregate: 'header.totalItemsSold',
                    searchFields: {
                        attributes: {}
                    }
                },
                uniqueItems: {
                    searchConditionType: 'and',
                    exactMatches: false,
                    aggregationType: 'sum',
                    fieldToAggregate: 'header.numItems',
                    searchFields: {
                        attributes: {}
                    }
                }
            }
        };

        $scope.actionConfig = [
            {
                name: 'Accept',
                icon: 'check-ring',
                permission: 'ShipmentRequest:Ack',
                disableMsg:
                    'Accept is disabled as the line item is either accepted or rejected',
                showTooltip: function (item) {
                    return item.status === 'OPEN' ? this.name : this.disableMsg;
                },
                callback: function (item, reqObj) {
                    $scope.showModal('fulfillment/requests/acknowledge-line', {
                        item: item,
                        shipmentRequestId: reqObj.data.id
                    });
                }
            },
            {
                name: 'Reject',
                icon: 'ban',
                disable: function () {
                    	if ($scope.attributes && $scope.attributes.request && $scope.attributes.request.partialReject) {
	                    	return $scope.attributes.request.partialReject.disableOnFrontend;
	                    } else {
	                    	return false;
                        }
                },
                disableMsg:
                    'Reject is disabled as the line item is either accepted or rejected',
                showTooltip: function (item) {
                    return item.status === 'OPEN' ? this.name : this.disableMsg;
                },
                permission: 'ShipmentRequest:Reject',
                callback: function (item, reqObj) {
                    $scope.showModal('fulfillment/requests/reject-line', {
                        item: item,
                        shipmentRequestId: reqObj.data.id
                    });
                }
            },
            {
                name: 'Add Service',
                icon: 'service',
                permission: 'ShipmentRequest:Update',
                callback: function (item, reqObj, idx) {
                    $scope.showModal(
                        'fulfillment/requests/add-service',
                        {
                            item: item,
                            index: idx,
                            services: $scope.$parent.services
                        },
                        $scope.addService
                    );
                }
            }
        ];

        ////////////////////////////////////
        //         helper methods
        ///////////////////////////////////

        function enableDisableButtons(status) {
            var noOfOrders = $scope.ordersToBeProcessed.length;
            if (noOfOrders) {
                for (var i = 0; i < noOfOrders; i++) {
                    if (
                        $scope.orders[$scope.ordersToBeProcessed[i]].header
                            .status !== status
                    ) {
                        return true;
                    }
                }
                return false;
            }
            return true;
        }
    }
]);
