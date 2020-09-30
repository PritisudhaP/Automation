(function(){
    'use strict';


    angular.module('app').directive('integrationInfo', IntegrationInfo);


    function IntegrationInfo() {
        return {
            restrict    : 'E',
            replace     : true,
            template    : resolveTemplate
        };

        function controllerFn($scope, $element, $attrs) {
        }

        function postLink($scope, $element, $attrs) {
        }

        // en-section template
        function resolveTemplate($element, $attrs) {
            //console.log($attrs.objectName);
            var attr;
            if (angular.isDefined([$attrs.objectName])) {
                if ($attrs.apiObject === 'false') {
                    attr = [$attrs.objectName];
                } else {
                    attr = [$attrs.objectName] + '.data';
                }

                return '<en-section class="margin-top">'
                    + '<en-header>'
                    + '<en-title class="title-sm uppercase text-muted">INTEGRATION INFORMATION</en-title>'
                    + '</en-header>'
                    + '<en-body class="margin-vertical-collapse margin-horizontal-sm padding-sm">'
                    + '<p><em> Integration fields, other entities use these value to refer to this object </em></p>'
                    + '<div layout="column">'
                    + '<p  layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse">'
                    + '<span class="faded" ng-class="{\'text-error\': !'+ attr + '.id}">ID:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.id"></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse" >'
                    + '<span class="faded" ng-class="{\'text-error\': !'+ attr + '.txId}">Tx ID:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.txId"></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse">'
                    + '<span class="faded" ng-class="{\'text-error\': !'+ attr + '.sessionId}">Session ID:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.sessionId"></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse">'
                    + '<span class="faded" ng-class="{\'text-error\': !'+ attr + '.refName}">Ref Name:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.refName"></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse" ng-if="' + attr + '.keywords">'

                    + '<span class="faded" ng-class="{\'text-error\': !'+ attr + '.keywords||!'+ attr + '.keywords.length}">Keywords:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.keywords"></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse" ng-if="' + attr + '.tags&&'+ attr + '.tags.length">'

                    + '<span class="faded">Tags:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.tags"></span>'
                    + '</p>'

                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse" ng-if="' + attr + '.transmissionId">'
                    + '<span class="faded">Transmission ID:&nbsp;'
                    + '</span>'
                    + '<a class="text-right" ng-bind-html="' + attr + '.transmissionId" en-tap="showScreen(\'/data-management/communications/transmissions/{{' + attr + '.transmissionId}}/\')" ></a>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse">'

                    + '<span class="faded" ng-class="{\'text-error\': !'+ attr + '.auditInfo.createUser}">Created By:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.auditInfo.createUser"></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse">'
                    + '<span class="faded" ng-class="{\'text-error\': !'+ attr + '.auditInfo.creationTs}">Created:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.auditInfo.creationTs | date: \'medium\' "></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse"  ng-if="' + attr + '.auditInfo.updateUser">'
                    + '<span class="faded">Updated By:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.auditInfo.updateUser"></span>'
                    + '</p>'
                    + '<p layout="row" layout-align="space-between" layout-wrap class="margin-bottom-collapse" ng-if="' + attr + '.auditInfo.updateTs">'
                    + '<span class="faded">Updated:&nbsp;'
                    + '</span>'
                    + '<span class="text-right" ng-bind-html="' + attr + '.auditInfo.updateTs | date: \'medium\' "></span>'
                    + '</p>'

                    + '<en-control class="padding-collapse margin-top">'
                    + '<label class="faded">Data Domains &nbsp;'
                    + '</label>'
                    + ' <input type="hidden" en-adapter="*.text" en-adapter-input="dataDomains" en-adapter-output="' + attr + '.dataDomains" /> '
                    + ' <en-input-tags name="dataDomains"  min-length="0" ng-model="dataDomains"></en-input-tags> '
                    + '</en-control>'
                    + '</div>'
                    + '</en-body>'
                    + '</en-section>';
            } else {

            }
        }

    }
})();
