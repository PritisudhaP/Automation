myApp.controller('ShipmentsCtrl', ['$scope','$rootScope', '$timeout',   function($scope, $rootScope,  $timeout) {

    $scope.label = {};

    /**
     * addPackage() adds package object to shipments view
     *
     * @param  package current package being built
     */
    $scope.addPackage = function(currentPackage) {
        if(currentPackage){
            if(!$rootScope.shipment.data.hasOwnProperty('packages')){
                $rootScope.shipment.data.packages = [];
            }
            $rootScope.shipment.data.packages.push(currentPackage);
        }
    };

    /**
    * addReference() adds reference object to shipments view
    *
    * @param  reference current reference being built
    */
    $scope.addReference = function(item){
        if(angular.isDefined(item)) {
            item.systemInd = 'N';
            $scope.shipment.data.referenceData.push(item);
            //$scope.purchaseOrder.put();
        }
    };
    /**
    * updateRequiredReferences() update required references object to shipments view
    *
    * @param  referencse current references being built
    */
    $scope.updateRequiredReferences = function(references){
        $scope.shipment.data.referenceData = references;
        $scope.shipment.put(
            $scope.viewUccLabel()
            );
    };

    /**
    * updateRequiredReferencesCreateLabel() update required references object to shipments view
    *
    * @param  referencse current references being built
    */
    $scope.updateRequiredReferencesCreateLabel = function(references){
        $scope.shipment.data.referenceData = references;
        $scope.shipmentGenerateLabel.data.referenceData = references;
        $scope.shipmentGenerateLabel.put();
    };

    /**
    * viewUccLabel() check references before viewing UCC label
    *
    * @param
    */

    $scope.viewUccLabel = function(){
        var isReferenceDataReady = true;
        // lets check for references
       if($scope.shipment.data.referenceData.length > 0){

            // there are refernces so lets itterate over to make sure required ones have value
            for(var i=0; i < $scope.shipment.data.referenceData.length; i++) {
                if($scope.shipment.data.referenceData[i].requiredInd  === 'Y' && $scope.shipment.data.referenceData[i].value === ''  ){
                    isReferenceDataReady = false;
                    break;
                }
            }
            // if the reference data passes and isReferenceDataReady true show the ucc label else show the reference modal
            if(isReferenceDataReady === true){
                  $scope.showModal('fulfillment/shipments/generate-ucc-label',$scope.uccPackages );
            } else {
            // isRefenceDataReady is false so lets not show the modal
              $scope.showModal('/fulfillment/shipments/reference-required', {'items':$scope.shipment.data.referenceData}, $scope.updateRequiredReferences);
            }

       } else {
        // if no references we can just go ahead as usual
        $scope.showModal('fulfillment/shipments/generate-ucc-label',$scope.uccPackages );
       }
    };


    $scope.prepareAsn = function(data){
        var isASNDataReady = true;
        // lets check for references
       if(data.carrier === 'TBD' || data.carrier === '' ){
           isASNDataReady = false;
       }

       if(data.proNumber === 'TBD' || data.proNumber === '' ){
           isASNDataReady = false;
       }

       if(data.bolNumber === 'TBD' || data.bolNumber === '' ){
           isASNDataReady = false;
       }

       if(!isASNDataReady) {
          //$scope.showModal('/fulfillment/shipments/asn-required', data);
	      var errorMessage = {message:"Please fill out all required fields and provide actual values not 'TBD'."};
		  $scope.sendAsn.errors.push(errorMessage);
       } else {
          $scope.sendAsn.post();
       }
    };


    $scope.isEditableState = function(item) {
        if (item) {
            if (($rootScope.$hasPermission('Shipment:Create') || $rootScope.$hasPermission('Shipment:Update')) && !(item.shipmentStatus === 'SHIPPED' ||
                item.shipmentStatus === 'DELIVERED' ||
                item.shipmentStatus === 'ASN_SENT' ||
                item.shipmentStatus === 'INVOICED' ||
                item.shipmentStatus === 'CANCELED')) {
                return true;
            }
            return false;
        } else {
            if (angular.isDefined($scope.shipment.data)) {
                if (($rootScope.$hasPermission('Shipment:Create') || $rootScope.$hasPermission('Shipment:Update')) && !($scope.shipment.data.shipmentStatus === 'SHIPPED' ||
                    $scope.shipment.data.shipmentStatus === 'DELIVERED' ||
                    $scope.shipment.data.shipmentStatus === 'ASN_SENT' ||
                    $scope.shipment.data.shipmentStatus === 'INVOICED' ||
                    $scope.shipment.data.shipmentStatus === 'CANCELED')) {
                    return true;
                }
                return false;
            } else {
                return false;
            }
        }
    }


    /**
    * generateUccLabel() check references before viewing UCC label
    *
    * @param
    */

    $scope.generateUccLabel = function(){
        var isReferenceDataReady = true;
        // lets check for references
       if($scope.shipment.data.referenceData.length > 0){

            // there are refernces so lets itterate over to make sure required ones have value
            for(var i=0; i < $scope.shipment.data.referenceData.length; i++) {
                if($scope.shipment.data.referenceData[i].requiredInd  === 'Y' && $scope.shipment.data.referenceData[i].value === ''  ){
                    isReferenceDataReady = false;
                    break;
                }
            }
            // if the reference data passes and isReferenceDataReady true show the ucc label else show the reference modal
            if(isReferenceDataReady === true){
                  $scope.uccLabel.get();
            } else {
            // isRefenceDataReady is false so lets not show the modal
              $scope.showModal('/fulfillment/shipments/reference-required', {'items':$scope.shipment.data.referenceData}, $scope.updateRequiredReferencesCreateLabel);
            }

       } else {
        // if no references we can just go ahead as usual
        $scope.uccLabel.get();
       }
    };

    /**
    * removeArrayItem() remove reference object from shipments view
    *
    * @param  idx index of array
    */
    $scope.removeReference = function(idx) {
        if(angular.isDefined(idx)) {
            $scope.shipment.data.referenceData.splice(idx, 1);
        }
    };

    /**
     * checkLabelStatus() checks label status based on package
     *
     * @param  package current package being built
     */
    $scope.checkLabelStatus = function(){
        if($scope.shipment.data.packages[0].label ){
            $scope.label.data = $scope.shipment.data;
        }
    };

    /**
     * Create tracking link
     */
    $scope.createTrackingLink = function(carrier, trackingId) {
        /**
         * Get more visit:
         * http://www.track-trace.com/
         * http://goo.gl/uqJBez
         */
        var urls = {
            dhl: 'http://www.dhl.com/content/g0/en/express/tracking.shtml?brand=DHL&AWB={{trackingId}}',
            ups: 'http://wwwapps.ups.com/etracking/tracking.cgi?TypeOfInquiryNumber=T&InquiryNumber1={{trackingId}}',
            fedex: 'https://www.fedex.com/apps/fedextrack/?tracknumbers={{trackingId}}',
            usps: 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1={{trackingId}}'	
        };

        carrier = String(carrier).toLowerCase();

        if ( !urls[ carrier ] || trackingId === undefined ) return '#';

        return urls[ carrier ].replace('{{trackingId}}', trackingId);
    };


    $scope.getShipmentIds = function(shipments){
        var ary = [];
        shipments.forEach(function(item){
            ary.push(item.id)
        });
        return ary;
    };
}]);
