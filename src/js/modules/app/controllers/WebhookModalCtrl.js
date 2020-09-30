myApp.controller('WebhookModalCtrl', ['$rootScope', '$scope', '$enspirePermissions', function($rootScope, $scope, $enspirePermissions) {

   $scope.requestHeaders =  JSON.stringify($scope.data.requestHeaders);
   $scope.responseHeaders =  JSON.stringify($scope.data.responseHeaders);

}
]);
