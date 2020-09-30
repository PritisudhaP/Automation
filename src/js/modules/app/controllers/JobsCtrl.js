myApp.controller('JobsCtrl', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.errorMessage = null;
    $scope.breadCrumb = [];
    $scope.getBreadCrumb = function(obj){
        $fileService.getBreadCrumb(obj).then(function(ary){
            $scope.breadCrumb = ary
        })
    };

    // set the date options
    var DateNow = Date.now();
    $scope.dateOptions = {
        outputFormat    : 'UTC',
        displayFormat   : 'MM/dd/yyyy',
        startDate       : DateNow - 864000000,
        endDate         : DateNow + 864000000,
        mainDate        : '',
        outputDate      : '',
        emptyDate       : ''
    };

    /**
     * create empty array to store disallowed intervals
     */
    $scope.disallowedIntervals = [];

    /**
     * @function addDisallowedIntervals()
     * @description Add disallowed intervals
     * @param {string} arrayName - array that stores the intervals
     */
    $scope.addDisallowedIntervals = function(arrayName) {
        if(angular.isDefined(arrayName)) {
            $scope[arrayName].push({
                value: ''
            });
        }
    };

    $scope.setDefaultInputs = function (data) {
        if (angular.isDefined($scope.inputs.data)) {
            if (angular.isDefined(data)) {
                for (var key in $scope.inputs.data) {
                    if (angular.isDefined(data.scriptInputs) && angular.isDefined(data.scriptInputs.attributes) &&  data.scriptInputs.attributes[key]) {
                        $scope.inputs.data[key].value = data.scriptInputs.attributes[key].value;
                    }
                }

            } else if (angular.isDefined($scope.layout.data.scriptInputs) && angular.isDefined($scope.layout.data.scriptInputs.attributes)) {
                $scope.inputs.data = $scope.layout.data.scriptInputs.attributes;

                for (var key in $scope.inputs.data) {
                    if ($scope.layout.data.scriptInputs.attributes[key] === $scope.inputs.data[key]) {

                        $scope.inputs.data[key].value = $scope.layout.data.scriptInputs.attributes[key].value;
                    }
                }
            }
        }
    }

}]);
