(function() {
    angular.module('app')
        .controller('ScriptSecurtiyCtrl', ['$scope', function($scope) {

            $scope.allowedPackages = {};
            $scope.permissionsNeeded = {};

            $scope.removeParameter = function(modelName, paramType, item) {
                var model;

                model = $scope[modelName].data[paramType]; 

                for (var key in model) {
                    if (model[key] === item) {
                        delete model[key];
                    }
                }
            };

            $scope.addAllowedPackages = function(modelName, paramType, paramObj) {
                var packageKey = paramObj.replace(/\./g, '');
                if ($scope.scriptingAction === 'new') {
                    if ($scope.scriptSecurityPolicy.data === undefined) {
                        $scope.scriptSecurityPolicy.data = {};
                        $scope.scriptSecurityPolicy.data.allowedPackages = {};
                    }
                    if ($scope.scriptSecurityPolicy.data.allowedPackages) {
                        $scope.scriptSecurityPolicy.data.allowedPackages[packageKey] = paramObj;
                    } else {
                        $scope.scriptSecurityPolicy.data.allowedPackages = {};
                        $scope.scriptSecurityPolicy.data.allowedPackages[packageKey] = paramObj;
                    }
                } else {
                    $scope.allowedPackages.data[packageKey] = paramObj;
                }
            };

            $scope.removeAllowedPackages = function(modelName, paramType, item) {
                var packageRemoved = item.replace(/\./g, '');
                delete $scope.allowedPackages.data[packageRemoved];
            };

            $scope.addPermissionsNeeded = function(modelName, paramType, paramObj) {
                 var permissionKey = paramObj.replace(/\./g, '');
                if ($scope.scriptingAction === 'new') {
                    if ($scope.scriptSecurityPolicy.data === undefined) {
                        $scope.scriptSecurityPolicy.data = {};
                        $scope.scriptSecurityPolicy.data.permissionsNeeded = {};
                    }
                    if ($scope.scriptSecurityPolicy.data.permissionsNeeded) {
                        $scope.scriptSecurityPolicy.data.permissionsNeeded[permissionKey] = paramObj;
                    } else {
                        $scope.scriptSecurityPolicy.data.permissionsNeeded = {};
                        $scope.scriptSecurityPolicy.data.permissionsNeeded[permissionKey] = paramObj;
                    }
                } else {
                    $scope.permissionsNeeded.data[permissionKey] = paramObj;
                }
            };

            $scope.removePermisssionsNeeded = function(modelName, paramType, item) {
                var permissonRemoved = item.replace(/\./g, '');
                delete $scope.permissionsNeeded.data[permissonRemoved];
            };

        }]);
})();
