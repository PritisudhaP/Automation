(function() {
    angular.module('app')
        .controller('AccountTableCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

            /* Each section will have a controller specifically for carrying the search criteria
            */
            $scope.afterDeleteSelectedUser = function() {
                $scope.users.selected = [];
                $scope.users.refresh();
            }
            $scope.afterDeleteSelectedRole = function() {
                $scope.roles.selected = [];
                $scope.roles.refresh();
            }

        }]);
})();
