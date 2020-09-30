/**
 * Created by lava on 23/08/16.
 */

angular.module("enspire-blockly", [])
    .provider("enBlockly", function () {

        this.$get = function () {
            var localOptions = this.options;
            return {
                getOptions: function () {
                    return localOptions;
                }
            };
        };

        this.setOptions = function (options) {
            this.options = options;
        };
    })

    .service('BlocklyService', function ($timeout) {
        'use strict';
        var me = this;
        this.holdoffChanges = false;
        this.setWorkspace = function (workspace) {
            if (Blockly.getMainWorkspace() != null && Blockly.getMainWorkspace().topBlocks_.length != 0) {
                Blockly.getMainWorkspace().clear();
            }
            Blockly.Json.setWorkspace(Blockly.getMainWorkspace(), workspace);

            // Blockly sends an immediate change - we want to filter this out
            me.holdoffChanges = true;
            $timeout(function () {
                me.holdoffChanges = false;
            }, 500);
        };

        this.clearWorkspace = function () {
            if (Blockly.getMainWorkspace() != null && Blockly.getMainWorkspace().topBlocks_.length != 0) {
                Blockly.getMainWorkspace().clear();
            }
        };


        this.getWorkspace = function () {
            return Blockly.JavaScript.getWorkspace(Blockly.getMainWorkspace());
        };

        this.generateCode = function(){
            return Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
        }

        this.setToolbox = function (toolbox) {
            return Blockly.Json.getWorkspace(Blockly.getMainWorkspace());
        };

        this.onChange = function (callback) {
            angular.element(Blockly.mainWorkspace.getCanvas()).bind("blocklyWorkspaceChange", function () {
                if (me.holdoffChanges === false) {
                    // Send a notification
                    callback(Blockly.getMainWorkspace());
                }
            });

           // callback(Blockly.getMainWorkspace());

        };
    })

    .directive('enBlockly', function ($window, $timeout, $rootScope, enBlockly,BlocklyService) {
        return {
            restrict: 'E',
            scope: {
                 workspace:'=',
            },
            template: '<div style="width:100%;height:100%" class="ng-blockly"></div>',
            link: function ($scope, element, attrs) {
                var options = enBlockly.getOptions();
                var javascriptWorkspace =  Blockly.inject(element.children()[0], options);
                Blockly.JavaScript.addReservedWords('code');
                console.log(Blockly.JavaScript.workspaceToCode(javascriptWorkspace));
                $scope.workspace =  Blockly.JavaScript.workspaceToCode(javascriptWorkspace);

            }
        };
    });
