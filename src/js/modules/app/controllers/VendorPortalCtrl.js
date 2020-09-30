(function () {
  angular.module('app')
    .controller('VendorPortalCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

      $scope.fieldsToBuild = ['header.status', 'header.shipmentRequestNumber', 'header.salesOrderNumber', 'header.carrier', 'header.carrierServiceType', 'header.siteRefName', 'header.fromOrganization.displayName', 'header.billToContactInfo.name', 'header.billToContactInfo.companyName'];
      $scope.filedsName = ['Status', 'Request #', 'Order #', 'Carrier', 'Carrier Service Type', 'To', 'From', 'Bill To Contact Info - Name', 'Bill To Contact Info - Company Name']
      $scope.legendList = [{ type: 'error', name: 'Overdue', desc: 'Exceeded Promised Date', color: '#f8e0dd' }, { type: 'warn', name: 'Due Today', desc: 'Request Promised Today', color: '#f3e7b0' }];

      $scope.callPdf = function () {

        $scope.showModal('/fulfillment/requests/view-slip', {
          'items': $scope.vendorPortalPrint.data.header.printableView
        },
          $scope.vendorPortals.refresh());
      };

      $scope.printPickList = function (id) {
        var shipmentRequestIds = [];
        shipmentRequestIds.push(id);

        if ($rootScope.$hasPermission('StorePortal:UI-View')) {
          $scope.vendorPortals.data.forEach(function (item) {
            if (item.id === id) {
              item.header.status = 'PICK_LIST_PRINTED';
            }
          });
        }

        var url = '/api/v1/shipmentRequest/printPickList/order';
        $http({
          'method': 'PUT',
          'url': url,
          'data': shipmentRequestIds
        })
          .success(function (data) {
            var myPdf = data;

            $scope.showModal('/fulfillment/requests/view-slip', {
              'items': myPdf
            });

          });
      };

      $scope.ShipmentsAfterShipDateChange = function () {
        $scope.vendorPortals.selected = [];
        $scope.vendorPortals.refresh();
      };

      $scope.actionItems = [
        {
          name: 'Edit',
          icon: 'edit',
          type: 'Update',
          permission: 'ShipmentRequest:Update',
          callback: function (rowData) { $scope.showScreen('/fulfillment/requests/' + rowData.id + '/') }
        },
        {
          name: 'Create Shipment',
          icon: 'truck',
          type: 'CreateShipments',
          callback: function (rowData) { $scope.showScreen('fulfillment/package-manager/' + rowData.id + '/') }
        },
        {
          name: 'Delete',
          icon: 'trash',
          type: 'Delete',
          callback: function (rowData, reqObj) { $scope.showModal('fulfillment/requests/delete', rowData, reqObj.refresh) }
        },
        {
          name: 'Print Pick List',
          icon: 'print',
          type: 'PrintPickList',
          permission: 'ShipmentRequest:PrintPickList',
          callback: function (rowData) { $scope.printPickList(rowData.id) }
        }
      ];

      $scope.headerActionItems = [
        {
          name: 'Pick Summary',
          icon: 'box-group',
          permission: 'ShipmentRequest:PrintPickList',
          callback: function (requestObject) { $scope.showModal('fulfillment/requests/pick-list-summary', requestObject.selected, $scope.ShipmentsAfterShipDateChange); }
        },
        {
          name: 'Pack Selected',
          icon: 'box-pack',
          permission: 'ShipmentRequest:PrintPickList',
          callback: function (requestObject) { $scope.showModal('fulfillment/requests/pack-list', requestObject.selected, $scope.ShipmentsAfterShipDateChange); }
        },
        {
          name: 'Change Ship Date',
          icon: 'calendar',
          permission: 'ShipmentRequest:EstimateShipDate',
          callback: function (requestObject) { $scope.showModal('fulfillment/requests/change-shipdate', { items: requestObject.selected, objectType: 'shipmentRequest', target: 'header.promisedDeliveryDate' }, $scope.ShipmentsAfterShipDateChange) }
        },
        {
          name: 'Delete Selected',
          icon: 'trash',
          permission: 'ShipmentRequest:Delete',
          callback: function (requestObject) { $scope.showModal('common/delete-selected', { object: requestObject.selected, objectType: 'shipmentRequest', label: 'Fulfillment Requests', hideName: true, isOrder: true }, $scope.ShipmentsAfterShipDateChange) }
        }
      ];

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
    }]);
})();

