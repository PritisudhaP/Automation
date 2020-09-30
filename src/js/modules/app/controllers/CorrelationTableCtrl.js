(function() {
    angular.module('app')
        .controller('CorrelationTableCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
            $scope.isArray = angular.isArray;

        }]);
})();
