myApp.config(function ($stateProvider, $urlRouterProvider, growlProvider) {
    $urlRouterProvider.otherwise("/");

    //blank path resets (second)
    $urlRouterProvider.when('/:screen/{second:[^/]{0}}/:third', '/:screen');
    $urlRouterProvider.when('/:screen/{second:[^/]{0}}/:third/:fourth', '/:screen');
    $urlRouterProvider.when('/:screen/{second:[^/]{0}}/:third/:fourth/:fifth', '/:screen');
    $urlRouterProvider.when('/:screen/{second:[^/]{0}}/:third/:fourth/:fifth/:sixth', '/:screen');
    $urlRouterProvider.when('/:screen/{second:[^/]{0}}/:third/:fourth/:fifth/:sixth/:seventh', '/:screen');

    //blank path resets (third)
    $urlRouterProvider.when('/:screen/:second/{third:[^/]{0}}/:fourth', '/:screen/:second');
    $urlRouterProvider.when('/:screen/:second/{third:[^/]{0}}/:fourth/:fifth', '/:screen/:second');
    $urlRouterProvider.when('/:screen/:second/{third:[^/]{0}}/:fourth/:fifth/:sixth', '/:screen/:second');
    $urlRouterProvider.when('/:screen/:second/{third:[^/]{0}}/:fourth/:fifth/:sixth/:seventh', '/:screen/:second');

    //blank path resets (fourth)
    $urlRouterProvider.when('/:screen/:second/:third/{fourth:[^/]{0}}/:fifth', '/:screen/:second/:third');
    $urlRouterProvider.when('/:screen/:second/:third/{fourth:[^/]{0}}/:fifth/:sixth', '/:screen/:second/:third');
    $urlRouterProvider.when('/:screen/:second/:third/{fourth:[^/]{0}}/:fifth/:sixth/:seventh', '/:screen/:second/:third');

    //blank path resets (fifth)
    $urlRouterProvider.when('/:screen/:second/:third/:fourth/{fifth:[^/]{0}}/:sixth', '/:screen/:second/:third/:fourth');
    $urlRouterProvider.when('/:screen/:second/:third/:fourth/{fifth:[^/]{0}}/:sixth/:seventh', '/:screen/:second/:third/:fourth');

    //blank path resets (sixth)
    $urlRouterProvider.when('/:screen/:second/:third/:fourth/:fifth/{sixth:[^/]{0}}/:seventh', '/:screen/:second/:third/:fourth/:fifth');

    //blank path resets (seventh)
    $urlRouterProvider.when('/:screen/:second/:third/:fourth/:fifth/:sixth/{seventh:[^/]{0}}/:eighth', '/:screen/:second/:third/:fourth/:fifth/:sixth');


//    $urlRouterProvider.when('/:screen/{second:[^/]{1,40}}', '/:screen/:second/');
//    $urlRouterProvider.when('/:screen/:second/{third:[^/]{0}}/:fourth', '/:screen/:second/');
//    $urlRouterProvider.when('/:screen/:second/{third:[^/]{0}}/:fourth/:fifth', '/:screen/:second/');
//
//    $urlRouterProvider.when('/:screen/{second:[^/]{1,40}}/{third:[^/]{1,40}}', '/:screen/:second/:third/');
//    $urlRouterProvider.when('/:screen/:second/:third/{fourth:[^/]{0}}/:fifth', '/:screen/:second/:third/');

    // FIXME
    // Below line is the correct regular expression for UUID's.  I have commented it out and replaced it with
    // a much less constrained version since we have manually created ID's in OMS.  This should be reviewed
    // and evetually consider using ObjectId's vs. GUIDS to increase performance on indexes
    // var uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    var uuidPattern = /^[0-9a-zA-Z]+-[0-9a-zA-Z]+-[0-9a-zA-Z]+-[0-9a-zA-Z]+-[0-9a-zA-Z]+$/i;
    var idPattern = /^[0-9]+$/i;
    var md5Pattern = /^[a-f0-9]{32}$/i;

    $stateProvider
    .state('screens', {
        url: "/:screen",
        views: {
            "screens": {
                templateUrl: function (stateParams) {
                    if (stateParams.screen === '') {
                        return 'views/screens/index.html';
                    } else {
                        return 'views/screens/' + stateParams.screen + '.html';
                    }
                }
            }
        }
    })
    .state('screens.second', {
        url: "/:second",
        views: {
            "second": {
                templateUrl: function (stateParams) {
                    if (stateParams.second === '') {
                        return 'views/screens/' + stateParams.screen + '/index.html';
                    } else {
                        if (uuidPattern.test(stateParams.second)) {
                            return 'views/screens/' + stateParams.screen + '/id.html';
                        }
                        else if (md5Pattern.test(stateParams.second)) {
                            return 'views/screens/' + stateParams.screen + '/key.html';
                        }
                        else {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '.html';
                        }
                    }
                }
            }
        }
    })
    .state('screens.second.third', {
        url: "/:third",
        views: {
            "third": {
                templateUrl: function (stateParams) {
                    if (uuidPattern.test(stateParams.second)) {
                        if (stateParams.third === '') {
                            return 'views/screens/' + stateParams.screen + '/id/index.html';
                        } else {
                            return 'views/screens/' + stateParams.screen + '/id/' + stateParams.third + '.html';
                        }
                    } else if (md5Pattern.test(stateParams.second)) {
                        if (stateParams.third === '') {
                            return 'views/screens/' + stateParams.screen + '/key/index.html';
                        } else {
                            return 'views/screens/' + stateParams.screen + '/key/' + stateParams.third + '.html';
                        }
                    }
                    else {
                        if (stateParams.third === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/index.html';
                        } else {
                            if (uuidPattern.test(stateParams.third)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/id.html';
                            } else if (md5Pattern.test(stateParams.third)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/key.html';
                            } else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '.html';
                            }
                        }
                    }
                }
            }
        }
    })
    .state('screens.second.third.fourth', {
        url: "/:fourth",
        views: {
            "fourth": {
                templateUrl: function (stateParams) {
                    if (uuidPattern.test(stateParams.third)) {
                        if (stateParams.fourth === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/id/index.html';
                        } else {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/id/' + stateParams.fourth + '.html';
                        }
                    } else if (md5Pattern.test(stateParams.third)) {
                        if (stateParams.fourth === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/key/index.html';
                        } else {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/key/' + stateParams.fourth + '.html';
                        }
                    }
                    else {
                        if (stateParams.fourth === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/index.html';
                        } else {
                            if (uuidPattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id.html';
                            }
                            else if (md5Pattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/index.html';
                            }
                            else {
                                //need this to support executionId for jobs of type big integer
                                if (idPattern.test(stateParams.fourth)) {
                                    return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/index.html';
                                } else {
                                    return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '.html';
                                }

                            }
                        }
                    }
                }
            }
        }
    }).state('screens.second.third.fourth.fifth', {
        url: "/:fifth",
        views: {
            "fifth": {
                templateUrl: function (stateParams) {
                    if (uuidPattern.test(stateParams.fourth)) {
                        if (stateParams.fifth === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/index.html';
                        } else {
                            if (uuidPattern.test(stateParams.fifth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/id.html';
                            } else if (md5Pattern.test(stateParams.fifth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/key.html';
                            }
                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/' + stateParams.fifth + '.html';
                            }
                        }
                    } else if (md5Pattern.test(stateParams.fourth)) {
                        if (stateParams.fifth === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/key/index.html';
                        } else {
                            if (uuidPattern.test(stateParams.fifth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/key/id.html';
                            } else if (md5Pattern.test(stateParams.fifth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/key/index.html';
                            }
                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/' + stateParams.fifth + '.html';
                            }
                        }
                    }
                    else {
                        if (stateParams.fifth === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/index.html';
                        } else {
                            if (idPattern.test(stateParams.fifth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/id.html';
                            } if (uuidPattern.test(stateParams.fifth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/id/index.html';
                            } else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '.html';
                            }
                        }
                    }
                }
            }
        }
    }).state('screens.second.third.fourth.fifth.sixth', {
        url: "/:sixth",
        views: {
            "sixth": {
                templateUrl: function (stateParams) {
                    if (uuidPattern.test(stateParams.fifth)) {
                        if (stateParams.sixth === '') {
                            if (uuidPattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/id/index.html';
                            }
                            else if (md5Pattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/key/index.html';
                            }

                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/id/index.html';
                            }
                        } else {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/id/' + stateParams.sixth + '.html';
                        }
                    } else if (md5Pattern.test(stateParams.fifth)) {
                        if (uuidPattern.test(stateParams.fourth)) {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/id/index.html';
                        }
                        else if (md5Pattern.test(stateParams.fourth)) {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/key/key/index.html';
                        }

                        else {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/id/index.html';
                        }
                    }

                    else {
                        if (stateParams.sixth === '') {
                            if (uuidPattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/' + stateParams.fifth + '/index.html';
                            }
                            else if (md5Pattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/key/' + stateParams.fifth + '/index.html';
                            }


                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/index.html';
                            }
                        } else {
                            if (uuidPattern.test(stateParams.sixth)) {
                                if (uuidPattern.test(stateParams.fourth)) {
                                    return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/' + stateParams.fifth + '/id.html';
                                } else {
                                    return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/id.html';
                                }
                            } else {
                                if (uuidPattern.test(stateParams.fourth)) {
                                    return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/' + stateParams.fifth + '/' + stateParams.sixth + '.html';
                                } else {
                                    return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '.html';
                                }

                            }
                        }
                    }
                }
            }
        }
    }).state('screens.second.third.fourth.fifth.sixth.seventh', {
        url: "/:seventh",
        views: {
            "seventh": {
                templateUrl: function (stateParams) {
                    if (uuidPattern.test(stateParams.sixth) || md5Pattern.test(stateParams.sixth)) {
                        if (stateParams.seventh === '') {
                            if (uuidPattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/' + stateParams.fifth + '/id/index.html';
                            }
                            else if (md5Pattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/key/' + stateParams.fifth + '/key/index.html';
                            }
                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/id/index.html';
                            }
                        } else {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/id/' + stateParams.seventh + '.html';
                        }
                    }
                    else {
                        if (stateParams.seventh === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/index.html';
                        } else {
                            if (uuidPattern.test(stateParams.seventh)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/id.html';
                            }
                            else if (md5Pattern.test(stateParams.seventh)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/key.html';
                            }

                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/' + stateParams.seventh + '.html';
                            }
                        }
                    }
                }
            }
        }
    })
    .state('screens.second.third.fourth.fifth.sixth.seventh.eighth', {
        url: "/:eighth",
        views: {
            "eighth": {
                templateUrl: function (stateParams) {
                    if (uuidPattern.test(stateParams.seventh) || md5Pattern.test(stateParams.seventh)) {
                        if (stateParams.eighth === '') {
                            if (uuidPattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/id/' + stateParams.fifth + '/id/' + stateParams.sixth + '/index.html';
                            }
                            else if (md5Pattern.test(stateParams.fourth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/key/' + stateParams.fifth + '/key/' + stateParams.sixth + '/index.html';
                            }
                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/id/index.html';
                            }
                        } else {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/id/' + stateParams.eighth + '.html';
                        }
                    }
                    else {
                        if (stateParams.eighth === '') {
                            return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/' + stateParams.seventh + '/index.html';
                        } else {
                            if (uuidPattern.test(stateParams.eighth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/' + stateParams.seventh + '/id.html';
                            }
                            else if (md5Pattern.test(stateParams.eighth)) {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/' + stateParams.seventh + '/key.html';
                            }
                            else {
                                return 'views/screens/' + stateParams.screen + '/' + stateParams.second + '/' + stateParams.third + '/' + stateParams.fourth + '/' + stateParams.fifth + '/' + stateParams.sixth + '/' + stateParams.seventh + '/' + stateParams.eighth + '.html';
                            }
                        }
                    }
                }
            }
        }
    })
    .state('/', {
        url: "/",
        templateUrl: 'views/screens/index.html'
    });

    growlProvider.globalTimeToLive(10000);
    growlProvider.globalPosition('top-right');
});
