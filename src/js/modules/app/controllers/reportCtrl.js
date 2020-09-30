(function () {
    angular.module('app')
        .controller('ReportCtrl', ['$scope', '$interpolate', function ($scope, $interpolate) {

            $scope.reportRenderUrl = $interpolate('/api/v1/reporting/reportLayoutDefinition/id/{{data.id}}/render/{{data.refName}}')($scope);
            $scope.layoutModel = {fields: [], sorts: []};

            $scope.scheduleModel = {emailAddresses: [], reportFileExpirationDays: [], scriptInputs: {}};
            $scope.reportPeriods = [
                {key: 'QTD', value: 'Quarter To Date'},
                {key: 'MTD', value: 'Month To Date'},
                {key: 'WTD', value: 'Week To Date'},
                {key: 'CQ', value: 'Current Quarter'},
                {key: 'CM', value: 'Current Month'},
                {key: 'CW', value: 'Current Week'},
                {key: 'CD', value: 'Current Day'},
                {key: 'LQ', value: 'Previous Quarter'},
                {key: 'LM', value: 'Previous Month'},
                {key: 'LW', value: 'Previous Week'},
                {key: 'LD', value: 'Previous Day'}
            ];
            $scope.addSort = function () {
                if (!$scope.layout.data.sorts) {
                    $scope.layout.data.sorts = [];
                }
                var newSort = {
                    sortOrder: '',
                    fieldName: ''
                }
                $scope.layout.data.sorts.push(newSort);
            };
            $scope.deleteSort = function (index) {
                if (!$scope.layout.data.sorts) {
                    return;
                }
                $scope.layout.data.sorts.splice(index, 1);
            };
            $scope.addField = function () {
                if (!$scope.layout.data.fields) {
                    $scope.layout.data.fields = [];
                }
                $scope.layout.data.fields.push('');
            };
            $scope.deleteField = function (index) {
                if (!$scope.layout.data.fields) {
                    return;
                }
                $scope.layout.data.fields.splice(index, 1);
            };
            $scope.addEmail = function () {
                if (!$scope.schedule.data.emailAddresses) {
                    $scope.schedule.data.emailAddresses = [];
                }
                var newEmail = '';
                $scope.schedule.data.emailAddresses.push(newEmail);
            };
            $scope.deleteEmail = function (index) {
                if (!$scope.schedule.data.emailAddresses) {
                    return;
                }
                $scope.schedule.data.emailAddresses.splice(index, 1);
            };
            $scope.applyEmails = function (data) {
                $scope.changeDistro.data.emailAddresses.push.apply($scope.changeDistro.data.emailAddresses, data)
            };
            $scope.createDistro = function (data, list) {
                if (!$scope.schedule.data.emailDistributionList) {
                    $scope.schedule.data.emailDistributionList = {};
                }
                $scope.schedule.data.emailDistributionList.refName = data.refName;
                if($scope.schedule.data.emailDistributionList.emailAddresses) {
                   $scope.schedule.data.emailDistributionList.emailAddresses.push.apply($scope.schedule.data.emailDistributionList.emailAddresses, list);
                } else {
                    $scope.schedule.data.emailDistributionList.emailAddresses = [];
                    angular.forEach(list, function(email){
                   if(email !== '')
                      $scope.schedule.data.emailDistributionList.emailAddresses.push(email);
                   });
                }
                $scope.distros.refresh();
                angular.forEach($scope.emails.selected, function (email) {
                    var index = $scope.schedule.data.emailAddresses.indexOf(email);
                    var index1 = $scope.emails.selected.indexOf(email);
                    $scope.schedule.data.emailAddresses.splice(index, 1);
                    $scope.emails.selected.splice(index1, 1);

                });
            };
            $scope.checkEmpty = function(item){
                return item !== '';
            };
            $scope.flatten = function (data) {
                var result = {};

                function recurse(cur, prop) {
                    if (Object(cur) !== cur) {
                        result[prop] = cur;
                    } else if (Array.isArray(cur)) {
                        for (var i = 0, l = cur.length; i < l; i++)
                            recurse(cur[i], prop + "[" + i + "]");
                        if (l == 0)
                            result[prop] = [];
                    } else {
                        var isEmpty = true;
                        for (var p in cur) {
                            isEmpty = false;
                            recurse(cur[p], prop ? prop + "." + p : p);
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
            $scope.dotStrToKeys = function (obj, dotStr) {
                var dotRefArr, objRef = obj, i = 0, keys;

                if (dotStr !== undefined) {
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
            $scope.dotStrCleaner = function (str) {
                return str.replace(/\[[0-9]+\]/gi, function (match) {
                    return '.' + match.replace(/\[/g, '').replace(/\]/g, '');
                });
            }

            $scope.getColumns = function () {
                $scope.keys = $scope.dotStrToKeys($scope.flatten($scope.objectSchema.data));
            }
            $scope.stringifyResponse = function () {
                if (!$scope.objectSchema.data) {
                    return;
                }
                var text = JSON.stringify($scope.objectSchema.data, null, 2);
                $scope.objectSchemaStr = text;

            };
            $scope.addInputs = function (data, type) {
                if (type === 'schedule') {
                    if (!$scope.schedule.data || !data) {
                        return;
                    }
                    if (!$scope.schedule.data.scriptInputs) {
                        $scope.schedule.data.scriptInputs = {};
                        $scope.schedule.data.scriptInputs.attributes = {};
                    }
                    $scope.schedule.data.scriptInputs = data.data.inputs;

                } else {
                    if (!$scope.layout.data || !data) {
                        return;
                    }
                    if (!$scope.layout.data.scriptInputs) {
                        $scope.layout.data.scriptInputs = {};
                        $scope.layout.data.scriptInputs.attributes = {};
                    }
                    $scope.layout.data.scriptInputs = data.data.inputs;
                }
                //if (!$scope.layout.data.scriptInputs.attributes) { $scope.layout.data.scriptInputs.attributes = {}; }
                //$scope.layout.data.scriptInputs.attributes = data.data.inputs;

            };
            $scope.applyInputs = function (id, refName, target, inputs) {
                $scope.inputs.data = inputs;
                $scope.showModal('reports/layout/preview', {layout: $scope.layout, inputs: $scope.inputs.data}, null)
            };
            $scope.applyDefaultInputs = function () {
                if (angular.isDefined($scope.inputs.data)) {
                    if (!$scope.layout.data) {
                        return;
                    }
                    if (!$scope.layout.data.scriptInputs) {
                        $scope.layout.data.scriptInputs = {};
                        $scope.layout.data.scriptInputs.attributes = {};
                    }
                    // for (var key in $scope.inputs.data) {
                    //     var model = {
                    //
                    //     }
                    //
                    //     $scope.layout.data.scriptInputs = data.data.inputs;
                    // }
                    $scope.layout.data.scriptInputs.attributes = $scope.inputs.data;


                }
            }
            $scope.setDefaultInputs = function (data) {
                if (angular.isDefined($scope.inputs.data)) {
                    if (angular.isDefined(data)) {
                        for (var key in $scope.inputs.data) {
                            if (angular.isDefined(data.scriptInputs) && angular.isDefined(data.scriptInputs.attributes) &&  data.scriptInputs.attributes[key]) {
                                $scope.inputs.data[key].value = data.scriptInputs.attributes[key].value;
                            }
                        }

                    } else if (angular.isDefined($scope.layout.data.scriptInputs) && angular.isDefined($scope.layout.data.scriptInputs.attributes)) {
                        $scope.inputs.data = $scope.layout.data.scriptInputs.attributes;

                        for (var key in $scope.inputs.data) {
                            if ($scope.layout.data.scriptInputs.attributes[key] === $scope.inputs.data[key]) {

                                $scope.inputs.data[key].value = $scope.layout.data.scriptInputs.attributes[key].value;
                            }
                        }
                    }
                }
            }

        }]);

})();
