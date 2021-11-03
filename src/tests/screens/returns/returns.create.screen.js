module.exports =function(){

	var RMAQTY = [];
	var InsQTY = [];
	
    this.blindReturnButton  = element(by.xpath('//div[@class="card-split-title"]/h2[contains(text(), "Blind Return")]'));
    this.orderReturnButton  = element(by.xpath('//div[@class="card-split-title"]/h2[contains(text(), "Return from Order")]'));
    this.channelDropdown = element(by.xpath('(//select[@name="channel"])[1]'));
    this.customerSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.customerSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.customerSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    this.selectCustomerCheckbox = element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input'));
    this.useSelectedCustomerButton = element(by.xpath('//button/span[contains(text(), "Use Selected Customer")]/parent::button'));
    this.selectFirstSOLink = element(by.xpath('(//div[contains(@ng-repeat,"item in customerSalesCollection.data")])[1]'));
    this.useSelectedItemButton = element(by.xpath('//button/span[contains(text(), "Use Selected")]/parent::button'));
    this.returnLocationDropdown = element(by.xpath('//select[@name="location"]'));
    this.saveReturnsButton = element(by.xpath('//button/span[contains(text(), "Save")]'));
    this.productLookupButton = element(by.xpath('//button/span[contains(text(),"Product Lookup")]/parent::button'));
    this.productNameEntryTextBox = element(by.xpath('//input[@placeholder = "Search Products"]'));
    this.searchButtonModalWindow = element(by.xpath('(//button/en-icon[@icon="search"])[2]'));
    this.selectProductCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input[@type="checkbox"]'));
    this.useSelectedProductButton = element(by.xpath('//button/span[contains(text(), "Add Products")]/parent::button'));
    this.creditTypeDropdown = element(by.xpath('//select[@name="creditType"]'));
    this.rmaNumberText = element(by.xpath('//en-title[contains(text(), "Return Merchandise Authorization: ")]'));
//added by Vishak
    
    this.createNewRMAButton=element(by.xpath('//button/span[contains(text(),"CREATE RMA")]'));
    this.orderSearchForReturn = element(by.xpath("//input[@id='filterCollection_checkbox_0_0']"));
    this.orderSelectForReturn = element(by.xpath("//div/input[@id='returnsCollection_checkbox_0_0']"));
    this.selectForReturnbutton=element(by.xpath("//en-icon[@icon='cart-x']"));
    this.returningLocation = element(by.model("returnLocation"));
    this.EditLineClick=element(by.xpath("//div/div/div/div/en-icon[@icon='doc-edit']"));
    this.addNewLineButton=element(by.xpath('//button/span[contains(text(),"Add Line")]'));
    this.totalUnits=element(by.model("x.returnQty")); 
    this.returnReasonDropDown = element(by.model("x.disposition"));
    this.returnNotes=element(by.model("x.notes"));
    this.rmaNumber=element(by.xpath("//en-content/b[@class='ng-binding']"));
    this.rmaSubmitButton=element(by.xpath('//button/span[contains(text(),"Submit")]'));
    this.RMAStatusText=element(by.xpath("//div/en-label/small[@class = 'ng-binding' ]"));
    this.RMASelectClick = element(by.xpath("//div/div/div[@class='en-collection-row']"));
    this.inspectEditButton=element(by.xpath('//en-icon[@icon="doc-edit"]'));
    this.inspectedRMASelectCheckbox= element(by.xpath('//input[@class="ng-scope ng-pristine ng-untouched ng-valid"]'));
    this.changeInspectedStatus = element(by.xpath('//span[contains(text(),"Change Status")]'));
    this.newStatus = element(by.model("data.returnMerchandiseAuthorizationStatus"));
    this.daterecived = element(by.model("data.receivedDate"));
    this.paymentdispositionbutton = element(by.xpath('//span[contains(text(),"PAYMENT DISPOSITION")]'));
    this.addnotes = element(by.xpath('//span[contains(text(),"Add Notes")]'));
    this.notesvalue = element(by.model("data.noteVal"));
    this.credittype = element(by.model("return.data.rma.creditType"));
    this.returnsinvoiceroute = element(by.xpath('(//button/en-icon[@icon="media-play" and @class="text-secondary ng-scope text-accent"])[2]'));
    this.returnreceivedyear = element(by.xpath('(//span[@class="ng-binding"])[4]'));
    this.currentmonth = element(by.xpath('(//span[@class="ng-binding"])[3]'));
    this.nextmonth = element(by.xpath('//a[@en-tap="nextMonth()"]'));
    this.returnedQTY = element(by.xpath("//div/span[@class='ng-binding'][2]"));
    this.shippedQty = element(by.xpath("//div/div[@class='ng-binding']"));
    this.RMAQTY = element(by.xpath('(//div/span[@class="ng-binding"])[2]'));
    this.ReceivedQty = element(by.xpath('(//div/span[@class="ng-binding"])[3]'));
    this.clearInvSerach = element(by.xpath('//button[@class="filter-button en-button ng-scope"]'));
    this.rmaSelectAllCheckBox = element(by.model("returnsCollection.checkAllModel"));
    this.createNewRmButton = element(by.xpath('//button/span[contains(text(),"CREATE NEW  RMA")]'));
    this.firstOrderNUmber = element(by.xpath('(//en-title/strong[@class="ng-binding"])[2]'));
    this.secondOrderNumber = element(by.xpath('(//en-title/strong[@class="ng-binding"])[4]'));
    this.shippedLineQTY = element(by.xpath('(//en-title/strong[@class="capitalized ng-binding"])[2]'));
    this.selectFirstItemCheckbox = element(by.xpath('(//div/div/div/div[@checkbox-value="item.id"])[2]'));
    this.selectAllItemCheckbox = element(by.xpath('(//div/div/div/div[@checkbox-value="item.id"])[1]'));
    this.RMAReleaseButton = element(by.xpath('//button[@class="text-center button-success en-button"]'));
    this.orderReturnqty= element(by.model("item.qty"));
    this.orderFirstLineSelect = element(by.xpath('(//div/div/div/div[@checkbox-value="item.id"])[2]'));
    this.addNewFRDispositionButton=element(by.xpath('//button/span[contains(text(),"Add Disposition")]'));
    this.FRReturnsFirstOrderCheckbox = element(by.xpath("//input[@id='returnsCollection_checkbox_0_0']"));
    this.FRReturnsSecondOrderCheckbox = element(by.xpath("//input[@id='returnsCollection_checkbox_1_0']"));
    this.FRInspectReturnButton = element(by.xpath('//span[contains(text(), "INSPECT RETURN")]/parent::button'));
    this.RMANumberCallcenter = element(by.xpath("(//div[@class = 'ng-binding' ])[1]"));
    this.notescancelButton = element(by.xpath("//span[contains(text(),'Cancel')]/parent::button"));
    this.viewnotesButton = element(by.xpath("//span[contains(text(),'View Notes')]"));
    this.returnLocationdropdown = element(by.model('return.data.returnLocation'));
    this.blindReturnbtn = element(by.xpath('//div[@class="card-split-title"]/h2[contains(text(), "Blind Return")]'));
    this.channelSelection = element(by.model("return.data.channel"));
    this.productLookup = element(by.buttonText("Product Lookup"));
    this.productsearch = element(by.model("apiSearchText.value"));
    this.BlindReturnProductSelect = element(by.xpath('(//input[@type="checkbox"])[2]'));
    this.addSelectedProducts = element(by.buttonText("Add Products"));
    this.saveandrelease = element(by.xpath('//en-icon[@icon="check-circle"]/parent::button'));
    this.saveBlindReturnsButton = element(by.xpath('//button[@class="button-primary en-button button-primary ng-binding"]'))
    this.blindreturnpdctsearch = element(by.xpath('//button[@class="en-button en-api-search-search-button"]'));	

    
    //////////**********END OF LOCATORS**********//////
    
//    var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.blindReturn = function() {
        return this.blindReturnButton.click();
    }

    this.orderReturn = function() {
        return this.orderReturnButton.click();
    }

    this.channelSelect = function(channel) {
        commons.selectOption(this.channelDropdown,channel);
    }

    this.searchCustomer = function(criteria, searchValue) {
/*        commons.selectOption(this.customerSearchCriteriaDropdown,criteria);
        this.customerSearchTextbox.clear();
//        this.customerSearchTextbox.sendKeys(searchValue);

        for (var i = 0, len = searchValue.length; i < len; i++) {
            this.customerSearchTextbox.sendKeys(searchValue[i]);
            browser.sleep(100);
        }



        return this.customerSearchButton.click();
*/
       element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = searchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(searchValue[i]);
            browser.sleep(100);
        }

      
   }
   
    this.selectOrder = function() {
        return this.selectFirstSOLink.click();
    }

    this.selectAllLineitem = function() {
     	
    	browser.sleep(4000);
        this.selectAllItemCheckbox.click();
        browser.sleep(2000);
        return this.useSelectedItemButton.click();
    }
    this.selectFirstLineItem = function() {
    	browser.sleep(4000);
        this.selectFirstItemCheckbox.click();
        browser.sleep(2000);
        return this.useSelectedItemButton.click();
        
    }
 
    this.selectCustomer = function() {
        return this.selectCustomerCheckbox.click();
    }

    this.useSelectedCustomer = function() {
        return this.useSelectedCustomerButton.click();
    }

    this.returnLocationSelect = function(returnLocation) {
        commons.selectOption(this.returnLocationDropdown,returnLocation); 
    }

    this.saveReturns = function() {
        return this.saveReturnsButton.click();
    }
    
    this.productLookup = function() {
        return this.productLookupButton.click();
    }

    this.enterProductName = function(productNameValue) {
        this.productNameEntryTextBox.clear();
        return this.productNameEntryTextBox.sendKeys(productNameValue);
    }


    this.searchModalWindow = function() {
        // return this.searchButtonModalWindow.click();
        $('body').sendKeys(protractor.Key.ENTER);
    }

    this.selectProduct = function() {
        return this.selectProductCheckbox.click();
    }

    this.addProduct = function() {
        return this.useSelectedProductButton.click();
    }

    this.returnReason = function(lineCount, returnReason) {
        temp = "(//select[@name='returnReason'])[" + lineCount + "]";
    //    element(by.xpath(temp)).clear();
        return element(by.xpath(temp)).sendKeys(returnReason);
    }

    this.creditType = function(creditType) {
        commons.selectOption(this.creditTypeDropdown,creditType); 
    }

    this.getRMANber = function() {
        return this.rmaNumberText.getText();
    }

//Added By vishak

    this.RMAGenerate = function(){
    	
    	return this.RMAReleaseButton.click();
    }
    
    this.createNewRMA = function(){
    	
    	this.createNewRMAButton.click();
    }
    this.orderSelectForReturnClick = function() {
    	
    	this.orderSearchForReturn.click();
    }
    this.orderSelectForReturnCheckBox = function() {
    	
    	this.orderSelectForReturn.click();
    }
    
    this.OrderSelectionButtonCartIcon= function(){
    	
    	this.selectForReturnbutton.click();
    } 
    
    this.returningLocationDropDown = function(returninglocation) {
    	
    	this.returningLocation.sendKeys(returninglocation);
    	
    }
    
    this.EditLine = function() {
    	
    	this.EditLineClick.click();
    }
    this.addNewLine = function() {
    	
    	this.addNewLineButton.click();
    }
    
    this.linedispositionDetails = function(qty,reason,note){
    	
    	this.totalUnits.clear();
    	this.returnNotes.clear();
    	
    	this.totalUnits.sendKeys(qty);
    	this.returnReasonDropDown.sendKeys(reason);
    	this.returnNotes.sendKeys(note);
    	    	
    }
    
    this.getRMANumber= function() {
    	
    	return this.rmaNumber.getText();
    }
    
    this.RMASubmit=function() {
    	
    	this.rmaSubmitButton.click();
    }
    
    this.RMAStatus = function() {
    
    	return this.RMAStatusText.getText();
    	
    }
    
    this.RMASelect = function() {
    	
    	this.RMASelectClick.click();
    }
    
    this.inspectclick = function() {
    	
    	this.inspectEditButton.click();
    	    	
    }
    
    this.getRMAQuantity = function(){
    	
    	return this.totalUnits.getAttribute('value');
    	
    }
    
    this.inspectDetails = function(reason,note) {
    	
    	
    	this.returnReasonDropDown.sendKeys(reason);
    	this.returnNotes.sendKeys(note);
    
    }
    
    this.inspectSubmit = function() {
    	
    	this.rmaSubmitButton.click();
    }
    
    this.inspectedRMASelect = function() {
    	
    	this.inspectedRMASelectCheckbox.click();
    }
    
    this.changeStatusclick = function(){
    	
    	this.changeInspectedStatus.click();
    }
    
    this.newstatusupdate = function(newstatus) {
    	
    	this.newStatus.sendKeys(newstatus);
    }
 /*   
    this.receivedDate = function(date) {
    	
    	this.daterecived.sendKeys(date);
    }
*/
    
    this.receivedDate = function(){
    	this.daterecived.click();
    	this.returnreceivedyear.click();
    	browser.sleep(1000);
    	year=element(by.xpath('//span[@class="ng-binding ng-scope datepicker-active"]')).click();    		
    	browser.sleep(500);
    	date=element(by.xpath("//a[@class='cal-day ng-binding ng-scope datepicker-active']")).click();
    	browser.sleep(2000);
    	savebtn=element(by.xpath("//button/en-icon[@icon='check-circle']")).click();
    }
    
    this.paymentDispositionClik = function() {
    	
    	this.paymentdispositionbutton.click();
    	
    }
    
    this.addPaymentDispositionNotes = function(dispositionnote){
    	
    	this.addnotes.click();
    	browser.sleep(1000);
    	this.notesvalue.sendKeys(dispositionnote)
    	browser.sleep(1000);
    	return element(by.xpath('//button[@type="submit"]')).click();
    	
    	
    }
    
    this.viewPaymentDispositionNotes = function() {
    	
    	this.viewnotesButton.click();  	
    	browser.sleep(2000);
    	return this.notesvalue.getText();
    }
    
    this.refundtype = function(refundmethod){
    	
    	this.credittype.sendKeys(refundmethod)
    }
    this.paymentDispositionSubmit = function(){
    	
    	this.rmaSubmitButton.click();
    }
    
    this.startingReturnInvoiceRoute = function(status,line) {
    	 var stopreturnsinvoiceroute = element(by.xpath('(//en-icon[@icon="media-stop"])['+line+']'));
	    	temp =  element(by.xpath('(//button/en-icon[@icon="media-play" and @class="text-secondary ng-scope text-accent"])['+line+']'));
	    	if(status=="STARTED"){
	    		console.log("the Route is already started");
			     stopreturnsinvoiceroute.click();
			     browser.sleep(1500);
			     temp.click();

			 }
			 else if(status=="STOPPED"){
		    	 temp.click();
		    	 console.log("Starting the route");
			 }
    }
    
 this.stoppingRoute = function(line) {
		 stopreturnsinvoiceroute = element(by.xpath('(//en-icon[@icon="media-stop"])['+line+']'));
		 temp= element(by.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']'));
	     stopreturnsinvoiceroute.click();
    }
 
 this.StopRoute = function(status,route){
	 stopreturnsinvoiceroute = element(by.xpath('(//en-icon[@icon="media-stop"])['+route+']'));
		if(status=="STARTED"){
		     stopreturnsinvoiceroute.click();
		 }
		 else if(status=="STOPPED"){
			 
			 console.log("the Route is already stopped");
		 }
 	}
    
    this.returnedRmaQty = function(){
    	this.returnedQTY.getText();
    }
    
    this.totalShippedQTY = function(){
    	
    	return this.shippedQty.getText();
    	
    }
    
    this.totalRmaQty = function(){
    	
    	return this.RMAQTY.getText();
    }
    
    this.totalReceivedQty = function() {
    	
    	return this.ReceivedQty.getText();
    }
    
   this.clearSearch = function(){
	   
	   this.clearInvSerach.click();
   }
   
   this.multiplePackages = function(line,qty){
	   packageqty = element(by.xpath("(//input[@ng-model='item.qtyInPackageDefault'])[" + line + "]"));
	   packageqty.clear();
       browser.sleep(1000);
       return packageqty.sendKeys(qty);
	   
   }
   
   this.RMASelectAll = function() {
	   
	   this.rmaSelectAllCheckBox.click();
   }
   
   this.createNewRma = function() {
	   
	   this.createNewRmButton.click();
   }
   
   
   this.multipleRMACreation = function(type,reason,notes) {
	   temp = "//en-icon[@icon='doc-edit']";	  
	   var totallines = element.all(by.xpath(temp));
	   totallines.count().then(function (total){
		   var totalcount = total;
		   console.log("the total lines in the RMA create are : "+totalcount);
		   if(type=="Create")
		   {
			   for(var i=1;i<=totalcount;i++)
			   {
				   browser.sleep(1000);
				   element(by.xpath("(//en-icon[@icon='doc-edit'])["+i+"]")).click();
				   browser.sleep(1000);
				   qty = element(by.xpath('(//en-title/strong[@class="capitalized ng-binding"])[2]')).getText();
				   element(by.xpath('//button/span[contains(text(),"Add Line")]')).click();
				   element(by.model("x.returnQty")).sendKeys(qty); 
				   element(by.xpath("//select[@class='form-control ng-pristine ng-untouched ng-invalid ng-invalid-required']")).sendKeys(reason);
				   element(by.xpath("//input[@class='form-control ng-pristine ng-untouched ng-valid']")).sendKeys(notes);
				   element(by.buttonText("Save")).click();   
			   }
		   }
		   else{
			   
			   for(var i=1;i<=totalcount;i++)
			   {
				   browser.sleep(1000);
				   element(by.xpath("(//en-icon[@icon='doc-edit'])["+i+"]")).click();
				   browser.sleep(1000);
				   rmaIniQTY=element(by.xpath('(//en-title/strong[@class="capitalized ng-binding"])[3]')).getText();
				   element(by.model("x.returnQty")).clear();
				   browser.sleep(500);
				   element(by.model("x.returnQty")).sendKeys(rmaIniQTY); 
				   element(by.xpath("//select[@class='form-control ng-pristine ng-untouched ng-invalid ng-invalid-required']")).sendKeys(reason);
				   element(by.xpath("//input[@class='form-control ng-pristine ng-untouched ng-valid']")).sendKeys(notes);
				   element(by.buttonText("Save")).click();   
			   }
			   
		   }
   
	   });
	   
   }
	   this.firstOrderCheck = function() {
		   
		   return this.firstOrderNUmber.getText();
	   }
	   
	   this.secondOrderCheck = function() {
		   
		   return this.secondOrderNumber.getText();
	   }
	   
	   this.totalReturnsItem = function(reason) {
		   
		   temp = "//div/div/div/div[@class='en-collection-row']";	  
		   var totallines = element.all(by.xpath(temp));
		   totallines.count().then(function (total){
			   var totalcount = total;
			   console.log("the total lines in the RMA create are : "+totalcount);
			     for(var i=1;i<=totalcount;i++)
				   {
					   browser.sleep(1000);					 
					   element(by.xpath("(//select[@name='returnReason'])["+i+"]")).sendKeys(reason);					     
				   }
			   
	     });
	}
	   
	   this.orderReturnQtyTextbox = function(qty) {
		   
		   this.orderReturnqty.clear();
		   browser.sleep(2000);
		   this.orderReturnqty.sendKeys(qty);
	   }
	   
	   this.orderSelectFirstLine = function(){
		   
		  this.orderFirstLineSelect.click();
		  browser.sleep(2000);
	      return this.useSelectedItemButton.click();
	   }
	   
	   this.addFRDisposition = function() {
	    	
	    	this.addNewFRDispositionButton.click();
	    }
	   
	   this.selectShipmentLine = function() {
		   
		   this.RMASelectClick.click();
	   }  
	  this.noDispositionqtyError = function(line){
		  this.noDispositionqty = element(by.xpath('(//div[@class="msg-error ng-scope"])['+line+']'));
		  return this.noDispositionqty.isPresent();
	  }
	  this.noDispositionReasonError = function(line){
		  
		  this.noDispositionReason = element(by.xpath('(//div[@class="msg-error ng-scope"])['+line+']'));
		  return this.noDispositionReason.isPresent();
	  }
	  
	  this.linedispositionreasonValidation = function(qty,notes){
	    	
	    	this.totalUnits.clear();
	    	this.returnNotes.clear();
	    	
	    	this.totalUnits.sendKeys(qty);
	    	this.returnNotes.sendKeys(notes);
	    	    	
	    }
	  this.linedispositionNoQTYValidation = function(reason,notes){
	    	
		  	this.returnNotes.clear();
	    	this.returnReasonDropDown.sendKeys(reason);
	    	browser.sleep(2000);
	    	this.returnNotes.sendKeys(notes);
	    	    	
	    }
	  
	  this.paymentDispositionCreditTypes = function() {
		  
		   return this.credittype.all(by.tagName('option')).getAttribute('label')

	  }
	  
	  this.FRReturnsMultipleOrderSelection = function()
	  {
		  this.FRReturnsFirstOrderCheckbox.click();
		  browser.sleep(1000);
		  this.FRReturnsSecondOrderCheckbox.click();

	  }
	  this.FRInspectReturnButtonClick = function(){
		  
		  return this.FRInspectReturnButton.click();
	  }
	  
	  this.FRReturnsMultipleOrdrs = function(type,qty,reason,notes) {
		   temp = "//en-icon[@icon='doc-edit']";	  
		   var totallines = element.all(by.xpath(temp));
		   totallines.count().then(function (total){
			   var totalcount = total;
			   console.log("the total lines in the RMA create are : "+totalcount);
			   if(type=="Disposition")
			   {
				   for(var i=1;i<=totalcount;i++)
				   {
					   browser.sleep(1000);
					   element(by.xpath("(//en-icon[@icon='doc-edit'])["+i+"]")).click();
					   browser.sleep(1000);
					   //qty = element(by.xpath('(//en-title/strong[@class="capitalized ng-binding"])[2]')).getText();
					   element(by.xpath('//button/span[contains(text(),"Add")]')).click();
					   element(by.model("x.returnQty")).sendKeys(qty); 
					   element(by.model("x.disposition")).sendKeys(reason);
					   element(by.model("x.notes")).sendKeys(notes);
					   browser.sleep(2000);
					   element(by.buttonText("Save")).click();   
					   browser.sleep(2000);
				   }
			   }
			   else{
				   
				   for(var i=1;i<=totalcount;i++)
				   {
					   browser.sleep(1000);
					   element(by.xpath("(//en-icon[@icon='doc-edit'])["+i+"]")).click();
					   browser.sleep(1000);
					   rmaIniQTY=element(by.xpath('(//en-title/strong[@class="capitalized ng-binding"])[3]')).getText();
					   element(by.xpath("//select[@class='form-control ng-pristine ng-untouched ng-invalid ng-invalid-required']")).sendKeys(reason);
					   element(by.xpath("//input[@class='form-control ng-pristine ng-untouched ng-valid']")).sendKeys(notes);
					   element(by.buttonText("Save")).click();   
				   }				   
			   }
		   });   
	   }
	  
	  this.getRMANumberCallcenter = function() {
		  
		  return this.RMANumberCallcenter.getText();
	  }
	  
	  this.clearQTy = function () {
		  
	    	this.totalUnits.clear();
	}
	  
	  this.notesCancel = function(){
		  
		  this.notescancelButton.click();
	  }
	  this.multipleLineEdit = function(line) {
		  
		  temp = element(by.xpath("(//div/div/div/div/en-icon[@icon='doc-edit'])["+line+"]"));
		  return temp.click();
	  }
	  
	  this.SelectSingleLine = function(line){
		  
		  singleline=element(by.xpath('(//div/div/div/div/div[@checkbox-value="item.id"])['+line+']'));
		  return singleline.click();
	  }
	  this.returnedLine = function(){
		  
		  //singleline=element(by.xpath('(//div/div/div/div/div[@checkbox-value="item.id"])['+line+']'));
		 returnedline = element(by.xpath('(//input[@disabled="disabled"])[4]'));
		 return singleline.isPresent();
	  }
	  this.UseSelectedItemButtonClick = function(){
		  
	        this.useSelectedItemButton.click();
	  }
	  
	  this.filterCheck = function(col){
		  
		  filterResult = element(by.xpath("(//span[@class='product-title ng-binding'])["+col+"]"));
		  return filterResult.getText();
		  
	  }
	  
	  this.resultCheck = function(col){
		  
		  filterResult = element(by.xpath('(//div[@class="ng-binding"])['+col+']'));
		  return filterResult.getText();
		  
	  }
	  this.returnLocationValidation = function(value){
		  
		  this.returnLocationdropdown.click();
		  errorMessage = element(by.xpath('//en-msg[@class="msg-error ng-scope"]'));
		  return errorMessage.isPresent();
	  }
	  this.reasonvalidation = function(){		  
		  errorMessage = element(by.xpath('//en-msg[@class="msg-error ng-scope"]'));
		  return errorMessage.isPresent();
	  }
	  
	  this.BlindreturnClick = function(){
		  this.blindReturnbtn.click();
	  }
	  
	  this.ChannelSelectiondropdown = function(chl){
		  
		  this.channelSelection.sendKeys(chl);
		  
	  }
	  
	/*  this.productLookupClick = function(){
		 
		  this.productLookup.click();  
	  }
	  */
	  this.productSearchScreen = function(pdct){
		  
		  //this.productsearch.sendKeys(pdct);
		 // this.blindreturnpdctsearch.click(); 
		  element(by.xpath('(//input[contains(@class,"ng-pristine ng-untouched ng-valid")])[5]')).clear();
		  browser.sleep(1000);
		  element(by.xpath('(//input[contains(@class,"ng-pristine ng-untouched ng-valid")])[5]')).sendKeys(pdct);
	      element(by.xpath('(//input[contains(@class,"ng-pristine ng-untouched ng-valid")])[5]')).sendKeys(protractor.Key.ENTER);
		  		  
	  }
	  this.BlindReturnSelectProduct = function(){
		  
		  this.BlindReturnProductSelect.click();
	  }
	  this.addSelectedProductsButton = function(){
		  
		  this.addSelectedProducts.click();
	  }
	  this.saveandreleaseIcon = function(){
		  
		  element(by.xpath('//en-icon[@icon="gear"]')).click();
		  this.saveandrelease.click();
	  }
	  
	  this.saveBlindReturns = function(){
		  
		  this.saveBlindReturnsButton.click();
	  }
	  
	  this.noItemAlert = function(){
		  
		  error=element(by.xpath('//en-alert[@class="alert-error ng-binding"]'));
		  return error.isPresent();		  
	  }
	  this.RMAPresence = function(){
			 
			temp=element(by.xpath("//en-content/b[@class='ng-binding']"));
			var until = protractor.ExpectedConditions;
			const prsence = until.visibilityOf(temp)
			return browser.wait(prsence, 5000, 'RMA Number not generatedSucessfully');
		 }	  
 this.multipleReturnItemAlert = function(){
		  
		  error=element(by.xpath('//div[@class="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable"]'));
		  return error.isPresent();		  
	  }
}