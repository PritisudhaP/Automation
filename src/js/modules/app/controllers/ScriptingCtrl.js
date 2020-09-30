(function() {
    angular.module('app')
        .controller('ScriptingCtrl', ['$scope', function($scope) {


            $scope.reset = function(){
                $scope.scriptType.data.inputs.attributes = {};
                $scope.form.$setPristine();
            }

            $scope.addInputAttributes = function(event, eventType, when){

                var inputAttr = event+":"+ when +":"+eventType

                if($scope.scriptingAction === 'new'){
                    $scope.scriptType.data.inputs.attributes = {};
                }

                var camelCaseEvent = event.charAt(0).toLowerCase() + event.substr(1);

                $scope.scriptType.data.inputs.attributes[camelCaseEvent] = {
                    "refName":camelCaseEvent,
                    "label":camelCaseEvent,
                    "type":"Object"
                }

                $scope.scriptType.data.eventType = inputAttr;

                $scope.form.$setPristine();

            }

            /**
             * @function addParameter()
             * @param {string} modelName - model name
             * @param {string} paramType - parameter obj name
             * @param {Object} paramObj - parameter obj
             */
            $scope.addParameter = function(modelName, paramType, paramObj) {
                var model;

                if (paramType === 'inputs' || paramType === 'outputs') {
                    if (!$scope[modelName].data || !$scope[modelName].data[paramType] || !$scope[modelName].data[paramType].attributes) {
                        $scope[modelName].data[paramType] = {};
                        $scope[modelName].data[paramType].attributes = {};
                    }
                    model = $scope[modelName].data[paramType].attributes;
                } else {
                    model = $scope[modelName].data[paramType];
                }

                if(paramObj.required === '') {
                    paramObj.required = false;
                }

                if($scope.scriptingAction === 'edit') {
                    for (var key in model) {
                        var obj = model[key];
                        model[key] = obj;
                    }
                }

                var attrRefName;

                switch (paramType) {
                    case "allowedPackages":
                        attrRefName = paramObj.replace(/\./g, '');
                        model[attrRefName] = angular.copy(paramObj);
                        break;
                    case "permissionsNeeded":
                        model[paramObj] = angular.copy(paramObj);
                        break;
                    case "scriptContextObjects":
                        attrRefName = paramObj.name;
                        model[attrRefName] = angular.copy(paramObj);

                        break;
                    default:
                        attrRefName = paramObj.refName;
                        model[attrRefName] = angular.copy(paramObj);
                }

                // reset form fields
                $scope.permissionsNeededValue = '';
                $scope.allowedPackagesValue = '';
                paramObj.required=false;
                if (typeof paramObj.serviceName !== "undefined" )
                {
                    delete paramObj.serviceName;
                }

                if (typeof paramObj.modelName !== "undefined")
                {
                    delete paramObj.modelName;
                }

                if (typeof paramObj.parameterName !== "undefined")
                {
                    delete paramObj.parameterName;
                }

                if(paramType === "scriptContextObjects") {
                	delete paramObj.required;
                    $scope.scriptContextObjectsObj = {};
                }
                if (paramType === 'inputs') {
                    $scope.inputsObj = {};
                } else
                if (paramType === 'outputs') {
                    $scope.outputsObj = {};
                }
                $scope.form.$setPristine();

            };

            /**
             * @function removeParameter()
             * @param {string} modelName - model name
             * @param {string} paramType - parameter obj name
             * @param {Object} item - parameter obj
             */
            $scope.removeParameter = function(modelName, paramType, item) {
                var model;

                if (paramType === 'inputs' || paramType === 'outputs') {
                    model = $scope[modelName].data[paramType].attributes;
                } else {
                    model = $scope[modelName].data[paramType];
                }
                for (var key in model) {
                    if(model[key] === item) {
                        delete model[key];
                    }
                }
            };

            $scope.composeEventType = function() {
                if (angular.isDefined($scope.eventStr)) {
                    var str = eventStr.objectType + ':' + eventStr.position + ':' + eventStr.action;
                    if (!angular.isDefined($scope.scriptType.data)) {
                        $scope.scriptType.data = {};
                    }
                    $scope.scriptType.data.eventType = str;
                }
            };;;
            $scope.editParameter = function (modelName, paramType, item) {
                if (paramType === 'inputs') {
                    $scope.inputsObj = $scope[modelName].data[paramType].attributes[item.refName];
                } else
                if (paramType === 'outputs') {
                    $scope.outputsObj = $scope[modelName].data[paramType].attributes[item.refName];
                } else
                if (paramType === 'scriptContextObjects') {
                    $scope.scriptContextObjectsObj = $scope[modelName].data[paramType][item.name];
                }
            };;;

            $scope.scriptTemplate = {
                refName: '',
                dynAttributes: {},
                inputs: {
                    attributes: {}
                },
                outputs: {
                    attributes: {}
                },
                scriptContextObjects : {}
            };
            $scope.emailTemplate = {
                refName: '',
                dynAttributes: {},
                inputs: {
                    attributes: {}
                },
            };


        }]);
})();
