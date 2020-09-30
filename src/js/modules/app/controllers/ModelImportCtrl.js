(function () {
    angular.module('app')
    .controller('ModelImportCtrl', ['growl', '$http', '$interpolate', '$scope', '$rootScope', '$advSearch', function (growl, $http, $interpolate, $scope, $rootScope, $advSearch) {

            $scope.page = {
                'loading': false 
            };
            
            $scope.inventoryPoolIds = [];
            
			$scope.prepareSalesOrderModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processSalesOrderImport.path='/api/v1/salesOrder/processModelImportResults';
 				$scope.processSalesOrderImport.post();

          
            };
            
            $scope.prepareInvoiceModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processInvoiceImport.path='/api/v1/invoice/processModelImportResults';
 				$scope.processInvoiceImport.post();

          
            };
            
            $scope.prepareShipmentModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processShipmentOrderImport.path='/api/v1/shipment/processModelImportResults';
 				$scope.processShipmentOrderImport.post();

          
            };
            
            
            $scope.prepareSiteModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processSiteImport.path='/api/v1/site/processModelImportResults';
 				$scope.processSiteImport.post();

          
            };
            
            $scope.preparePhysicalAddressModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processPhysicalAddressImport.path='/api/v1/physicalAddress/processModelImportResults';
 				$scope.processPhysicalAddressImport.post();

          
            };
            
            $scope.prepareCustomerModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processCustomerImport.path='/api/v1/customer/processModelImportResults';
 				$scope.processCustomerImport.post();

          
            };
            
            $scope.prepareClientModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processClientImport.path='/api/v1/client/processModelImportResults';
 				$scope.processClientImport.post();

          
            };
            
            $scope.prepareOrganizationModelImport = function () {
                var queryString = '';
				
				
 				
 				$scope.processOrganizationImport.path='/api/v1/organization/processModelImportResults';
 				$scope.processOrganizationImport.post();

          
            };
            
            
            
            $scope.prepareProductModelImport = function () {
                var queryString = '';
				
				if ($scope.catalogName !== undefined && $scope.catalogName !== null && $scope.catalogName !== '') {
                    queryString = queryString + 'catalogName=' + $scope.catalogName;
                }
				
                if ($scope.categoryAttributeName !== undefined && $scope.categoryAttributeName !== null && $scope.categoryAttributeName !== '') {
                    queryString = queryString + '&categoryAttributeName=' + $scope.categoryAttributeName;
                }
                
                if ($scope.useRetailPriceForCatalogPrice !== undefined && $scope.useRetailPriceForCatalogPrice !== null && $scope.useRetailPriceForCatalogPrice !== '') {
                    queryString = queryString + '&useRetailPriceForCatalogPrice=' + $scope.useRetailPriceForCatalogPrice;
                }
                
                if ($scope.availableQty !== undefined && $scope.availableQty !== null && $scope.availableQty !== '') {
                    queryString = queryString + '&availableQty=' + $scope.availableQty;
                }
                if ($scope.createSkuForProduct !== undefined && $scope.createSkuForProduct !== null && $scope.createSkuForProduct !== '') {
                    queryString = queryString + '&createSkuForProduct=' + $scope.createSkuForProduct;
                }	
	                
		                	

            	if ($scope.inventoryPoolIds !== undefined && $scope.inventoryPoolIds !== null && $scope.inventoryPoolIds.length > 0 ) {
                    
                    queryString = queryString + '&inventoryPoolIds=' + $scope.inventoryPoolIds;
                }
				
				if(queryString.startsWith('&')) {
					queryString = queryString.substring(1, queryString.length);	
				}
				
				if(queryString.length > 0) {
					$scope.processProductImport.path='/api/v1/product/processModelImportResults?'+queryString;	
				} else {
					$scope.processProductImport.path='/api/v1/product/processModelImportResults';
				}	
 				
 				
 				$scope.processProductImport.post();

          
            };
            
            $scope.prepareSkuModelImport = function () {
                var queryString = '';
				
				if ($scope.catalogName !== undefined && $scope.catalogName !== null && $scope.catalogName !== '') {
                    queryString = queryString + 'catalogName=' + $scope.catalogName;
                }
				
                if ($scope.categoryAttributeName !== undefined && $scope.categoryAttributeName !== null && $scope.categoryAttributeName !== '') {
                    queryString = queryString + '&categoryAttributeName=' + $scope.categoryAttributeName;
                }
                
                if ($scope.useRetailPriceForCatalogPrice !== undefined && $scope.useRetailPriceForCatalogPrice !== null && $scope.useRetailPriceForCatalogPrice !== '') {
                    queryString = queryString + '&useRetailPriceForCatalogPrice=' + $scope.useRetailPriceForCatalogPrice;
                }
                
                if ($scope.copyProductData !== undefined && $scope.copyProductData !== null && $scope.copyProductData !== '') {
                    queryString = queryString + '&copyProductData=' + $scope.copyProductData;
                }
                
                if ($scope.availableQty !== undefined && $scope.availableQty !== null && $scope.availableQty !== '') {
                    queryString = queryString + '&availableQty=' + $scope.availableQty;
                }

            	if ($scope.inventoryPoolIds !== undefined && $scope.inventoryPoolIds !== null && $scope.inventoryPoolIds.length > 0 ) {
                    
                    queryString = queryString + '&inventoryPoolIds=' + $scope.inventoryPoolIds;
                }
				
				if(queryString.startsWith('&')) {
					queryString = queryString.substring(1, queryString.length);	
				}
				
				if(queryString.length > 0) {
					$scope.processSkuImport.path='/api/v1/skus/processModelImportResults?'+queryString;	
				} else {
					$scope.processSkuImport.path='/api/v1/skus/processModelImportResults';
				}	
 				
 				
 				$scope.processSkuImport.post();

          
            };
            
            $scope.toggleInventoryPool = function(value) {
                     
                var pos = $scope.inventoryPoolIds.indexOf(value);
                if (~pos) {
                    $scope.inventoryPoolIds.splice(pos, 1);
                }
                else {
                    $scope.inventoryPoolIds.push(value);
                }

            };
            

        }]);
})();
