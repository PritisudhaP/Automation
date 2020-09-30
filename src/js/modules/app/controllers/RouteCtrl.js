(function () {
    angular.module('app')
        .controller('RouteCtrl', ['$rootScope', '$scope', '$http', 'growl', '$enApi', function ($rootScope, $scope, $http, growl, $enApi) {
            $scope.currentDomain = $rootScope.authUser.data.dataDomains[0];

            /**
             * executeRoute() executes selected route
             *
             */
            $scope.executeRoute = function (row) {
                $http({
                    url: '/api/v1/routing/routeDef/' + row.refName + '/start',
                    params: {'domainName': row.dataDomains[0]},
                    method: 'GET'
                })
                    .success(function (data) {
                        growl.success('The route has been successfully executed!');
                        $scope.routeDef.refresh();
                    })
                    .error(function (err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };

            $scope.executeTaggedRoute = function () {
                $http({
                    ///api/v1/routing/routeDef/OMS/startByTagName?dataDomain=com.ghurka
                    url: '/api/v1/routing/routeDef/' + $scope.selectedTag + '/startByTagName?dataDomain=' + $scope.currentDomain,
                    method: 'GET'
                })
                    .success(function (data) {
                        growl.success('Batch route has been successfully executed!');
                        $scope.routeDef.refresh();
                    })
                    .error(function (err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };
            $scope.executeBulkRoute = function (action) {
                angular.forEach($scope.routeDef.selected, function(route) {
                    if (!action || action ==='start') {
                        $http({
                            url: '/api/v1/routing/routeDef/' + route.refName + '/start',
                            params: {'domainName': route.dataDomains[0]},
                            method: 'GET'
                        })
                        .success(function (data) {
                                $scope.routeDef.refresh();

                        })
                        .error(function (err, status) {
                            growl.error('Status: ' + status + ' ' + err);
                        });
                    } else if (action ==='pause') {
                        $http({
                            url: '/api/v1/routing/routeDef/' + route.refName + '/pause',
                            params: {'domainName': route.dataDomains[0]},
                            method: 'GET'
                        })
                            .success(function (data) {
                                $scope.routeDef.refresh();

                            })
                            .error(function (err, status) {
                                growl.error('Status: ' + status + ' ' + err);
                            });
                    } else if (action ==='stop') {
                        $http({
                            url: '/api/v1/routing/routeDef/' + route.refName + '/stop',
                            params: {'domainName': route.dataDomains[0]},
                            method: 'GET'
                        })
                            .success(function (data) {
                                $scope.routeDef.refresh();

                            })
                            .error(function (err, status) {
                                growl.error('Status: ' + status + ' ' + err);
                            });
                    }

                });

                $scope.routeDef.selected = [];

            };

            $scope.pauseTaggedRoute = function () {
                $http({
                    ///api/v1/routing/routeDef/OMS/startByTagName?dataDomain=com.ghurka
                    url: '/api/v1/routing/routeDef/' + $scope.selectedTag + '/pauseByTagName?dataDomain=' + $scope.currentDomain,
                    method: 'GET'
                })
                    .success(function (data) {
                        growl.success('Batch route has been successfully paused!');
                        $scope.routeDef.refresh();
                    })
                    .error(function (err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };

            $scope.stopTaggedRoute = function () {
                $http({
                    ///api/v1/routing/routeDef/OMS/startByTagName?dataDomain=com.ghurka
                    url: '/api/v1/routing/routeDef/' + $scope.selectedTag + '/stopByTagName?dataDomain=' + $scope.currentDomain,
                    method: 'GET'
                })
                    .success(function (data) {
                        growl.success('Batch route has been successfully stopped!');
                        $scope.routeDef.refresh();
                    })
                    .error(function (err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };

            /**
             * pauseRoute() pauses selected route
             *
             */
            $scope.pauseRoute = function (row) {
                $http({
                    url: '/api/v1/routing/routeDef/' + row.refName + '/pause',
                    params: {'domainName': row.dataDomains[0]},
                    method: 'GET'
                })
                    .success(function (data) {
                        growl.info('The route has been successfully paused!');
                        $scope.routeDef.refresh();
                    })
                    .error(function (err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };

            /**
             * stopRoute() stops selected route
             *
             */
            $scope.stopRoute = function (row) {
                $http({
                    url: '/api/v1/routing/routeDef/' + row.refName + '/stop',
                    params: {'domainName': row.dataDomains[0]},
                    method: 'GET'
                })
                    .success(function (data) {
                        growl.warning('The route has been successfully stopped!');
                        $scope.routeDef.refresh();
                    })
                    .error(function (err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };
            $scope.filterDomains = function () {
                $scope.domains = {};
                if (angular.isDefined($scope.orgs.data)) {
                    angular.forEach($scope.orgs.data, function (org) {
                        $scope.domains[org.dataDomains[0]] = org.dataDomains[0];
                    });
                }
            };
            $scope.afterDeleteSelected = function() {
                $scope.routeDef.selected = [];
                $scope.routeDef.refresh();
            };
            $scope.addTags = function (selected, config) {
                for (var i = 0; i < selected.length; i++) {
                    if (!angular.isDefined(selected[i].tags)) {
                        selected[i].tags = [];
                    }
                    if (config.replace) {
                        selected[i].tags = config.tags;
                    } else {
                        for (var j = 0; j < config.tags.length; j++) {
                            selected[i].tags.push(config.tags[j]);
                        }
                    }
                    var addTag = $enApi.object({
                        name: 'addTag',
                        path: '/api/v1/routing/routeDef/id/'+selected[i].id,
                        data: selected[i],
                        method: 'get',
                        trigger: false,
                        onPut: function () {
                            $scope.routeDef.selected = [];
                            $scope.routeDef.get();
                        }
                    });
                    addTag.put();
                }
            }

            $rootScope.$on('xmlcode', function(event, code){
                $scope.xmlcode = code.xml;
            })
        }]);
})();
