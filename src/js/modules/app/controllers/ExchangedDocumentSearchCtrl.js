(function () {
    angular.module('app')
    .controller('ExchangedDocumentSearchCtrl', ['growl', '$http', '$interpolate', '$scope', '$rootScope', function (growl, $http, $interpolate, $scope, $rootScope) {

            console.log('in controller');
            $scope.page = {
                'loading': false
            };
			
			
			$scope.buildFilter = function() {
				$scope.exchangedDocuments.filter = $scope.buildFilterString($scope.buildFilterMap(), $scope.buildDateString('startDateTime'));	
			}
			
			
			$scope.buildFilterString = function(obj,strFilter){
                var filter = '';
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if(obj[key]!=='' && obj[key]!==undefined && obj[key]!==null){
                            if(filter!=='') filter += '&&';
                            filter += key +':'+obj[key]+'';
                        }
                    }
                }


                if(filter!==''){
                    if(strFilter!=='' && strFilter!==undefined){
                        return '('+strFilter+')&&('+filter+')';
                    }else{
                        return '('+filter+')';
                    }
                }else{
                    return strFilter;
                }
            };
			
			
			$scope.buildFilterMap = function() {
			
                var filterMap = {'fromVendor':$scope.filterFromPartner,
                		          'toVendor':$scope.filterToPartner,
                		          'dataDomain':$scope.filterAccount,
                		          'direction':$scope.filterDirection,
                		          'interchangeControlNumber':$scope.filterInterchangeControlNumber,
                                  'documentType':$scope.filterDocumentType,
                                  'fileName':$scope.filterFileName};
                if($scope.filterSearchableField && $scope.filterSearchableValue) {
                	filterMap[$scope.filterSearchableField] = $scope.filterSearchableValue;
                }    
                
                
                return filterMap;		      
		    };	
           
            $scope.buildDateString = function (fieldName) {
                var filterString = '';

                var sTime = "00:00:01";
                var eTime = "23:59:59";

               

                if ($scope.filterStartDate !== null && $scope.filterStartDate !== undefined && $scope.filterStartDate !== '') {
                    if ($scope.startTime !== undefined && $scope.startTime !== null && $scope.startTime !== '') {
                        sTime = $scope.startTime.toTimeString().substring(0, 8);
                    }
                    if (filterString !== '') {
                        filterString = filterString + "&&";
                    }
                    filterString = filterString + fieldName + ":>=" + $scope.filterStartDate + "T" + sTime;
                }

                if ($scope.filterEndDate !== null && $scope.filterEndDate !== undefined && $scope.filterEndDate !== '') {
                    if ($scope.endTime !== undefined && $scope.endTime !== null && $scope.endTime !== '') {
                        eTime = $scope.endTime.toTimeString().substring(0, 8);
                    }
                    if (filterString !== '') {
                        filterString = filterString + "&&";
                    }
                    filterString = filterString + fieldName + ":<=" + $scope.filterEndDate + "T" + eTime;
                }

                return filterString;
            };
            


        }]);
})();
