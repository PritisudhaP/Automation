(function() {
    angular.module('app')
        .controller('BatchJobCtrl', ['$rootScope', '$scope', '$http', 'growl', function($rootScope, $scope, $http, growl) {
            $scope.currentDomain = $rootScope.authUser.data.dataDomains[0];


            /**
             * getInputs() fetches the script inputs
             */
            $scope.getInputs = function(inputs) {

                if (inputs && inputs.attributes) {
                    $scope.inputs = [];
                    Object.keys(inputs.attributes).forEach(function(attribute) {
                        $scope.inputs.push(inputs.attributes[attribute]);
                    });
                }
            };



            /**
             * setDefaultInputs() set default inputs for batch job definition if it is script based
             */

            $scope.setDefaultInputs = function() {
                if ($scope.batchJobDef.data.executionType === 'SCRIPT') {

                    if ($scope.batchJobDef.data.scriptRef.scriptTypeObjRef) {
                        delete $scope.batchJobDef.data.scriptRef.scriptTypeObjRef;
                    }

                    var obj = {
                        name: "",
                        attributes: {}
                    };
                    (function() {
                        $scope.inputs.forEach(function(attribute) {
                            obj.name = attribute.refName;
                            obj.attributes[attribute.refName] = attribute;
                        });
                    })();

                    $scope.batchJobDef.data.defaultScriptInputs = obj;

                }
            };


            /**
             * executeJob() executes selected job
             *
             */
            $scope.executeJob = function(row) {
                $http({
                    url: '/api/v1/batch/job/run/refName/' + row.refName + '/dataDomain/' + row.dataDomains[0],
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {}
                })
                    .success(function(data) {
                        growl.success('The job has been submitted successfully for execution!');
                        $scope.batchJobDef.refresh();
                    })
                    .error(function(err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };


            /**
             * stopJob() stops selected job
             *
             */
            $scope.stopJob = function(row) {
                $http({
                    url: '/api/v1/batch/job/stop/executionId/' + row.executionId,
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {}
                })
                    .success(function(data) {
                        growl.warning('The job has been successfully stopped!');
                        $scope.batchJobDef.refresh();
                    })
                    .error(function(err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };
            $scope.filterDomains = function() {
                $scope.domains = {};
                if (angular.isDefined($scope.orgs.data)) {
                    angular.forEach($scope.orgs.data, function(org) {
                        $scope.domains[org.dataDomains[0]] = org.dataDomains[0];
                    });
                }
            };
            $scope.afterDeleteSelected = function() {
                $scope.batchJobDef.selected = [];
                $scope.batchJobDef.refresh();
            };

            $rootScope.$on('xmlcode', function(event, code) {
                $scope.xmlcode = code.xml;
            })
        }]);
})();
