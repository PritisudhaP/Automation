(function() {
    angular.module('app')
        .controller('ExecuteScriptCtrl', ['$rootScope', '$scope', '$http', 'growl', function($rootScope, $scope, $http, growl) {


            $scope.executeScriptObject = {};
            $scope.isHidden = true;

            $scope.executeScript = function(inputs) {
                $scope.$loading(true, 'Executing Script..');
                if (angular.isDefined(inputs)) {
                    for (var key in inputs.data) {
                        if (inputs.data[key].value) {
                            $scope.executeScriptObject.inputs[key] = inputs.data[key].value;
                        }
                    }
                }
                if (angular.isDefined($scope.inputs.data)) {
                    for (var key in $scope.inputs.data) {
                        if ($scope.inputs.data[key].value) {
                            $scope.executeScriptObject.inputs[key] = $scope.inputs.data[key].value;
                        }
                    }
                    //$scope.executeScriptObject.inputs = $scope.inputs.data;
                }
              $http({
                url:'/api/v1/script/runScript',
                method: 'POST',
                data: $scope.executeScriptObject
              })
              .success(function(data) {
                  $scope.$loading(false);
                growl.success('Scripted has been executed');
                  $scope.showModal('integration/scripts/execution-result', data,  null);
              })
               .error(function(err, status) {
                   $scope.$loading(false);
                   if (err) {
                       growl.error('Status: ' + status + ' ' + err.message);
                   } else {
                       growl.error('An error occurred in parsing the response, please consult the console for details');
                   }
              });
            };

            $rootScope.$on('jscode', function(event, code){
                $scope.jscode = code.js;
            })

        }]);
})();
