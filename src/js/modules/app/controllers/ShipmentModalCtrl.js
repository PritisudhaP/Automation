myApp.controller('ShipmentModalCtrl', ['$scope','$rootScope', function($scope, $rootScope) {

    /**
     * changePackage() onChange event fired when package type changes
     *
     * @param  packageTypeSelected  type of package selected from drop down
     */
    $scope.changePackage = function(packageTypeSelected) {
        if (packageTypeSelected === 'Box') {
            $scope.package = {
                weight: '10',
                height: '16',
                length: '18',
                width: '18',
                packageType: 'Box',
                hazardous: 'false'
            };

        } else if (packageTypeSelected === 'Case') {
            $scope.package = {
                weight: '26',
                height: '20',
                length: '22',
                width: '22',
                packageType: 'Case',
                hazardous: 'false'
            };

        } else if (packageTypeSelected === 'Pallet') {
            $scope.package = {
                weight: '300',
                height: '30',
                length: '48',
                width: '40',
                packageType: 'Pallet',
                hazardous: 'false'
            };
        }
    };

}]);