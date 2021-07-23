module.exports = function () {
	this.createBatchButton = element(by.xpath('//en-icon[@icon="box-pack"]/parent::button'));
	this.selectSiteRadioButton = element(by.model("data.selectedSite"));
	this.siteConfirmButton = element(by.xpath("//button[contains(text(),'Confirm')]"));
	this.maxFRRequestBox = element(by.model("data.batchPickConfig.pickBatchMaxFRCount"));
	this.minFRRequestBox = element(by.model("data.batchPickConfig.pickBatchMinFRCount"));
	this.requestDeliveryDateSelect = element(by.model("data.batchPickConfig.requestedDeliveryDate"));
	this.createBatchConfirmButton = element(by.xpath('(//button[@class="button-primary en-button"])[2]'));
	this.BatchNumberTextArea = element(by.xpath('//en-content[@ng-if="data.batchCreated && !createBatchFailed"]/h2[@class="ng-binding"]'));
	this.closeButton = element(by.xpath("//span[contains(text(),'Close')]/parent::button"));
	this.packageTypeDropdown = element(by.model("data.batchPickConfig.packaging"));
	this.truckIconButton = element(by.xpath('(//en-icon[@icon="truck"]/parent::button)[1]'));
	this.yesButtonClick = element(by.xpath("//span[contains(text(),'Yes')]/parent::button"));
	this.rejectSelectCheckbox = element(by.xpath('(//div[@checkbox-value="item.id"])[2]'));
	this.rejectshipmentdropdownButton = element(by.xpath('//en-icon[@icon="trash"]/parent::Button'));
	this.rejectShipmentButton = element(by.xpath("//span[contains(text(),'REJECT ORDER')]/parent::button"));
	this.rejectCNFButton = element(by.xpath("//span[contains(text(),'Reject')]/parent::button"));
	this.categoryDropdownmultiselect = element(by.xpath('//div[@name="categories"]'));
	this.printpicklistButton = element(by.xpath("//span[contains(text(),'Print Pick List')]/parent::button"));
	this.pickConfirmTitleText = element(by.xpath("//en-title/span[contains(text(),'Pick Confirmation')]"));
	this.selectLine = element(by.xpath('//div/strong[@class="ng-binding text-info"]'));
	this.shipaloneCheckbox = element(by.model("data.batchPickConfig.shipAlone"));
	this.packingTypedropdown = element(by.model("order.package.packageType"));
	this.batchcreationErrorMessage = element(by.xpath('//en-item/h3[@class="ng-binding"]'));
	this.clearSerachButton = element(by.xpath('(//en-icon[@icon="x-circle"])[2]'));
	this.sortCriteriaDropdown = element(by.model("apiSortFilter.filter"));
    this.searchOption = element(by.xpath('//button/div/span[contains(text(),"Filters")]/parent::div/parent::button'));
    this.filterCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.filterContentDropdown = element(by.xpath('//select[@name="filter-content"]'));
    this.searchValueTextbox = element(by.xpath('//input[@name="filter-value"]'));
    this.salesOrderCarrierPencilIcon = element(by.xpath('(//en-icon[@icon="edit" and contains(@en-tap,"editCarrier")])[1]'));
    this.salesOrderCarrierDropdown = element(by.xpath('//select[@name="carrier"]'));
    this.salesOrderCarrierServiceDropdown = element(by.xpath('//select[@name="service"]'));
    this.salesOrderCarrierUpdateButton = element(by.xpath('//button[contains(@en-tap,"editCarrier")]'));
	this.fullFillmentPage = element(by.xpath('//en-icon[@icon="truck"]/parent::div'));
	this.batchPickPage = element(by.xpath("//div/h2[contains(text(),'Batch Pick')]/parent::div"));
	this.serviceDropdownmultiselect = element(by.xpath('//div[@name="serviceLevels"]'));
	this.errorSymbol = element(by.xpath('//en-icon[@style="color: red" and @icon="alert"]'));
	
	
	
//////////*******************END OF LOCATORS****************************************//////
	 
	this.CreateNewBatch = function(){
		
		this.createBatchButton.click();
				
	}
	
    this.batchpickSearch = function(criteria, salesOrderSearchValue,line){
    	        element(by.xpath('(//input[contains(@class, "adv-search-input")])['+line+']')).clear();
    	        for (var i = 0, len = salesOrderSearchValue.length; i < len; i++) {
    	            element(by.xpath('(//input[contains(@class, "adv-search-input")])['+line+']')).sendKeys(salesOrderSearchValue[i]);
    	            browser.sleep(100);
    	        }
    	        element(by.xpath('(//input[contains(@class, "adv-search-input")])['+line+']')).sendKeys(protractor.Key.ENTER);
    	    }
	this.selectSite = function(){
		
		this.selectSiteRadioButton.click();
	}
	
	this.siteConfirm = function(){
		
		this.siteConfirmButton.click();
	}
	
	this.maxFRRequest = function(request){
		
		this.maxFRRequestBox.clear();
		this.maxFRRequestBox.sendKeys(request);
	}
	
	this.minFRRequest = function(request){
		
		this.minFRRequestBox.clear();
		this.minFRRequestBox.sendKeys(request);
	}
	
	this.requestDeliveryDate = function(date){
		
		this.requestDeliveryDateSelect.sendKeys(date);
	}
	
	this.packageType = function(type){
		
		this.packageTypeDropdown.sendKeys(type);
	}
	
	this.createBatchConfirm = function(){
		
		this.createBatchConfirmButton.click();
	}
	
	this.BatchNumber = function(){
		
		return this.BatchNumberTextArea.getText();
		
	}
	
	this.close = function(){
		
		this.closeButton.click();
	}
	
	this.Batchstatus = function(){
		
		return 	element(by.xpath('(//div[@class="en-collection-row"]/div[5])[1]')).getText();
	}
	this.truckIcon = function(status){
		console.log("status is "+status);
		if(status=="IN PROGRESS"){
			for(i=0;i<5;i++){
			element(by.xpath('//en-icon[@icon="refresh"]')).click();
			console.log("click "+i);
			}
			
			this.truckIconButton.click();	
		}
		else if(status =="PENDING")
		{
			for(i=0;i<5;i++){
				element(by.xpath('//en-icon[@icon="refresh"]')).click();
				console.log("click "+i);
			}
			this.truckIconButton.click();	
		}
		else{
			browser.sleep(1500);
			this.truckIconButton.click();
		}
		/*do{
			status= element(by.xpath('(//div[@class="en-collection-row"]/div[5])[1]')).getText().toString();
			console.log("the batch status is"+status);
			element(by.xpath('//en-icon[@icon="refresh"]')).click();
		}while(status =="IN PROGRESS");
		*/
		
	}
	this.batchPickRefresh = function(status){
			console.log("status is "+status);
			if(status=="IN PROGRESS"){
				for(i=0;i<5;i++){
				element(by.xpath('//en-icon[@icon="refresh"]')).click();
				console.log("click "+i);
				}
			}
			else if(status =="PENDING")
			{
				for(i=0;i<5;i++){
					element(by.xpath('//en-icon[@icon="refresh"]')).click();
					console.log("click "+i);
				}
			}
			else if(status =="FULFILLMENT COMPLETION IN PROGRESS")
			{
				for(i=0;i<3;i++){
					element(by.xpath('//en-icon[@icon="refresh"]')).click();
					console.log("click "+i);
				}
			}
			else{
				element(by.xpath('//en-icon[@icon="refresh"]')).click();				
			}
	}
	this.yesButton = function(){
		
		this.yesButtonClick.click();
	}
	
	this.shipmentstatus = function(line1,line2){
		
		temp= element(by.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']'));
		return temp.getText();
	}
	
this.FRShipmentstatus = function(line1,line2){
		
		temp= element(by.xpath('(//div[@class="en-collection-row row-warn"]/div['+line1+'])['+line2+']'));
		return temp.getText();
	}
	
	this.rejectLineSelect = function(){
		
		this.rejectSelectCheckbox.click();
		
	}	
	this.rejectshipmentdropdown = function(){
		
		this.rejectshipmentdropdownButton.click();
	}
	
	this.rejectShipment = function(){
		
		this.rejectShipmentButton.click();
	}
	
	this.rejectCNF = function(){
		
		this.rejectCNFButton.click();
	}

	this.Linecount = function(count){
		
		temp='(//input[@name="lineCount"])['+count+']';
		return element(by.xpath(temp)).click();
		
	}
	
	this.fullfillmentType = function(count){
		
		temp='(//input[@name="fulfillmentType"])['+count+']';
		return element(by.xpath(temp)).click();
		
	}
	
	this.documents = function(count){
		
		temp='(//input[@name="pickBatchDocuments"])['+count+']';
		return element(by.xpath(temp)).click();
		
	}
	
	this.pickListType = function(type){
		
		temp='(//input[@name="pickListType"])['+type+']';
		return element(by.xpath(temp)).click();
	}
	
	this.availableBatchDetails = function(line){
		
		temp=element(by.xpath('(//div/div/div/strong[@class="title ng-binding"])['+line+']'));
		return temp.getText();
	}
	
	this.shipmenttype = function(line1){
		
		temp= '(//div[@class="en-collection-row"]/div['+line1+'])';
		return element.all(by.xpath(temp)).getText();
	}
	
	 this.orderPickUp = function(name,id,number,note) {
		   temp ='//div/div[@class="en-collection-row"]';	
		   pickedUpBy = element(by.model("data.pickUpDetails.pickedUpBy"));
		   verifiedWith = element(by.model("data.pickUpDetails.verificationProof"));
		   enterID = element(by.model("data.pickUpDetails.verificationID"));
		   pickupNote = element(by.model("data.pickUpDetails.notes"));
		   var totallines = element.all(by.xpath(temp));
		   totallines.count().then(function (total){
			   var totalcount = total;
			   console.log("the total lines in the batch : "+totalcount);			   
			   for(var i=1;i<=totalcount;i++)
			   {
				   browser.sleep(1000);
				   element(by.xpath("(//div/div/div[@checkbox-value='item.id'])["+(i+1)+"]")).click();
				   element(by.xpath('(//button/en-icon[@icon="truck"])[1]')).click();
				   browser.sleep(1000);
				   element(by.xpath('(//button[@class="button-popover-dark trim en-button"])')).click();
				   pickedUpBy.sendKeys(name);
				   verifiedWith.sendKeys(id);
				   enterID.sendKeys(number);
				   pickupNote.sendKeys(note);
				   element(by.xpath("//Button/span[contains(text(),'Confirm')]")).click();
			   }

		   });
		   
	  }	  
	 this.categoryDropdown = function(line){
		 
		 temp='(//li[@class="multiselect-item-checkbox ng-scope"])['+line+']';
		 browser.sleep(500);
		 this.categoryDropdownmultiselect.click();//opening the drop down
		 browser.sleep(1000);
		 element(by.xpath(temp)).click();
		 browser.sleep(500);
		 this.categoryDropdownmultiselect.click();//closing the drop down

	 }

	this.selectFromTheSearch = function(line){
		temp='(//input[@type="checkbox"])['+line+']';
		return element(by.xpath(temp)).click();
		
	}
	this.selectlineclick = function(){
		
		this.selectLine.click();
	}
	this.printPickList = function(){
		
		 this.printpicklistButton.click();
	}
	
	this.PickConfirm = function(picktype){
		
		temp=element(by.xpath("//span[contains(text(),'"+picktype+"')]/parent::button"))
		 temp.click();
	}
	 
	this.submitPack = function(value){
		
		temp=element(by.xpath("//button/span[contains(text(),'"+value+"')]"));
		 temp.click();
	}
	
	this.PickConfirmtitle = function(){
		 this.pickConfirmTitleText.getText();
	}
	
	this.printIconClick = function(line){
		
		temp= element(by.xpath('(//en-icon[@icon="print"])['+line+']')).click();

		
	}
	this.printDocument = function(value){
		
		temp= element(by.xpath("//button/span[contains(text(),'"+value+"')]"));
		 temp.click();
	}
	
	this.qtyInc = function(line1,line2){
		
		temp = element(by.xpath('(//button/en-icon[@icon="plus"])['+line1+']'));
		for(i=0;i<line2;i++){
		 temp.click();
		}
	}
	this.rejectreason = function (line,reason) {
	
		temp = element(by.xpath('(//select[@name="reasonCode"])['+line+']'));
		temp.sendKeys(reason);
	}
	
this.pickedQty = function(line1,data){
		
		temp = element(by.xpath('(//input[@ng-model="pickedQty"])['+line1+']'));
		temp.clear();
		temp.sendKeys(data);
	}

	this.picklistRejectReason = function(line,reason){
		
		temp = element(by.xpath('(//select[@name="rejectReasonCode"])['+line+']'));
		temp.sendKeys(reason);
	}
	this.batchPickRejectQty = function(type,reason,qty){
		 temp = '//div[@class="en-collection-row"]';
		  var totallines = element.all(by.xpath(temp));
		   totallines.count().then(function (total){
			   var totalline = total;
			   console.log("total lines in the order confirm screen is "+totalline)
			    for(var i=1;i<=totalline;i++)
				{
			  	  if(type=="ALL")	
			  	  {
			  		browser.sleep(1000);
			    	element(by.xpath('(//select[@name="rejectReasonCode"])['+i+']')).sendKeys(reason);
			    	browser.sleep(500);
			    	element(by.xpath('(//input[@ng-model="pickedQty"])['+i+']')).clear();
			    	browser.sleep(1500);
			    	element(by.xpath('(//input[@ng-model="pickedQty"])['+i+']')).sendKeys(qty);
			    	browser.sleep(1000);
					console.log("updated the rejection for all lines ");
			  	  }
				  else if(type=="SINGLE"){
					  
					  element(by.xpath('(//select[@name="rejectReasonCode"])['+i+']')).sendKeys(reason);
				      element(by.xpath('(//input[@ng-model="pickedQty"])['+i+']')).clear();
				      element(by.xpath('(//input[@ng-model="pickedQty"])['+i+']')).sendKeys(qty);
				      break;
				  }
				  else
				  {
					  console.log("no data provided");
				  }
				
				}			   
		   });	
	}
	
	this.rejectQTYCountLine = function(line){
		
		temp = element(by.xpath('(//div[@class="ng-binding"])['+line+']'));
		return temp.getText();
		
		/*
		 var rejectedqty = 0;
		temp = '(//div[@class="ng-binding"])';
		 var totallines = element.all(by.xpath(temp));
		   totallines.count().then(function (total){
			   var totalcount = total;
			   console.log("the total lines in the pick confirmation page is  : "+totalcount);
			    for(var i=line;i<=(totalcount*line);(i+line))
				{
			    	var strigndata = element(by.xpath('(//div[@class="ng-binding"])['+i+']')).getText().toString();
			    	data=parseInt(strigndata);
			    	rejectedqty = rejectedqty+data;
				}
			    console.log("the total Rejected QTY is "+rejectedqty);
			   
		   });
		
		return rejectedqty;
		 */

	}
	this.rejectQTYCountHeader = function(line){
		
		temp = element(by.xpath('(//div/strong[@class="ng-binding"])['+line+']'));
		return temp.getText();
	}
	
	this.pagerefresh = function(){
		
		element(by.xpath('//en-icon[@icon="refresh"]')).click();
	}
	
	this.ShipAlone = function () {
		
		this.shipaloneCheckbox.click();
	}
	
	this.truckIconFullFillment = function (line) {
		
		temp=element(by.xpath('(//en-icon[@icon="truck"]/parent::button)['+line+']'));
		return temp.click();
		
	}
	
	this.PackingtypeSelect = function (type) {
		
		this.packingTypedropdown.sendKeys(type)
		
	}
	
	this.shippingProfileClick = function (name) {
		
		temp = "//div/span[contains(text(),'"+name+"')]";
		return element(by.xpath(temp)).click();
		
	}
	this.disableActiveButton = function () {
		
		temp = element(by.xpath('//input[@ng-model="shippingProfile.data.active"]'));
		temp.click();
		element(by.xpath("//button[contains(text(),'Save')]")).click();
		console.log("the profile disabled successfully")

		
	}	
	this.enableActiveButton = function () {
		
		temp = element(by.xpath('//input[@ng-model="shippingProfile.data.active"]'));	
		temp.click();
		element(by.xpath("//button[contains(text(),'Save')]")).click();
		console.log("the profile enabled successfully");		
	}
	
	this.batchcreationError = function () {
		
		return this.batchcreationErrorMessage.getText();
		
	}
	
	this.SitePresenceCheck = function () {
		
		temp = element(by.xpath('//en-item[@class="line-group-item ng-scope"]'));
		return temp.isPresent();
		
	}
	this.clearSerach = function () {
		
		this.clearSerachButton.click();
	}

	this.batchSearch = function(criteria,content,searchValue,criteria1){
        this.searchOption.click();
        browser.sleep(100);
        this.filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(300);
        this.filterContentDropdown.sendKeys(content);
        console.log("the Search value is "+searchValue)
        this.searchValueTextbox.sendKeys(searchValue);
        this.sortCriteriaDropdown.sendKeys(criteria1);
        
        element(by.xpath("//button/span[contains(text(),'Go')]")).click();


    }
	
	this.batchDataSort = function (criteria) {
		
		this.sortCriteriaDropdown.sendKeys(criteria);	
		
	}
	
	this.errorLink = function(line){
		
		temp = element(by.xpath("(//a[contains(text(),'View Errors')])["+line+"]"))
		temp.click();
	}
	
	this.errorDataSearch = function(){
		
		temp = element.all(by.xpath('//div/span[@class="longer-text product-title ng-scope ng-binding"]'));
		return temp.getText();
		
	}
	
	this.salesOrderCarrierUpdate = function(carrier,type) {
        this.salesOrderCarrierPencilIcon.click();
        this.salesOrderCarrierDropdown.sendKeys(carrier);
        this.salesOrderCarrierServiceDropdown.sendKeys(type);
        this.salesOrderCarrierUpdateButton.click();

       // return this.salesOrderUpdateCarrierPopupButton.click();
    }
	
	this.erroredBatchSearch = function(criteria,content,searchValue){
		element(by.xpath('(//button/div/span[contains(text(),"Filters")]/parent::div/parent::button)[2]')).click();
        browser.sleep(100);
        this.filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(300);
        this.filterContentDropdown.sendKeys(content);
        console.log("the Search value is "+searchValue)
        this.searchValueTextbox.sendKeys(searchValue);
        this.sortCriteriaDropdown.sendKeys(criteria);
        
        element(by.xpath('//input[contains(@class, "adv-search-input") and @name="filter-value"]')).sendKeys(protractor.Key.ENTER);
    }
	
	this.errorPopUpData = function () {
		
		temp = element.all(by.xpath('//div[@ng-repeat="item in errorDetail.data track by $index"]/div[@class="en-collection-row"]'));
		return temp.getText();
	}
	
	this.ScriptActiveButton = function () {
		
		temp = element(by.xpath('//input[@ng-model="script.data.active"]'));
		temp.click();
		element(by.xpath("(//button/span[contains(text(),'Save')])[1]")).click();
		console.log("the Script updated successfully")
	}	
	
	this.batchPick = function () {
		
		this.fullFillmentPage.click();
		this.batchPickPage.click();
	
	}
	
	this.fulfillmentStatus = function(line){
		
		temp='(//div/div/en-label[@class="label-success"])['+line+']';		
		return element(by.xpath(temp)).getText();
	}
	
	this.searchResult = function(){	
		 temp = '//div[@class="en-collection-row"]';
		 return element.all(by.xpath(temp));
	
	  }
	
	this.batchSerivces = function(service){
		
		 temp='(//li[@class="multiselect-item-checkbox ng-scope"])['+service+']';
   		 this.serviceDropdownmultiselect.click();
   		 browser.sleep(1000);
   		 element(by.xpath(temp)).click();
   		 browser.sleep(500);
   		 this.serviceDropdownmultiselect.click();
   		 browser.sleep(1000);

	}
	
	this.redAlert = function(){
		
		return this.errorSymbol.isPresent();
	}
	this.erroredQuantity = function(){
		
		temp = '//div/a[@class="ng-binding"]';
		return element(by.xpath(temp)).getText();
	}
	
	this.keyValues = function(){
		
		temp = element.all(by.xpath('//en-input-tag-item/ng-include/span[@class="ng-binding ng-scope"]'));
		return temp.getText();
		
		
		
	}
		
	this.correlation = function(data,config,key){
		
        for(i = 0;i<(data.length-1);i++){
        	if(data[i]==config){
        		console.log("Data Matched and the data at "+i+" is "+data[i]);
        		location = i+1;
        		value = (2*location)-1;
        		browser.sleep(1500);
        		element(by.xpath('(//ng-include/a[@class="remove-button ng-binding ng-scope"])['+location+']')).click();
        		console.log("location is "+location)
        		browser.sleep(1000);
        		element(by.xpath('(//ng-include/a[@class="remove-button ng-binding ng-scope"])['+value+']')).click();
        		console.log("the value location is "+value);
        		browser.sleep(1500);
        		element(by.xpath("//button[contains(text(),'Save')]")).click();

        	}
        	else{
        	console.log("the data at "+i+" is "+data[i]);
        	}
        	        	
        } 
		element(by.xpath('(//input[@ng-model="newTag.text"])[1]')).sendKeys(config)
        element(by.xpath('(//input[@ng-model="newTag.text"])[1]')).sendKeys(protractor.Key.ENTER);
		element(by.xpath('(//input[@ng-model="newTag.text"])[2]')).sendKeys(key)
		element(by.xpath('(//input[@ng-model="newTag.text"])[2]')).sendKeys(protractor.Key.ENTER);
		element(by.xpath("//button[contains(text(),'Save')]")).click();
	}
	
	this.refreshBatch = function(){
		
		temp1=element(by.xpath("//div/strong[contains(text(),'IN PROGRESS')]"))
		temp1.isDisplayed().then(visible=>{
		var until = protractor.ExpectedConditions;
			if((visible)){
				browser.wait(until.visibilityOf(temp1), 1000);
				element(by.xpath('//en-icon[@icon="refresh"]')).click();
				this.refreshBatch();
				
			}else{console.log("displayed")}
			
		}, err => {})		
	}
	
}