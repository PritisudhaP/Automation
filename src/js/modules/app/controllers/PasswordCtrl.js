myApp.controller('PasswordCtrl', ['$rootScope','$scope','$http', function($rootScope, $scope, $http) {

    $scope.url = '/api/v1/security/password';
    $scope.orgTypes = [];

    /**
     * changeUrl() changes url based on password type
     *
    */
    $scope.changeUrl = function(){

        if($scope.password.data.passwordType.typePass === 'Organization'){
            $scope.url = '/api/v1/security/password/createOrgPassword';

        } else if($scope.password.data.passwordType.typePass === 'PrivateKeyEncryption' ){
            $scope.url = '/api/v1/security/password/createPrivateKeyPassword';
        }

    };

    /**
     * beforeSubmit() before submiting we have to remove propeties so the api is successful
     *
    */
    $scope.beforeSubmit = function(){

       if ($scope.password.data.passwordType.typePass ==='Organization'){
            delete $scope.password.data.passwordType;

        } else if ($scope.password.data.passwordType.typePass === 'PrivateKeyEncryption' ){
            delete $scope.password.data.passwordType;
            if (!$scope.password.data.orgPwRef) {
                $scope.password.data.orgPwRef = {};
            }
            $scope.password.data.orgPwRef.refName = $scope.orgType;
        }
    };

    /**
     * convertOrgPasswords() used to filter out org type passwords into an array for dropdown values
     *
    */
    $scope.convertOrgPasswords = function(){

        var passwords = $scope.orgPasswords.data;
        $scope.orgTypes = [];

        angular.forEach(passwords, function(item, i) {
          if (item.type === 'Organization') {
            $scope.orgTypes.push(item.refName);
          }
        });
    };

}]);
