(function() {
    angular.module('app')
        .controller('BuildInvoiceCtrl', ['$scope', '$enApi', function ($scope, $enApi, $rootScope) {
            $scope.buildSelected = function(selected, type) {
                if (angular.isDefined(selected)) {
                    angular.forEach(selected, function( item ) {
                        $enApi.object({
                            'method': 'post',
                            'name': 'buildInvoice',
                            'path': '/api/v1/invoice/buildInvoiceFromShipment?shipmentId='+ item.id,
                            onBuild: function () {
                                $scope.closeModal();
                                //selected = [];
                            }
                        }).post();
                    });
                }
            };

        }]);
})();
