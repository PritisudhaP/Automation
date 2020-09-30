(function () {
    angular.module('app')
        .controller('GridCtrl', ['$scope', '$rootScope', '$enspirePermissions', function ($scope, $rootScope, $enspirePermissions) {

            $scope.dashBlocks = [
                [
                    {
                        title: 'Integration',
                        permission:'Dashboard:ViewIntegrationTile',
                        link: 'integration/',
                        icon:'puzzle',
                        showIf: "$hasPermission('Webhook:UI-View')||$hasPermission('RouteDef:UI-View')||$hasPermission('Script:UI-View')||$hasPermission('Scheduler:UI-View')",
                        items: [
                            {title: 'Web Hooks',
                                permission:'Webhook:UI-View',
                                link: 'integration/webhooks/',
                                icon:'chevron-right-circle'},
                            {title: 'Routes',
                                permission:'RouteDef:UI-View',
                                link: 'integration/routes/',
                                icon:'chevron-right-circle'},
                            {title: 'Scripts',
                                permission:'Script:UI-View',
                                link: 'integration/scripts/',
                                icon:'chevron-right-circle'},
                            {title: 'Triggers',
                                permission:'Scheduler:UI-View',
                                link: 'integration/triggers/',
                                icon:'chevron-right-circle'}
                        ]
                    }
                ],
                [
                    {
                        title: 'Account Settings',
                        permission:'Dashboard:ViewAccountTile',
                        link: 'settings/',
                        icon:'customers',
                        showIf: "$hasPermission('AuditEvent:UI-View')||$hasPermission('Capability:UI-View')||$hasPermission('DataDomainPolicy:UI-View')||$hasPermission('FunctionalDomain:UI-View')||$hasPermission('RegistrationRequest:UI-View')||$hasPermission('Role:UI-View')||$hasPermission('LogEvent:UI-View')||$hasPermission('UserGroup:UI-View')||$hasPermission('UserProfile:UI-View')",
                        items: [
                            {title: 'Users',
                                permission:'UserProfile:UI-View',
                                link: 'settings/accounts/users/',
                                icon:'chevron-right-circle'},
                            {title: 'User Groupss',
                                permission:'UserGroup:UI-View',
                                link: 'settings/accounts/user-groups/',
                                icon:'chevron-right-circle'},
                            {title: 'Roles',
                                permission:'Role:UI-View',
                                link: 'settings/accounts/roles/',
                                icon:'chevron-right-circle'},
                            {title: 'Audit Log',
                                permission:'AuditEvent:UI-View',
                                link: 'settings/accounts/audit-log/',
                                icon:'chevron-right-circle'},
                            {title: 'System Log',
                                permission:'LogEvent:UI-View',
                                link: 'settings/accounts/system-log/',
                                icon:'chevron-right-circle'},
                            {title: 'Functional Domain',
                                permission:'FunctionalDomain:UI-View',
                                link: 'settings/accounts/functional-domains/',
                                icon:'chevron-right-circle'},
                            {title: 'Capabilities',
                                permission:'Capability:UI-View',
                                link: 'settings/accounts/capabilities/',
                                icon:'chevron-right-circle'},
                            {title: 'Data Domain Policies',
                                permission:'DataDomainPolicy:UI-View',
                                link: 'settings/accounts/domain-policies/',
                                icon:'chevron-right-circle'}
                        ]
                    }
                ],
                []
            ];
            $scope.moveCallback = function(event, index, external, type) {

                console.log('dragged over', event, index, external, type);
                var updated = $scope.dashBlocks.splice(index, 1);
                console.log("moveCallback ", updated);
                // Disallow dropping in the third row. Could also be done with dnd-disable-if.
                //return index < 10;
            };



            $scope.dragoverCallback = function(event, index, external, type) {
                $scope.logListEvent('dragged over', event, index, external, type);
                // Disallow dropping in the third row. Could also be done with dnd-disable-if.
                return index < 10;
            };
            $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                $scope.logListEvent('dropped at', event, index, external, type);
                return item;
            };
            $scope.logEvent = function(message, event) {
                console.log(message, '(triggered by the following', event.type, 'event)');
                console.log(event);
            };
            $scope.logListEvent = function(action, event, index, external, type) {
                var message = external ? 'External ' : '';
                message += type + ' element is ' + action + ' position ' + index;
                $scope.logEvent(message, event);
            };






            // $scope.dropCallback = function(event, index, item, external, type, allowedType) {
            //     $scope.logListEvent('dropped at', event, index, external, type);
            //     if (external) {
            //         if (allowedType === 'itemType' && !item.label) return false;
            //         if (allowedType === 'containerType' && !angular.isArray(item)) return false;
            //     }
            //     return item;
            // };
            // $scope.logEvent = function(message, event) {
            //     console.log(message, '(triggered by the following', event.type, 'event)');
            //     console.log(event);
            // };
            // $scope.logListEvent = function(action, event, index, external, type) {
            //     var message = external ? 'External ' : '';
            //     message += type + ' element is ' + action + ' position ' + index;
            //     $scope.logEvent(message, event);
            // };
            //$scope.model = [];
            // Initialize model
            // var id = 10;
            // for (var i = 0; i < 3; ++i) {
            //     $scope.model.push([]);
            //     for (var j = 0; j < 2; ++j) {
            //         $scope.model[i].push([]);
            //         for (var k = 0; k < 7; ++k) {
            //             $scope.model[i][j].push({label: 'Item ' + id++});
            //         }
            //     }
            // }
            // var codeBlock = document.getElementById('dndModelOutput');
            // $scope.$watch('model', function(model) {
            //     $scope.modelAsJson = angular.toJson(model, true);
            //     $timeout(function(){
            //         codeBlock.innerText = $scope.modelAsJson;
            //         hljs.highlightBlock(codeBlock);
            //     }, 0);
            // }, true);
            // $scope.containsItems = function (item) {
            //     if (item.items.length > 0) {
            //         for (var i = 0; i < item.items.length; i++) {
            //             var aryPermission = item.items[i].permission.split(':');
            //
            //             var permission = aryPermission[0];
            //             var domain = undefined;
            //
            //             if(aryPermission.length>1) permission += ':'+aryPermission[1];
            //             if(aryPermission.length>2) domain = aryPermission[2];
            //
            //             if ($enspirePermissions.hasPermission(permission,domain)) {
            //                 return true;
            //             }
            //
            //         }
            //         return false;
            //     }
            //     else {
            //         return false;
            //     }
            // }
            // $scope.gridsterOpts = {
            //     minRows: 1, // the minimum height of the grid, in rows
            //     maxRows: 100,
            //     columns: 6, // the width of the grid, in columns
            //     colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            //     rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            //     margins: [10, 10], // the pixel distance between each widget
            //     defaultSizeX: 2, // the default width of a gridster item, if not specifed
            //     defaultSizeY: 2, // the default height of a gridster item, if not specified
            //     mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
            //     resizable: {
            //         enabled: true,
            //         start: function (event, uiWidget, $element) {
            //         }, // optional callback fired when resize is started,
            //         resize: function (event, uiWidget, $element) {
            //         }, // optional callback fired when item is resized,
            //         stop: function (event, uiWidget, $element) {
            //         } // optional callback fired when item is finished resizing
            //     },
            //     draggable: {
            //         enabled: true, // whether dragging items is supported
            //         handle: '.ddd', // optional selector for resize handle
            //         start: function (event, uiWidget, $element) {
            //         }, // optional callback fired when drag is started,
            //         drag: function (event, uiWidget, $element) {
            //         }, // optional callback fired when item is moved,
            //         stop: function (event, uiWidget, $element) {
            //         } // optional callback fired when item is finished dragging
            //     }
            // };
            //
            // $scope.$watch('menuItems', function(items){
            //     // one of the items changed
            // }, true);

        }]);
})();
