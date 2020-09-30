(function () {
    angular.module('app')
        .controller('AuditLogCtrl', ['$scope', '$enApi', function ($scope, $enApi) {
            var auditEvents = $enApi.object({
                name: 'auditEvents',
                path: '/api/v1/auditEvent',
                method: 'list',
                isolated:false,
                onBeforeGet: function () {
                    //$scope.searchText;
                    if ($scope.auditEvents.q === '') {
                        $scope.auditEvents.path = '/api/v1/auditEvent';
                    } else {
                        $scope.auditEvents.path = '/api/v1/auditEvent/textSearch';
                        $scope.auditEvents.params.words = $scope.auditEvents.q;
                    }
                }
            });


        }]);
})();
