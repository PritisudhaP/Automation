(function () {
    angular.module('app')
    .controller('NotificationsCtrl', ['$scope','$rootScope','$enApi', function($scope, $rootScope, $enApi) {
            $rootScope.notificationCount = 0;
            $scope.markRead = function (item, index) {
                $scope.toggleExpand(index);
                if (!item.read) {
                    item.read = true;
                    var read = $enApi.object({
                        name: 'notification',
                        path: '/api/v1/notification/id/'+item.id,
                        data: item,
                        method: 'get',
                        trigger: false,
                        onPut: function() {
                           $scope.notificationsUnread.get();
                        }
                    });
                    read.put();
                }
            };
            
  }]);
})();
