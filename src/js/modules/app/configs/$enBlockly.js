(function () {
    'use strict';
    angular.module('app').config(['enBlocklyProvider',function(enBlocklyProvider) {

        enBlocklyProvider.setOptions({
            path: "assets/images/",
            trashcan: true,
            sounds:false,
            toolbox: ' <xml id="toolbox" style="display: none"> <block type="controls_if"></block> <block type="logic_compare"></block> <block type="controls_repeat_ext"></block> <block type="math_number"></block> <block type="math_arithmetic"></block> <block type="text"></block> <block type="text_print"></block> </xml>',
            zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            }
        })
    }]);
})();

