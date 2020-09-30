(function () {
    angular.module('app')
        .controller('POLandingCtrl', ['$scope', '$filter', function ($scope, $filter) {

            $scope.requestStat = {
                'purchaseOrder': {
                    'total': {
                        'searchConditionType': 'or',
                        'aggregationType': 'sum',
                        'fieldToAggregate':'header.totalAmountDue',
                        'exactMatches': false,
                        'searchFields': {
                            'attributes': {
                            }
                        }
                    },
                    'totalCount': {
                        'searchConditionType': 'or',
                        'exactMatches': false,
                        'searchFields': {
                            'attributes': {
                            }
                        }
                    },
                    'totalUnits': {
                        'searchConditionType': 'or',
                        'aggregationType': 'sum',
                        'fieldToAggregate':'lineItems.itemQty',
                        'exactMatches': false,
                        'searchFields': {
                            'attributes': {
                            }
                        }
                    },
                    'averageTotal': {
                        'searchConditionType': 'or',
                        'aggregationType': 'avg',
                        'fieldToAggregate':'header.totalAmountDue',
                        'exactMatches': false,
                        'searchFields': {
                            'attributes': {
                            }
                        }
                    },
                    'released': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'RELEASED'
                                }
                            }
                        }
                    },
                    'open': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'OPEN'
                                }
                            }
                        }
                    },
                    'shipped': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'SHIPPED'
                                }
                            }
                        }
                    },
                    'cancelled': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'CANCELED'
                                }
                            }
                        }
                    },
                    'rejected': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'REJECTED'
                                }
                            }
                        }
                    },
                }
            };
        }])
})();
