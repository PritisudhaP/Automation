(function(){
    'use strict';

    angular.module('app').directive('iframeSetDimensionsOnload', [function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.on('load', function(){
                /* Set the dimensions here */
                var iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 50 +'px';
                var iFrameWidth = '100%';
                element.css('width', iFrameWidth);
                element.css('height', iFrameHeight);
            });
        }
    }}])

})();
