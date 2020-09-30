(function() {
    angular.module('app').filter('label', function () {
        return function (item, testCase) {
            if (!item) { return ''; }
            var value =  item.trim().split('_').join(' ').toLowerCase();
            switch (testCase) {
                case 'lower':
                    return value;
                    break;

                case 'camel':
                    return  value.replace(/\b./g, function(m){ return m.toUpperCase(); });
                    break;

                default:
                    return value.toUpperCase();
                    break;
            }
        };
    });
})();
