/**
 * Created by PMishra on 9/29/16.
 */


(function() {
    angular.module('app').filter('isTrue', function() {
        return function(text) {
            if (text===true) {
                return 'Yes';
            }
            return 'No';
        }
    });
})();
