(function () {
    angular.module('app')
        .controller('SOLandingCtrl', ['$scope', '$filter', function ($scope, $filter) {

            $scope.requestStat = {
                'salesOrder': {
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
                        'fieldToAggregate':'header.totalItemsSold',
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
                    'open': {
                        'searchConditionType': 'or',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'OPEN'
                                },
                                'shipmentStatus2': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'RELEASED'
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
                                    'value': 'CLOSED'
                                },
                                'shipmentStatus2': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'INVOICED'
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
                    'fta': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'FAILED_TO_ALLOCATE'
                                }
                            }
                        }
                    },
                    'hold': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'BACKORDER_HOLD'
                                }
                            }
                        }
                    },
                }
                /*,
                'shipment': {
                    'total': {
                        'searchConditionType': 'or',
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
                    'pending': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'shipmentStatus',
                                    'type': 'String',
                                    'value': 'PENDING'
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
                                    'refName': 'shipmentStatus',
                                    'type': 'String',
                                    'value': 'SHIPPED'
                                }
                            }
                        }
                    },
                    'shippedFedex': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'shipmentStatus',
                                    'type': 'String',
                                    'value': 'SHIPPED'
                                },
                                'carrier': {
                                    'refName': 'carrier',
                                    'type': 'String',
                                    'value': 'FEDEX'
                                }
                            }
                        }

                    }
                },
                'shipmentRequest': {
                    'total': {
                        'searchConditionType': 'or',
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
                    'pending': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'PENDING'
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
                    'ack': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'ACKNOWLEDGED'
                                }
                            }
                        }
                    }
                },

                'invoice': {
                    'total': {
                        'searchConditionType': 'or',
                        'fieldToAggregate': 'header.totalAmountDue',
                        'aggregationType': 'sum',
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
                    'new': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'NEW'
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
                    'paid': {
                        'searchConditionType': 'and',
                        'exactMatches': true,
                        'searchFields': {
                            'attributes': {
                                'shipmentStatus': {
                                    'refName': 'header.status',
                                    'type': 'String',
                                    'value': 'PAID'
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
                },

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
                },
                'task': {
                    'total': {
                        'searchConditionType': 'or',
                        'exactMatches': false,
                        'searchFields': {
                            'attributes': {
                            }
                        }
                    }
                }
                */


            };

            $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.series = ['Series A', 'Series B'];
            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };

        }])
})();
