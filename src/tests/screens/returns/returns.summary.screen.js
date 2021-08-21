module.exports =function(){

    var returnsDefaultGearIconOption = "View";
    var temp = "";
    var data = "";

    this.returnsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.returnsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.returnsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    this.returnsSearchCriteriaRemove = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));
    this.returnsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.returnsReleaseFromGearIcon = element(by.xpath('//button/span[text()="Release"]/parent::button'));
    this.returnsStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));
    this.returnsNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[4])[1]'));
    this.generateRMALabelCheckbox = element(by.xpath('//input[@name="generateLabel"]'));
    this.generateShippingLabelCheckbox = element(by.xpath('//input[@name="generateShippingLabel"]'));
//Added by Vishak
    this.noResult = element(by.xpath("//div/div/div[@class='en-collection-overlay-empty']"));
    this.totalOrders = element(by.xpath('//div/i[@class="ng-binding"]'));
    this.searchResultPopup = element(by.xpath('(//div[@class="en-collection-row"])[1]'));
    this.advancedSearch = element(by.xpath('//en-icon[@icon="plus"]'));
    this.selectAllResultFromList = element(by.model('filterCollection.checkAllModel'));
    this.backButton = element(by.xpath("//span[contains(text(),'Back')]/parent::Button"));

    //var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.returnsSearch = function(criteria, returnsSearchValue){
/*        commons.selectOption(this.returnsSearchCriteriaDropdown,criteria);
        this.returnsSearchTextbox.clear();
//        this.returnsSearchTextbox.sendKeys(returnsSearchValue);

        for (var i = 0, len = returnsSearchValue.length; i < len; i++) {
            this.returnsSearchTextbox.sendKeys(returnsSearchValue[i]);
            browser.sleep(100);
        }

        return this.returnsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = returnsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(returnsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.returnsSearchRemove = function(count) {
       temp = "(//button/en-icon[@icon='x-circle']/parent::button)[" + count +  "]";
       return element(by.xpath(temp)).click();
    }



    this.returnsSelectGear = function(selectOption){
        var defer = protractor.promise.defer();
        this.returnsSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
       
        if (selectOption == "Release") {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";

            if (this.generateRMALabelCheckbox.isSelected())
            {
                 this.generateRMALabelCheckbox.click();
            }
/*
            if (this.generateShippingLabelCheckbox.isSelected())
            {
                this.generateShippingLabelCheckbox.click();
            }
*/
            element.all(by.xpath(temp)).get(0).click();
            defer.fulfill();
        } else {
            element(by.xpath(temp)).click();
            defer.fulfill();
        }
	return defer.promise;
    }

    this.returnsStatus = function() {
        return this.returnsStatusText.getText();
    }

    this.returnsNumber = function() {
	return this.returnsNumberText.getText();
    }
    this.noResultStatus = function() {
    	
    	return this.noResult.getText();
    
    }
    
    this.totalResults = function() {
    	
    	return this.totalOrders.getText();
    	
    }
    this.filteredCustomerCheck = function(searchvalue) {    	
    	temp="//div/div/div/div[@ng-repeat='item in returnsCollection.data track by $index']";
    	customervalue="//div/div/div/div/div[@class='ng-binding' and contains(text(),'"+searchvalue+"')]";
    	var totallines = element.all(by.xpath(customervalue));
 	   	totallines.count().then(function (total){
 		    var totalcount = total;
 	   		
 	   			for(i=1; i<=totalcount;i++)
   				{
 	   				data= element(by.xpath("(//div/div/div/div/div[@class='ng-binding' and contains(text(),'"+searchvalue+"')])["+i+"]")).getText().toString();
 	   				console.log("the data is "+data);
 	   				if(data == searchvalue)
   					{
 	   					return true;
   					}
 	   				else
   					{
 	   					return false;
   					}
 	   				
   				}

 	   	});
    	
    }
    
	this.FRReturnsSearchFilter = function() {
	    	
	    	return this.searchResultPopup.isPresent();
	    } 
	
	this.advancedsearchClick = function() {
	
		return this.advancedSearch.click();
	}
	
	this.advancedTabDetails = function(){
		
		//return this.advancedTabDetailsArea.count();
	    //temp = "//en-icon[@icon='doc-edit']";	  
		var totalcount="";
		   var advancedTabDetailsArea = element.all(by.model("customer.customerId"));
		advancedTabDetailsArea.count().then(function (total){
			   var totalcount = total;
			   console.log("the total lines in the RMA create are : "+totalcount);
			   return totalcount;

		 });
	}
	
	this.deleteTheAdancedCriteria = function(line){
		temp="(//en-icon[@icon='x'])["+line+"]";
		return element(by.xpath(temp)).click();
		
	}
	
	this.searchValidation = function(name){
		
		temp="//div[contains(text(),'"+name+"')]";
		return element(by.xpath(temp)).isPresent();
		
	}
	
	this.selectAllResultFromListCheck = function(){
		return this.selectAllResultFromList.click();
		
	}
	
	this.multipleRMAForSingleOrderInSearchScreen = function()
	{
		temp = "//div/div[@class='en-collection-row']";
		return element.all(by.xpath(temp));
		
	}
	
	this.RMALineItems = function(line){
		
		firstline = element(by.xpath("(//div/div/div/div[@class='en-collection-row'])["+line+"]")).click();
		browser.sleep(2000);
		return element(by.xpath('//div/strong[@class="oms-product-title ng-binding"]')).getText();
	}
	this.RMALineStatus = function(line){
		
		return element(by.xpath("(//div/en-label/small[@class = 'ng-binding' ])["+line+"]")).getText();
	}
	this.backToPaymentdisposition = function()
	{
		this.backButton.click();
		
	}
}

