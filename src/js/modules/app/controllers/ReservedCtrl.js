(function() {
    angular.module('app')
        .controller('ReservedCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {


            /**
            * routeTo() reserved routing
            *
            */
            $scope.routeTo = function(item) {
              console.log(item);
              if(item.sourceType === 'TransferOrder'){
                $scope.showScreen('/orders/transfers/'+item.sourceId+'/');

              } else if (item.sourceType === 'SalesOrder'){
                $scope.showScreen('/orders/sales/'+item.sourceId+'/');
              }
              $scope.closeModal();
            };
        }]);
})();
