module.exports =function(){

    this.newProductButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.selectProductDropDown= element(by.xpath('//select[@name="productDisplayName"]'));

    //this.availableQtyEntryTextBox= element(by.xpath('//input[@name="availableQty"]'));
    this.availableQtyEntryTextBox= element(by.xpath("//input[@ng-model ='item.availableQty']"));
    this.reservedQtyEntryTextBox= element(by.xpath('//input[@name="reservedQty"]'));
    this.unavailableQtyEntryTextBox= element(by.xpath('//input[@name="unavailableQty"]'));
    this.thresholdQtyEntryTextBox= element(by.xpath('//input[@name="thresholdQty"]'));

    this.saveButton = element(by.xpath('(//button[contains(text(),"Save")])[2]'));
    this.channelDropdown = element(by.xpath('//select[@name="channel"]'));

    this.saveInventoryPoolButton = element(by.xpath('//button[contains(text(),"Inventory Pool")]'));

    this.attachSkusButton = element(by.xpath("//button/span[text() = 'Attach Skus']/parent::button"));

    this.addSKUButton = element(by.xpath("//button/span[text() = 'Add Skus']/parent::button"));
    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();




    this.newProduct = function() {
        return this.newProductButton.click();
    }

    this.addSKU = function() {
        this.addSKUButton.click();
    }
    this.clickOnAttachSkusButton = function() {
        return this.attachSkusButton.click();

    }

    this.selectProduct = function(productName) {
        commons.selectOption(this.selectProductDropDown,productName);
    }

    this.enterAvailableQty = function(availableQty) {
        return this.availableQtyEntryTextBox.sendKeys(availableQty);
    }

    this.enterReservedQty = function(reservedQty) {
        return this.reservedQtyEntryTextBox.sendKeys(reservedQty);
    }

    this.enterUnAvailableQty = function(unavailableQty) {
        return this.unavailableQtyEntryTextBox.sendKeys(unavailableQty);
    }

    this.enterThresholdQty = function(thresholdQty) {
        return this.thresholdQtyEntryTextBox.sendKeys(thresholdQty);
    }

    this.saveProduct = function() {
        return this.saveButton.click();
    }

    this.setChannel = function(channelName) {
        commons.selectOption(this.channelDropdown,channelName);
    }


    this.saveInventoryPool = function() {
        return this.saveInventoryPoolButton.click();
    }

    //modified by Priti for Presale
    this.attachskuButton = element(by.xpath("//span[contains(text(),'Attach Skus')]"));
    this.searchProductTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
    this.selectProductCheckBox = element(by.xpath("//input[@type='checkbox'][@en-checklist-value='item']"));
    this.addskuButton = element(by.xpath("//span[contains(text(),'Add Skus')]"));
    this.searchskuTextBox = element(by.xpath("//input[@placeholder='Search Sku']"));
    this.searchskuButton = element(by.xpath("//en-icon[@icon='search']"));
    this.skuCheckBox= element(by.xpath("//input[@id='inventoryCollection_checkbox_0_0']"));
    this.deleteOption = element(by.xpath("//div[@id='inventoryCollection_column_1']/div/en-actions/button"));

    this.clickOnAttachsku = function()
    {
     return this.attachskuButton.click();
    }
    this.searchProduct = function(value)
    {
     this.searchProductTextBox.clear();
     for(var i=0; i<value.length;i++)
     {
      this.searchProductTextBox.sendKeys(value[i]);
      browser.sleep(100);
     }
     this.searchProductTextBox.sendKeys(protractor.Key.ENTER);
    }
    this.selectProduct = function()
    {
     return this.selectProductCheckBox.click();
    }
    this.clickOnAddsku = function()
    {
     return this.addskuButton.click();
    }
    this.searchsku= function(sku)
    {
     for(var i=0;i<sku.length;i++)
     {
       this.searchskuTextBox.sendKeys(sku[i]);
       browser.sleep(100);
     }
       return this.searchskuButton.click();
    }
    this.clickOnSku = function()
    {
      return this.skuCheckBox.click();
    }
    this.clickOnDeleteSku = function()
    {
     this.deleteOption.click();
      element(by.xpath("//span[contains(text(),'Delete Selected')]")).click();
      browser.sleep(1000);
     return element(by.xpath("(//span[contains(text(),'Delete')])[2]")).click();
    }

// Added by Shyam 

this.availQty = element(by.model('item.availableQty'));
this.searchProductTextBox = element(by.xpath("//input[@name='simplified-text-value']"));

this.filter = function(sku){
    return this.searchProductTextBox.sendKeys(sku);
}

this.enterQty = function(qty){
    this.availQty.clear();
    return this.availQty.sendKeys(qty);
}



}

