(function () {
    angular.module('app')
        .controller('BlocklyScriptsCtrl', ['$scope','BlocklyService','$interval', '$rootScope', function ($scope, BlocklyService, $interval, $rootScope) {

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
                '<block type="approve_transfer_order"></block>' +
                '<block type="custom_block"></block>' +
                '<block type="controls_if"></block>' +
                '<block type="logic_compare"></block> ' +
                '<block type="controls_repeat_ext"></block> ' +
                '<block type="math_number"></block> ' +
                '<block type="math_arithmetic"></block>' +
                '<block type="text"></block> ' +
                '<block type="text_print"></block>' +
                '<block type="math_change"></block>' +
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
                $scope.$emit('jscode', {js:elem[0].innerText});
                $interval.cancel(updateWorkspace);
            });


            Blockly.Blocks['approve_transfer_order'] = {
                init: function() {
                    this.appendDummyInput()
                        .appendField("Approve Transfer Order")
                        .appendField(new Blockly.FieldVariable("orderID"), "MYVAR");
                    this.setInputsInline(false);
                    this.setColour(330);
                    this.setTooltip('');
                    this.setHelpUrl('http://www.example.com/');
                }
            };

            Blockly.JavaScript['approve_transfer_order'] = function(block) {
                var value_name = Blockly.JavaScript.valueToCode(block, 'NAME1', Blockly.JavaScript.ORDER_ATOMIC);

                var transfer_order_id = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('MYVAR'), Blockly.Variables.NAME_TYPE);

                // TODO: Assemble JavaScript into code variable.
                var transferOrderScript =
                    'var order = transferOrderService.approveTransferOrder('+ transfer_order_id +');\n\r' +
                    'var shipmentRequests = order.getShipmentRequests();\n\r'+
                    ' java.lang.System.out.println("Shipment Request Size:"+shipmentRequests.size());\n'+
                    ' for(var i = 0; i < shipmentRequests.size(); i++) {\n'+
                    ' var shipmentRequest = shipmentRequests.get(i);\n'+
                    ' var mailboxRefName = "Shipment Requests";\n'+
                    ' if(shipmentRequest.getHeader().getMailboxRefName() !== null) {\n'+
                    ' mailboxRefName = shipmentRequest.getHeader().getMailboxRefName();\n'+
                    '   }\n'+
                    '   var mailbox = scriptUtils.getMailbox(mailboxRefName);\n'+
                    '   scriptUtils.createObjectJSONMailboxEntry(mailbox,shipmentRequest, "Shipment Request for Order:"+order.getHeader().getOrderNumber()+":Request:"+shipmentRequest.getHeader().getShipmentRequestNumber(), "shipments@ghurka.com", "orders@ghurka.com");\n'+
                    '}\n'
                return transferOrderScript;
            };

            var mathChangeJson = {
                "message0": "change %1 by %2",
                "args0": [
                    {"type": "field_variable", "name": "VAR", "variable": "item"},
                    {"type": "input_value", "name": "DELTA", "check": "Number"}
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230
            };

            Blockly.Blocks['math_change'] = {
                init: function() {
                    this.jsonInit(mathChangeJson);
                    // Assign 'this' to a variable for use in the tooltip closure below.
                    var thisBlock = this;
                    this.setTooltip(function() {
                        return 'Add a number to variable "%1".'.replace('%1',
                            thisBlock.getFieldValue('VAR'));
                    });
                }
            };


            var customBlock = {
                "message0": "change %1 by %2",
                "args0": [
                    {"type": "field_variable", "name": "VAR", "variable": "item"},
                    {"type": "input_value", "name": "DELTA", "check": "Number"}
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230
            };

            Blockly.Blocks['custom_block'] = {
                init: function() {
                    this.jsonInit(customBlock);
                    // Assign 'this' to a variable for use in the tooltip closure below.
                    var thisBlock = this;
                    this.setTooltip(function() {
                        return 'Add a number to variable "%1".'.replace('%1',
                            thisBlock.getFieldValue('VAR'));
                    });
                }
            };

        }])
})();
