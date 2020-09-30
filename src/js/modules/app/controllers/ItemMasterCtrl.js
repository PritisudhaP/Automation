(function () {
    angular.module('app')
    .controller('ItemMasterCtrl', ['$scope', '$enApi', function ($scope, $enApi) {
			
            
            $scope.setData = function() {
                $scope.getFilteredList();
                //$scope.aggregateObject.post();
            };
            $scope.getFilteredList = function () {
                
                $scope.itemMasters.data = {
                    'searchConditionType': 'and',
                    'exactMatches': true,
                    'fieldsToGroupBy': ['itemMasterReference', 'vendor'],
                    'aggregationType': 'count',
                    'fieldToAggregate': 'itemMasterReference',
                    'searchFields': {
                        'attributes': {}
                    }
                };
            };
            $scope.setResults = function() {
                $scope.hasResults = true;
                
             
            }
            
            //$scope.setData();
        }]);
})();
