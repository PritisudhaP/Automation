(function () {
    angular.module('app')
        .controller('BlocklyRoutesCtrl', ['$scope','BlocklyService','$interval', '$rootScope', function ($scope, BlocklyService, $interval, $rootScope) {

            //TODO: Move everything to enBlockly provider and enBlocklyService
            var options = {
                path: "assets/images/",
                trashcan: true,
                sounds:false,
                grid:
                {   spacing: 20,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                },
                toolbox: ' <xml id="toolbox" style="display: none;"> ' +
                '<block type="move_sales_order"></block>' +
                '<block type="route"></block>' +
                '<block type="text"></block>' +
                ' </xml>',
                zoom:
                {
                    controls: true,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2
                }
            };


            var javascriptWorkspace =  Blockly.inject(angular.element(document.querySelector('#blockly-blocks'))[0], options);

            $scope.workspace =  Blockly.JavaScript.workspaceToCode(javascriptWorkspace);

            //TODO: Replace this with onchange event
            var elem = angular.element(document.querySelector('#blockly-output'));
            var updateWorkspace =    $interval(function () {
                elem.text(Blockly.JavaScript.workspaceToCode(javascriptWorkspace));
             }, 1000);


            elem.on('$destroy', function() {
                $scope.$emit('xmlcode', {xml:elem[0].innerText});
                $interval.cancel(updateWorkspace);
            });

            Blockly.Blocks['move_sales_order'] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Move Test Sales Order")
                    this.setInputsInline(false);
                    this.setColour(250);
                    this.setTooltip('');
                    this.setHelpUrl('http://www.example.com/');
                }
            };

            Blockly.JavaScript['move_sales_order'] = function(block) {
                var moveTestSalesOrder =
                    '<routes  xmlns="http://camel.apache.org/schema/spring"> \n' +
                    '<route  id="com.petsmart.DEMO-moveTestSalesOrder" autoStartup="false"> \n'+
                    '<from uri="b2bmbFileSystem://com.petsmart/test-salesOrder?delay=12000"/> \n'+
                    '<to uri="b2bmbMailBox://com.petsmart/PurchaseOrder-Valid?to=orders@petsmart.com&amp;from=vendor@petsmart.com&amp;subject=Dropship Order" /> \n'+
                    '</route> \n'+
                    '</routes>'
                return moveTestSalesOrder;
            };

            Blockly.Blocks['route'] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Route");
                    this.appendDummyInput()
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField("From");
                    this.appendValueInput("From")
                        .setCheck(null);
                    this.appendDummyInput()
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField("Process");
                    this.appendValueInput("Process")
                        .setCheck(null);
                    this.appendDummyInput()
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField("To");
                    this.appendValueInput("To")
                        .setCheck(null);
                    this.setColour(330);
                    this.setTooltip('');
                    this.setHelpUrl('http://www.example.com/');
                }
            };

            Blockly.JavaScript['route'] = function(block) {
                var from = Blockly.JavaScript.valueToCode(block, 'From', Blockly.JavaScript.ORDER_ATOMIC);
                var process = Blockly.JavaScript.valueToCode(block, 'Process', Blockly.JavaScript.ORDER_ATOMIC);
                var to = Blockly.JavaScript.valueToCode(block, 'To', Blockly.JavaScript.ORDER_ATOMIC);
                // TODO: Assemble JavaScript into code variable.
                var moveTestSalesOrder =
                    '<routes  xmlns="http://camel.apache.org/schema/spring"> \n' +
                    '<route  id="com.petsmart.DEMO-moveTestSalesOrder" autoStartup="false"> \n'+
                    '<from uri='+from+'/> \n'+
                    '<to uri='+to+'/> \n'+
                    '</route> \n'+
                    '</routes>'
                return moveTestSalesOrder;
            };




        }])
})();
