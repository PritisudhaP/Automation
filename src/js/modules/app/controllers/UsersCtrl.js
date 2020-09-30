(function() {
    angular.module('app')
        .controller('UserCtrl', ['$scope', '$rootScope', '$enApi', 'growl',  function($scope, $rootScope, $enApi, growl) {

            $scope.userAttributes = [];

            /**
             * addAttributeInputs() Adds an attribute input set
             */
            $scope.addAttributeInputs = function() {
                $scope.userAttributes.push({
                    name: '',
                    type: 'String',
                    value: ''
                });
            };

            /**
             * set the access token data
             * @param userProfile
             * @param expiration
             * some examples for java duration formats from the java docs (PnDTnHnMn.nS):
             *
             *   "PT20.345S" -- parses as "20.345 seconds"
             *   "PT15M"     -- parses as "15 minutes" (where a minute is 60 seconds)
             *   "PT10H"     -- parses as "10 hours" (where an hour is 3600 seconds)
             *   "P2D"       -- parses as "2 days" (where a day is 24 hours or 86400 seconds)
             *   "P2DT3H4M"  -- parses as "2 days, 3 hours and 4 minutes"
             *   "P-6H3M"    -- parses as "-6 hours and +3 minutes"
             *   "-P6H3M"    -- parses as "-6 hours and -3 minutes"
             *   "-P-6H+3M"  -- parses as "+6 hours and -3 minutes"
             */

            $scope.setTokenData = function(userProfile, expiration) {
                $scope.accessToken.data.dataDomain = $rootScope.user.dataDomains[0];
                $scope.accessToken.data.client = {};
                $scope.accessToken.data.client.clientId = userProfile.refName;
                var duration = 'P';
                if (expiration.days) {
                    duration += expiration.days + 'D';
                    if (expiration.hours) {
                        duration += 'T' + expiration.hours + 'H';
                        if (expiration.minutes) {
                            duration += expiration.minutes + 'M';
                        }
                    } else {
                        if (expiration.minutes) {
                            duration += 'T' + expiration.minutes + 'M';
                        }
                    }
                } else if (expiration.hours) {
                    duration += 'T' + expiration.hours + 'H';
                    if (expiration.minutes) {
                        duration += expiration.minutes + 'M';
                    } else {
                        if (expiration.minutes) {
                            duration += expiration.minutes + 'M';
                        }
                    }
                } else if (expiration.minutes) {
                    duration += 'T' + expiration.minutes + 'M';
                } else {
                    duration = -1;
                }
                $scope.accessToken.data.tokenDuration = duration;
                $scope.accessToken.data.grantType = 'urn:ietf:params:oauth:grant-type:direct-token-grant';
                $scope.accessToken.data.requestedScope = ["refreshToken", "all"];
            };

            /**
             * removeAttributeInputs() Removes an attribute input set
             */
            $scope.removeAttributeInputs = function(idx) {
                $scope.userAttributes.splice(idx, 1);
            };


            /**
             * addAttributes() Removes an attribute input set
             */
            $scope.addAttributes = function() {
                // get existing attributes, add to attributes obj
                for (var key in $scope.userProfile.data.attributes.attributes) {
                    $scope.userProfile.data.attributes.attributes[key] = $scope.userProfile.data.attributes.attributes[key];
                }

                // get new attributes, add to attributes obj
                angular.forEach($scope.userAttributes, function(item) {
                    //delete name field returned in item, unrecognized by backend
                    delete item.name;

                    var attrRefName = item.refName.replace(/\s/g, '');
                    item.refName = attrRefName;

                    if(item.refName !== '' && item.value !== '') {
                        $scope.userProfile.data.attributes.attributes[attrRefName] = item;
                    }
                });
            };

            /**
             * removeAttribute() Removes category reference
             */
            $scope.removeAttribute = function(item) {
                for (var key in $scope.userProfile.data.attributes.attributes) {
                    if(key === item.refName) {
                        if(angular.isDefined(item)) {
                            delete $scope.userProfile.data.attributes.attributes[key];
                        }
                    }
                }

                console.info($scope.userProfile.data.attributes.attributes);
            };


            /**
             * deleteCurrentProp() Removes current field which is included in obj, but is unrecognized by backend
             */
            $scope.deleteCurrentProp = function(name) {
                angular.forEach($scope[name].data, function(item) {
                    delete item.current;
                });
            };
            $scope.showNextPage = function() {
                if ($scope.userProfile.data.homePageURL && $scope.authUser.data.id === $scope.userProfile.data.id) {
                    $scope.authUser.data.homePageURL = $scope.userProfile.data.homePageURL;
                    //$scope.showScreen($scope.authUser.data.homePageURL);
                    //} else {
                }
                if ($scope.action === 'edit') {
                    growl.success('User has been updated');

                    $scope.showScreen('/settings/accounts/users/');
                } else {
                    $scope.showScreen('/settings/accounts/users/');
                }
            };
            $scope.getSecurityQuestions = function() {
                //todo: should be able to pull from the security questions in the token not using separate api call
                if ($scope.userProfile.data.userIdPasswordToken.securityQuestions.length) {
                    $scope.securityQuestions.get();
                }
            };

            $scope.mapSecurityQuestionsToUser = function() {
                var removeNulls = false;
                if ($scope.securityQuestions && $scope.securityQuestions.data) {
                    angular.forEach($scope.securityQuestions.data, function (obj, key) {
                        //why do we use this and not what is in userIdPasswordToken??
                        if (!$scope.userProfile.data.userIdPasswordToken) {
                            $scope.userProfile.data.userIdPasswordToken = {securityQuestions: []}
                        }
                        if (!$scope.userProfile.data.userIdPasswordToken.securityQuestions) {
                            $scope.userProfile.data.userIdPasswordToken.securityQuestions = [];
                        }

                        var questionModel = {
                            'questionReference': {},
                            'answer': ''
                        };

                        if (!obj) {
                            delete $scope.userProfile.data.userIdPasswordToken.securityQuestions[key];
                            removeNulls = true;
                        } else if (obj.answer && obj.refName) {
                            questionModel.answer = obj.answer;
                            questionModel.questionReference.refName = obj.refName;//'Question_'+ index;
                            questionModel.questionReference.dataDomain = obj.dataDomains[0];
                            questionModel.questionReference.displayName = obj.question;
                            questionModel.questionReference.type = 'com.eis.core.api.v1.model.SecurityQuestion';
                            $scope.userProfile.data.userIdPasswordToken.securityQuestions[key] = questionModel;
                        } else if (!obj.refName) {
                            delete $scope.userProfile.data.userIdPasswordToken.securityQuestions[key];
                            removeNulls = true;
                        }
                    });
                } else {
                    //clear them out since there were no security questions
                    if ($scope.userProfile && $scope.userProfile.data && $scope.userProfile.data.userIdPasswordToken && $scope.userProfile.data.userIdPasswordToken.securityQuestions) {
                        $scope.userProfile.data.userIdPasswordToken.securityQuestions = [];
                    }
                }

                if (removeNulls) {
                    $scope.userProfile.data.userIdPasswordToken.securityQuestions = $scope.userProfile.data.userIdPasswordToken.securityQuestions.filter(function (val) {
                        return val !== null;
                    });
                }
            };
            $scope.attachPolicy = function (policy) {
                $scope.dataDomainPolicies.refresh();
                var newPolicyRef = {
                    dataDomains: policy.dataDomains,
                    refName: policy.refName,
                    displayName: policy.displayName
                };
                $scope.selectedDomainPolicy = newPolicyRef;
               $scope.userProfile.data.dataDomainPolicy = newPolicyRef;
            }

            $scope.userTemplate = {
                "refName": null,
                "firstName": null,
                "lastName": null,
                "emailAddress": null,
                "userIdPasswordToken": {},
                attributes: {
                    attributes: {}
                }
            };
            $scope.attachGroup = function (group)  {
                if (angular.isDefined($scope.userProfile)) {
                    if (!angular.isDefined($scope.userProfile.data.userGroups)) {
                        $scope.userProfile.data.userGroups = [];
                    }
                    $scope.userProfile.data.userGroups.push(group);
                }
            };
            $scope.attachGroups = function (groups)  {
                if (angular.isDefined($scope.userProfile)) {
                    if (!angular.isDefined($scope.userProfile.data.userGroups)) {
                        $scope.userProfile.data.userGroups = [];
                    }
                    $scope.userProfile.data.userGroups.push.apply($scope.userProfile.data.userGroups, groups);
                }
            };

            $scope.attachRole = function (role)  {
                if (angular.isDefined($scope.userGroup)) {
                    if (!angular.isDefined($scope.userGroup.data.roles)) {
                        $scope.userGroup.data.roles = [];
                    }
                    $scope.userGroup.data.roles.push(role);
                }
            };
            $scope.attachRoles = function (roles)  {
                if (angular.isDefined($scope.userGroup)) {
                    if (!angular.isDefined($scope.userGroup.data.roles)) {
                        $scope.userGroup.data.roles = [];
                    }
                    $scope.userGroup.data.roles.push.apply($scope.userGroup.data.roles, roles);
                }
            };

            $scope.userGroupTemplate = {
                roles: [],
                tags: []
            };

           /* $scope.userTemplate = {
                attributes: {
                    attributes: {}
                },
                dashboardName: '',
                //dataDomainPolicy: {},
                //dataDomains: [],
                emailAddress: '',
                firstName: '',
                //homePageURL: '',
                lastName: '',
                owningAccountId: '',
                phoneNumber: '',
                refName: '',
                userGroups: [],
                userIdPasswordToken: {}
            }*/

        }]);
})();
