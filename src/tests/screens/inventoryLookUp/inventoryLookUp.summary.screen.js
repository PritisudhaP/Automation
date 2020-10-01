module.exports =function(){

  this.organisationDropDown = element(by.xpath("//select[@name='organizationId']"));
  this.excludezeroInventoryCheckBox = element(by.xpath("//input[@name='excludeZeroInventory']"));
  this.inactiveproductCheckBox = element(by.xpath("//input[@name='excludeInactiveProducts']"));

  this.addSKUsButton = element(by.xpath("//en-control/button/span[text() ='Add SKUs']/parent::button"));
  this.result = element(by.xpath("(//div/div/div/input)[2]"));
  this.addSkuButton = element(by.xpath("//button/span[text() = 'Add Skus']/parent::button"));
  //this.searchButton = element(by.xpath("//en-control/button/en-icon[@icon = 'search']/parent::button"));
    this.searchButton = element(by.xpath("//en-control/button[contains(text(), 'Search')]"));

  this.skuSelectGear = element(by.xpath("//en-actions/button/en-icon/parent::button"));
  this.detailsButton = element(by.xpath("//li/button/span[text() = 'Details']/parent::button"));
  this.atsValue = element(by.xpath("(//div/div[contains(@ng-if,'item.availableQtyAfter')])[1]"));
  this.quantityTextBox = element(by.xpath("//div/input[@ng-model = 'item.orderQty']"));
  this.entryAdjustmentTab = element(by.xpath("//en-tabs/en-tab[text() = 'Entry Adjustment']"));
  this.adjustQuantity = element(by.xpath("//en-control/input[@ng-model = 'entry.data.amountToAdjust']"));
  this.adjustmentReason = element(by.xpath("//en-control/input[@ng-model = 'entry.data.description']"));
  this.saveButton = element(by.xpath("//en-footer/button/span[text() = 'Save']/parent::button"));
  this.atsValueOnResultsTab =element(by.xpath("(//div/div/div/div[@class = 'en-collection-row']/div)[5]"));
  //this.availableQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[5]'));
    this.availableQty = element(by.xpath("//div[contains(@ng-repeat,'item in logCollection.data')]/div/div[4]/div"));
  //this.reservedQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[6]'));
  this.reservedQty = element(by.xpath('//div[contains(@ng-repeat,"item in logCollection.data")]/div/div[5]'));

   var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();



    this.clickOnAddSkusButton = function () {
        return this.addSKUsButton.click();
    }

    this.SelectTheResultSku = function()
    {
         this.result.click();
         return this.addSkuButton.click();
    }

    this.clickOnSearchButton = function()
    {
        return this.searchButton.click();
    }

    this.ClickOnSkuSelectGear = function()
    {
        return this.skuSelectGear.click();
    }

    this.clickOnDetailsButton = function()
    {
        return this.detailsButton.click();
    }

    this.getAtsValue = function()
    {
        return this.atsValue.getText();
    }

    this.EnterQuantity = function () {
        this.quantityTextBox.clear();
        browser.sleep(1000);
        return this.quantityTextBox.sendKeys("0");
    }

    this.clickOnEntryAdjustmentTab = function()
    {
        return this.entryAdjustmentTab.click();
    }

    this.enterAdjustmentQuantity = function (adjValue) {
        return this.adjustQuantity.sendKeys(adjValue);

    }

    this.enterAdjustmentReason = function(adjReason){
        return this.adjustmentReason.sendKeys(adjReason);
    }

    this.clickOnSaveButton = function(){
        return this.saveButton.click();
    }
    this.getAtsValueFromSkuResult = function () {
        return this.atsValueOnResultsTab.getText();
    }

    this.getAvailableQty = function () {
        return this.availableQty.getText().then(function (Qty) {
            browser.driver.sleep(5000);
            return parseInt(Qty);
        });
    }


    this.getReservedQty = function () {
        return this.reservedQty.getText().then(function (Qty) {
            browser.driver.sleep(5000);
            return parseInt(Qty);
        });
    }



    this.selectOrganisation =function(organisationName)
    {
        this.organisationDropDown.click();
        commons.selectOption(this.selectPublishMailBox, organisationName);
        this.organisationDropDown.click();
    }

     this.excludezeroInventoryProduct = function()
     {
         this.excludezeroInventoryCheckBox.click();

     }
     this.excludeInactiveProduct = function()
     {
         this.inactiveproductCheckBox.click();
     }

     this.getSkuInfo = function (skuName) {

         this.clickOnAddSkusButton();
         commons.searchWithCriteria("SKU", "contains", skuName);
         this.EnterQuantity();
         browser.sleep(1000);
         this.SelectTheResultSku();
         browser.sleep(1000);
         this.clickOnSearchButton();
         browser.sleep(5000);
         this.ClickOnSkuSelectGear();
         this.clickOnDetailsButton();
     }
}
