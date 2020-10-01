module.exports =function(){

    this.editPOVendorSectionButton = element(by.xpath('(//en-icon[@icon="edit"])[1]'));
    this.editPOCurrencySectionButton = element(by.xpath('(//en-icon[@icon="edit"])[2]'));
    this.editPOCarrierSectionButton = element(by.xpath('(//en-icon[@icon="edit"])[3]'));

    this.sellerCurrencyDropDown = element(by.xpath('//select[@name="sellerCurrency"]'));
    this.exchangeRateTextEntryBox = element(by.xpath('//input[@name="exchangeRate"]'));

    this.savePOVendorSectionButton = element(by.xpath('(//button/span[contains(text(),"Save")])[1]'));
    this.savePOCurrencySectionButton = element(by.xpath('(//button/span[contains(text(),"Save")])[2]'));
    this.savePOCarrierSectionButton = element(by.xpath('(//button/span[contains(text(),"Save")])[3]'));
    
    this.SACTab = element(by.xpath('//en-tab[contains(text(),"Service Allowance Charges")]'));

    this.SACNewButton = element(by.xpath('(//button/span[contains(text(),"New")])[2]'));
    this.chargeTypeDropDown = element(by.xpath('//select[@name="sacType"]'));
    this.allowanceNameTextEntryBox = element(by.xpath('//input[@name="allowanceChargeIndicator"]'));
    
    this.chargeKindDropDown = element(by.xpath('//select[@name="chargeType"]'));
    this.chargeAmountTextEntryBox = element(by.xpath('//input[@name="amount"]'));
    this.chargePercentageTextEntryBox = element(by.xpath('//input[@name="percentage"]'));
    this.createSACButton = element(by.xpath('//button/span[contains(text(),"Create")]'));
    
    this.subTotalTextDisplayDollars = element(by.xpath('((//span[contains(text(),"Sub-Total")])[1]/../span)[2]'));
    this.subTotalTextDisplayEuros = element(by.xpath('((//span[contains(text(),"Sub-Total")])[2]/../span)[2]'));
    this.subTotalTextDisplayPounds = element(by.xpath('((//span[contains(text(),"Sub-Total")])[3]/../span)[2]'));
    
    this.allowanceAmountFeesTextDisplayDollars = element(by.xpath('(//span[contains(text(),"Allowance Dollar Amount")]/../span)[2]'));
    this.allowanceAmountFeesTextDisplayEuros = element(by.xpath('(//span[contains(text(),"Allowance Dollar Amount")]/../span)[3]'));
    this.allowanceAmountFeesTextDisplayPounds = element(by.xpath('(//span[contains(text(),"Allowance Dollar Amount")]/../span)[4]'));
    
    this.allowanceAmountPercentTextDisplayDollars = element(by.xpath('(//span[contains(text(),"Allowance Percent Amount")]/../span)[2]'));
    this.allowanceAmountPercentTextDisplayEuros = element(by.xpath('(//span[contains(text(),"Allowance Percent Amount")]/../span)[3]'));
    this.allowanceAmountPercentTextDisplayPounds = element(by.xpath('(//span[contains(text(),"Allowance Percent Amount")]/../span)[4]'));
    
    this.chargeAmountFeesTextDisplayDollars = element(by.xpath('(//span[contains(text(),"Charge Dollar Amount")]/../span)[2]'));
    this.chargeAmountFeesTextDisplayEuros = element(by.xpath('(//span[contains(text(),"Charge Dollar Amount")]/../span)[3]'));
    this.chargeAmountFeesTextDisplayPounds = element(by.xpath('(//span[contains(text(),"Charge Dollar Amount")]/../span)[4]'));
    
    this.chargeAmountPercentTextDisplayDollars = element(by.xpath('(//span[contains(text(),"Charge Percent Amount")]/../span)[2]'));
    this.chargeAmountPercentTextDisplayEuros = element(by.xpath('(//span[contains(text(),"Charge Percent Amount")]/../span)[3]'));
    this.chargeAmountPercentTextDisplayPounds = element(by.xpath('(//span[contains(text(),"Charge Percent Amount")]/../span)[4]'));
    
    this.serviceAmountFeesTextDisplayDollars = element(by.xpath('(//span[contains(text(),"Service Dollar Amount")]/../span)[2]'));
    this.serviceAmountFeesTextDisplayEuros = element(by.xpath('(//span[contains(text(),"Service Dollar Amount")]/../span)[3]'));
    this.serviceAmountFeesTextDisplayPounds = element(by.xpath('(//span[contains(text(),"Service Dollar Amount")]/../span)[4]'));
    
    this.serviceAmountPercentTextDisplayDollars = element(by.xpath('(//span[contains(text(),"Service Percent Amount")]/../span)[2]'));
    this.serviceAmountPercentTextDisplayEuros = element(by.xpath('(//span[contains(text(),"Service Percent Amount")]/../span)[3]'));
    this.serviceAmountPercentTextDisplayPounds = element(by.xpath('(//span[contains(text(),"Service Percent Amount")]/../span)[4]'));

    this.lineItemTotalTextDisplay = element(by.xpath('((//div[@class="en-collection-row"])[1]/div)[8]'));


    this.TotalTextDisplayDollars = element(by.xpath('((//span/strong[contains(text(),"Total")])[1]/../../span)[2]/strong'));   
    this.TotalTextDisplayEuros = element(by.xpath('((//span/strong[contains(text(),"Total")])[2]/../../span)[2]/strong'));
    this.TotalTextDisplayPounds = element(by.xpath('((//span/strong[contains(text(),"Total")])[3]/../../span)[2]/strong'));
   

    this.lineItemGearIcon = element(by.xpath('((//div[@class="en-collection-row"])[1]/div)[1]/en-actions/button'));
    this.lineItemEditFromGearIcon  = element(by.xpath('//button/span[text()="View Line Item"]/parent::button'));


    this.updateLineItemPriceTextBox = element(by.xpath('//input[(@name="priceLine")]'));
    this.updateLineItemQtyTextBox = element(by.xpath('//input[(@name="qtyLine")]'));
    this.updateLineItemDiscountTextBox = element(by.xpath('//input[(@name="itemUnitDiscount")]'));
    this.updateLineItemButton = element(by.xpath('//button/span[text()="Update Line Item"]/parent::button'));


    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.selectLineItem = function(lineCount) {
        temp = "((//div[@class='en-collection-row'])[" + lineCount + "]/div)[1]";
        return element(by.xpath(temp)).click();
    }

    this.editLineItem = function() {
        return this.lineItemEditFromGearIcon.click();
    }


    this.updateLineItemPrice = function(updateLineItemPriceValue) {
        this.updateLineItemPriceTextBox.clear();
        return this.updateLineItemPriceTextBox.sendKeys(updateLineItemPriceValue);
    }

    this.updateLineItemQty = function(updateLineItemQtyValue) {
        this.updateLineItemQtyTextBox.clear();
        return this.updateLineItemQtyTextBox.sendKeys(updateLineItemQtyValue);
    }

    this.updateLineItemDiscount = function(updateLineItemDiscountValue) {
        this.updateLineItemDiscountTextBox.clear();
        return this.updateLineItemDiscountTextBox.sendKeys(updateLineItemDiscountValue);
    }

    this.updateLineItem = function() {
        return this.updateLineItemButton.click();
    }

 
    this.selectLineItemGear = function() {
        return this.lineItemGearIcon.click();
    }
 
    this.selectLineItemEdit = function() {
        return this.this.lineItemEditFromGearIcon.click();
    }


    this.getSubTotalDollars = function() {
        return this.subTotalTextDisplayDollars.getText();
    }

    this.getSubTotalEuros = function() {
        return this.subTotalTextDisplayEuros.getText();
    }

    this.getSubTotalPounds = function() {
        return this.subTotalTextDisplayPounds.getText();
    }
 
    this.getTotalDollars = function() {
        return this.TotalTextDisplayDollars.getText();
    }   


    this.getTotalEuros = function() {
        return this.TotalTextDisplayEuros.getText();
    }  

    this.getTotalPounds = function() {
        return this.TotalTextDisplayPounds.getText();
    }  

    this.getLineItemTotal = function(lineCount) {
        temp = "((//div[@class='en-collection-row'])[" + lineCount + "]/div)[8]";
        return element(by.xpath(temp)).getText();
    } 

    
    this.allowanceAmountFeesDollars = function() {
        return this.allowanceAmountFeesTextDisplayDollars.getText();
    }

    this.allowanceAmountFeesEuros = function() {
        return this.allowanceAmountFeesTextDisplayEuros.getText();
    }

    this.allowanceAmountFeesPounds = function() {
        return this.allowanceAmountFeesTextDisplayPounds.getText();
    }

    this.allowanceAmountPercentageDollars = function() {
        return this.allowanceAmountPercentTextDisplayDollars.getText();
    }

    this.allowanceAmountPercentageEuros = function() {
        return this.allowanceAmountPercentTextDisplayEuros.getText();
    }
    
    this.allowanceAmountPercentagePounds = function() {
        return this.allowanceAmountPercentTextDisplayPounds.getText();
    }

    this.chargeAmountFeesDollars = function() {
        return this.chargeAmountFeesTextDisplayDollars.getText();
    }

    this.chargeAmountFeesEuros = function() {
        return this.chargeAmountFeesTextDisplayEuros.getText();
    }

    this.chargeAmountFeesPounds = function() {
        return this.chargeAmountFeesTextDisplayPounds.getText();
    }

    this.chargeAmountPercentageDollars = function() {
        return this.chargeAmountPercentTextDisplayDollars.getText();
    }

    this.chargeAmountPercentageEuros = function() {
        return this.chargeAmountPercentTextDisplayEuros.getText();
    }
    
    this.chargeAmountPercentagePounds = function() {
        return this.chargeAmountPercentTextDisplayPounds.getText();
    }


    this.serviceAmountFeesDollars = function() {
        return this.serviceAmountFeesTextDisplayDollars.getText();
    }

    this.serviceAmountFeesEuros = function() {
        return this.serviceAmountFeesTextDisplayEuros.getText();
    }

    this.serviceAmountFeesPounds = function() {
        return this.serviceAmountFeesTextDisplayPounds.getText();
    }

    this.serviceAmountPercentageDollars = function() {
        return this.serviceAmountPercentTextDisplayDollars.getText();
    }

    this.serviceAmountPercentageEuros = function() {
        return this.serviceAmountPercentTextDisplayEuros.getText();
    }
    
    this.serviceAmountPercentagePounds = function() {
        return this.serviceAmountPercentTextDisplayPounds.getText();
    }










    this.editVendor = function() {
        return this.editPOVendorSectionButton.click();
    }

    this.editCurrency = function() {
        return this.editPOCurrencySectionButton.click();
    }

    this.editCarrier = function() {
        return this.editPOCarrierSectionButton.click();
    }


    this.changeSellerCurrency = function(currencyValue) {
        commons.selectOption(this.sellerCurrencyDropDown,currencyValue);
    }

    this.changeExchangeRate = function(exchangeRateValue) {
        return this.exchangeRateTextEntryBox.sendKeys(exchangeRateValue);
    }

    this.goToSAC = function() {
        return this.SACTab.click();
    }

    this.newSAC = function() {
        return this.SACNewButton.click();
    }

    this.chargeType = function(chargeTypeValue) {
        commons.selectOption(this.chargeTypeDropDown,chargeTypeValue);
    }

    this.chargeName = function(chargeNameValue) {
        return this.allowanceNameTextEntryBox.sendKeys(chargeNameValue);
    }

    this.chargeKind = function(chargeKindValue) {
        commons.selectOption(this.chargeKindDropDown,chargeKindValue);
    }

    this.chargeAmount = function(chargeAmountValue) {
        this.chargeAmountTextEntryBox.clear();
        return this.chargeAmountTextEntryBox.sendKeys(chargeAmountValue);
    }

    this.chargePercentage = function(chargePercentageValue) {
        return this.chargePercentageTextEntryBox.sendKeys(chargePercentageValue);
    }

    this.createSAC = function() {
        return this.createSACButton.click();
    }


    this.saveVendor = function() {
        return this.savePOVendorSectionButton.click();
    }

    this.saveCurrency = function() {
        return this.savePOCurrencySectionButton.click();
    }

    this.saveCarrier = function() {
        return this.savePOCarrierSectionButton.click();
    }
 
}

