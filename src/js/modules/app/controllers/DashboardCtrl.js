(function() {
    angular.module('app')
        .controller('DashboardCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.models = {
      selected: null,
      'lists': {
        'A': [],
        'B': [] }
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: 'Item A' + i});
        $scope.models.lists.B.push({label: 'Item B' + i});
    }

    $scope.addWidget = function (widget) {
        if (!angular.isDefined($scope.dashboard.data)) {
            $scope.dashboard.data = {};
        }
        if (!angular.isDefined($scope.dashboard.data.widgets)) {
            $scope.dashboard.data.widgets = [];
        }
        $scope.dashboard.data.widgets.push(widget);
    };

    $scope.editWidget = function (widget, index) {
        if (angular.isDefined($scope.dashboard.data.widgets)) {
            $scope.dashboard.data.widgets[index] = widget;
        }
    }
    $scope.selectWidgets = function (selected) {
        if (!angular.isDefined($scope.dashboard.data)) {
            $scope.dashboard.data = {};
        }
        if (!angular.isDefined($scope.dashboard.data.widgets)) {
            $scope.dashboard.data.widgets = [];
        }
        for (var i = 0; i < selected.length; i++ )
        {
            $scope.dashboard.data.widgets.push(selected[i]);
        }
    };

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);


  }]);
})();
