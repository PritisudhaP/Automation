(function() {
    angular.module('app')
    .controller('RemittanceAdviceCtrl', ['$scope', function($scope,$rootScope) {
            /**
             * removeContact() Adds contact to site
             */
            $scope.addContact = function(contact) {
                //console.info($scope.site);

                if(angular.isDefined(contact)) {
                    contact.refName = contact.firstName + contact.lastName;
                    contact.refName = contact.refName.replace("[^A-Za-z0-9]","");
                    contact.refName.toLowerCase();
                    contact.dataDomains = [$scope.site.data.dataDomain];
                    $scope.site.data.contacts.push(contact);
                }
            };


            /**
             * removeContact() Removes contact from site
             */
            $scope.removeContact = function(item) {
                $scope.site.data.contacts.splice(item, 1);
            };

            $scope.chooseSites = function(selected){
                if(angular.isDefined(selected)){
                    var lngSelected = selected.length;
                    for(var i=0;i<lngSelected;i++){
                        var item = selected[i];
                        if (!$scope.siteGroup.data || !$scope.siteGroup.data.sites) {
                            if (!$scope.siteGroup.data) {$scope.siteGroup.data = {};}
                            $scope.siteGroup.data.sites = [];
                        }
                        var current = $scope.siteGroup.data.sites;
                        var inList = false;
                        for (var j = 0; j < current.length; j++) {
                            if (selected[i].refName === current[j].refName) {
                                inList = true;
                            }
                        }
                        if (!inList) {$scope.siteGroup.data.sites.push(selected[i]);}
                    }
                }
            };
            $scope.applyZips = function(data) {
                if(angular.isDefined(data)) {
                    angular.forEach(data, function (zip, key) {
                        var index = $scope.siteCluster.data.zips.indexOf(zip);
                        if (index == -1) {
                            $scope.siteCluster.data.zips.push(zip);
                        }
                    });
                }
            };
            $scope.checkMailbox = function(){
                if($scope.site.data.shipmentRequestMailboxRefName  !== undefined){

                    if($scope.site.data.shipmentRequestMailboxRefName ===  ''){
                        delete $scope.site.data.shipmentRequestMailboxRefName;
                    }
                }
            };
            $scope.removeZips = function() {
                $scope.siteCluster.data.zips = [];
            };
            $scope.siteTemplate = {
                catalogId: '',
                contacts: [],
                dataDomains: [],
                fedExSubscribeErrors: [],
                fulfillmentCost: '',
                lineCost: '',
                phone: '',
                refName: '',
                shipmentRequestMailboxRefName: ''
            };

            $scope.selectMailbox = function(selected) {
                $scope.site.data.shipmentRequestMailboxRefName = selected.refName;
            };

        }]);
})();
