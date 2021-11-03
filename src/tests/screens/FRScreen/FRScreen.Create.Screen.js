module.exports =function(){
	
	this.CNFScreen = element(by.xpath('//en-modal-body[@en-loader="acknowledgeShipmentRequest.putting"]'))
	this.rejectReasonCodeDropdown = element(by.model("modalObject.reasonCode"));
    this.rejectComments = element(by.model("modalObject.reason"));
	this.hamburgerButton = element(by.xpath('//button[@class="en-button margin-right-sm trim"]'));
    this.rejectQTY = element(by.model("data.item.itemQty"));
    this.yesButtonClick = element(by.xpath("//button/span[contains(text(),'Yes')]"));
    this.cnfButtonClick = element(by.xpath("//Button/span[contains(text(),'Confirm')]"));

    //******************END OF LOCATORS	****************//
	this.frStatus = function(value,line){
		
		temp=element(by.xpath("(//button/span[contains(text(),'"+value+"')])["+line+"]"));
		temp.click();
	}
	
	this.rejectConfirm = function(){
		temp = element(by.xpath('//en-modal-body[@en-loader="acknowledgeShipmentRequest.putting"]'));
		return temp.isPresent();
	}
	
	this.shipmentRejectPopup = function(reason,msg){
		
		this.rejectReasonCodeDropdown.sendKeys(reason);
		this.rejectComments.sendKeys(msg);
	} 
	
	this.frLineStatus = function(line){
		
		temp = element(by.xpath('(//div/div/div/en-label[@popover-container="en-body"])['+line+']'));
		return temp.getText();
	}
	
	this.frHeaderStatus = function(line){
		
		temp = element(by.xpath('(//div/div/en-label[@ng-if="!supplementalShipmentRequest || !supplementalShipmentRequest.data || !supplementalShipmentRequest.data[shipmentRequest.data.id] || !supplementalShipmentRequest.data[shipmentRequest.data.id].status"])'));
		return temp.getText();
	
	}
	
	this.hamburgerPresence = function(){		 
		
		temp = element(by.xpath('//button[@class="en-button margin-right-sm trim"]'));
		return temp.isPresent();
				
	 }
	this.SOScreenShipmentStatusHeader = function(line){
		
		temp = element(by.xpath('(//en-label/small[@ng-if="!supplementalShipmentRequest || !supplementalShipmentRequest.data || !supplementalShipmentRequest.data[item.id] || !supplementalShipmentRequest.data[item.id].status"])['+line+']'));
		return temp.getText();
		
	}
	
	this.shipmentPaneStatus = function(line){
		
		temp = element(by.xpath('(//en-label/small[@class="ng-binding"])['+line+']'));
		return temp.getText();
		
	}
	
	this.rejectConfirmLineLevel = function(){
		temp = element(by.xpath('//en-modal-body[@en-loader="rejectLineItem.putting"]')); 
		return temp.isPresent();
	}
	
	this.lineLevelReject = function(qty,reason,msg){
	
		this.rejectQTY.clear();
		this.rejectQTY.sendKeys(qty);
		this.rejectReasonCodeDropdown.sendKeys(reason);
		this.rejectComments.sendKeys(msg);
	}
	
	this.rejectedQuantity = function(line){
		
		temp = element(by.xpath('(//div/div[@class="ng-binding"])['+line+']'));
		return temp.getText();
	}
	this.yesButton = function(){
		
		this.yesButtonClick.click();
	}
	this.confirmButton = function(){
		this.cnfButtonClick.click();
	}
	this.shipmentCreate = function(){
		temp='//button/en-icon[@icon="truck"]';
		return element(by.xpath(temp)).click();
	}
	this.labelGen = function(){
		 element(by.xpath('(//input[@ng-model="skipLabelGeneration"])[2]')).isSelected().then(function(result) {
			    if ( result ) {
			        
					 console.log("already disabled the label generation")
			    	
			    } else {
			    	console.log("disabling the label generation")
			        element(by.xpath('(//input[@ng-model="skipLabelGeneration"])[2]')).click();
			    }
			});
	}
	
	this.shipmentCreation = function(){
		
		
	}
	
}