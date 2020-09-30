(function () {
    angular.module('app')
        .controller('SchedulerCtrl', ['$scope', '$enApi', '$filter', '$http', 'growl', function ($scope, $enApi, $filter, $http, growl) {

            $scope.currentStep = 1;
            $scope.derivedCronType2 = {};
            $scope.derivedCronType1 = {};
            $scope.derivedCronType3 = {};
            $scope.showDerivedCron = false;
            $scope.notBeforeDate = new Date();
            $scope.showSecs = false;
            $scope.showHrs = false;
            $scope.frequency = '';

            function pad(number, length) {
                var str = "" + number
                while (str.length < length) {
                    str = '0' + str
                }
                return str
            }

            var offset = new Date().getTimezoneOffset();
            offset = "UTC" + ((offset < 0 ? '+' : '-') +
                pad(parseInt(Math.abs(offset / 60)), 2) + ":" +
                pad(Math.abs(offset % 60), 2));

            $scope.userDefaultTimeZone = offset;

            $scope.timeZones = [
                "UTC-12:00",
                "UTC-11:00",
                "UTC-10:00",
                "UTC-09:30",
                "UTC-09:00",
                "UTC-08:00",
                "UTC-07:00",
                "UTC-06:00",
                "UTC-05:00",
                "UTC-04:30",
                "UTC-04:00",
                "UTC-03:30",
                "UTC-03:00",
                "UTC-02:00",
                "UTC-02:30",
                "UTC-01:00",
                "UTC+00:00",
                "UTC+01:00",
                "UTC+02:00",
                "UTC+03:00",
                "UTC+03:30",
                "UTC+04:00",
                "UTC+04:30",
                "UTC+05:00",
                "UTC+05:30",
                "UTC+05:45",
                "UTC+06:00",
                "UTC+06:30",
                "UTC+07:00",
                "UTC+08:00",
                "UTC+08:30",
                "UTC+08:45",
                "UTC+09:00",
                "UTC+09:30",
                "UTC+10:00",
                "UTC+10:30",
                "UTC+11:00",
                "UTC+12:00",
                "UTC+12:45",
                "UTC+13:00",
                "UTC+13:45",
                "UTC+14:00"
            ];

            $scope.hourClock = {
                '0': '12 Midnight',
                '1': '1 AM',
                '2': '2 AM',
                '3': '3 AM',
                '4': '4 AM',
                '5': '5 AM',
                '6': '6 AM',
                '7': '7 AM',
                '8': '8 AM',
                '9': '9 AM',
                '10': '10 AM',
                '11': '11 AM',
                '12': '12 Noon',
                '13': '1 PM',
                '14': '2 PM',
                '15': '3 PM',
                '16': '4 PM',
                '17': '5 PM',
                '18': '6 PM',
                '19': '7 PM',
                '20': '8 PM',
                '21': '9 PM',
                '22': '10 PM',
                '23': '11 PM'
            };

            $scope.resetTimingDetails = function () {

                $scope.showDerivedCron = false;
                $scope.showSecs = false;
                $scope.showHrs = false;
                $scope.showMins = false;
                $scope.showDays = false;

                if ($scope.frequency == 'hourly') {
                    $scope.derivedCronType1 = {};

                }
                if ($scope.frequency == 'daily') {
                    $scope.derivedCronType2 = {};

                }
                if ($scope.frequency == 'weekly') {
                    $scope.derivedCronType3 = {};

                }
            };

            //watchers for form validation; The regular form.$valid works but it doesn't handle step wise validation.

            $scope.$watch('trigger.data.displayName', function () {
                if ($scope.currentStep == '1') {
                    $scope.step1Validated = validateStep1();
                }
            });

            $scope.$watchGroup(['notBeforeTime', 'trigger.data.priority', 'notAfterSelection', 'notAfterTime'], function () {
                if ($scope.currentStep == '2') {
                    $scope.step2Validated = validateStep2();
                }
            });

            $scope.$watch('trigger.data.misFireThresholdInSeconds', function () {
                if ($scope.currentStep == '4') {
                    $scope.step4Validated = validateStep4();
                }
            });

            $scope.$watchGroup(['derivedCronType1.mins', 'derivedCronType1.secs', 'derivedCronType2.mins', 'derivedCronType2.secs',
                'derivedCronType2.hrs', 'derivedCronType3.hrs', 'derivedCronType3.mins', 'derivedCronType3.secs', 'trigger.data.cronExpression.expression', 'trigger.data.simpleRepeatSpec.durationTillNextRepeat',
                'trigger.data.simpleRepeatSpec.repeatIntervalUnit', 'trigger.data.simpleRepeatSpec.numRepeats', 'commaSeparatedDays'], function () {
                    if ($scope.currentStep == '3') {
                        $scope.step3Validated = validateStep3();
                    }
                });



            /**
             * form-wizard
             */
            $scope.formSteps = {

                next: function (form, i) {

                    if (i == 1 && validateStep1()) {
                        $scope.step2Validated = validateStep2();
                        nextStep();
                    }
                    if (i == 2 && validateStep2()) {
                        $scope.step3Validated = validateStep3();
                        nextStep();
                    }
                    if (i == 3 && validateStep3()) {
                        $scope.step4Validated = validateStep4();
                        nextStep();
                    }
                    if (i == 4 && validateStep4()) {
                        nextStep();
                    }
                    if (i == 5 && validateStep5()) {
                        nextStep();
                    }
                },
                prev: function (form) {
                    prevStep();
                },
                goTo: function (form, i) {
                    if (parseInt($scope.currentStep) > parseInt(i) && form.$valid) {
                        goToStep(i);

                    } else {

                        errorMessage();
                    }
                },
                submit: function (form) {
                    setData();
                },
                reset: function () {

                }
            };

            var validateStep1 = function () {
                return ($scope.trigger && typeof $scope.trigger.data != 'undefined' && typeof $scope.trigger.data.displayName != 'undefined') ? true : false;
            };

            var validateStep2 = function () {
                console.log("called validateStep2");
                return (typeof $scope.notBeforeTime != 'undefined' && $scope.trigger.data.priority > 0 && ($scope.notAfterSelection == 'NO' || ($scope.notAfterSelection == 'YES' && typeof $scope.notAfterTime != 'undefined'))) ? true : false;
            };

            var validateStep3 = function () {

                var freq = $scope.frequency;
                switch (freq) {
                    case 'hourly':
                        if (typeof $scope.derivedCronType1.mins == 'undefined' || typeof $scope.derivedCronType1.secs == 'undefined') {
                            return false;
                        } else {
                            return true;
                        }
                        break;
                    case 'daily':
                        if (typeof $scope.derivedCronType2.hrs != 'undefined' && typeof $scope.derivedCronType2.mins != 'undefined' && typeof $scope.derivedCronType2.secs != 'undefined') {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case 'weekly':
                        if ($scope.commaSeparatedDays != '' && typeof $scope.commaSeparatedDays != 'undefined' && typeof $scope.derivedCronType3.hrs != 'undefined' && typeof $scope.derivedCronType3.mins != 'undefined' && typeof $scope.derivedCronType3.secs != 'undefined') {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case 'cronExpression':
                        if (typeof $scope.trigger.data.cronExpression != 'undefined' && typeof $scope.trigger.data.cronExpression.expression != 'undefined') {
                            return true;
                        } else {
                            return false;
                        }
                        break;
                    case 'simpleRepeat':

                        if (typeof $scope.trigger.data.simpleRepeatSpec != 'undefined' && typeof $scope.trigger.data.simpleRepeatSpec.durationTillNextRepeat != 'undefined' && typeof $scope.trigger.data.simpleRepeatSpec.repeatIntervalUnit != 'undefined') {
                            if ($scope.limitByCount == 'No' || ($scope.limitByCount == 'Yes' && typeof $scope.trigger.data.simpleRepeatSpec.numRepeats != 'undefined')) {
                                return true;
                            } else {
                                return false;
                            }

                        } else {
                            return false;
                        }
                        break;
                }
            };

            var validateStep4 = function () {

                return (typeof $scope.trigger.data.misFireThresholdInSeconds == 'undefined') ? false : true;

            };

            var nextStep = function () {
                $scope.currentStep++;
            };
            var prevStep = function () {
                $scope.currentStep--;
            };
            var goToStep = function (i) {
                $scope.currentStep = i;
            };
            var errorMessage = function (i) {

            };

            function setData() {

                var createOrUpdateTrigger = {};
                var simpleRepeats = {};
                var cronExpr = {};

                createOrUpdateTrigger.data = $scope.trigger.data;
                if ($scope.frequency == 'simpleRepeat') {

                    simpleRepeats.data = $scope.trigger.data.simpleRepeatSpec;

                    createOrUpdateTrigger.data.simpleRepeatSpec = {
                        firstFiringInstant: '',
                        numRepeats: '',
                        durationTillNextRepeat: '',
                        repeatIntervalUnit: ''
                    };

                } else {
                    cronExpr.data = $scope.trigger.data.cronExpression;
                    createOrUpdateTrigger.data.cronExpression = {
                        expression: ''
                    };
                }

                if ($scope.frequency == 'hourly') {
                    createOrUpdateTrigger.data.cronExpression.expression = $scope.derivedCronType1.secs + ' ' + $scope.derivedCronType1.mins + ' * * * ? *';
                } else if ($scope.frequency == 'daily') {
                    createOrUpdateTrigger.data.cronExpression.expression = $scope.derivedCronType2.secs + ' ' + $scope.derivedCronType2.mins + ' ' + $scope.derivedCronType2.hrs + ' * * ? *';
                } else if ($scope.frequency == 'weekly') {
                    createOrUpdateTrigger.data.cronExpression.expression = $scope.derivedCronType3.secs + ' ' + $scope.derivedCronType3.mins + ' ' + $scope.derivedCronType3.hrs + ' ' + '? * ' + $scope.commaSeparatedDays + ' *';
                } else if ($scope.frequency == 'cronExpression') {
                    createOrUpdateTrigger.data.cronExpression.expression = cronExpr.data.expression;
                } else {
                    if ($scope.limitByCount == 'No') {

                        createOrUpdateTrigger.data.simpleRepeatSpec.numRepeats = '-1';
                        createOrUpdateTrigger.data.simpleRepeatSpec.durationTillNextRepeat = simpleRepeats.data.durationTillNextRepeat;
                        createOrUpdateTrigger.data.simpleRepeatSpec.repeatIntervalUnit = simpleRepeats.data.repeatIntervalUnit;
                    } else {
                        createOrUpdateTrigger.data.simpleRepeatSpec = simpleRepeats.data;
                    }
                }

                var notAfterDateTime = new Date($scope.notAfterDate).getTime() - convertOffsetToMillis($scope.trigger.data.referenceTimeZoneId) + new Date($scope.notAfterTime).getTime() - new Date('Thu Jan 01 1970 00:00:00').getTime() + browserOffsetAsMillis();
                var notBeforeDateTime = new Date($scope.notBeforeDate).getTime() - convertOffsetToMillis($scope.trigger.data.referenceTimeZoneId) + new Date($scope.notBeforeTime).getTime() - new Date('Thu Jan 01 1970 00:00:00').getTime() + browserOffsetAsMillis();

                createOrUpdateTrigger.data.notBeforeUTCTime = $filter('date')(notBeforeDateTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC') + 'Z';
                createOrUpdateTrigger.data.notAfterUTCTime = ($scope.notAfterSelection == 'YES') ? $filter('date')(notAfterDateTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC') + 'Z' : null;
                createOrUpdateTrigger.data.type = ($scope.frequency == 'simpleRepeat') ? "SIMPLE_REPEATS" : "CRON";

                if (createOrUpdateTrigger.data.type === "SIMPLE_REPEATS") {
                    delete createOrUpdateTrigger.data.cronExpression;
                } else {
                    delete createOrUpdateTrigger.data.simpleRepeatSpec;
                }

                if ($scope.isEdit == 'true') {
                    $enApi.object({
                        name: 'updateTriggersLava',
                        path: '/api/v1/trigger/id/' + createOrUpdateTrigger.data.id,
                        method: 'get',
                        data: createOrUpdateTrigger.data,
                        onPut: function () {
                            $scope.showScreen('integration/triggers/')
                        }
                    }).put()
                } else {
                    $enApi.object({
                        name: 'createTrigger',
                        path: '/api/v1/trigger',
                        method: 'post',
                        data: createOrUpdateTrigger.data,
                        onPost: function () {
                            $scope.showScreen('integration/triggers/')
                        }
                    }).post();
                }

            }

            //set the dateOptions
            var DateNow = Date.now();

            $scope.dateOptions = {
                outputFormat: 'UTC',
                displayFormat: 'MM/dd/yyyy',
                startDate: DateNow - 86400000,
                endDate: DateNow + 864000000,
                mainDate: DateNow,
                outputDate: '',
                emptyDate: ''
            };

            $scope.notAfterdateOptions = {
                outputFormat: 'UTC',
                displayFormat: 'MM/dd/yyyy',
                startDate: 7952326261000,
                endDate: 7952326261000 + 864000000,
                mainDate: 7952326261000 + 8640000000,
                outputDate: '',
                emptyDate: ''
            };

            function convertOffsetToMillis(chosenOffset) {
                var parts = new RegExp("^UTC([+-])(\\d\\d?):(\\d\\d?)$");
                var derived = parts.exec(chosenOffset);
                var sign = (derived[1] == "-") ? -1 : +1;
                return sign * (60 * parseInt(derived[2], 10) + parseInt(derived[3], 10)) * 60 * 1000;
            }

            function browserOffsetAsMillis() {
                return -1 * new Date().getTimezoneOffset() * 60 * 1000;
            }

            //TODO: need to investigate why it is - and not + for new Date('Thu Jan 01 1970 00:00:00').getTime();
            function parseUTCDateTime(utcDateTime) {
                var arr = [];
                var dateTime = new Date(utcDateTime).getTime() + convertOffsetToMillis($scope.trigger.data.referenceTimeZoneId) - browserOffsetAsMillis();
                var time = dateTime % (24 * 60 * 60 * 1000);
                dateTime -= time - new Date('Thu Jan 01 1970 00:00:00').getTime();
                arr.push(time, dateTime);
                return arr;
            }

            $scope.arr = [];
            var arrOfDays = [];

            $scope.addToOrRemoveFromArray = function (day) {
                $scope.showHrs = 'true';
                var index = $scope.arr.indexOf(day);
                var arrOfDays = ($scope.arr.length > 0 && index > -1) ? $scope.arr.splice(index, 1) : $scope.arr.push(day);
                $scope.commaSeparatedDays = (arrOfDays == 1) ? $scope.arr[0] : $scope.arr.join(',');
            };

            $scope.setWizardFields = function (triggerObj) {

                if (typeof triggerObj.data.cronExpression != 'undefined') {
                    var cronLabel = triggerObj.data.cronExpression.expression;

                    var cronMaker1 = new RegExp("^(\\d\\d?)\\s+(\\d\\d?)\\s+\\*\\s+\\*\\s+\\*\\s+\\?\\s+\\*$");
                    var cronMaker2 = new RegExp("^(\\d\\d?)\\s+(\\d\\d?)\\s+(\\d\\d?)\\s+\\*\\s+\\*\\s+\\?\\s+\\*$")
                    var cronMaker3 = new RegExp("^(\\d\\d?)\\s+(\\d\\d?)\\s+(\\d\\d?)\\s+\\?\\s+\\*\\s+((SUN|MON|TUE|WED|THU|FRI|SAT)(,(SUN|MON|TUE|WED|THU|FRI|SAT))*)\\s+\\*$")

                    var type1 = cronMaker1.exec(cronLabel);
                    var type2 = cronMaker2.exec(cronLabel);
                    var type3 = cronMaker3.exec(cronLabel);
                    $scope.frequency = (type1 == null) ? (type2 == null) ? (type3 == null) ? 'cronExpression' : 'weekly' : 'daily' : 'hourly';


                    if ($scope.frequency == 'hourly') {
                        $scope.derivedCronType1.mins = parseInt(type1[1]);
                        $scope.derivedCronType1.secs = parseInt(type1[2]);
                    }
                    if ($scope.frequency == 'daily') {
                        $scope.derivedCronType2.secs = parseInt(type2[1]);
                        $scope.derivedCronType2.mins = parseInt(type2[2]);
                        $scope.derivedCronType2.hrs = type2[3];
                    }
                    if ($scope.frequency == 'weekly') {
                        $scope.derivedCronType3.secs = parseInt(type3[1]);
                        $scope.derivedCronType3.mins = parseInt(type3[2]);
                        $scope.derivedCronType3.hrs = type3[3];
                        var days = [];
                        days = type3[4];
                        if (days.indexOf('SUN') > -1) {
                            $scope.derivedCronType3.day1 = 'SUN';
                            $scope.arr.push('SUN');
                        }
                        if (days.indexOf('MON') > -1) {
                            $scope.derivedCronType3.day2 = 'MON';
                            $scope.arr.push('MON');
                        }
                        if (days.indexOf('TUE') > -1) {
                            $scope.derivedCronType3.day3 = 'TUE';
                            $scope.arr.push('TUE');
                        }
                        if (days.indexOf('WED') > -1) {
                            $scope.derivedCronType3.day4 = 'WED';
                            $scope.arr.push('WED');
                        }
                        if (days.indexOf('THU') > -1) {
                            $scope.derivedCronType3.day5 = 'THU';
                            $scope.arr.push('THU');
                        }
                        if (days.indexOf('FRI') > -1) {
                            $scope.derivedCronType3.day6 = 'FRI';
                            $scope.arr.push('FRI');
                        }
                        if (days.indexOf('SAT') > -1) {
                            $scope.derivedCronType3.day7 = 'SAT';
                            $scope.arr.push('SAT');
                        }

                        $scope.commaSeparatedDays = ($scope.arr.length == 1) ? $scope.arr[0] : $scope.arr.join(',');

                    }
                    $scope.limitByCount = 'No'
                } else {
                    $scope.frequency = 'simpleRepeat';
                    $scope.limitByCount = ($scope.trigger.data.simpleRepeatSpec.numRepeats == '-1') ? 'No' : 'Yes'
                }


                var notBeforeArr = [], notAfterArr = [];
                notBeforeArr = parseUTCDateTime(triggerObj.data.notBeforeUTCTime);
                if (typeof triggerObj.data.notAfterUTCTime != 'undefined') {
                    notAfterArr = parseUTCDateTime(triggerObj.data.notAfterUTCTime);
                    $scope.notAfterDate = notAfterArr[1];
                    $scope.notAfterTime = notAfterArr[0];
                    $scope.notAfterSelection = 'YES';
                } else {
                    $scope.notAfterSelection = 'NO';
                }

                $scope.notBeforeDate = notBeforeArr[1];
                $scope.notBeforeTime = notBeforeArr[0];



                //a check for indefinite repeats on load
                if (typeof triggerObj.data.simpleRepeatSpec != 'undefined' && triggerObj.data.simpleRepeatSpec.numRepeats == -1) {
                    $scope.indefiniteRepeats = true;
                } else {
                    $scope.indefiniteRepeats = false;
                };
            };

            // validation for dates
            $scope.validateDates = function (notBefore, notAfter) {

                if (notAfter < notBefore) {
                    $scope.$error = 'End Date cannot be before Start Date!';
                    $scope.trigger.data.notAfter = '';
                    $scope.notAfterdateOptions.mainDate = '';
                } else {
                    $scope.$error = false;
                }
            };

            $scope.cronValidator = /^\s*($|#|\w+\s*=|(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?(?:,(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?)*))$/;


            $scope.changeDesiredTriggerState = function (row, desiredState) {
                row.desiredTriggerState = desiredState;
                $http({
                    url: '/api/v1/trigger/id/' + row.id,
                    params: { 'domainName': row.dataDomains[0] },
                    data: row,
                    method: 'PUT'
                }).success(function (data) {
                    growl.success('The desired trigger state has been changed');
                    $scope.$parent.$parent.triggers.refresh();
                })
                    .error(function (err, status) {
                        growl.error('Status: ' + status + ' ' + err);
                    });
            };
        }]);
})();
