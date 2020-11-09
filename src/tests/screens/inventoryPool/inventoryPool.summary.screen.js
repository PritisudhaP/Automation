module.exports =function(){

    var inventoryPoolDefaultGearIconOption = "Edit";
    var temp = "";


    this.inventoryPoolSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.inventoryPoolSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.inventoryPoolSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    //this.inventoryPoolSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.inventoryPoolSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div/en-actions'));
    this.inventoryPoolEditFromGearIcon = element(by.xpath('//span[contains(text(),"Edit")]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();
    
     // Added by Shyam
    this.searchFilter = element(by.xpath('//input[@name="simplified-text-value"]'));
     this.poolname = element(by.xpath('//div[@class="ellipsis"]'));
     var search = element(by.model('search'));
     var iconSearch = element(by.xpath('//en-icon[@icon="search"]'));
     var ats = element(by.xpath('//*[@id="inventoryCollection_collectionBody"]//div[3]'));
     var plusLog = element(by.xpath('(//en-icon[@icon="plus-block"])[1]'));
     var adjustmentLog = element(by.xpath('//div[@class="line-special"]'));

      //

    this.inventoryPoolSearch = function(criteria, inventoryPoolSearchValue){
/*        commons.selectOption(this.inventoryPoolSearchCriteriaDropdown,criteria);
        this.inventoryPoolSearchTextbox.clear();
//        this.inventoryPoolSearchTextbox.sendKeys(inventoryPoolSearchValue);

        for (var i = 0, len = inventoryPoolSearchValue.length; i < len; i++) {
            this.inventoryPoolSearchTextbox.sendKeys(inventoryPoolSearchValue[i]);
            browser.sleep(100);
        }



        return this.inventoryPoolSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = inventoryPoolSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(inventoryPoolSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }


    this.inventoryPoolSelectGear = function(selectOption){
        this.inventoryPoolSelectGearIcon.click();
        temp = "//span[contains(text(),'" + selectOption + "')]/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }

     // Added by shyam 
     
 
     this.searchPool = function(pool){
         return this.searchFilter.sendKeys(pool);
     }
 
     this.clickOnPool = function(){
         return this.poolname.click();
     }
 
     this.searchSKU = function(SKU){
         search.sendKeys(SKU);
         iconSearch.click();
         browser.executeScript('window.scrollTo(0,10000);').then(function () {
         });
     }
 
     this.clickonATS = function(){
         browser.executeScript('window.scrollTo(0,10000);').then(function () {
         });
         ats.click();
         browser.sleep(300);
         plusLog.click();
     }
 
     this.validateReturnLog = function (exp){
         adjustmentLog.getText().then(function(actual){
             console.log("Expected:",exp);
             console.log("Actual:",actual);
             expect(actual).toBe(exp);
         });
     }
     
     //
}

