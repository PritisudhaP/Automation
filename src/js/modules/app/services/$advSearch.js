(function () {
    'use strict';

    angular.module('app')
        .factory('$advSearch', AdvanceSearchFactory);

    function AdvanceSearchFactory($localStorage) {
        var fields = {};

        var self = {
            setFields: setFields,
            getFields: getFields,
            removeFields:removeFields
        };

        return self;

        function setFields(field, input) {
            if($localStorage['advSearchFields']) {
                fields = $localStorage['advSearchFields'];
            }
            fields[field] = input;
            $localStorage['advSearchFields'] =  fields;
        }

        function getFields(section) {
            return fields[section]
        }

        function removeFields(advSearchFields){
            delete $localStorage[advSearchFields];
            fields = {};
        }

    }

})();
