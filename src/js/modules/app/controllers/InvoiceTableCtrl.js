(function() {
    angular.module('app')
        .controller('InvoiceTableCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

            $scope.afterDeleteSelectedInvoices = function() {
                $scope.invoices.selected = [];
                $scope.invoices.refresh();
            };
            
            $scope.getTotalPaymentAmount = function(invoice) {
                var totalPaymentAmount = 0;
                invoice.payments.forEach(function (payment) {

                    totalPaymentAmount = totalPaymentAmount + parseFloat(payment.amount);

                })
                return totalPaymentAmount;	
            };

        }]);
})();
