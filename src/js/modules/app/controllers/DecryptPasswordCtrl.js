myApp.controller('DecryptPasswordCtrl', ['$rootScope','$scope','$http', function($rootScope, $scope, $http) {

    $scope.url = '/api/v1/security/password/decrypt';

    /**
     * decryptPassword() decrypts password
     *
    */
    $scope.decryptPassword = function(){

     if($scope.password.data.type === 'Organization'){
            $scope.url = '/api/v1/security/password/decrypt?passwordRefName=' + $scope.password.data.refName;

        } else if($scope.password.data.type === 'PrivateKeyEncryption' ){
            $scope.url = '/api/v1/security/password/decrypt?passwordRefName=' + $scope.password.data.refName + '&orgPasswordRefName=' + $scope.password.data.orgPasswordReference.refName + '&orgPasswordDataDomain=' + $scope.password.data.orgPasswordReference.dataDomain;
        }
    };

    $scope.dispatchAction = function(searchConfig){
        $rootScope.$broadcast('SEARCH_CONFIG_UPDATED', searchConfig.data);
    };

    $scope.setParams = function () {
        if (angular.isDefined($scope.decrypt)) {
            //if (angular.isDefined($scope.password)) {
                $scope.decrypt.params = {
                    passwordRefName: $scope.password.data.refName
                }
                if ($scope.password.data.type === 'PrivateKeyEncryption') {
                    if (!angular.isDefined($scope.password.orgPasswordReference)) {
                        //get org
                    }

                    $scope.decrypt.params['orgPasswordRefName'] = $scope.password.data.orgPasswordReference.refName;
                    $scope.decrypt.params['orgPasswordDataDomain'] = $scope.password.data.orgPasswordReference.dataDomain;
                }
            // } else if (angular.isDefined($scope.keyPair)) {
            //     $scope.decrypt.params = {
            //         id: $scope.password.data.id,
            //         passwordRefName: $scope.password.data.refName
            //     }
            //
            // }
        }
    }

}]);
