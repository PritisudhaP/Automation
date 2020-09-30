(function() {
    angular.module('app')
        .controller('CertificateCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

            $scope.documentContents = '';
            $scope.showDocumentView = false;
            $scope.hrefAddress = '';

            /**
            * viewCertificate() view certificate
            *
            */
            $scope.viewCertificate = function() {
              $scope.showDocumentView = !$scope.showDocumentView;
            };
        }]);
})();
