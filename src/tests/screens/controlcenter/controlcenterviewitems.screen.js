module.exports =function(){

    this.freeTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
    this.resultCheckBox = element(by.xpath("//input[@id='viewItems_checkbox_0_0']"));
    this.shipToCustomerToggleOffButton = element(by.xpath("//label[@class='en-switch info__switch ng-pristine ng-untouched ng-valid']//span[@class='switch__label']"));
    this.pickUpInStoreToggleoffButton= element(by.xpath("//label[@class='en-switch primary__switch ng-pristine ng-untouched ng-valid']//span[@class='switch__label']"));
    this.applyButton = element(by.xpath("//span[contains(text(),'Apply')]"));
    this.confirmButton = element(by.xpath("//span[contains(text(),'Confirm')]"));

    this.SearchInTextBox =function(name){
       // return this.freeTextBox.sendkeys(input);

       for (var i = 0, len = name.length; i < len; i++) {
                   this.freeTextBox.sendKeys(name[i]);
                   browser.sleep(100);
               }

    }
    this.clickOnCheckBox = function()
    {
      return this.resultCheckBox.click();
    }

   this.clickOnShipToCustomerToggle = function()
   {
     return this.shipToCustomerToggleOffButton.click();
   }
   this.clickOnpickUpInStoreToggle =function()
   {
     return this.pickUpInStoreToggleoffButton.click();
   }
   this.clickOnApply = function()
   {
    return this.applyButton.click();
   }
   this.clickOnConfirm = function()
   {
    return this.confirmButton.click();
   }




}

