(function () {
    angular.module('app')
        .controller('StepJobCtrl', ['$scope', '$enList', '$enApi', 'util', StepJobCtrl]);

    function StepJobCtrl($scope, $enList, $enApi, util) {
        var JOB_DATA = {
            tags: [],
            displayName: '',
            description: '',
            defType: 'BASIC',
            steps: [],
            //batchJobDefinition: ''
            postJobScript: { scriptRef: null },
            preJobScript: { scriptRef: null },
            scheduled: false,
            scheduledActionTriggerRef: null
        };

        var ADD_STEP = {
            name: '',
            allowStartIfComplete: false,
            stepType: null,
            // chunkTasklet: {
            //     /**
            //      * // chunkReader -> chunkReaderType, readerReference
            //      * // chunkProcessor -> referenceType, scriptReference | beanRef
            //      * // chunkWriter -> chunkWriterType, writerReference
            //      */

            //     commitInterval: null,
            //     skipLimit: null,
            //     retryLimit: null
            // },
            postStepScript: {
                scriptRef: null
            },
            preStepScript: {
                scriptRef: null,
            },
            disabled: false,
            concurrent: false
        };

        var resetAddStepObj = function () {
            $scope.addStepObj = angular.copy(ADD_STEP);
        };

        var resetJobData = function () {
            $scope.addStepObj = angular.copy(ADD_STEP);
        };

        var updateFileNameModel = function (step) {

            if (step.chunkTasklet && typeof step.chunkTasklet.chunkWriter) {
                updateDirName(step.chunkTasklet.chunkWriter);
            }
            if (step.chunkTasklet && step.chunkTasklet.chunkReader) {
                updateDirName(step.chunkTasklet.chunkReader);
            }

            function updateDirName(readerWriter) {
                if (readerWriter) {
                    for (var prop in readerWriter.propertyBag) {
                        if (readerWriter.propertyBag.hasOwnProperty(prop)) {
                            if ((prop === 'directoryName' || prop === 'fileSystemReferenceName') && readerWriter.propertyBag[prop] && typeof readerWriter.propertyBag[prop].value === 'object') {
                                readerWriter.propertyBag[prop].value = readerWriter.propertyBag[prop].value.refName;
                            }
                        }
                    }
                }
            }

        };

        // current step
        $scope.currentStep = 1;

        $scope.tooltips = {
            name: 'Unique name for a step',
            stepType: 'Select Tasklet, when the job is a single granular task. Select Chunk, when the job to be run is complex and involves executing of tasks involving reads, processing and writes',
            preStep: 'Select script to be executed before the step',
            postStep: 'Select script to be executed after the step',
            preJob: 'Select script to be executed before the job',
            postJob: 'Select script to be executed after the job',
            taskletType: 'Select type of tasklet - Script if script is to be executed as a granular unit. Bean  - if existing bean is to be used',
            allowStartIfComplete: 'If checked, step will be executed again on job restart even if it was successfully completed',
            stepDisabled: 'If Checked, will disable the step from executing',
            concurrent: 'If Checked, will execute the step in parallel'
        }

        // job Data for submission
        if ($scope.$parent.batchJobAction === 'new') {
            $scope.jobData = angular.copy(JOB_DATA);
        } else if ($scope.$parent.batchJobAction === 'edit') {
            $scope.jobData = $scope.$parent.batchJobDef.data;
        }

        $scope.addStepObj = angular.copy(ADD_STEP);

        $scope.removeStep = function (index) {
            $scope.jobData.steps.splice(index, 1);
        };

        $scope.addStep = function (step) {
            updateFileNameModel(step);
            $scope.jobData.steps.push(step);
            resetAddStepObj();
        };

        $scope.updateStep = function (step) {
            updateFileNameModel(step);
        };

        $scope.jobTypeChange = function (type) {
            if (type.toLowerCase() === 'basic') {
                delete $scope.jobData.batchJobDefinition;
                $scope.jobData.steps = [];
                validateStep2();
            } else if (type.toLowerCase() === 'advanced') {
                delete $scope.jobData.steps;
                $scope.jobData.batchJobDefinition = '';
                validateStep2();
            }
        }

        $scope.formSteps = {
            next: function (form, i) {

                if (i == 1 && validateStep1()) {
                    $scope.step2Validated = validateStep2();
                    $scope.currentStep++;
                } else if (i === 2 && validateStep2()) {
                    if ($scope.jobData.defType === 'BASIC') {
                        $scope.step3Validated = validateStep3();
                        $scope.currentStep++;
                    } else {
                        $scope.step4Validated = validateStep4();
                        $scope.currentStep = 4;
                    }

                } else if (i === 3 && validateStep3()) {
                    $scope.step4Validated = validateStep4();
                    $scope.currentStep++;
                } else if (i === 4 && validateStep4()) {
                    $scope.currentStep++;
                    console.log(JSON.stringify($scope.jobData));
                }
            },
            prev: function (form) {
                $scope.currentStep--;
            },
            goTo: function (form, i) {
                if (parseInt($scope.currentStep) > parseInt(i) && form.$valid && !(i === 3 && $scope.jobData.defType.toLowerCase() === 'advanced')) {
                    $scope.currentStep = i;
                }
            },
            submit: function (form) {
                //setData();
                $enApi.object({
                    name: 'createJobDef',
                    path: '/api/v1/batch/batchJobDef',
                    method: 'post',
                    data: $scope.jobData,
                    onPost: function () {
                        $scope.showScreen('integration/jobs/definitions/')
                    }
                }).post();
            },
            reset: function () {

            }
        };

        var validateStep1 = function () {
            return typeof $scope.jobData.displayName === 'string' && $scope.jobData.displayName.length > 0;
        };

        var validateStep2 = function () {
            return (
                $scope.jobData.defType !== '' &&
                (
                    ($scope.jobData.defType.toLowerCase() === 'basic' && $scope.jobData.steps.length > 0) ||
                    ($scope.jobData.defType.toLowerCase() === 'advanced' && angular.isString($scope.jobData.batchJobDefinition) && $scope.jobData.batchJobDefinition !== '')
                )
            );
        };

        var validateStep3 = function () {
            /* return (
                angular.isObject($scope.jobData.preJobScriptRef) &&
                angular.isObject($scope.jobData.postJobScriptRef)
            ); */
            return true;
        };

        var validateStep4 = function () {

            return (
                ($scope.jobData.scheduled &&
                    angular.isObject($scope.jobData.scheduledActionTriggerRef)) || !$scope.jobData.scheduled
            );
        };

        $scope.$watchGroup([
            function () { return $scope.jobData.displayName }
        ], function () {
            if ($scope.currentStep == '1') {
                $scope.step1Validated = validateStep1();
            }
        });
        $scope.$watchGroup([
            function () { return $scope.jobData.batchJobDefinition; }
        ], function () {
            if ($scope.currentStep === 2) {
                $scope.step2Validated = validateStep2();
            }
        })
        $scope.$watchCollection(function () { return $scope.jobData.steps }, function () {
            if ($scope.currentStep === 2) {
                $scope.step2Validated = validateStep2();
            }
        });

        /* $scope.$watchGroup([
            function () { return $scope.jobData.preJobScriptRef },
            function () { return $scope.jobData.postJobScriptRef }
        ], function () {
            if ($scope.currentStep == '3') {
                $scope.step3Validated = validateStep3();
            }
        }, true); */

        $scope.$watchGroup([
            function () { return $scope.jobData.scheduled },
            function () { return $scope.jobData.scheduledActionTriggerRef }
        ], function () {
            if ($scope.currentStep == '4') {
                if (!$scope.jobData.scheduled) {
                    delete $scope.jobData.scheduledActionTriggerRef;
                }
                $scope.step4Validated = validateStep4();
            }
        }, true);

        $scope.$on('$destroy', function () {
            resetAddStepObj();
            resetJobData();
        });

        $scope.addPreJobInput = (function () {
            if (!$scope.jobData.preJobScript) {
                $scope.jobData.preJobScript = {};
            }
            return util.prepareInputs($scope.jobData.preJobScript);
        })();
        $scope.addPostJobInput = (function () {
            if (!$scope.jobData.postJobScript) {
                $scope.jobData.postJobScript = {};
            }
            return util.prepareInputs($scope.jobData.postJobScript);
        })();
    }
})();