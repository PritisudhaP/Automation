(function() {
    angular.module('app')
        .controller('SharedCtrl', ['$scope', '$enApi', function($scope, $enApi) {
            $scope.today = new Date();

            $scope.changeDates = function(items, newDate, target, objectType) {
                if (angular.isDefined(items) &&
                    angular.isDefined(newDate) &&
                    angular.isDefined(target) &&
                    angular.isDefined(objectType)) {
                    var path = target.split('.');
                    angular.forEach(items, function(item) {
                        if (path.length === 1) {
                            item[target] = newDate;
                        } else {
                            var i = 0,
                                len = path.length - 1;
                            var targetAttr = item;
                            for (; i < len; i++) {
                                targetAttr = targetAttr[path[i]];
                            }
                            targetAttr[path[i]] = newDate;
                            if (path.length===2) {
                               item[path[0]] = targetAttr;
                            }
                        }
                        $scope.saved = $enApi.object({
                            name: 'saved',
                            path: '/api/v1/' + objectType + '/id/' + item.id,
                            method: 'put',
                            trigger: false,
                            onPut: function () {
                                $scope.closeModal();

                            }
                        });
                        $scope.saved.data = item;
                        $scope.saved.put();
                    });

                }
            }
        }]);
})();
