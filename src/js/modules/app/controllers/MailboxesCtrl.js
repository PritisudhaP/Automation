myApp.controller('MailboxesCtrl', ['$rootScope','$scope','$fileService','Upload','growl','$http','$timeout', function($rootScope, $scope, $fileService, Upload, growl, $http,$timeout) {

    $scope.setPolicy = function (mailbox) {
        if (typeof $scope.data.blobStoreAccessorRef != 'undefined' && $scope.data.blobStoreAccessorRef !== null) {
            mailbox.data.blobStoreAccessorRef = {};
            mailbox.data.blobStoreAccessorRef.refName = $scope.data.blobStoreAccessorRef.refName;
            mailbox.data.blobStoreAccessorRef.dataDomain = (typeof $scope.data.blobStoreAccessorRef.dataDomain == 'undefined')
                ? $scope.data.blobStoreAccessorRef.dataDomains[0] : $scope.data.blobStoreAccessorRef.dataDomain;
            mailbox.data.blobStoreAccessorRef.type = "Blob Store Accessor";
        }
        else {
            if (typeof mailbox.data.blobStoreAccessorRef != 'undefined') {
                delete mailbox.data.blobStoreAccessorRef;
            }
        }
    };

    $scope.uploadAttachment = function (mailboxRefName, files) {

        console.log('uploading', mailboxRefName + files);

        // Handles multiple files and single files
        if (files && files.length) {
            Upload.upload({
                url: '/api/v1/mailboxEntry/mailboxRefName/' + mailboxRefName + '/upload',
                file: files,
                fields: {
                    to: $scope.mailboxEntry.data.toUserId,
                    from: $scope.mailboxEntry.data.fromUserId,
                    message: $scope.mailboxEntry.data.message,
                    subject: $scope.mailboxEntry.data.subject,
                    tags: $scope.mailboxEntry.data.tags.join(',')
                }
            }).progress(function (evt) {
                console.log(evt.loaded, evt.total, parseInt(100.0 * evt.loaded / evt.total));
                $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                $scope.uploadComplete = false;
            }).success(function (data, status, headers, config) {
                $scope.uploadComplete = true;
            });
        }
    };

    $scope.setFilters = function (type) {
        var domain = $rootScope.authUser.data.dataDomains[0];
        if (type == 'mySystem') {
            $scope.mySystemMailboxes.filterMap = {
                dataDomain: domain,
                systemMailbox: true
            };
        } else if (type == 'inboxSystem') {
            $scope.systemInboxes.filterMap = {
                dataDomain: '!' + domain,
                systemMailbox: true,
                mailboxRole: 'IN'
            };
        } else if (type == 'outboxSystem') {
            $scope.systemOutboxes.filterMap = {
                dataDomain: '!' + domain,
                systemMailbox: true,
                mailboxRole: 'OUT'
            };
        } else if (type == 'sentboxSystem') {
            $scope.systemSentboxes.filterMap = {
                dataDomain: '!' + domain,
                systemMailbox: true,
                mailboxRole: 'SENT'
            };
        } else if (type == 'errorboxSystem') {
            $scope.systemErrorboxes.filterMap = {
                dataDomain: '!' + domain,
                systemMailbox: true,
                mailboxRole: 'ERROR'
            };
        } else if (type == 'intermediateboxSystem') {
            $scope.systemIntermediateboxes.filterMap = {
                dataDomain: '!' + domain,
                systemMailbox: true,
                mailboxRole: 'INTERMEDIATE'
            };
        } else if (type == 'archiveboxSystem') {
            $scope.systemArchiveboxes.filterMap = {
                dataDomain: '!' + domain,
                systemMailbox: true,
                mailboxRole: 'ARCHIVE'
            };
        } else if (type == 'inboxPinned') {
            $scope.pinnedInboxes.filterMap = {
                systemMailbox: false,
                mailboxRole: 'IN'
            };
        } else if (type == 'outboxPinned') {
            $scope.pinnedOutboxes.filterMap = {
                systemMailbox: false,
                mailboxRole: 'OUT'
            };
        } else if (type == 'sentboxPinned') {
            $scope.pinnedSentboxes.filterMap = {
                systemMailbox: false,
                mailboxRole: 'SENT'
            };
        } else if (type == 'errorboxPinned') {
            $scope.pinnedErrorboxes.filterMap = {
                systemMailbox: false,
                mailboxRole: 'ERROR'
            };
        } else if (type == 'intermediateboxPinned') {
            $scope.pinnedIntermediateboxes.filterMap = {
                systemMailbox: false,
                mailboxRole: 'INTERMEDIATE'
            };
        } else if (type == 'archiveboxPinned') {
            $scope.pinnedArchiveboxes.filterMap = {
                systemMailbox: false,
                mailboxRole: 'ARCHIVE'
            };
        }
    };
    $scope.refreshBoxes = function () {
        if (angular.isDefined($scope.mySystemMailboxes)) {
            $scope.mySystemMailboxes.refresh();
        }
        if (angular.isDefined($scope.systemInboxes)) {
            $scope.systemInboxes.refresh();
        }
        if (angular.isDefined($scope.systemOutboxes)) {
            $scope.systemOutboxes.refresh();
        }
        if (angular.isDefined($scope.systemSentboxes)) {
            $scope.systemSentboxes.refresh();
        }
        if (angular.isDefined($scope.systemErrorboxes)) {
            $scope.systemErrorboxes.refresh();
        }
        if (angular.isDefined($scope.systemIntermediateboxes)) {
            $scope.systemIntermediateboxes.refresh();
        }
        if (angular.isDefined($scope.systemArchiveboxes)) {
            $scope.systemArchiveboxes.refresh();
        }
        if (angular.isDefined($scope.pinnedInboxes)) {
            $scope.pinnedInboxes.refresh();
        }
        if (angular.isDefined($scope.pinnedOutboxes)) {
            $scope.pinnedOutboxes.refresh();
        }
        if (angular.isDefined($scope.pinnedSentboxes)) {
            $scope.pinnedSentboxes.refresh();
        }
        if (angular.isDefined($scope.pinnedErrorboxes)) {
            $scope.pinnedErrorboxes.refresh();
        }
        if (angular.isDefined($scope.pinnedArchiveboxes)) {
            $scope.pinnedArchiveboxes.refresh();
        }
        if (angular.isDefined($scope.pinnedIntermediateboxes)) {
            $scope.pinnedIntermediateboxes.refresh();
        }
    }
    $scope.buildIdList = function (selected) {
        $scope.transferEntries.data = [];
        for (var i = 0; i < selected.length; i++) {
            $scope.transferEntries.data[i] = selected[i];
        }
    }
    $scope.entryTemplate = {
        refName: '',
        subject: '',
        toUserId: '',
        fromUserId: '',
        attachments: [],
        tags: [],
        metaData: {}
    };

    /**
     * @function stringifyResponse()
     * @description Stringifies the response if it is a json data
     */

    $scope.stringifyResponse = function(fileName) {

        var patternToMatch = /(?:\.([^.]+))?$/;
        if (!$scope.attachment.data || (patternToMatch.exec(fileName)[1] != 'json')) {
            return;
        }
        var text = JSON.stringify($scope.attachment.data, null, 2);
        $scope.attachment.data = text;
    };

    $scope.getAttachment = function(entryRefName, fileName) {

        $http({
            method: 'GET',
            url: '/api/v1/mailboxEntry/mailboxEntryRefName/' + entryRefName + '/fileName/' + fileName + '/view'
        }).success(function(data) {
            $scope.attachment.data = data;
            $scope.showTree = true;
        })

    };
    $scope.processPayload = function (attachmentData, contentType) {
        //$scope.attachment.data = attachmentData;
        //$scope.showAttachmentData = !$scope.showAttachmentData;
        //$scope.attachmentContentType = contentType;
        if (contentType === 'application/json') {
            var json = angular.fromJson(attachmentData);
            //var json = JSON.stringify(eval("(" + attachmentData + ")"));
            if ($scope.attachment) {
                $scope.attachment.data = json;
            }
            $scope.showTree = true;
        }
    }
    $scope.afterDeleteSelected = function() {
        $scope.blobStoreAccessor.selected = [];
        $scope.blobStoreAccessor.refresh();
    }
}

]);
