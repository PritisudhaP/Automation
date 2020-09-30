(function() {
    angular.module('app')
        .controller('ConfigurationTableCtrl', ['$scope', function($scope) {

            $scope.afterDeleteSelectedSftpUser = function() {
                $scope.sftpUsers.selected = [];
                $scope.sftpUsers.refresh();
            };


        }]);
})();
