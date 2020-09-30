module.exports =function(){


    this.salesChannelEditIcon = element(by.xpath('//en-icon[@en-tap="$root.editChannel=true"]'));
    this.salesChannelDropdown = element(by.xpath('(//select[@name="channel"])[1]'));
    this.salesChannelSelectButton = element(by.xpath('//button/en-icon[@icon="check"]'));

    this.shipCompleteEditButton = element(by.xpath('//en-icon[@en-tap="$root.editShipComplete=true"]'));
    this.shipCompleteSelectButton = element(by.xpath('//input[@name="shipComplete"]'));


    this.attachCustomerButton = element(by.xpath('//div/en-icon[@icon="customer"]'));

    this.customerSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchText.value"]'));

    this.selectCustomerCheckbox = element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input'));
    this.useSelectedCustomerButton = element(by.xpath('//button/span[contains(text(), "Use Selected Customer")]/parent::button'));

    this.addToCartButton = element(by.xpath('//button/en-icon[@icon="cart-plus"]/parent::button'));

    this.searchProductTextBox = element(by.xpath('//input[@placeholder = "Search Skus"]'));

    this.selectSKUCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));
    this.selectAllSKUCheckbox = element(by.xpath('//div[@class="en-collection-header"]/div/div/input'));

    this.addProductButton = element(by.xpath('//button/span[contains(text(), "Add Skus")]/parent::button'));
    this.enterItemQtyTextBox = element(by.xpath('//input[@ng-model="item.orderQty"]'));

    this.searchButtonInPopup = element.all(by.xpath('//button[contains(@class,"en-button en-collection-search-button")][1]')).get(1);

    this.saveOptionButton = element.all(by.xpath('//button/en-icon[@icon="check-circle"]'));

    this.saveAsDraftButton = element.all(by.xpath('//button/span[contains(text(),"Save as Draft")]'));
    this.saveButton = element.all(by.xpath('//button/span[text()="Save"]'));

    this.salesOrderNumberText = element(by.xpath('//div/span[contains(text(),"OMS Order #")]/parent::div/strong'));

    this.useSuggestedAddressText = element(by.xpath('(//input[@data-ng-model="data.selectedAddress"])[1]/parent::label'));
    this.confirmCustomerAddressButton = element(by.xpath('//button/span[contains(text(),"Ok")]/parent::button'));

    this.skuATSText = element(by.xpath('(//div[@class="en-collection-row"]/div[@ng-if="data.useInventory"])[3]'));
    this.errorTabText = element(by.xpath("//en-tab[contains(text(),'Errors')]/en-label"));
    this.selectGear =element(by.xpath("//button/en-icon[@icon='more-vertical']"));
    this.validateOrderButton= element(by.xpath("//span[contains(text(),'Validate Order')]"));
    this.alertMessage = element(by.xpath("//en-alert[1]/span[1]"));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    //modified by Priti
    this.callcenterattachcustomerButton = element(by.xpath("//button[@class='en-button button-primary']"));
    this.callcentersearchcustomerTextBox = element(by.xpath("(//input[@name='simplified-text-value'])[2]"));
    this.callcenterfindProductTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
    this.selectProductCheckBox = element(by.xpath("//input[@id='skusCollection_checkbox_0_0']"));
    this.searchProductButton = element(by.xpath("//en-panel[@class='panel-primary']//div//button[1]"));
    this.selectsecondProductCheckBox = element(by.xpath("//input[@id='inventoryCollection_checkbox_0_0']"));
    this.addtoorderButton=  element(by.xpath("//span[contains(text(),'Add to Order')]"));
    this.futurecountText = element(by.xpath("//div[@id='inventoryCollection_collectionBody']//div[8]"));
    this.inboundcountText = element(by.xpath("//div[@id='inventoryCollection_collectionBody']//div[11]"));
    this.presaleLabelAtProductSearch = element(by.xpath("//en-label[@ng-if='item.presale']/small"));
    this.presaleLabelAtskuresults = element(by.xpath("//en-label[@class='label-xs bold label-warn ng-scope']/small"));


    this.setSalesChannel = function(salesChannelName){
         this.salesChannelEditIcon.click();
         commons.selectOption(this.salesChannelDropdown,salesChannelName);
         this.salesChannelSelectButton.click();
    }

    this.attachCustomer = function() {
        this.attachCustomerButton.click();
    }


    this.searchCustomer = function(criteria, searchValue) {
        this.customerSearchTextbox.clear();

        for (var i = 0, len = searchValue.length; i < len; i++) {
            this.customerSearchTextbox.sendKeys(searchValue[i]);
            browser.sleep(100);
        }

        this.customerSearchTextbox.sendKeys(protractor.Key.ENTER);
    }

    this.selectCustomer = function() {
        return this.selectCustomerCheckbox.click();
    }

    this.useSelectedCustomer = function() {
        return this.useSelectedCustomerButton.click();
    }


   this.addItem = function() {
       return this.addToCartButton.click();
   }

   this.searchProduct = function(searchProductValue) {
//       return this.searchProductTextBox.sendKeys(searchProductValue);

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = searchProductValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(searchProductValue[i]);
            browser.sleep(100);
        }

         browser.sleep(2000);
//        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

   }

    this.selectSKU = function() {
        return this.selectSKUCheckbox.click();
    }

    this.selectAllSKU = function() {
        return this.selectAllSKUCheckbox.click();
   }

   this.enterQty = function(qty) {
       this.enterItemQtyTextBox.clear();
       return this.enterItemQtyTextBox.sendKeys(qty);
   }

   this.addProduct = function() {
       return this.addProductButton.click();
   }


   this.searchInPopup = function() {
       //return this.searchButtonInPopup.click();
	$('body').sendKeys(protractor.Key.ENTER);
   }

   this.saveOption = function(option) {
       this.saveOptionButton.click();
       temp = "//button/span[text()='" + option + "']";
       return element(by.xpath(temp)).click();
   }

    this.salesOrderNumber = function() {
        return this.salesOrderNumberText.getText();
    }

   this.setShipComplete = function() {
        this.shipCompleteEditButton.click();
        return this.shipCompleteSelectButton.click();
   }

    this.confirmCustomerAddress = function() {
        this.confirmCustomerAddressButton.click();
   }

    this.getSuggestedAddressText = function() {
        return this.useSuggestedAddressText.getText();
    }

    this.getSKUATSValue = function() {
        return this.skuATSText.getText();
    }
    this.errorTabCount = function()
    {
      return this.errorTabText.getText();
    }
    this.clickonValidateOrder= function()
    {
      this.selectGear.click();
      return this.validateOrderButton.click();

    }
    this.alertMessageValidateOrder =function()
    {
     return this.alertMessage.getText();
    }

    //modified by Priti
    this.callcenterAttachCustomer = function()
    {
      return this.callcenterattachcustomerButton.click();
    }
    this.callcenterSearchCustomer = function(value)
    {
      //this.callcentersearchcustomerTextBox.sendKeys(value);

      this.callcentersearchcustomerTextBox.clear();

              for (var i = 0, len = value.length; i < len; i++) {
                  this.callcentersearchcustomerTextBox.sendKeys(value[i]);
                  browser.sleep(100);
              }

              this.callcentersearchcustomerTextBox.sendKeys(protractor.Key.ENTER);
    }

    this.searchProductofcallcenter = function(skuname)
    {
    // return this.callcenterfindProductTextBox.sendKeys(skuname);
      this.callcenterfindProductTextBox.clear();
      for(var i=0, len=skuname.length;i<len;i++)
      {
        this.callcenterfindProductTextBox.sendKeys(skuname[i]);
        browser.sleep(100);
      }
      this.callcenterfindProductTextBox.sendKeys(protractor.Key.ENTER);

    }
    this.selectProductofcallcenter = function()
    {
     return this.selectProductCheckBox.click();

    }
    this.search = function()
    {
      return this.searchProductButton.click();
    }
    this.verifypresaletextonSearch = function()
    {
      return this.presaleLabelAtProductSearch.getText();
    }
    this.selecttheProduct = function()
    {
       return this.selectsecondProductCheckBox.click();
    }
    this.verifypresalelabelAtskulevel = function()
    {
     return this.presaleLabelAtskuresults.getText();
    }
    this.verifyfuturequantity = function()
    {
      return this.futurecountText.getText();
    }
    this.verifyinboundQuantity = function()
    {
     return this.inboundcountText.getText();

    }
    this.addTOorder =function()
    {
     return this.addtoorderButton.click();
    }
}

