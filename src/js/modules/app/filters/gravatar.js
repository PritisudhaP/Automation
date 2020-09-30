(function() {
    angular.module('app').filter("gravatar", [ "$md5", function($md5) {
        var cache = {};
        return function(text, defaultText) {
            if (!cache[text]) {
                defaultText = defaultText ? $md5.createHash(defaultText.toString().toLowerCase()) : "";
                cache[text] = text ? $md5.createHash(text.toString().toLowerCase()) : defaultText;
            }
            return 'http://www.gravatar.com/avatar/'+cache[text]+'?r=pg&d=mm';
        };
    } ]);
})();
