(function () {
    angular.module('app')
        .controller('MailboxTableSearchCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $scope.afterDeleteSelected = function () {
                $scope.entries.selected = [];
                $scope.entries.refresh();
                $scope.refreshBoxes();
            }

            $scope.refreshBoxes = function () {
                if (angular.isDefined($scope.mySystemMailboxes)) {
                    $scope.mySystemMailboxes.refresh();
                }
                if (angular.isDefined($scope.systemInboxes)) {
                    $scope.systemInboxes.refresh();
                }
                if (angular.isDefined($scope.systemOutboxes)) {
                    $scope.systemOutboxes.refresh();
                }
                if (angular.isDefined($scope.systemSentboxes)) {
                    $scope.systemSentboxes.refresh();
                }
                if (angular.isDefined($scope.systemErrorboxes)) {
                    $scope.systemErrorboxes.refresh();
                }
                if (angular.isDefined($scope.systemIntermediateboxes)) {
                    $scope.systemIntermediateboxes.refresh();
                }
                if (angular.isDefined($scope.systemArchiveboxes)) {
                    $scope.systemArchiveboxes.refresh();
                }
                if (angular.isDefined($scope.pinnedInboxes)) {
                    $scope.pinnedInboxes.refresh();
                }
                if (angular.isDefined($scope.pinnedOutboxes)) {
                    $scope.pinnedOutboxes.refresh();
                }
                if (angular.isDefined($scope.pinnedSentboxes)) {
                    $scope.pinnedSentboxes.refresh();
                }
                if (angular.isDefined($scope.pinnedErrorboxes)) {
                    $scope.pinnedErrorboxes.refresh();
                }
                if (angular.isDefined($scope.pinnedArchiveboxes)) {
                    $scope.pinnedArchiveboxes.refresh();
                }
                if (angular.isDefined($scope.pinnedIntermediateboxes)) {
                    $scope.pinnedIntermediateboxes.refresh();
                }
            }
            /* Each section will have a controller specifically for carrying the search criteria
             */


        }]);
})();
