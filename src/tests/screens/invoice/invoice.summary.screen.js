module.exports =function(){

    var invoiceDefaultGearIconOption = "";
    var temp = "";

    this.invoiceSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.invoiceSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.invoiceSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    this.invoiceSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.invoiceEditFromGearIcon = element(by.xpath('//span/li/button/span[text()="Edit"]/parent::button'));
    this.invoiceStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));
    this.invoiceNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[5])[1]'));
    this.reShipReasonCode = element(by.model("parentLinkedOrder.linkedOrderMemo.type"));
    this.reShipReasonComment = element(by.model("parentLinkedOrder.linkedOrderMemo.text"));
    this.reshipConfirmButton = element(by.xpath("//span[contains(text(),'Reship')]/parent::button"));    
    this.correlationValue = element(by.model("correlation.data.value"));
	this.YesButton = element(by.xpath("//span[contains(text(),'Yes')]/parent::button"));

    
   // var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.invoiceSearch = function(criteria, invoiceSearchValue){
/*        commons.selectOption(this.invoiceSearchCriteriaDropdown,criteria);
        this.invoiceSearchTextbox.clear();
//        this.invoiceSearchTextbox.sendKeys(invoiceSearchValue);


        for (var i = 0, len = invoiceSearchValue.length; i < len; i++) {
            this.invoiceSearchTextbox.sendKeys(invoiceSearchValue[i]);
            browser.sleep(100);
        }


        return this.invoiceSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = invoiceSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(invoiceSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }


    this.invoiceSelectGear = function(selectOption){
        this.invoiceSelectGearIcon.click();
        browser.sleep(2000);
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Delete" || selectOption == "Release") {
                element(by.xpath(temp)).click();
                browser.sleep(2000);
                temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
                return element.all(by.xpath(temp)).get(1).click();
        } else {
            return element(by.xpath(temp)).click();
        }
    }

   this.invoiceStatus = function() {
        return this.invoiceStatusText.getText();
   }

   this.getInvoiceNumber = function() {
        return this.invoiceNumberText.getText();
   }
   
   this.correlation = function(value){
	   
	   temp = '//en-input-tags[@ng-model="correlation.key"]/div/div/ul/li/en-input-tag-item/ng-include/span[@class="ng-binding ng-scope"]';	  
	   var position="";
	   var keyvalueposition="";
	   var totallines = element.all(by.xpath(temp));
	   totallines.count().then(function (total){
		   var totalcount = total;
		   console.log("the total lines in correlation : "+totalcount);
		   for(var i=1;i<=totalcount;i++)
		   {
			   if(element(by.xpath(temp)).getText()=="chargeActualShippingCost"){
				   console.log("the text is "+element(by.xpath(temp)).getText());
				   position = i;
				   console.log("the position is "+i);
				   keyvalueposition=parseInt(totallines+position);
				   element(by.xpath('(//ng-include/a[@class="remove-button ng-binding ng-scope"])['+i+']'));
				   element(by.xpath('(//ng-include/a[@class="remove-button ng-binding ng-scope"])['+keyvalueposition+']'));
				   
			   }
			   else{
				   console.log("the text is "+element(by.xpath(temp)).getText());
				   
			   }
		   }
		   
		   element(by.model("newTag.text")).sendKeys(value);
		   element(by.model("newTag.text")).sendKeys(protractor.Key.ENTER);	 
		   element(by.model("correlation.value")).sendKeys(true);
		   element(by.model("correlation.value")).sendKeys(protractor.Key.ENTER);

	   });

   }
   
   this.invoiceShipmentInfo=function(line){
	   
			temp = element(by.xpath('(//strong[@class="ng-binding"])['+line+']'));
			return temp.getText();
   }
   
   
   this.fulfiullmentMixedOrders = function(status){
	   
	   temp = '(//div/div[@class="en-collection-row"])';
		 var totallines = element.all(by.xpath(temp));
		   totallines.count().then(function (total){
			   var totalcount = total;
			   console.log("the total lines in the pick confirmation page is  : "+totalcount);
			    for(var i=1;i<=totalcount;i++)
				{
			    	if(i==0){
			    		element(by.xpath('(//div/div[@class="en-collection-row"])['+i+']')).click();
			    		element(by.xpath("(//button/en-icon[@icon ='more-vertical'])[1]")).click();
			    		element(by.xpath("//span/li/button/span[text()='Create Shipment']/parent::button")).click();
			    		element(by.xpath('(//select[@name="carrier"])[2]')).sendKeys(browser.params.packageValue);
			    		element(by.model("package.trackingNumber")).sendKeys(browser.params.trackingNumber);
			    		element(by.xpath('(//input[@ng-model="item.qtyInPackageDefault"])[1]')).clear();
			    		element(by.xpath('(//input[@ng-model="item.qtyInPackageDefault"])[1]')).sendKeys(1);
			    		element(by.xpath('//button/span[contains(text(), "Add Package to Shipment")]/parent::button')).click();
			    		element(by.model("skipLabelGeneration")).click();
			    		element(by.xpath('(//button/span[contains(text(), "Finalize Shipment")]/parent::button)[2]')).click();
			    		browser.sleep(5000);
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
			    		element(by.xpath("(//button/en-icon[@icon ='more-vertical'])[1]")).click();
			    		element(by.xpath("//span/li/button/span[text()='Mark As Shipped']/parent::button")).click();
			            browser.sleep(1500);
			            element(by.xpath("//button[@class='text-center button-primary en-button']")).click();	
			            element(by.xpath('//en-icon[@icon="truck"]/parent::div')).click();
			            element(by.xpath("//div/h2[contains(text(),'Fulfillment Requests')]/parent::div")).click();
			            browser.sleep(3000);
			    	}
			    	else{
			    		
			    		element(by.xpath('(//div/div[@class="en-collection-row"])['+i+']')).click();
			    		element(by.xpath("(//button/en-icon[@icon ='more-vertical'])[1]")).click();
			    		element(by.xpath("//span/li/button/span[text()='Create Shipment']/parent::button")).click();
			    		
			    		//element(by.model("shipAccount")).isPresent().then(function(result) {
						 //   if ( result ) {
						    	element(by.model("shipAccount")).sendKeys(browser.params.shipaccount);
						 //   } else {
						//		 console.log("no view shipment available")
						 //   }
			    		//});
			    		element(by.xpath('(//select[@name="carrier"])[2]')).sendKeys(browser.params.packageValue);
			    		element(by.model("package.trackingNumber")).sendKeys(browser.params.trackingNumber);
			    		element(by.xpath('(//input[@ng-model="item.qtyInPackageDefault"])[1]')).clear();
			    		element(by.xpath('(//input[@ng-model="item.qtyInPackageDefault"])[1]')).sendKeys(2);
			    		element(by.xpath('//button/span[contains(text(), "Add Package to Shipment")]/parent::button')).click();
			    		element(by.model("skipLabelGeneration")).click();
			    		element(by.xpath('(//button/span[contains(text(), "Finalize Shipment")]/parent::button)[2]')).click();
			            browser.sleep(5000);
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
			    		element(by.xpath("(//button/en-icon[@icon ='more-vertical'])[1]")).click();
			    		element(by.xpath("//span/li/button/span[text()='Mark As Shipped']/parent::button")).click();
			            browser.sleep(1500);
			            element(by.xpath("//button[@class='text-center button-primary en-button']")).click();
			            element(by.xpath('//en-icon[@icon="truck"]/parent::div')).click();
			            element(by.xpath("//div/h2[contains(text(),'Fulfillment Requests')]/parent::div")).click();
			    	}
				}
		   });
   }
 
   this.shipmentstatus = function(line1,line2){
		
		temp= element(by.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']'));
		return temp.getText();
	}
	
   this.reshipconfirm = function(code,comment){
	   
	   this.reShipReasonCode.sendKeys(code);
	   this.reShipReasonComment.sendKeys(comment);
   }
   this.reshipConfirm = function(){
	   
	   this.reshipConfirmButton.click();
   }
   this.lineSelctor = function(line){
	   
	   temp = element(by.xpath('(//div/div[@class="en-collection-row"])['+line+']'));
	   temp.click();
	   
   }
   
   this.keyValues = function(){
		
		temp = element.all(by.xpath('//en-input-tag-item/ng-include/span[@class="ng-binding ng-scope"]'));
		return temp.getText();
	}
		
	this.invoiceCorrelation = function(data,version){
		
       for(i = 0;i<(data.length-1);i++){
       	if(data[i]==version){
       		console.log("Data Matched and the data at "+i+" is "+data[i]);
       		

       	}
       	else{
       		console.log("Data Matched and the data at "+i+" is "+data[i]);
       		location = i+1;
       		browser.sleep(1500);
       		element(by.xpath('(//ng-include/a[@class="remove-button ng-binding ng-scope"])['+location+']')).click();
       		console.log("location is "+location)
       		element(by.xpath('(//input[@ng-model="newTag.text"])[1]')).sendKeys(version)
       		element(by.xpath('(//input[@ng-model="newTag.text"])[1]')).sendKeys(protractor.Key.ENTER);
       		browser.sleep(1500);
       		element(by.xpath("//button[contains(text(),'Save')]")).click();       	
       		}
       	        	
       } 
	}
	
	this.rejectButton = function(type,line){
		
		
		rejectCNFButton = element(by.xpath("(//span[contains(text(),'"+type+"')]/parent::button)["+line+"]"));
		rejectCNFButton.click();
			
	}
	this.correlationData = function(){
		browser.sleep(5000);
		element(by.xpath('//en-control/input[@name="value"]')).click();
		browser.sleep(10000);
		return element(by.xpath('//en-control/input[@name="value"]')).getText();
		
	}
	
	this.correlationDataValue = function(value){
		
		//if(currentdate==datevalue){
			element(by.xpath('//en-control/input[@name="value"]')).click();
			this.correlationValue.clear();
			this.correlationValue.sendKeys(value);
       		element(by.xpath("//button[contains(text(),'Save')]")).click();       	

		//}
		//else{
			
		//	console.log("the date is not current date");
	//	}
		
	}
   

	this.shipmentPane = function(){
		
		temp = element(by.xpath("//en-tabs/en-tab[contains(text(),'Shipments')]"));
		temp.click();
	}
	
	this.shipmentClick = function(){
		temp = element(by.xpath('//a[@class="is-clickable ng-binding"]'));
		temp.click();
		
	}
	
	this.Yes = function(){
    	
    	this.YesButton.click();
    }
	
	this.refreshJob = function(){
		temp1=element(by.xpath("(//div/en-label[contains(text(),'STARTED')])[1]"))
		temp1.isDisplayed().then(visible=>{
		var until = protractor.ExpectedConditions;
			if((visible)){
				browser.wait(until.visibilityOf(temp1), 1000);
				element(by.xpath('//en-icon[@icon="refresh"]')).click();
				this.refreshJob();
				
			}else{console.log("displayed")}
			
		}, err => {})		
	}
	
}

