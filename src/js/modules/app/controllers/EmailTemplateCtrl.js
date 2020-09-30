(function() {
    angular.module('app')
        .controller('EmailTemplateCtrl', ['$scope', '$enApi', function($scope, $enApi) {
            $scope.template = {
                body:  ''
            };
            $scope.runConfigTemplate = {
                to:  '',
                from: '',
                subject: '',
                inputs: {}
            };
            $scope.updateInputs = function (emailType) {
                if (angular.isDefined(emailType)) {
                    if (angular.isDefined($scope.emailConfig.data)) {
                        $scope.emailConfig.data.emailTypeId = emailType.id;
                        if (angular.isDefined($scope.inputs)) {
                            $scope.inputs.get();
                        }
                    }
                }
            };
            $scope.prepareRenderData = function () {
                if (angular.isDefined($scope.runConfig.data)) {
                    if (angular.isDefined($scope.inputs.data && $scope.inputs.data.inputs)) {
                        $scope.runConfig.data.inputs = $scope.inputs.data.inputs.attributes;
                    }

                    if (angular.isDefined($scope.emailConfig.data)) {
                        $scope.render.data = {
                            'emailConfig': $scope.emailConfig.data,
                            'runConfig': $scope.runConfig.data
                        }
                    }
                }
            };
            $scope.saveAll = function () {
                if (angular.isDefined($scope.emailConfig.data)) {
                    if ($scope.emailAction === 'edit') {
                        $scope.emailConfig.onPut = function (data) {
                            if (angular.isDefined($scope.runConfig.data)) {
                                if (angular.isDefined($scope.inputs.data)) {
                                    $scope.runConfig.data.inputs = $scope.inputs.data;
                                }
                                $scope.runConfig.put();
                            }
                        };
                        $scope.emailConfig.put();
                    } else {
                        $scope.emailConfig.onPost = function (data) {
                            if (angular.isDefined($scope.runConfig.data)) {
                                $scope.runConfig.data.displayName = $scope.emailConfig.data.displayName + ' Run Config';
                                $scope.runConfig.data.refName = $scope.emailConfig.data.refName + 'RunConfig';
                                $scope.runConfig.data.templateId = $scope.emailConfig.data.id;

                                if (angular.isDefined($scope.inputs.data)) {
                                    $scope.runConfig.data.inputs = $scope.inputs.data;
                                }
                                $scope.runConfig.post();
                            }
                        };
                        $scope.emailConfig.post() ;
                    }
                }


            }

        }]);
})();
