(function() {
    angular.module('app').filter('urlencode', function() {
        return function(obj) {
            return encodeURIComponent(obj)
                .replace(/!/g, '%21')
                .replace(/'/g, '%27')
                .replace(/\(/g, '%28')
                .replace(/\)/g, '%29')
                .replace(/\*/g, '%2A');
        }
    });
})();
