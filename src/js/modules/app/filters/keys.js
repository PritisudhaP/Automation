(function() {
    angular.module('app').filter('keys', function() {
        return function(obj) {
            return Object.keys(obj);
        }
    });
})();