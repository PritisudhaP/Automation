(function () {
    angular.module('app')
        .controller('ShipmentTableCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$enList', '$enApi', function ($scope, $rootScope, $http, $timeout, $enList, $enApi) {

            $scope.fieldsToBuild = ['header.status', 'header.shipmentRequestNumber', 'header.salesOrderNumber', 'header.carrier', 'header.carrierServiceType', 'header.siteRefName', 'header.fromOrganization.displayName', 'header.billToContactInfo.name', 'header.billToContactInfo.companyName'];
            $scope.filedsName = ['Status', 'Request #', 'Order #', 'Carrier', 'Carrier Service Type', 'To', 'From', 'Bill To Contact Info - Name', 'Bill To Contact Info - Company Name'];
            $scope.legendList = [{ type: 'error', name: 'Overdue', desc: 'Exceeded Promised Date', color: '#f8e0dd' }, { type: 'warn', name: 'Due Today', desc: 'Request Promised Today', color: '#f3e7b0' }];
            $scope.fieldsMap = (function () {
                var obj = {};
                $scope.fieldsToBuild.forEach(function (val, idx) {
                    obj[val] = $scope.filedsName[idx];
                });

                return obj;
            })();

            $scope.onGet = function (data) {
                data.forEach(function (item) {
                    item.lineItems.forEach(function (lineItem) {
                        var status = item.header.status.toLowerCase()
                        if (status === 'pending' && lineItem.status.toLowerCase() === 'open') {
                            lineItem.itemQtyCalc = lineItem.itemQty - lineItem.rejectedQty;
                        } else if (status === 'acknowledged' || status === 'partially_accepted' || status === 'accepted') {
                            lineItem.itemQtyCalc = lineItem.acceptedQty;
                        } else if (status === 'picked') {
                            lineItem.itemQtyCalc = lineItem.pickedQty;
                        } else {
                            lineItem.itemQtyCalc = 0;
                        }
                    });

                    item.lineItemsObj = $enList.object({
                        name: 'lineItems_' + item.id,
                        data: item.lineItems,
                        limit: 25,
                        onInit: undefined,
                        sort: '',
                        q: ''
                    });
                });
            };

            $scope.selectedOrders = {
                orders: 0,
                items: 0,
                units: 0
            };

            $scope.onItemsSelectionCb = function (items) {
                $scope.selectedOrders.orders = items.length;
                $scope.selectedOrders.items = items.reduce(function (acc, val) {
                    return acc + val.lineItems.length
                }, 0);
                $scope.selectedOrders.units = items.reduce(function (acc, val) {
                    return acc + val.header.totalItemsSold;
                }, 0);
            };

            $scope.isFulfillmentDisabled = function (items) {
                // TODO: Update login on the basis of status
                if (items.length && itemsAreInPendingState(items)) {
                    return false;
                } else {
                    return true;
                }
            };

            $scope.isAcceptRejectDisabled = function (items, action) {
                var filteredItems = items.filter(function (item) {
                    return item.uiactions.indexOf(action) > -1;
                });

                return !(items.length > 0 && items.length === filteredItems.length);
            };

            $scope.viewFulfillment = function (items) {
                // TODO: Navigate to view fullfilment screen
                var items = items.map(function (item) {
                    return item.id;
                });

                $rootScope.showScreen('/fulfillment/requests/id/?type=store&ids=' + items);
            };

            $scope.refreshShipmentsAfterShipDateChange = function () {
                $scope.shipments.selected = [];
                $scope.shipments.refresh();
            };
            $scope.ShipmentsAfterShipDateChange = function () {
                $scope.shipments.selected = [];
                $scope.shipments.refresh();
            };

            $scope.printPickList = function (id, type) {
                var shipmentRequestIds = [];
                shipmentRequestIds.push(id);

                var url;
                if (type === 'order') {
                    url = '/api/v1/shipmentRequest/printPickList/order';
                } else if (type === 'item') {
                    url = '/api/v1/shipmentRequest/printPickList/item';
                } else {
                    url = '/api/v1/shipmentRequest/printPickList/order';
                }

                $http({
                    'method': 'PUT',
                    'url': url,
                    'data': shipmentRequestIds
                })
                    .success(function (data) {
                        var myPdf = data;

                        $scope.showModal('/fulfillment/requests/view-slip', {
                            'items': myPdf
                        }, {}, $scope.shipmentRequests.refresh);

                    });
            };

            $scope.shipmentRequestsPdfs = [];
            $scope.printShipment = function (id) {
                var shipmentId = id;
                //var printObj = $scope.shipmentRequestPrint;
                $scope.shipmentRequestPrint.path = '/api/v1/shipmentRequest/id/' + shipmentId + '/print';
                $scope.shipmentRequestPrint.put();

            };


            $scope.callPdf = function () {

                $scope.showModal('/fulfillment/requests/view-slip', {
                    'items': $scope.shipmentRequestPrint.data.header.printableView
                },
                    $scope.shipmentRequests.refresh());
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
                    'method': 'PUT',
                    'url': url,
                    'data': shipmentRequestIds
                })
                    .success(function (data) {
                        var myPdf = data;
                        $scope.showModal('/fulfillment/requests/view-slip', {
                            'items': myPdf
                        }, $scope.shipmentRequests.refresh());
                    }).error(function (err, status) {

                    })
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
                    'method': 'PUT',
                    'url': url,
                    'data': shipmentIds
                })
                    .success(function (data) {
                        var myPdf = data;
                        $scope.showModal('/fulfillment/requests/view-slip', {
                            'items': myPdf
                        }, $scope.shipments.refresh());
                    }).error(function (err, status) {

                    })
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
                    'method': 'PUT',
                    'url': url,
                    'data': shipmentOrders
                })
                    .success(function (data) {
                        var myPdf = data;
                        $scope.showModal('/fulfillment/requests/view-slip', {
                            'items': myPdf
                        }, $scope.shipments.refresh());
                    }).error(function (err, status) {

                    })
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
                    'method': 'PUT',
                    'url': url,
                    'data': shipmentRequestIds
                })
                    .success(function (data) {
                        var myPdf = data;

                        $scope.showModal('/fulfillment/requests/view-slip', {
                            'items': myPdf
                        }, $scope.shipmentRequests.refresh());

                    }).error(function (err, status) {

                    })
                    .finally(function () {
                        // $scope.files is ngModel, use $rootScope or change ngModel name

                    });


            };




            $scope.printPickListBulk = function (shipmentRequests, type) {
                var shipmentRequestIds = [];
                angular.forEach(shipmentRequests, function (shipment) {
                    shipmentRequestIds.push(shipment.id);

                });

                var url;
                if (type === 'order') {
                    url = '/api/v1/shipmentRequest/printPickList/order';
                } else if (type === 'item') {
                    url = '/api/v1/shipmentRequest/printPickList/item';
                } else {
                    url = '/api/v1/shipmentRequest/printPickList/order';
                }
                $http({
                    'method': 'PUT',
                    'url': url,
                    'data': shipmentRequestIds
                }).success(function (data) {
                    var myPdf = data;

                    $scope.showModal('/fulfillment/requests/view-slip', {
                        'items': myPdf
                    }, {}, function () {
                        $scope.shipmentRequests.selected.length = 0;
                        $scope.onItemsSelectionCb([]);
                        $scope.shipmentRequests.refresh();
                    });

                });


            };


            $scope.requestStat = {
                'shipmentRequest': {
                    'total': {
                        'searchConditionType': 'or',
                        'exactMatches': false,
                        'searchFields': {
                            'attributes': {}
                        }
                    },
                    'totalCount': {
                        'searchConditionType': 'or',
                        'exactMatches': false,
                        'searchFields': {
                            'attributes': {}
                        }
                    },
                    'value': {
                        'searchConditionType': 'and',
                        'exactMatches': false,
                        "aggregationType": "sum",
                        "fieldToAggregate": "header.totalAmountDue",
                        'searchFields': {
                            'attributes': {}
                        }
                    },
                    'units': {
                        'searchConditionType': 'and',
                        'exactMatches': false,
                        "aggregationType": "sum",
                        "fieldToAggregate": "header.totalItemsSold",
                        'searchFields': {
                            'attributes': {}
                        }
                    },
                    'uniqueItems': {
                        'searchConditionType': 'and',
                        'exactMatches': false,
                        "aggregationType": "sum",
                        "fieldToAggregate": "header.numItems",
                        'searchFields': {
                            'attributes': {}
                        }
                    }
                }
            };

            $scope.actionItems = [
                {
                    name: 'Print Pick List',
                    icon: 'print',
                    type: 'PrintPickList',
                    permission: 'ShipmentRequest:PrintPickList',
                    callback: function (rowData) { $scope.printPickList(rowData.id, 'order') }
                },
                {
                    name: 'Create Shipment',
                    icon: 'truck',
                    type: 'CreateShipments',
                    callback: function (rowData) { $scope.showScreen('fulfillment/package-manager/' + rowData.id + '/?type=vendor') }
                },
                {
                    name: 'Edit',
                    icon: 'edit',
                    type: 'Update',
                    permission: 'ShipmentRequest:Update',
                    callback: function (rowData) {
                        $scope.showScreen('/fulfillment/requests/' + rowData.id + '/?type=vendor');
                    }
                },
                {
                    name: 'Delete',
                    icon: 'trash',
                    type: 'Delete',
                    callback: function (rowData, reqObj) { $scope.showModal('fulfillment/requests/delete', rowData, reqObj.refresh) }
                }

            ];

            $scope.storePortalActionItems = angular.copy($scope.actionItems);
            $scope.storePortalActionItems[1].name = 'Pack & Ship';
            $scope.storePortalActionItems[1].callback = function (rowData) {
                rowData.lineItems.forEach(function (item) {
                    item.pickedQty = item.itemQty;
                });

                // TODO: Make an api call and pass in lineItems and on success navigate to package-manager screen.
                $scope.showScreen('fulfillment/package-manager/id/?type=store&ids=' + rowData.id);
            }

            $scope.storePortalActionItems[2].name = 'Accept Partial';
            //NOTE: original permission assigned was ShipmentRequest:Update,
            //which have been changed in favor of more specific StorePortal::AcceptPartial permission
            //A better name would have been ShipmentRequest:AcceptPartial
            //$scope.storePortalActionItems[2].permission = 'ShipmentRequest:Update';
            $scope.storePortalActionItems[2].permission = 'StorePortal:AcceptPartial';
            $scope.storePortalActionItems[2].callback = function (rowData) {
                $scope.showScreen('/fulfillment/requests/id/?type=store&ids=' + rowData.id)
            };

            $scope.storePortalActionItems[3] = {
                name: 'Print All Documents',
                icon: 'print',
                type: 'PrintAllDoc',
                disableFn: function (rowData) {
                    // return false;
                    // console.log(rowData.header.status);
                    return rowData.header.status !== 'SHIPMENT_CREATED';
                },
                enableOnStatus: 'SHIPMENT_CREATED',
                callback: function (rowData) {
                    $enApi.object({
                        method: 'post',
                        path: '/api/v1/shipment/printAllDocs/' + rowData.header.fromOrganization.parentId,
                        name: 'label',
                        onPost: function (data) {
                            $scope.showModal('/fulfillment/requests/view-slip', {
                                'items': data
                            });
                            // $scope.showModal('fulfillment/package-manager/generate-Label', data.packages);
                        }
                    }).post();
                    // $scope.printPickList(rowData.id, 'order')
                }
            };

            $scope.headerActionItems = [
                {
                    name: 'Print Picklist By Order',
                    icon: 'box-pack',
                    type: 'PrintPickList',
                    // permission: 'ShipmentRequest:PrintPickList',
                    callback: function (rowData, requestObject) {
                        $scope.printPickListBulk(requestObject.selected, 'order');
                    }
                },
                {
                    name: 'Print Picklist By Item',
                    icon: 'box-pack',
                    type: 'PrintPickList',
                    // permission: 'ShipmentRequest:PrintPickList',
                    callback: function (rowData, requestObject) {
                        $scope.printPickListBulk(requestObject.selected, 'item');
                    }
                },
                {
                    name: 'Change Ship Date',
                    icon: 'calendar',
                    permission: 'ShipmentRequest:EstimateShipDate',
                    callback: function (rowData, requestObject) { $scope.showModal('fulfillment/requests/change-shipdate', { items: requestObject.selected, objectType: 'shipmentRequest', target: 'header.promisedDeliveryDate' }, $scope.ShipmentsAfterShipDateChange) }
                }
                // {
                //     name: 'Delete Selected',
                //     icon: 'trash',
                //     permission: 'ShipmentRequest:Delete',
                //     callback: function (rowData, requestObject) { $scope.showModal('common/delete-selected', { object: requestObject.selected, objectType: 'shipmentRequest', label: 'Fulfillment Requests', hideName: true, isOrder: true }, $scope.ShipmentsAfterShipDateChange) }
                // }
            ];

            $scope.storePortalHeaderActionItems = angular.copy($scope.headerActionItems);
            $scope.storePortalHeaderActionItems.push({
                name: 'Accept Partial',
                icon: 'edit',
                type: 'Update',
                //permission: 'ShipmentRequest:Update', //NOTE: this was the original permission assigned, which have been changed in favor of more specific StorePortal::AcceptPartial permission
                permission: 'StorePortal:AcceptPartial',
                callback: function (rowData, requestObject) {
                    $scope.showScreen('/fulfillment/requests/id/?type=store&ids=' + requestObject.selected.map(function (item) {
                        return item.id;
                    }));
                }
            });

            $scope.acknowledgeOrders = function (cancelModal) {
                var ids = getIds($scope.shipmentRequests.selected);
                if (angular.isDefined(ids)) {
                    $enApi.object({
                        method: 'put',
                        name: 'acknowledgeShipmentRequest',
                        trigger: false,
                        path: '/api/v1/shipmentRequest/statusUpdate/accepted',
                        data: createDataForStatusChange(ids, 'accept'),
                        onError: function () {
                            cancelModal();
                        },
                        onPut: function () {
                            cancelModal();
                            $scope.shipmentRequests.selected.length = 0;
                            $scope.shipmentRequests.refresh();
                        }
                    }).put();
                }
            };

            $scope.rejectOrders = function (modalObject, cancelModal) {
                var ids = getIds($scope.shipmentRequests.selected);
                if (angular.isDefined(ids)) {
                    $enApi.object({
                        method: 'put',
                        name: 'rejectShipmentRequest',
                        trigger: false,
                        path: '/api/v1/shipmentRequest/statusUpdate/rejected?reason=' + modalObject.reason + '&code=' + modalObject.reasonCode,
                        data: createDataForStatusChange(ids, 'reject'),
                        onError: function () {
                            cancelModal();
                        },
                        onPut: function () {
                            cancelModal();
                            $scope.shipmentRequests.selected.length = 0;
                            $scope.shipmentRequests.refresh();
                        }
                    }).put();
                }
            };

            function getIds(selected) {
                var ids = selected.reduce(function (acc, item) {
                    acc.push(item.id);
                    return acc;
                }, []);

                return ids;
            }

            function createDataForStatusChange(ids, action) {
                var data = [];
                angular.forEach(ids, function (id, index) {
                    var shipmentRequest = {
                        id: $scope.shipmentRequests.selected[index].id,
                        dataDomains: $scope.shipmentRequests.selected[index].dataDomains,
                        lineItems: $scope.shipmentRequests.selected[index].lineItems.map(function (item) {
                            return {
                                lineUID: item.lineUID,
                                pickedQty: action === 'accept' ? item.itemQty : 0,
                                acceptedQty: action === 'accept' ? item.itemQty : 0
                            };
                        })
                    };
                    data.push(shipmentRequest);
                });
                return data;
            }

            $scope.enableDisablePrintPickListBtn = function () {
                var isDisabled = true
                if ($scope.shipmentRequests.selected.length > 0) {
                    $scope.shipmentRequests.selected.forEach(function (item) {
                        isDisabled = isDisabled && item.uiactions.indexOf('PrintPickList') > -1
                    });
                } else {
                    return true;
                }

                return !isDisabled;
            }

            ///////////////////////////////////////////////////////
            //                   Helper Methods                  //
            ///////////////////////////////////////////////////////

            function itemsAreInPendingState(items) {
                return items.every(function (item) {
                    item.header.status === 'PENDING';
                });
            }


        }]);
})();
