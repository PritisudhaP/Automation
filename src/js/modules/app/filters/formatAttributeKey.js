(function() {
    angular.module('app').filter('formatAttributeKey', function() {
        return function(text) {
            var str = text.replace(/_/g, ' ');
            return str.toLowerCase();
        }
    });
})();