(function() {
    angular.module('app')
        .controller('UnitOfMeasurementCtrl', ['$scope','$enApi', '$timeout', function($scope, $enApi, $timeout) {
            /**
             * @function editAddProduct()
             * @description Adds product to lineItems array when in edit view
             * @param selected product object
             */
            $scope.attachUOM = function(selected, uomId){

                if(angular.isDefined(selected)){
                    if($scope.uoms.data === null ||
                        !angular.isDefined($scope.uoms.data.unitOfMeasurements)) {
                        $scope.uoms.data = $scope.uomsModel;
                    }
                    var lngSelected = selected.length;
                    var amountIncreased = 0;
                    for(var i=0;i<lngSelected;i++){
                        var item = selected[i];
                        $scope.uoms.data.unitOfMeasurements.push(item);
                    }
                    //$scope.uoms.put();
                }
            };
            $scope.uomsModel = {
                displayName : "",
                unitOfMeasurements : []
            };
            $scope.removeLine = function(index) {
                console.log("Clicked " + index);
                $scope.uoms.data.unitOfMeasurements.splice(index, 1);
            }

        }]);
})();
