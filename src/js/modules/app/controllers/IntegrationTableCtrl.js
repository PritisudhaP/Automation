(function() {
    angular.module('app')
        .controller('IntegrationTableCtrl', ['$scope', '$httpParamSerializer', '$rootScope', '$http', 'growl', '$timeout',  function ($scope, $httpParamSerializer, $rootScope, $http, growl, $timeout) {

            $scope.swaggerUrl = "/api/v1/swagger.json";
            $scope.swaggerBatchUrl = "/api/v1/batch/swagger.json";
            $scope.swaggerSecurityUrl = "/api/v1/security/swagger.json";
            $scope.swaggerRoutingUrl = "/api/v1/routing/swagger.json";
            $scope.swaggerPricingUrl = "/api/v1/pricing/swagger.json";

            $scope.updateSelectedTasks = function(tasks, data) {
                var taskIds = [];

                $rootScope.$loading(true);
                //get the id's from tasks and push it to array
                if (tasks && tasks.length) {
                    tasks.forEach(function (task, index) {
                        taskIds.push(task.id);
                    });
                }

                $http({
                    'method': 'POST',
                    'url':'/api/v1/task/bulkUpdate/' + data.status,
                    showGrowlError:false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $httpParamSerializer({taskIds: taskIds})
                })
                    .success(function () {
                        growl.success('The task(s) have been successfully updated!');
                        $scope.tasks.selected.length = 0;
                        $rootScope.$loading(false);
                    })
                    .error(function (err, status) {
                        $scope.moveError = err.message;
                        $rootScope.$loading(false);
                    })
                    .finally(function () {
                        $scope.tasks.refresh();
                        if (angular.isDefined(data.ownerName)) {
                            $scope.assignOwner(tasks, data.ownerName);
                        }

                    });

            };
            $scope.assignOwner = function (tasks, owner) {
                for (var i = 0; i < tasks.length; i++) {
                        tasks[i].ownerName = owner;
                    var addOwner = $enApi.object({
                        name: 'addTag',
                        path: '/api/v1/task/id/'+task[i].id,
                        data: task[i],
                        method: 'get',
                        trigger: false,
                        onPut: function () {
                            $scope.tasks.selected = [];
                            $scope.tasks.get();
                        }
                    });
                    addOwner.put();
                }


            }
            $scope.afterDeleteSelectedPurge = function() {
                $scope.purgeRetentionPolicy.selected = [];
                $scope.purgeRetentionPolicy.refresh();
            };

            $scope.afterDeleteSelectedTransmission = function() {
                $scope.transmission.selected = [];
                $scope.transmission.refresh();
            };

            $scope.afterDeleteSelectedScript = function() {
                $scope.scripts.selected = [];
                $scope.scripts.refresh();
            };

            $scope.afterDeleteSelectedScriptSecurityPolicies = function() {
                $scope.scriptSecurityPolicies.selected = [];
                $scope.scriptSecurityPolicies.refresh();
            };

            $scope.afterDeleteSelectedScriptTypes = function() {
                $scope.scriptTypes.selected = [];
                $scope.scriptTypes.refresh();
            };


            $scope.afterDeleteSelectedWebhook = function() {
                $scope.webhooks.selected = [];
                $scope.webhooks.refresh();

            }

            $scope.afterDeleteSelectedTrigger = function() {
                $scope.triggers.selected = [];
                $scope.triggers.refresh();
            }

            $scope.applySelected = function (selected) {
                $scope.data.ownerName = selected.firstName + ' ' + selected.lastName;
            }

            /* Each section will have a controller specifically for carrying the search criteria
            */


        }]);
})();
