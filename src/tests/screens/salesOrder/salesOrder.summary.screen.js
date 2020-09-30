module.exports =function(){

    var salesOrderDefaultGearIconOption = "Release";
    var temp = "";

    this.salesOrderSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.salesOrderSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.salesOrderSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    this.salesOrderSearchCriteriaRemove = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));

   // this.salesOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
   this.salesOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.salesOrderReleaseOrderFromGearIcon = element(by.xpath('//span/li/button/span[text()="Release"]/parent::button'));

   // this.salesOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));
   this.salesOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[2])[1]'));
    this.salesOrderNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[6])[1]/div/small/strong'));

    this.salesOrderMatchFilterSelect = element(by.xpath('//select[@name="filter"]'));

    this.salesOrderSelectAllCheckbox = element(by.xpath('//input[@ng-model="salesOrderCollection.checkAllModel"]'));
    this.salesOrderActionAllButton = element(by.xpath('//div[@class="en-collection-title"]/en-actions/button'));
    this.alertMessage= element(by.xpath("//en-alert[@class='alert-error alert-scrollable']/span"));
    this.statusText= element(by.xpath("//span[@class='ellipsis']/span/small"));
    this.ActionAllButton = element(by.xpath("//en-icon[@icon='more-vertical']"));
    //modified by Priti for presale
    this.skuStatusText= element(by.xpath("//en-label[@class='label-xs bold label-success']/small"));
    this.reservationlink = element(by.xpath("//en-tab[contains(text(),'Reservations')]"));
    this.reservationText = element(by.xpath("//en-title[@class='title-sm ng-binding']"));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


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

    this.salesOrderSearchRemove = function(count) {
       temp = "(//button/en-icon[@icon='x-circle']/parent::button)[" + count +  "]";
       return element(by.xpath(temp)).click();
    }


    this.salesOrderSelectGear = function(selectOption){
        this.salesOrderSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "View")
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



}

