(function () {
    angular.module('app')
        .controller('SftpCtrl', ['$rootScope', '$scope', '$enspirePermissions', '$http', '$httpParamSerializer', function ($rootScope, $scope, $enspirePermissions, $http, $httpParamSerializer) {
            $rootScope.ispublicKeyUploaded=false;
            $scope.domains = $enspirePermissions.getDataDomains();
            $scope.getPassword = function () {
                var pwd = $http({
                    'method': 'GET',
                    'url': '/api/v1/sftpUser/userPassword',
                    responseType: 'text',
                    params: {
                        realm: $scope.sftpUser.data.realmRefName,
                        userId: $scope.sftpUser.data.userId,
                        passwordPhrase: $scope.sftpUser.data.passwordPhrase
                    }
                }).then(function successCallback(response) {
                    $scope.decryptedPassword = response.data.password;
                    $scope.showPassword = true;
                    $scope.hideButton = true;

                }, function errorCallback(err) {
                    if (err.message) {
                        $scope.decryptedPassword = err.message;
                    } else {
                        $scope.decryptedPassword = err.data.message;
                    }
                    $scope.showPassword = true;
                });



                // var pwd = $http({
                //     'method': 'GET',
                //     'url': '/api/v1/sftpUser/userPassword',
                //     responseType: 'text',
                //     params: {
                //         realm: $scope.sftpUser.data.realmRefName,
                //         userId: $scope.sftpUser.data.userId,
                //         passwordPhrase: $scope.sftpUser.data.passwordPhrase
                //     },
                //     transformResponse: [function (data) {
                //         return data;
                //     }]
                // }).then(function successCallback(response) {
                //     $scope.decryptedPassword = response.data;
                //     $scope.showPassword = true;
                //     $scope.hideButton = true;
                //
                // }, function errorCallback(err) {
                //     if (err.message) {
                //         $scope.decryptedPassword = err.message;
                //     } else {
                //         $scope.decryptedPassword = err.data.message;
                //     }
                //     $scope.showPassword = true;
                // });
            }
        }
        ]);
})();
