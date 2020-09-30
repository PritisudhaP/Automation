myApp.controller('NotesCtrl', ['$scope', 'hotkeys', function($scope, hotkeys) {

    $scope.options = [
        {
            name: 'Informational',
            value: "INFO"
        },
        {
            name: 'Packing Instructions',
            value: 'PACKING_INSTRUCTIONS'
        },
        {
            name : "Shipping Instructions",
            value: "SHIPPING_INSTRUCTIONS"
        },
        {
            name : "Customer Care",
            value: "CUSTOMER_CARE"
        },
        {
            name: "Other",
            value: "OTHER"
        }
    ];

    $scope.selectedOption = $scope.options[0].value;

    $scope.addNoteTime = function(){
        $scope.note.dateTimeCreated = new Date();
    };

    hotkeys.bindTo($scope).add({
        combo: 'esc',
        description: 'Close',
        callback: function() {
            $scope.closeModal();
        }
    });



}]);
