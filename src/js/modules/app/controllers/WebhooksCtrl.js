myApp.controller('WebhooksCtrl', ['$rootScope', '$scope', '$enspirePermissions', '$http', 'growl', function($rootScope, $scope, $enspirePermissions, $http, growl) {
    $scope.objectDataDomainsList = $enspirePermissions.getDataDomains();

    $scope.customerParams = {};

    $scope.deleteFormParameter = function(key) {

        delete $scope.webhook.data.oauthClientCredential.customFormParameters[key];
    };

    $scope.resetEventSpecificFields = function() {
        if (!$scope.webhook.data.event.length || !$scope.webhook.data.event.startsWith("MailboxEntry")) {
            delete $scope.webhook.data.mailboxRefNameRegex;
        }
    };

    $scope.addFormParameters = function(data) {
        if ($scope.webhook.data.oauthClientCredential) {
            if ($scope.webhook.data.oauthClientCredential.customFormParameters) {} else {
                $scope.webhook.data.oauthClientCredential.customFormParameters = {};
            }
        } else {
            $scope.webhook.data.oauthClientCredential = {};
            $scope.webhook.data.oauthClientCredential.customFormParameters = {};
        }

        $scope.webhook.data.oauthClientCredential.customFormParameters[data.key] = data.value;
    };

    $scope.resend = function(item) {

        var url = '/api/v1/webhookAttempt/id/' + item.id + '/resend';

        $http({
                'method': 'GET',
                'url': url
            })
            .success(function(data) {
                $scope.webhookAttempt.get();
            }).error(function(err, status) {
                growl.error('Status: ' + status + ' ' + err);
            })
            .finally(function() {

            });
    };

}]);
