module.exports = function () {
	
	this.pickupStartDateTextBox = element(by.xpath('//input[@ng-model="uiSlotTemplate.pickUpStartDate"]'));
	this.pickupEndDateTextBox = element(by.xpath('//input[@ng-model="uiSlotTemplate.pickUpEndDate"]'));
	this.pickupStartTimeTextBox = element(by.xpath('//input[@name="pickUpStartTime"]'));
	this.pickupEndTimeTextBox = element(by.xpath('//input[@name="pickUpEndTime"]'));
	this.tickButtonClick = element(by.xpath('//en-icon[@icon="check-circle"]/parent::button'));
    this.cnfButtonClick = element(by.xpath("//Button/span[contains(text(),'Confirm')]"));
    this.plusIcon = element(by.xpath('//div/en-icon[@icon="plus-block"]'));
    this.printButton = element(by.xpath('//div/en-actions[@popover-content="Print Pick List"]'));
	this.printPickListOrderButton = element(by.xpath('//li/button/span[@class="ng-binding ng-scope"][contains(text(),"PRINT PICKLIST BY ORDER")]'))
	this.printPickListItemButton = element(by.xpath('//li/button/span[@class="ng-binding ng-scope"][contains(text(),"PRINT PICKLIST BY ITEM")]'))
	this.pickListDownloadButton = element(by.xpath('//en-icon[@icon="disk-floppy"]'));
	this.trashButton = element(by.xpath('//en-actions[@icon="trash"]'));
	this.rejectButtonClick = element(by.xpath("//span[contains(text(),'Reject')]/parent::Button"));
	this.cancelButtonAtHeader = element(by.xpath("//span[contains(text(),'Cancel Order')]/parent::button"))
	this.ReleaseINVHeaderButton = element(by.xpath('//en-actions/button/en-icon[@icon="box-unpack"]'));
	this.ReleaseINVDropdownButton = element(by.xpath('//li/button/span[@class="ng-binding ng-scope"][contains(text(),"RELEASE INVENTORY")]'));
	this.YesButton = element(by.xpath("//span[contains(text(),'Yes')]/parent::button"));
	this.lineLevelCancelButton = element(by.xpath("//button[contains(text(),'Cancel')]"));
	this.rejectQTy =  element(by.model("cancelledQty"));
	this.rejectReasonCode = element(by.model("modalObject.reasonCode"));
	this.rejectReasonComment = element(by.model("modalObject.reason"));
    this.searchOption = element(by.xpath('//button/div/span[contains(text(),"Filters")]/parent::div/parent::button'));
    this.scheduleEditButton = element(by.xpath("//span[contains(text(),'Edit Schedule')]/parent::button"));
    this.maxOrderTextbox = element(by.model("maxorder"));
    this.recurringDayTextbox = element(by.xpath('//input[@name="onday"]'));
    this.storeStartTimeSelector = element(by.model("starttime"));
    this.storeCloseTimeSelector = element(by.model("endtime"));
    this.addRuleButton = element(by.xpath("//span[contains(text(),'Add Schedule Rule')]/parent::button"));
    this.applyRuleButton = element(by.xpath("//span[contains(text(),'Apply Rules')]/parent::button"));
    //this.pickupYear = element(by.xpath('(//span[@class="ng-binding"])[5]'));
    this.yearSelect = element(by.xpath('//span[@class="ng-binding ng-scope datepicker-active"]'));
    this.partialAcceptLineButton = element(by.xpath("//span[contains(text(),'AcceptPartial')]"));
    this.ultimateStorePortalCancelHeaderButton = element(by.xpath("//button[contains(text(),'Cancel Order')]"))
    this.mailBoxIconButton = element(by.xpath('//div/en-icon[@icon="mail"]'));
    this.otherMailBoxButton = element(by.xpath('(//en-tab[@pane="intermediateboxes"])[2]'));
    this.eventCancelJSONDownloadButton = element(by.xpath('//div/a[@class="trim en-button"]'));

    
    
	
	//!**********************END OF LOCATORS************************!//
	
	this.ShippingAddressCheck = function() {
	       
		return element(by.xpath('//div/en-title[@class="title-sm margin-bottom-collapse ng-scope"]')).isPresent();
			   
	}
	this.pickupStartDateEdit = function(date,line){
		
		pickupDate = date.split("/");
		var month = pickupDate[0];
		var day = pickupDate[1];
		var year = pickupDate[2];
		this.pickupStartDateTextBox.click();
		pickupYear = element(by.xpath('(//span[@class="ng-binding"])['+line+']')).click();	
		this.yearSelect.click();    		
    	date=element(by.xpath('(//a[@ng-repeat="item in days"])['+day+']')).click();
		/*this.pickupStartDateTextBox.clear();
		browser.sleep(500);
		temp = '(//en-icon[@icon="edit"])['+line+']';
		element(by.xpath(temp)).click();
		this.pickupStartDateTextBox.sendKeys(date);*/
		
	}
	this.pickupEndDateEdit = function(date,line){
		
		/*this.pickupEndDateTextBox.clear();
		browser.sleep(500);
		temp = '(//en-icon[@icon="edit"])['+line+']';
		element(by.xpath(temp)).click();
		this.pickupEndDateTextBox.sendKeys(date);*/
		pickupDate = date.split("/")
		var month = pickupDate[0];
		var day = pickupDate[1];
		var year = pickupDate[2];
		this.pickupEndDateTextBox.click();
		pickupYear = element(by.xpath('(//span[@class="ng-binding"])['+line+']')).click();
		this.yearSelect.click();    		
    	date=element(by.xpath('(//a[@ng-repeat="item in days"])['+day+']')).click();
		
	}
	this.pickupStartTimeEdit = function(date,line){
		
		this.pickupStartTimeTextBox.clear();
		//element(by.xpath('//input[@name="pickUpStartTime"]')).clear();
		browser.sleep(5000);
		temp = '(//en-icon[@icon="edit"])['+line+']';
		element(by.xpath(temp)).click();
		this.pickupStartTimeTextBox.sendKeys(date);	
		//element(by.xpath('//input[@name="pickUpStartTime"]')).sendKeys(date);

	}
	this.pickupEndTimeEdit = function(date,line){
		
		this.pickupEndTimeTextBox.clear();
		//element(by.xpath('//input[@name="pickUpEndTime"]')).clear();
		browser.sleep(500);
		temp = '(//en-icon[@icon="edit"])['+line+']';
		element(by.xpath(temp)).click();
		this.pickupEndTimeTextBox.sendKeys(date);
		//element(by.xpath('//input[@name="pickUpEndTime"]')).sendKeys(date);
	}
	
	this.pickupStartDatePresence = function(){
		return element(by.xpath('//div/strong[@ng-hide="pickUpStartDateEditable"]')).isPresent().then(function(result) {
		    if ( result ) {
				 console.log("pick up start date found")
		    	return result;
		    	
		    } else {
				 console.log("Piuck start date not found")
				 return result;
		    }
		});
		
		
	}
	
	this.pickupEndDatePresence = function(){
			
		return element(by.xpath('//div/strong[@ng-hide="pickUpEndDateEditable"]')).isPresent().then(function(result) {
		    if ( result ) {
				 console.log("pick up End date found")
		    	return result;
		    	
		    } else {
				 console.log("Pickup End date not found")
				 return result;
		    }
		});
			
		}
	
	this.pickupStartTimePresence = function(){
		
		return element(by.xpath('//div/strong[@ng-hide="pickUpStartTimeEditable"]')).isPresent().then(function(result) {
		    if ( result ) {
				 console.log("pick up start time found")
		    	return result;
		    	
		    } else {
				 console.log("Piuck start time not found")
				 return result;
		    }
		});
		
	}
	
	this.pickupEndTimePresence = function(){
		
		return element(by.xpath('//div/strong[@ng-hide="pickUpEndTimeEditable"]')).isPresent().then(function(result) {
		    if ( result ) {
				 console.log("pick up end time found")
		    	return result;
		    	
		    } else {
				 console.log("Piuck end  time not found")
				 return result;
		    }
		});
		
	}
	
	
	this.storePortalItemLine = function(line1,line2){
		
		temp= element(by.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']'));
		return temp.getText();
	}
	
	this.pickWindowDetails = function(type,data){
		
		var finalData="";
		switch(type){
		
		 case 1:
			 finalData=data.substring(0, 10);
			 console.log("the Pickup start date is "+finalData)
			 return finalData 
			 break;
		 case 2:
			 time=data.substring(11,16);
			 timesplit = time.split(":")			 
			 hour=parseInt(timesplit[0]);
			 if(hour>12){
				 hourConveted = (hour % 12);
				 hourdata = hourConveted.toString();
				 if(hourConveted<10){
					 finalData="0"+hourdata+" :"+timesplit[1]+" PM";
					 console.log("the updated pick up start time on if is "+finalData);
					 return finalData;
					 
					 }else{
						 
						 finalData=hourdata+" :"+timesplit[1]+" PM";
						 console.log("the updated pick up start time on else is "+finalData);
						 return finalData;
					 }
			 }
			 else{
				 
				 data = time.split(":");
				 finalData = data[0]+" :"+data[1]+" AM"
				 console.log("the updated pick up start time is "+finalData);
				 return finalData;
			 }
			 break;

		 case 3:
			 finalData=data.substring(19,29);
			 console.log("pick up end date is "+finalData);
			 return finalData;
			 break;

		 case 4:
			 time=data.substring(30);
			 timesplit = time.split(":")			 
			 hour=parseInt(timesplit[0]);
			 if(hour>12){
				 hourConveted = (hour % 12);
				 hourdata = hourConveted.toString();
				 if(hourConveted<10){
				 finalData="0"+hourdata+" :"+timesplit[1]+" PM";
				 console.log("the updated pick up end time is "+finalData);
				 return finalData;
				 
				 }else{
					 
					 finalData=hourdata+" :"+timesplit[1]+" PM";
					 console.log("the updated pick up end time is "+finalData);
					 return finalData;
				 }
			 }
			 else{
				 
				 data = time.split(":");
				 finalData = data[0]+" :"+data[1]+" AM"
				 console.log("the updated pick up end time is "+finalData);
				 return finalData;
			 } 
			 break;

		 default:
			 finalData=data;
		
		}
		return finalData;

	}
	
	this.lineSelect = function(line){
		
		temp=element(by.xpath('(//div/input[@class="ng-scope ng-pristine ng-untouched ng-valid"])['+line+']'));
		temp.click();
	}
	
	this.acceptButton = function(){
		
		this.tickButtonClick.click();
	}
	

	this.acceptButtonPresence = function(line){	
		return element(by.xpath('(//button[@class="button-popover-dark trim en-button"])['+line+']')).isPresent().then(function(result) {
		    if ( result ) {
				console.log(" Accept Buttons Found")
		    	return result;
		    	
		    } else {
				 console.log("Accept Buttons not found")
				 return result;
		    }
		});
		
	}
	this.acceptOrder = function(line){
		
		temp = element(by.xpath('(//button[@class="button-popover-dark trim en-button"])['+line+']'));
		temp.click();
	}
	
	this.confirmButton = function(){
		this.cnfButtonClick.click();
	}
	
	this.lineClick = function(line){
		
		temp = element(by.xpath('(//div/div[@class="en-collection-row"])['+line+']'));
		return temp.click();
	}
	
	this.selectFromTheSearch = function(line){
		temp='(//input[@type="checkbox"])['+line+']';
		return element(by.xpath(temp)).click();
		
	}
	
	this.submitPack = function(value){
		
		temp=element(by.xpath("//button/span[contains(text(),'"+value+"')]"));
		 temp.click();
	}
	
	this.rejectButtonPresence = function(){
		
		return element(by.xpath('//en-actions[@icon="trash"]')).isPresent().then(function(result) {
		    if ( result ) {
				console.log("Reject button Found")
		    	return result;
		    	
		    } else {
				 console.log("Reject button not found")
				 return result;
		    }
		});
	}
	
	this.rejectTrash = function(){
		
		this.trashButton.click();
	}
	
	this.pickListButtonPresence = function(line){	
		return element(by.xpath('//div/en-actions[@popover-content="Print Pick List"]')).isPresent().then(function(result) {
		    if ( result ) {
				console.log(" Print Button Found")
		    	return result;
		    	
		    } else {
				 console.log("Print Button not found")
				 return result;
		    }
		});
	}

	this.printButtonClick = function(){
		
		this.printButton.click();
	}
	this.printButtonList = function(line){
		
		temp = element(by.xpath('(//li/button/span[@class="ng-binding ng-scope"])['+line+']'));
	}
	
	
	this.plusIconAtLine = function(){
		
		this.plusIcon.click();
	}
	 
	this.skuInformation = function(line){
		
		temp= element(by.xpath('(//div/span[@class="ng-binding"])['+line+']'));
		return temp.getText();
	}
	
	
	this.printPickListbyOrder = function(line){
		
		return element(by.xpath('//li/button/span[@class="ng-binding ng-scope"][contains(text(),"PRINT PICKLIST BY ORDER")]')).isPresent().then(function(result) {
		    if ( result ) {
				console.log("Print pick list by order Button Found")
		    	return result;
		    	
		    } else {
				 console.log("Print pick list by order Button not found")
				 return result;
		    }
		});		
	}
	
	this.printPickListbyItem = function(line){
		
		return element(by.xpath('//li/button/span[@class="ng-binding ng-scope"][contains(text(),"PRINT PICKLIST BY ITEM")]')).isPresent().then(function(result) {
		    if ( result ) {
				console.log(" Print pick list by Item Button Found")
		    	return result;
		    	
		    } else {
				 console.log("Print pick list by Item Button not found")
				 return result;
		    }
		});	
		
	}
	
	this.printPickListOrder = function(){
		
		this.printPickListOrderButton.click();
		
	}
	
	this.printPickListItem = function(){
		
		this.printPickListItemButton.click();
	}
	
	this.PrintViewPresence = function(){
		
		return element(by.xpath('(//ng-pdf/canvas[@id="pdf"][@ng-model="canvas"])')).isPresent().then(function(result) {
		    if ( result ) {
		    	console.log("print console found");
		    	return result;

		    } else {
				 console.log("print console not found");
			    	return result;

		    }
		});
		
	}

	
	this.PrintCloseButton = function(){
		
		 element(by.xpath('(//en-modal-footer/button/span[@class="ng-scope"])[1]')).isPresent().then(function(result) {
		    if ( result ) {
		    	console.log("close Button found");
		    	temp=element(by.xpath('(//en-modal-footer/button/span[@class="ng-scope"])[1]'));
				 temp.click();
		    } else {
				 console.log("No close Button found");
		    }
		});		
	}
	
	this.printConfirm = function(){
		
		return element(by.xpath('//div/en-icon[@ng-show="item.header.pickTicketPrintCount > 0"]')).isPresent().then(function(result) {
		    if ( result ) {
		    	console.log("Print success confirm tick found");
		    	return result;

		    } else {
		    	console.log("Print success confirm tick not found");
		    	return result;

		    }
		});	
	}
	this.pickListDownload = function(){
		
		this.pickListDownloadButton.click();
		browser.sleep(3000);
		
		
	}
	
	this.orderCount = function(line){
		
		temp = element(by.xpath('(//div/div/h3[@class="ng-binding"])['+line+']'));
		return temp.getText();
		
	}
	
	this.rejectOrder = function(line){
		
		temp = element(by.xpath('(//button[@class="button-popover-dark trim en-button"])['+line+']'));
		temp.click();
	}
	this.rejectConfirm = function(){
				
		this.rejectButtonClick.click();
	}
	
	this.keysAndValues = function(){
		
		temp = element.all(by.xpath('//en-content/div/en-control/en-input-tags/div/div/ul/li/en-input-tag-item/ng-include/span[@class="ng-binding ng-scope"]'));
		return temp.getText();
	}
	
	this.Correlation = function(data,key,value){
			
			var position = "";
		       for(i = 1;i<=data.length;i++){
		       	if(data[i-1]==key){
		       		console.log("data at loaction "+i+" is : "+data[i-1]);
		       		position = ((data.length)/2) + i;
		       		console.log("the position is "+position);
		       		element(by.xpath('(//en-content/div/en-control/en-input-tags/div/div/ul/li/en-input-tag-item/ng-include/a[@class="remove-button ng-binding ng-scope"])['+i+']')).click();		       		
		       		element(by.xpath('(//en-content/div/en-control/en-input-tags/div/div/ul/li/en-input-tag-item/ng-include/a[@class="remove-button ng-binding ng-scope"])['+(position-1)+']')).click();
		       		element(by.xpath('(//button[@type="submit"])[2]')).click();  
		       		browser.sleep(1000);
		       		element.all(by.xpath('(//input[@ng-model="newTag.text"])[1]')).sendKeys(key);
		       		element(by.xpath('(//input[@ng-model="newTag.text"])[1]')).sendKeys(protractor.Key.ENTER);
		       		element.all(by.xpath('(//input[@ng-model="newTag.text"])[2]')).sendKeys(value);
		       		element(by.xpath('(//input[@ng-model="newTag.text"])[2]')).sendKeys(protractor.Key.ENTER);
		       		//element(by.xpath('(//en-icon[@icon="chevron-right"]/parent::en-collapse-trigger)')).click();
		       		browser.sleep(1000);
		       		element(by.xpath('(//button[@type="submit"])[2]')).click();  
		       		browser.sleep(2000);
		       		break;
		       		
		       	}
		       	else{
		       		console.log("Data not Matched  at "+i);
		       		     	
		       		}
		       } 
	}	 
    this.BOPISReject = function(reason,comment){
	    	//element(by.xpath('//select[@ng-model="modalObject.reasonCode"]')).sendKeys(reason);
	    	//element(by.xpath('//input[@ng-model="modalObject.reason"]')).sendKeys(comment);	
    		element(by.model("modalObject.reasonCode")).sendKeys(reason);
	    	element(by.model("modalObject.reason")).sendKeys(comment);
    }
    
    this.printPickListDisabled = function(line){
    	return element(by.xpath('(//ul/li[@disabled="disabled"])['+line+']')).isPresent().then(function(result) {
		    if ( result ) {
		    	console.log("pick list Print is disabled");
		    	return result;

		    } else {
		    	console.log("pick list Print is enabled");
		    	return result;

		    }
		});	    
    }
    
    this.cancelOrderHeader = function(){
    	this.cancelButtonAtHeader.click();   	
    }
    
    
    this.ReleaseINVHeader = function(){
    	
    	this.ReleaseINVHeaderButton.click();
    }
    
    this.releaseINVDropdownPresence = function(){
    	return element(by.xpath('//li/button/span[@class="ng-binding ng-scope"][contains(text(),"RELEASE INVENTORY")]')).isPresent().then(function(result) {
		    if ( result ) {
		    	console.log("release INV dropdown is enabled");
		    	return result;

		    } else {
		    	console.log("release INV dropdown disabled");
		    	return result;

		    }
		});	    
    }
    
    this.releaseINVDropdown = function(){
    	
    	this.ReleaseINVDropdownButton.click();
    	
    }
    
    this.Yes = function(){
    	
    	this.YesButton.click();
    }
    
    this.lineLevelCancel = function(){
    	
    	this.lineLevelCancelButton.click();
    	
    }
    
    this.lineLevelReject = function(qty,reason,comment){
    	
    	this.rejectQTy.clear();
    	this.rejectQTy.sendKeys(qty);
    	this.rejectReasonCode.sendKeys(reason);
    	this.rejectReasonComment.sendKeys(comment);
    	
    }
	
    this.bopisScreen = function(line1){
		
		temp= '(//div[@class="en-collection-row"]/div['+line1+'])';
		return element.all(by.xpath(temp)).getText();
	}
    
    this.bopisScreenData = function(data1,data2){//data1 is total orders and date 2 is specific order number
    	
    	for(i=0;i<data1.length;i++){
    		if(data1[i]==data2){
    			
    			console.log("the status is "+data1[i]);
    			return true
    		}
    		else{
    			console.log("the status is "+data1[i]);
    			return false;
    		}
    	}
    }
    
    
    this.bopisSearch = function(criteria,content,searchValue){
    	
    	if(content=="is" ){
    		this.searchOption.click();
    		element(by.model("apiSearchFilter.filter")).sendKeys(criteria);
    		//element(by.model("apiSearchFilter.arg")).sendKeys(content);
    		//element(by.model("apiSearchFilter.value")).sendKeys(searchValue);
    		element(by.xpath('//select/option[@label="'+searchValue+'"]')).click();
    	}
    	else{
    		this.searchOption.click();
    		element(by.model("apiSearchFilter.filter")).sendKeys(criteria);
    		element(by.model("apiSearchFilter.arg")).sendKeys(content);
    		//element(by.model("apiSearchFilter.value")).sendKeys(searchValue);
    		element(by.xpath('//select/option[@label="'+searchValue+'"]')).click();
    	}    		
    }
    this.bopisScreenLine = function(line1){
		
		temp= '(//div[@class="en-collection-row"]/div['+line1+'])';
		return element(by.xpath(temp)).getText();
	}
    
    this.scheduleEdit = function(){
    	
    	this.scheduleEditButton.click();
    
    }
    
    this.patterenRadioButton = function(line){
    	temp = element(by.xpath('(//div/div[@class="margin-top-sm"]/input[@ng-model="pattern"])['+line+']'));
    	temp.click();
    }
    this.maxOrder = function(order){
    	
    	this.maxOrderTextbox.sendKeys(order);
    }
    
    this.recurringDay = function(days){
    	
    	this.recurringDayTextbox.sendKeys(days);
    }
    
    this.storeStartTime = function(time){
    	
    	 this.storeStartTimeSelector.sendKeys(time);
    }
    
    this.storeCloseTime = function(time){
    	
    	this.storeCloseTimeSelector.sendKeys(time);
    }
    
    this.addRule = function(){
    	
    	this.addRuleButton.click();
    	
    }
    
    this.applyRule = function(){
    
    	  this.applyRuleButton.click();
    }
    
    this.pastDatePicker = function(pastDate){
    	
    	this.pickupStartDateTextBox.click();
    	//this.pickupYear.click();
    	//this.yearSelect.click();    		
    	browser.sleep(500);
    	pastMonth=element(by.xpath('(//div/div/div/a/en-icon[@icon="chevron-left"])[1]')).click();
    	browser.sleep(5000);
    	date=element(by.xpath('(//a[@class="cal-day ng-binding ng-scope"])[15]')).click();
    	browser.sleep(2000);
    }
    
    this.pickAndPackatLine = function(){
    	
    	element(by.xpath('(//button/en-icon[@icon="truck"])[2]')).click();
    	
    	
    }
    
    this.partialAcceptLine = function(){
		
		return element(by.xpath('(//button[@class="button-popover-dark trim en-button"])[1]')).isPresent().then(function(result) {
		    if ( result ) {
				 console.log("Partial accept Button Found")
		    	return result;
		    	
		    } else {
				 console.log("Partial Accept Button not found")
				 return result;
		    }
		});
		
	}
    
	this.ultimateStorePortalHeader = function(item){
		
		temp = element(by.xpath("//span[contains(text(),'"+item+"')]/parent::Button"));
		temp.click();
		
	}
	
	this.ultimateStorePortalCancelHeader = function(){
		
		this.ultimateStorePortalCancelHeaderButton.click();
				
	}
	
	this.eventSubscriptonData = function(value){
		
		//temp = element.all(by.xpath('//input[@ng-model="item.actions.mailBox.refName"]'));
		temp = element.all(by.xpath('//div/div[@class="ng-binding"]'));
		return temp.getText();
		
	}
	
	this.eventSubscribedOrNot = function(data){
		var position ="";
		var eventData = data.toString().split(",");
		dataLength =  eventData.length
		for(i = 0;i<dataLength;i++){
			position = i+1;
			console.log("the data value  is "+eventData[i]);
			if(eventData[i].toString()=="Order Cancelled"){
				console.log("The event found");
				return element(by.xpath('(//input[@ng-model="item.active"])['+position+'][@class="ng-pristine ng-untouched ng-valid"]')).isSelected().then(function(result) {
				    if ( result ) {
						 console.log("mail box found")
						 return result;
				    	
				    } else {
						 console.log("Mail box not found")
						 return result;
				    }
				});
				break;
			}
			else{
				
				console.log("The event is not checked");
			}
			
		}
		
		
	}
	this.eventSubscriptonEnable = function(data,key,value,status){
		
		var position ="";
		var eventData = data.toString().split(",");
		dataLength =  eventData.length
		//console.log("the size of the array is "+dataLength);
		for(i = 0;i<dataLength;i++){
			position = i+1;
		//	console.log("the data value  is "+eventData[i]);
			if(eventData[i].toString()=="Order Cancelled"){
			//	console.log("The event is available");
			    if ( status == true) {
				//	 console.log("The Mail box is available ")
				//	 console.log("event is already activated ")
				     element(by.xpath("//span[contains(text(),'Subscribe')]/parent::Button")).click();
					 browser.sleep(2000);
					 break;
			    } else {
					//console.log("The Mail box is not available!!! updating the MailBox ");
					element(by.xpath('(//input[@ng-model="item.actions.mailBox.refName"])['+position+']')).clear();
			    	element(by.xpath('(//input[@ng-model="item.actions.mailBox.refName"])['+position+']')).sendKeys(value);		
			    	element(by.xpath('(//input[@ng-model="item.active"])['+position+']')).click();
			    	element(by.xpath("//span[contains(text(),'Subscribe')]/parent::Button")).click();
			    	browser.sleep(3000);
			    	break;
			    }
			}
			else{
			console.log("the event is not available");
			}
		}
	}
	
	 this.mailBoxIcon = function(){
		 
		 this.mailBoxIconButton.click();
	 }
	 
	 this.otherMailBox = function(){
		 
		 this.otherMailBoxButton.click();
		 
	 }
	this.mailSearch = function(data){
		
		//element(by.xpath('(//input[@class="ng-pristine ng-untouched ng-valid"])[12]')).clear();
		element(by.xpath('(//input[@class="ng-pristine ng-untouched ng-valid"])[12]')).sendKeys(data);
		browser.sleep(200);
		element(by.xpath('(//button/en-icon[@icon="search"])[12]')).click();
		
	}
	
	this.cancelEventClick = function(){
		
		element(by.xpath("//div/div[contains(text(),'eventcancelled : com.thk')]")).isPresent().then(function(result) {
		    if ( result ) {
		    	console.log("event found")
		    	temp=element(by.xpath("//div/div[contains(text(),'eventcancelled : com.thk')]"));
				 temp.click();
		    } else {
		    	console.log("event not found")
		    }
		});
		
	}
	
	this.eventCancelledLineClick = function(){
		element(by.xpath("//div/div[contains(text(),'ORDER_CANCELLED')]")).click();
		
	}
	
	this.cancelledOrderId = function(){
		temp = element(by.xpath('(//div/div/div[@class="ng-binding"])[2]'));
		return temp.getText();		
		
	}
	
	this.totalCancelledEventCount = function(){
		
		temp= element(by.xpath('//li[@name="eventcancelled : com.thk"]/div/en-label[@class="label-default"][@label="label-default"]'));
		return temp.getText();
		
	}
	
	this.eventCancelJSONDownload = function(){
		
		this.eventCancelJSONDownloadButton.click();
		
	}
	
	this.backgroundColorExpired = function(line1,line2){
		temp = element(By.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']/en-label[@class="ng-scope label-error"]')).getCssValue("background-color");
		return temp;
	}
	this.overdueBGColor = function(){
		
		temp = element(By.xpath('(//div/div[@class="margin-right-sm row-text-error"])')).getCssValue("background-color");
		return temp;
	}
	
	this.pickupNotdueBGColor = function(line){
		
		temp = element(By.xpath('(//div/div[@class="margin-right-sm"])['+line+']')).getCssValue("background-color");
		return temp;
	}
	
	this.backgroundColornotdue = function(line1,line2){
		temp = element(By.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']/en-label[contains(@class,"ng-scope")]')).getCssValue("background-color");
		return temp;
	}
	
	this.backgroundColordueToday = function(line1,line2){
		temp = element(By.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']/en-label[contains(@class,"ng-scope")]')).getCssValue("background-color");
		return temp;
	}
	
	
}