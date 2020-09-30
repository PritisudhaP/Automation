myApp.controller('FeeCtrl', ['$rootScope','$scope', function($rootScope, $scope) {

    $scope.charge = {};
   $scope.setCharge = function(){
        if($scope.serviceAllowance.percentage > 0){
            $scope.charge.chargeType = 'Percentage';
        }else {
            $scope.charge.chargeType = 'Amount';
        }
    };

}]);
