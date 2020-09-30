(function() {
    angular.module('app')
        .controller('PrintCtrl', ['$scope', function($scope,$rootScope) {

       $scope.printLabels = function() {
            var content = document.getElementsByClassName('labelPrint')[0].innerHTML;
            var labelWin = window.open('', 'print_content', 'width=1000,height=600');
            labelWin.document.open();
            labelWin.document.write('<html><head><style>.shippingLabel{width:384px !important; display:block !important;}</style>' +
            '</head><body onload="window.print()" style="width:384px;"><div>' + content + '</div></body></html');
            // pwin.document.close();
            // pwin.focus();
            labelWin.print();
            labelWin.close();
            //setTimeout(function() { pwin.document.close(); }, 5000);
        };

        $scope.printPdf = function(data){
            if(angular.isArray(data)) {
            	window.open("data:application/pdf;base64,"  + data[0].label.label);
        	} else {
        		window.open("data:application/pdf;base64,"  + data.label.label);
        	}
        };

        $scope.printPdfPackingSlip = function(data){
            if(angular.isArray(data)) {
            	window.open("data:application/pdf;base64,"  + (data[0].packingSlip.slip));
            } else {
            	window.open("data:application/pdf;base64,"  + (data.packingSlip.slip));
            }
        };

        $scope.printPdfUccLabel = function(data){
            if(angular.isArray(data)) {
            	window.open("data:application/pdf;base64,"  + (data[0].uccLabel.label));
            } else {
            	window.open("data:application/pdf;base64,"  + (data.uccLabel.label));
            }
        };

        }]);
})();
