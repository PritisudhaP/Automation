(function() {
    angular.module('app')
        .controller('CsvCtrl', ['$scope', function($scope) {
            $scope.getData = function() {
                if ($scope.config.columns.length) {
                    $scope.applyColumns();
                    return $scope.mappedData;
                } else {
                    $scope.applyAllColumns();
                    return $scope.mappedData;
                }
            }
            $scope.unflatten = function(data) {
                "use strict";
                if (Object(data) !== data || Array.isArray(data))
                    return data;
                var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
                    resultholder = {};
                for (var p in data) {
                    var cur = resultholder,
                        prop = "",
                        m;
                    while (m = regex.exec(p)) {
                        cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
                        prop = m[2] || m[1];
                    }
                    cur[prop] = data[p];
                }
                return resultholder[""] || resultholder;
            };
            $scope.flatten = function(data) {
                var result = {};
                function recurse (cur, prop) {
                    if (Object(cur) !== cur) {
                        result[prop] = cur;
                    } else if (Array.isArray(cur)) {
                        for(var i=0, l=cur.length; i<l; i++)
                            recurse(cur[i], prop + "[" + i + "]");
                        if (l == 0)
                            result[prop] = [];
                    } else {
                        var isEmpty = true;
                        for (var p in cur) {
                            isEmpty = false;
                            recurse(cur[p], prop ? prop+"."+p : p);
                        }
                        if (isEmpty && prop)
                            result[prop] = {};
                    }
                }
                recurse(data, "");
                return result;
            };

            //function used to split the dot notation string and use it to find the
            //actual property of the primary object.
            $scope.dotStrToKeys = function(obj, dotStr) {
                var dotRefArr, objRef = obj, i = 0, keys;

                if(dotStr!==undefined){
                    dotRefArr = dotStrCleaner(dotStr).split('.');

                    while (i < dotRefArr.length) {
                        objRef = objRef[dotRefArr[i]];
                        i++;
                    }
                }

                keys = Object.keys(objRef);
                return keys;
            };

            //cleans a dot notation reference string that may/may not have references to arrays.
            //it takes a string like "items[14].price.levels[4]" and returns "items.14.price.levels.4"
            $scope.dotStrCleaner = function(str) {
                return str.replace(/\[[0-9]+\]/gi, function(match) {
                    return '.'+match.replace(/\[/g,'').replace(/\]/g,'');
                });
            }

            $scope.stringifyResponse = function() {
                if (!$scope.objectSchema.data) { return; }
                var text = JSON.stringify($scope.objectSchema.data,null,2);
                $scope.objectSchemaStr = text;

            };
            $scope.getColumns = function() {
                //$scope.keys = $scope.dotStrToKeys($scope.flatten($scope.objectSchema.data));

                $scope.keys = $scope.dotStrToKeys($scope.flatObject.data);
            }
            $scope.applyColumns = function() {
                $scope.mappedData = [];
                angular.forEach($scope.data.object, function( item ) {
                    var map = {};
                    angular.forEach($scope.config.columns, function( column, key ) {
                        map[column] = $scope.pathIndex(item, column);
                    });
                    $scope.mappedData.push(map)
                });
            };

            $scope.applyAllColumns = function() {
                $scope.mappedData = [];
                angular.forEach($scope.data.object, function( item ) {
                    var map = {};
                    angular.forEach($scope.keys, function( column, key ) {
                        map[column] = $scope.pathIndex(item, column);
                    });
                    $scope.mappedData.push(map)
                });
            };
            $scope.multiIndex = function(obj,is) {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
                return is.length ? $scope.multiIndex(obj[is[0]],is.slice(1)) : obj
            }
            $scope.pathIndex = function(obj,is) {   // obj,'1.2.3' -> multiIndex(obj,['1','2','3'])
                return $scope.multiIndex(obj,is.split('.'))
            }
            $scope.createDownload = function() {
                if(angular.isDefined($scope.csv)) {
                    var anchor = angular.element('<a/>');
                    anchor.attr({
                        href: 'data:attachment/csv;charset=utf-8,' + encodeURI($scope.csv.data),
                        target: '_blank',
                        download: $scope.config.data.filename + '.csv'
                    })[0].click();

                }
            }

        }]);
})();
