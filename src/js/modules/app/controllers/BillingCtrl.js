(function () {
    angular.module('app')
        .controller('BillingCtrl', ['$scope', '$enApi', function ($scope, $enApi) {

            $scope.monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            $scope.setData = function() {
                $scope.getFilteredList();
                $scope.aggregateObject.data = $scope.aggregationRequest.data;
            };
            $scope.getFilteredList = function () {
                $scope.billingData = [];
                $scope.aggregationRequest = {};
                $scope.aggregationRequest.data = {
                    'searchConditionType': 'and',
                    'exactMatches': true,
                    'fieldsToGroupBy': ['dataDomain', 'startDateTime$year', 'startDateTime$month'],
                    'aggregationType': 'sum',
                    'fieldToAggregate': 'documentByteSize',
                    'searchFields': {
                        'attributes': {}
                    }
                };
                var arg1 = $scope.billing.startDateTime;
                var arg2 = $scope.billing.endDateTime;
                if (arg1 !== undefined && arg1 !== '') {
                    $scope.aggregationRequest.data.searchFields.attributes.timestamp1 = {
                        'refName': 'startDateTime',
                        'type': 'Date',
                        'value': arg1
                    };
                }

                if (arg2 !== undefined && arg2 !== '') {
                    $scope.aggregationRequest.data.searchFields.attributes.timestamp2 = {
                        'refName': 'startDateTime',
                        'type': 'Date',
                        'value': arg2
                    };
                }

                if ($scope.billing.dataDomain !== '' && $scope.billing.dataDomain !== undefined) {
                    $scope.aggregationRequest.data.searchFields.attributes.dataDomain = {
                        'refName': 'dataDomain',
                        'type': 'String',
                        'value': $scope.billing.dataDomain
                    };
                }

                if ($scope.billing.reportType === 'kilocharacter') {

                    $scope.aggregationRequest.data.fieldsToGroupBy = ['dataDomain', 'startDateTime$year', 'startDateTime$month'];
                    $scope.aggregationRequest.data.fieldToAggregate = 'documentByteSize';
                    $scope.aggregationRequest.data.aggregationType = 'sum';

                    /*$enApi.object({
                        'method': 'post',
                        'name': 'aggregationRequest',
                        'path': '/api/v1/exchangedDocument/aggregate',
                        onBeforePost: function() {

                        },
                        onPost: function(data) {
                            $scope.billingData = data;
                            var accountData = {};
                            for (var i = 0; i < $scope.billingData.length; i++) {
                                var rowData = $scope.billingData[i];

                                if (accountData[rowData.dataDomain] === undefined) {
                                    accountData[rowData.dataDomain] = {};
                                }

                                if (accountData[rowData.dataDomain][rowData.startDateTime$year] === undefined) {
                                    accountData[rowData.dataDomain][rowData.startDateTime$year] = [];
                                }

                                accountData[rowData.dataDomain][rowData.startDateTime$year].push(rowData);
                            }
                            $scope.billingReport = accountData;

                        }
                    }).post();*/
                } else if ($scope.billing.reportType === 'document') {
                    $scope.aggregationRequest.data.fieldsToGroupBy = ['dataDomain', 'startDateTime$year', 'startDateTime$month', 'fromVendor', 'toVendor', 'documentType'];
                    $scope.aggregationRequest.data.fieldToAggregate = 'documentType';
                    $scope.aggregationRequest.data.aggregationType = 'count';

                    /*$enApi.object({
                        'method': 'post',
                        'name': 'aggregationRequest',
                        'path': '/api/v1/exchangedDocument/aggregate',
                    }).post(function (data) {
                        $scope.billingData = data;
                        var accountData = {};
                        for (var i = 0; i < $scope.billingData.length; i++) {
                            var rowData = $scope.billingData[i];

                            if (accountData[rowData.dataDomain] === undefined) {
                                accountData[rowData.dataDomain] = {};
                            }

                            if (accountData[rowData.dataDomain][rowData.startDateTime$year] === undefined) {
                                accountData[rowData.dataDomain][rowData.startDateTime$year] = [];
                            }

                            accountData[rowData.dataDomain][rowData.startDateTime$year].push(rowData);
                        }
                        $scope.billingReport = accountData;
                    });*/
                }
            };
            $scope.setResults = function() {
                $scope.hasResults = true;
                $scope.billingData = $scope.aggregateObject.data;
                var accountData = {};
                for (var i = 0; i < $scope.billingData.length; i++) {
                    var rowData = $scope.billingData[i];

                    if (accountData[rowData.dataDomain] === undefined) {
                        accountData[rowData.dataDomain] = {};
                    }

                    if (accountData[rowData.dataDomain][rowData.startDateTime$year] === undefined) {
                        accountData[rowData.dataDomain][rowData.startDateTime$year] = [];
                    }

                    accountData[rowData.dataDomain][rowData.startDateTime$year].push(rowData);
                }
                $scope.billingReport = accountData;

            }
        }]);
})();
