(function() {
    angular.module('app')
        .controller('DeleteCtrl', ['$scope', '$enApi','$rootScope', function ($scope, $enApi, $rootScope) {
            $scope.deleteSelected = function(selected, type, namespace,plural) {
                $rootScope.$loading(true);
                if (angular.isDefined(selected)) {
                    var idList = [];
                    angular.forEach(selected, function( item ) {
                        idList.push(item.id);
                    });
                    var path = (typeof namespace === 'undefined')?'/api/v1/'+ type + '/ids':'/api/v1/' + namespace + '/' + type + '/ids'
                    $enApi.object({
                        'method': 'delete',
                        'name': 'deleteObject',
                        'path':path,
                        'params':{'ids': idList},
                        onDelete: function () {
                            $scope.closeModal();
                            $rootScope.$loading(false);
                            if (!plural) {
                                var pluralType = type + 's';
                                if ($rootScope[type]) {
                                    $rootScope[type].selected = [];
                                } else if ($rootScope[pluralType]) {
                                    $rootScope[pluralType].selected = [];
                                }
                            } else {
                                $rootScope[plural].selected = [];
                            }
                        }
                    }).delete();
                }
            };

        }])
})();
