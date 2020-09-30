(function(){
    'use strict';

    angular.module('app').directive('iframeOnload', [function(){
        return {
            scope: {
                callBack: '&iframeOnload'
            },
            link: function(scope, element, attrs){
                element.on('load', function(){
                    return scope.callBack();
                })

                scope.$on('$destroy', function() { element.off('load'); })
            }
        }}])

})();
