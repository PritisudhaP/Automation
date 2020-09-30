(function () {
    angular.module('app')
        .controller('ShipmentLandingCtrl', ['$scope', '$filter', function ($scope, $filter) {
            $scope.newYear = new Date(new Date().getFullYear(), 0, 1).setHours(0, 0, 0, 0);
            $scope.today = new Date().setHours(0, 0, 0, 0);
            $scope.setHours = function (item) {
                var formattedDate = new Date(item);
                formattedDate.setHours(0, 0, 0, 0);
                return Date.parse(formattedDate);
            };
            $scope.startDate = $scope.newYear;
            $scope.endDate = $scope.today;

            $scope.requestStat = function() {
                var stats = {
                    'shipmentRequest': {
                        'total': {
                            'searchConditionType': 'or',
                            'aggregationType': 'sum',
                            'fieldToAggregate': 'header.totalAmountDue',
                            'exactMatches': false,
                            'searchFields': {
                                'attributes': {
                                    'startDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.startDate
                                    },
                                    'endDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.endDate
                                    }
                                }
                            }
                        },
                        'totalCount': {
                            'searchConditionType': 'or',
                            'exactMatches': false,
                            'searchFields': {
                                'attributes': {
                                    'startDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.startDate
                                    },
                                    'endDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.endDate
                                    }
                                }
                            }
                        },
                        'totalUnits': {
                            'searchConditionType': 'or',
                            'aggregationType': 'sum',
                            'fieldToAggregate': 'header.totalItemsSold',
                            'exactMatches': false,
                            'searchFields': {
                                'attributes': {
                                    'startDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.startDate
                                    },
                                    'endDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.endDate
                                    }
                                }
                            }
                        },
                        'averageTotal': {
                            'searchConditionType': 'or',
                            'aggregationType': 'avg',
                            'fieldToAggregate': 'header.totalAmountDue',
                            'exactMatches': false,
                            'searchFields': {
                                'attributes': {
                                    'startDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.startDate
                                    },
                                    'endDate': {
                                        'refName': 'header.createDate',
                                        'type': 'Date',
                                        'value': $scope.endDate
                                    }
                                }
                            }
                        },
                        'open': {
                            'searchConditionType': 'or',
                            'exactMatches': true,
                            'searchFields': {
                                'attributes': {
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'PENDING'
                                    },
                                    'shipmentStatus2': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'ACKNOWLEDGED'
                                    }
                                }
                            }
                        },
                        'complete': {
                            'searchConditionType': 'or',
                            'exactMatches': true,
                            'searchFields': {
                                'attributes': {
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'FULFILLED'
                                    },
                                    'shipmentStatus2': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'SHIPMENT_IN_PROGRESS'
                                    }
                                }
                            }
                        },
                        'cancelled': {
                            'searchConditionType': 'or',
                            'exactMatches': true,
                            'searchFields': {
                                'attributes': {
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'CANCELLED'
                                    },
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'PENDING_CANCEL'
                                    }
                                }
                            }
                        },
                        'fta': {
                            'searchConditionType': 'or',
                            'exactMatches': true,
                            'searchFields': {
                                'attributes': {
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'ERROR'
                                    },
                                    'shipmentStatus2': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'TIMEDOUT'
                                    },
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'REJECTED'
                                    },
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'VOID'
                                    }
                                }
                            }
                        },
                        'hold': {
                            'searchConditionType': 'or',
                            'exactMatches': true,
                            'searchFields': {
                                'attributes': {
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'SHIPMENT_REQUEST_SENT'
                                    },
                                    'shipmentStatus': {
                                        'refName': 'header.status',
                                        'type': 'String',
                                        'value': 'SHIPMENT_CREATED'
                                    }
                                }
                            }
                        },
                    }
                }
                return stats;
            };
        }])
})();
