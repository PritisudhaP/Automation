module.exports =function(){

    //Added by shyam
    var ONbr = " ";
     
    var salesOrderDefaultGearIconOption = "Release";
    var temp = "";

    var salesOrderStatustext = element(by.xpath("//*[contains(@ng-repeat,'data track by $index')]/div/div[5]"));
   
    var shipmentNbr = element(by.xpath('(//b[text()="Fulfillment Request #"])/following-sibling::a'));

    //
    this.salesOrderSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.salesOrderSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.salesOrderSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    this.salesOrderSearchCriteriaRemove = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));

   // this.salesOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
   this.salesOrderSelectGearIcon = element(by.xpath('(//div/en-actions/button/en-icon)[2]/parent::button'));
  // this.salesOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.salesOrderReleaseOrderFromGearIcon = element(by.xpath('//span/li/button/span[text()="Release"]/parent::button'));

   // this.salesOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));
   //this.salesOrderStatusText = element(by.xpath('(//en-label/span/span/small)[1]'));
   this.salesOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[2])[1]'));
    this.salesOrderNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[6])[1]/div/small/strong'));
    this.salesOrderEditGear = element(by.xpath("(//div/en-actions/button/en-icon)[1]/parent::button"));
    this.releaseOrderButton = element(by.xpath("//li/button/span[contains(text() , 'Release')]/parent::button"));

    this.salesOrderMatchFilterSelect = element(by.xpath('//select[@name="filter"]'));

    this.salesOrderSelectAllCheckbox = element(by.xpath('//input[@ng-model="salesOrderCollection.checkAllModel"]'));
    this.salesOrderActionAllButton = element(by.xpath('//div[@class="en-collection-title"]/en-actions/button'));
    this.alertMessage= element(by.xpath("//en-alert[@class='alert-error alert-scrollable']/span"));
    this.statusText= element(by.xpath("//span[@class='ellipsis']/span/small"));
    this.ActionAllButton = element(by.xpath("//en-icon[@icon='more-vertical']"));
    this.shippingRequestTab = element(by.xpath('//en-tab[@pane = "shipReqPane"]'));
    this.shippingRequestPlusIcon = element(by.xpath('//en-icon/parent::en-collapse-trigger'));
    this.shippingRequestQuantityCount = element(by.xpath('(//div[@class = "en-collection-row"]/div[3])[1]'));
    this.salesOrderLineQty = element(by.xpath("//div/div/div[@class= 'line-qty']/div/div/span"));
    this.searchTab = element(by.xpath("//form/en-field/en-input/input"));
    this.skuNameOnShipmentRequest = element(by.xpath("(//div[@class = 'en-collection-row']/div[1])[1]"));
    //modified by Priti for presale
    this.skuStatusText= element(by.xpath("//en-label[@class='label-xs bold label-success']/small"));
    this.reservationlink = element(by.xpath("//en-tab[contains(text(),'Reservations')]"));
    this.reservationText = element(by.xpath("//en-title[@class='title-sm ng-binding']"));
    

    //var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    // Added by shyam for zipcodes   
    this.filterText = element(by.model("apiSearchText.value"));
    this.statusEditGear = element(by.xpath('(//en-icon[@icon="more-vertical"])[1]'));
    this.updateOrderStatus = element(by.xpath('//span[text()="Update Status"]'));
    this.delivered = element(by.model('modalObject.status')).element(by.css('option[value="DELIVERED"]'));
    this.orderStatusComments = element(by.model('modalObject.reason'));
    this.orderNbr = element(by.xpath('(//strong)[6]'));
    this.orderStatus = element(by.xpath('(//small[@class="ng-binding"])[2]'));
    this.orderRelease = element(by.xpath('//span[text()="Release"]'));
    this.filter = element(by.model('apiSearchText.value'));
    this.confirmRelease = element(by.xpath('//en-modal-footer/en-footer/div/button[2]/span'));
    this.logsTab = element(by.xpath('//en-tab[text()="Logs"]'));
    this.chevronIcon = element(by.xpath('//en-collapse-trigger/en-icon'));
    this.orderlogCountryZip = element(by.xpath('//small[contains(text(),"37.09024,-95.712891")]'));
    this.orderlogCountryCAZip = element(by.xpath('//small[contains(text(),"56.130366,-106.346771")]'));
    this.orderlogcityZip = element(by.xpath('//small[contains(text(),"33.7489954,-84.3879824")]'));
    this.orderlogcityCAZip = element(by.xpath('//small[contains(text(),"43.653226,-79.383184")]'));
    this.orderlogstateZip = element(by.xpath('//small[contains(text(),"35.20105,-91.831833")]'));
    this.orderlogstateCAZip = element(by.xpath('//small[contains(text(),"70.2997711,-83.10757699999999")]'));
    this.resolveLabel = element(by.xpath('//small[contains(text(),"Trying to resolve")]'));
    this.citywithSpaces = element(by.xpath('//small[contains(text(),"37.7749295,-122.4194155")]'));
    this.validZipcode = element(by.xpath('//small[contains(text(),"37.15833480000001,-79.233837")]'));
    this.customeredit = element(by.xpath('(//en-icon[@class="xs"])[2]'));
    this.geardots = element(by.xpath('(//en-icon[@icon="more-vertical"])[3]'));
    this.error = element(by.xpath('(//div[@ng-class="alertClasses(message)"])[1]'));	
    
    // Added by Shyam
    
    this.channelEditBtn = element(by.xpath('(//en-icon[@icon="edit"])[2]'));
    this.tick = element(by.xpath('//en-icon[@icon="check"]'));
    this.callIn = element(by.xpath('//strong[contains(text(),"Call-In")]'));

    this.cancelbtn = element(by.xpath('//span[text()="Cancel"]'));
    this.ShipmentTab = element(by.xpath('//en-tab[text()="Shipping Requests"]'));
    this.clickonFR = element(by.xpath('//section/div/a'));
//Added By Vishak
    
    this.canclQTYBox = element(by.model("$parent.cancelledQty"));
    this.canclReasonDropdown = element(by.model("$parent.cancelReason"));
    this.cnfButtonClick = element(by.xpath("//Button/span[contains(text(),'Confirm')]"));
    this.cancelNote = element(by.xpath("//span[contains(text(),'Add Cancellation Notes')]/parent::Button"));
    this.cancelNoteContent = element(by.model("$root.notes"));
    this.inventoryOptionPaneButton = element(by.xpath('//en-tab[@pane="lineOptionPane_Inventory"]'));
    this.doneButton = element(by.xpath('//button[@en-tap="closeModal()"]'));
    this.cancelAllLineCheckBox = element(by.model("isCancelAllLine"));
    this.CancelReasonAllLine = element(by.model("OrdercancelReason"));
    this.rejectReasonCodeDropdown = element(by.model("modalObject.reasonCode"));
    this.rejectComments = element(by.model("modalObject.reason"));
    this.reasondropdowndisabled = element(by.xpath('//select[@disabled="disabled"]'));
    this.payButton = element(by.xpath("//button/span[contains(text(),'Pay')]"));
    this.paymentMethodDropdown = element(by.model("payment.method"));
    this.cardNumber = element(by.model("payment.cardNumber"));
    this.PaymentCVV = element(by.model("payment.cvv"));
    this.nameOnCard = element(by.model("payment.nameOnCard"));
    this.cardExpMonth = element(by.model("payment.expMonth"));
    this.cardExpYear = element(by.model("payment.expYear"));
    this.paymentSubmitButton = element(by.xpath("//button/span[contains(text(),'Submit')]"));
    this.lineselect = element(by.xpath('//div/div[@class="en-collection-row"]'));
    this.jobDefinition = element(by.xpath('//en-tab[@data-state="definitions"]'));
    
//////////*******************END OF LOCATORS****************************************//////
    
   
    this.selectChannel = function(channel){
        this.channelEditBtn.click();
        element(by.cssContainingText('option',channel)).click();
        this.tick.click();
    }

    this.attachCustomer = function(){
        return this.callIn.click();
    }

    this.clickOnShipmentTab = function(){
        this.ShipmentTab.click();
        this.chevronIcon.click();
        this.clickonFR.click();
    }
   
    this.filter = function(){
        var value = ONbr;
        console.log("filter value:",value)
        this.filterText.sendKeys(value);
    }


    //
    this.salesOrderSearch = function(criteria, salesOrderSearchValue){
/*        commons.selectOption(this.salesOrderSearchCriteriaDropdown,criteria);
        this.salesOrderSearchTextbox.clear();
//        this.salesOrderSearchTextbox.sendKeys(salesOrderSearchValue);

        for (var i = 0, len = salesOrderSearchValue.length; i < len; i++) {
            this.salesOrderSearchTextbox.sendKeys(salesOrderSearchValue[i]);
            browser.sleep(100);
        }

        return this.salesOrderSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = salesOrderSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(salesOrderSearchValue[i]);
            browser.sleep(100);
        }

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.clickOnReleaseOrderButton = function()
    {
        this.salesOrderEditGear.click();
        browser.sleep(1000);
        return this.releaseOrderButton.click();
    }

    this.clearSearchTab = function () {
        return this.searchTab.clear();
    }

    this.salesOrderSearchRemove = function(count) {
       temp = "(//button/en-icon[@icon='x-circle']/parent::button)[" + count +  "]";
       return element(by.xpath(temp)).click();
    }

    this.getSalesOrderLineQty = function () {
        return this.salesOrderLineQty.getText();
    }

    this.clickOnshippingRequestTab = function()
    {
        return this.shippingRequestTab.click();
    }

    this.viewShippingRequest = function(){
        return this.shippingRequestPlusIcon.click();
    }

    this.getShippingQuantityValue = function () {
        return this.shippingRequestQuantityCount.getText();
    }
    this.getSkuNameOnShipmentRequest = function () {
        return this.skuNameOnShipmentRequest.getText();
    }




    this.salesOrderSelectGear = function(selectOption){
        this.salesOrderSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "View")
            return element(by.xpath(temp)).click();
        
        else if(selectOption == "Cancel")
            return element(by.xpath(temp)).click();
        
        else {
                element(by.xpath(temp)).click();
                temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
                return element.all(by.xpath(temp)).get(1).click();
        }
    }

   this.salesOrderStatus = function() {
        return this.salesOrderStatusText.getText();
   }

   this.salesOrderNumber = function() {
       return this.salesOrderNumberText.getText();
   }

   this.salesOrderMatchFilter = function(value) {
       return this.salesOrderMatchFilterSelect.sendKeys(value);
   }

    this.multiSalesorderAction = function(action) {
       this.salesOrderSelectAllCheckbox.click();
       this.salesOrderActionAllButton.click();
       temp = "//button/span[contains(text(),'" + action + "')]/parent::button";
       element.all(by.xpath(temp)).get(0).click();
       element.all(by.xpath(temp)).get(1).click();

    }
    this.alertMessageOnValidateOrder =function()
    {
       return this.alertMessage.getText();
    }
    this.status= function()
    {
      return this.statusText.getText();
    }
    this.multiAction = function(action)
    {
      this.salesOrderSelectAllCheckbox.click();
             this.ActionAllButton.click();
             temp = "//button/span[contains(text(),'" + action + "')]/parent::button";
             element.all(by.xpath(temp)).get(0).click();

    }
    this.verifySkuStatus = function()
    {
      return this.skuStatusText.getText();
    }
    this.clickOnReservationsTab = function()
    {
      return this.reservationlink.click();
    }
    this.verifyReservationText = function()
    {
     return this.reservationText.getText();
    }
   // Added by Shyam 

    this.EditGear =function()
    {
        return this.statusEditGear.click();
    }
    this.updateStatus =function()
    {
        return this.updateOrderStatus.click();
    }
    this.updateComments= function()
    {
        return this.orderStatusComments.sendKeys("Automation scripts");
    }
    this.printOrderNbr = function(){
        this.orderNbr.getText().then(function(nbr){
            console.log("OrderNbr:",nbr)
        }); 
        }
    
    this.verifyorderStatus = function(value) {
        return  this.orderStatus.getText().then(function (orderStatus) {
            console.log("Order Status: ",orderStatus)
            expect(orderStatus).toBe(value)
        });
    }
    this.clickonRelease = function(){
        this.orderRelease.click();
        this.confirmRelease.click();
    }

    this.Logs = function(){
   return this.logsTab.click();
    }

    this.clickonLogs = function(){
        return this.chevronIcon.click();
    }

    this.checkCountryzip = function(){
        this.orderlogCountryZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogCountryZip.isPresent()).toBe(true);
    }

    this.checkCountryCAzip = function(){
        this.orderlogCountryCAZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogCountryCAZip.isPresent()).toBe(true);
    }
    this.checkCityzip = function(){
        this.orderlogcityZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogcityZip.isPresent()).toBe(true);
    }
    this.checkCityCAzip = function(){
        this.orderlogcityCAZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogcityCAZip.isPresent()).toBe(true);
    }
    this.checkStatezip = function(){
        this.orderlogstateZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogstateZip.isPresent()).toBe(true);
    }
    this.checkStateCAzip = function(){
        this.orderlogstateCAZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogstateCAZip.isPresent()).toBe(true);
    }
    this.checkResolveLabel = function(){
        expect(this.resolveLabel.isPresent()).toBe(false);
        console.log("valid zipcode")
    }
    this.checkcitywithspaces = function(){
        expect(this.citywithSpaces.isPresent()).toBe(true);
        this.citywithSpaces.getText().then(console.log);
    }
    this.checkvalidZipcode = function(){
        expect(this.validZipcode.isPresent()).toBe(true);
        this.validZipcode.getText().then(console.log);
    }

    this.customerEdit = function(){
        return this.customeredit.click();
    }

    this.soGeardots = function(){
        return this.geardots.click();
    }

    this.sogeardots2 = function(){
        element(by.xpath('(//en-icon[@icon="more-vertical"])[4]')).click();
    }

    this.verifypopupError = function(){
        return this.error.click();
    }
    this.clickonCancelbtn = function(){
        return this.cancelbtn.click();
    }

   this.capture = function(){
         ONbr = this.orderNbr.getText().then(console.log);
       return ONbr;
   }

   this.salesOrderNbr = function() {
    return this.orderNbr.getText();
}

this.clickOnStatustext = function(){
    salesOrderStatustext.click();
}


 this.clickOnStab = function(){
    this.ShipmentTab.click();
    this.chevronIcon.click();
 }

 this.clickOnitemtab = function(){
    element(by.xpath('//en-tab[@pane="itemsPane"]')).click();
 }

 this.getShipmentReqNbr = function(){
     return this.shipmentNbr.getText();
 }

 //Added by Vishak
 
 this.cancelLineConfirmDisabled = function(line){
	 temp = element(by.xpath('(//Button[@disabled="disabled"])['+line+']'));
	 return temp.isPresent();
	 
 }
 this.CanclQTY = function(value){
	 
	 this.canclQTYBox.clear();
	 this.canclQTYBox.sendKeys(value);
 }
 
 this.QTYClear = function(){
	 
	 this.canclQTYBox.clear();

 }
 
 this.CanclReason = function(value){
	 
	 this.canclReasonDropdown.sendKeys(value);

 }
 
 this.CNFButton = function(){
	// return this.cnfButtonClick.click();
element(by.xpath("//Button/span[contains(text(),'Confirm')]")).isPresent().then(function(result) {
		    if ( result ) {
		        
		   	  this.cnfButtonClick.click();
		    	
		    } else {
		    	
				 console.log("confirm button not avilable ")

		    }
	    });
 }
 
 this.OrderStatusDetails = function(line){
	orderStatusLabel = element(by.xpath('(//small[@class="ng-binding"]/parent::en-label)['+line+']'));
	return orderStatusLabel.getText();
 }
 
 this.avaialbleTocancelQTY = function(line){
	 
	 temp = element(by.xpath("(//tbody/tr/td[@class='ng-binding'])["+line+"]"));
	 
	 return temp.getText();
	 
 }
 
 this.CancelNotes = function(value){
	 
	 this.cancelNote.click();
	 browser.sleep(500);
	 this.cancelNoteContent.sendKeys(value);
 }
 
 this.inventoryDetailsCountInSO = function (inventoryCount){
     temp = "(//div[@ng-if='pools.data ']/div/strong)["+ inventoryCount +"]";
     return element(by.xpath(temp)).getText().then(function(count){
         browser.driver.sleep(3000);
         return parseInt(count);
     })
 }
 
 this.lineDetails = function(line){
	 
	 temp = element(by.xpath('(//div[@class="line-details"])['+line+']'))
	 return temp.click();
 }
 
 this.inventoryOptionPane = function(){
	 
	 this.inventoryOptionPaneButton.click();
 }
 
 this.Done = function(){
	 
	 return this.doneButton.click();
 }
 
this.CanclQTYHeaderLevel = function(line,value){
	 
	 temp=element(by.xpath('(//input[@name="cancelledQty[index]"])['+line+']'));
	 temp.clear();
	 temp.sendKeys(value);
 }

this.CanclReasonHeaderLevel = function(line,value){
	 
	 temp=element(by.xpath('(//select[@name="reasonCode[index]"])['+line+']'));
	 temp.sendKeys(value);
	}

this.CancellAllLine = function(){
	
	return this.cancelAllLineCheckBox.click();
	
	}
this.CancelAllLineReason = function(value){
	
	return  this.CancelReasonAllLine.sendKeys(value);
}

/*this.LinceCancelCheck = function(qty,reason) {

	   temp = '//en-label/small[@class="ng-binding"]';	  
	   var totallines = element.all(by.xpath(temp));
	   totallines.count().then(function (total){
		   var totalcount = total;
		   console.log("the total lines in the sales order : "+(totalcount-1));
		   for(i=2;i<=totalcount;i++){
			   data=element(by.xpath('(//small[@class="ng-binding"]/parent::en-label)['+i+']')).getText();
			   if(data=="FAILED TO ALLOCATE"){
				  console.log("failed line item");
			   }
			   else{
				   
				   element(by.xpath("(//button/en-icon[@icon ='more-vertical'])["+(i+1)+"]")).click();
				   element(by.xpath("//button/span[contains(text(),'Cancel Line')]")).click(); 
				   browser.sleep(3000);
				   element(by.model("$parent.cancelledQty")).clear();
				   element(by.model("$parent.cancelledQty")).sendKeys(qty);
				   element(by.model("$parent.cancelReason")).sendKeys(reason);
				   element(by.xpath("//Button/span[contains(text(),'Confirm')]")).click();
				   browser.sleep(1000);
				   return data;
				   break;
			   }
		   }
	   });   
  }*/
 
this.cancelAllLines= function(){
	
		temp='//tbody[@ng-repeat="lineItem in getLineitem(enquiry.data.lineItems)"]';
		var totallines = element.all(by.xpath(temp));
		   totallines.count().then(function (total){
			   var totalcount = total;
			   posititon=5;
			   console.log("the total lines in the header level cancel : "+totalcount);
			   for(i=1;i<=totalcount;i++){
				   browser.sleep(1000);
				   qty = element(by.xpath("(//tbody/tr/td[@class='ng-binding'])["+posititon+"]")).getText();
				   browser.sleep(2000);
				   element(by.xpath("(//input[@name='cancelledQty[index]'])["+i+"]")).clear();
				   element(by.xpath("(//input[@name='cancelledQty[index]'])["+i+"]")).sendKeys(qty);
				   element(by.xpath("(//select[@name='reasonCode[index]'])["+i+"]")).sendKeys("NotNeeded"); 		
				   posititon=posititon+3;
			   }
		   });
	
	}

	this.shipmentRejectPopup = function(reason,msg){
		
		this.rejectReasonCodeDropdown.sendKeys(reason);
		this.rejectComments.sendKeys(msg);
	} 
	this.cancelQTYHeaderLevelCheck = function(line){
		
		 temp=element(by.xpath('(//en-field/button[@disabled="disabled"])['+line+']'));
		 return temp.isPresent();
	}
	this.reasonDropdownAvailability = function(){
		
		return this.reasondropdowndisabled.isPresent();
	}
	
	this.SavedOrderStatusForPayment = function(status){
		
		if(status =="PAYMENT HOLD"){
			
			 this.payButton.click();
			 browser.sleep(500);
			 this.paymentMethodDropdown.sendKeys(browser.params.paymentMethod);
			 browser.sleep(500);
			 this.cardNumber.sendKeys(browser.params.cardNumber);
			 this.PaymentCVV.sendKeys(browser.params.cvv);
			 this.nameOnCard.sendKeys(browser.params.custDisplayName);			 
			 this.cardExpMonth.sendKeys(browser.params.expMonth);
			 browser.sleep(500);			 
			 this.cardExpYear.sendKeys(browser.params.expYear);
			 browser.sleep(500);			 
			 this.paymentSubmitButton.click();
		     browser.sleep(8000);
		 
		}
		else{
			
			console.log("the status is "+status);
		}
		
	}
	
	this.totalRfundtoTenderAmount = function(){
		
		temp=element(by.xpath('//table/tbody/tr/td/span[@class="ng-binding ng-scope"]'));
		return temp.getText();
	}
 this.orderRelease = function(value,line){
		 
		 temp ="(//button/span[contains(text(),'"+value+"')])["+line+"]";
		 element(by.xpath(temp)).click();
		 
	 }
	 this.lineamount = function (name,line) {
		 temp=element(by.xpath("(//small[contains(text(),'"+name+"')]/following-sibling::small)["+line+"]"));
		 return temp.getText();
	
	 }
	 
	 this.orderAmount = function (name,line) {
		 temp=element(by.xpath("(//small[contains(text(),'"+name+"')]/following-sibling::strong)["+line+"]"));
		 return temp.getText();
	
	 }
	 
	 this.Totalamount = function (name,line) {
		 temp=element(by.xpath("(//strong[contains(text(),'"+name+"')]/following-sibling::strong)["+line+"]"));
		 return temp.getText();
	 }
	 this.viewShipmentVisibility = function(){
		 element(by.xpath('//button[@ng-show="finalShipment.data"]')).isPresent().then(function(result) {
			    if ( result ) {
			        
			    	temp=element(by.xpath('//button[@ng-show="finalShipment.data"]'));
					 temp.click();
					 element(by.xpath('//button[@data-dismiss="alert"][1]')).click();
					 element(by.xpath('//button[@data-dismiss="alert"][1]')).click();
			    	
			    } else {
			    	
					 console.log("no view shipment available")

			    }
			});
		 
	 }
	this.invoiceSelect = function(){
		
		this.lineselect.click();
	}
	this.invoiceamount = function(name,line){
		if(name=="price"){
			temp=element(by.xpath('(//div/div[@class="ng-binding"])['+line+']'));
			return temp.getText();
		}
		else if (name=="tax"){
			temp=element(by.xpath('(//div/div[@class="ng-binding ng-scope"])['+line+']'));
			return temp.getText();			
		}
		else if (name=="all"){
			temp=element(by.xpath('(//div/div/strong[@class="ng-binding"])['+line+']'));
			return temp.getText();
		}	
		else if (name=="total"){
			temp=element(by.xpath('(//en-item/strong[@class="text-right ng-binding"])['+line+']'));
			return temp.getText();
		}	
	}
	
	this.storeportalLineClick = function () {
		
		
		temp = '//div[@class="en-collection-row"]'
		element(by.xpath(temp)).click();
	}
	
	this.salesOrderPane = function (pane) {
		
		
		temp=element(by.xpath("//en-tab[contains(text(),'"+pane+"')]"));
		temp.click();
		
	}
	
	this.logsLine = function (line) {
		temp=element(by.xpath('(//en-title/span[@class="ng-binding"])['+line+']'));
		temp.click();
		
	}
	
	this.logsPaneData = function (line) {
		
		temp=element(by.xpath('(//div/pre/small[@ng-bind-html="item1.log"])['+line+']'));
		return temp.getText();		
	}

	this.jobExecution = function(){
	   
	   this.jobDefinition.click();
	   
	}
   
	this.shippingInfo = function (line) {
    	
    	temp=element(by.xpath('(//strong[@class="ng-binding ng-scope"])['+line+']'));
    	return temp.getText();
		
     }
	this.collapseIcon = function(line){
		
		temp = element(by.xpath('(//en-icon[@icon="chevron-right"]/parent::en-collapse-trigger)['+line+']'));
		temp.click();
	}
	this.shipmentRequestInfo = function(line){
		
		temp = element(by.xpath('(//section/div[@class="ng-binding"])['+line+']'));
		return temp.getText();
		
	}
	this.trackingAndInvoice = function(line){
		temp = element(by.xpath('(//span[@class="ng-scope"])['+line+']'));
		return temp.getText();
		
	}
	
	this.fulFillmentNumber = function(line){
		
		temp = element(by.xpath('(//section/div/a[@class="ng-binding"])['+line+']'));
		return temp.getText();
		
}
