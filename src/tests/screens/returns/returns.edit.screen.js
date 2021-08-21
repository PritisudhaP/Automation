module.exports =function(){

    this.returnExpectedReceiptOption = element(by.xpath('//div[contains(@en-tap,"showModal")]/div/en-actions/button'));
    this.inventoryPoolDropdown = element(by.xpath('//select[@name="pool"]'));
    this.inventoryReceiveButton = element(by.xpath('//button[contains(text(),"Receive")]'));

    this.saveReturnsButton = element(by.xpath("(//button[@class='button button-primary en-button ng-scope'])[1]"));
   
    //added by vishak 
        
    this.saveReleaseButton = element(by.xpath("//button/span[contains(text(),'Save & Release')]/parent::button"));
    this.selectRMALine = element(by.xpath("//input[@id='fVHIzATqxEBgPYiMUxfPrWMsjPIXVnfw_checkbox_0_0']"));
    this.selectLine = element(by.xpath('//div/div/div/div[@class="en-collection-row"]'));
    this.returnInvPool = element(by.model("expectedReceipt.data.receivingInventoryPool"));
    this.itemReceivedButton = element(by.xpath('//button[@submitname="receiveBtn"]'));
    this.settingsIcon = element(by.xpath('//en-actions[@class="en-actions"]'));
    this.deleteButton = element(by.xpath('//en-icon[@icon="trash"]/parent::button'));
    this.confirmDelete = element(by.xpath(' //button[@en-tap="deleteReturn.delete()"]'));
    this.FRDispositionStatus = element(by.xpath('//tbody[@ng-init="dispositions=getArrayValue();"]'));
    this.FRReturnsShippedQTYCount = element(by.xpath('(//div[@class="ng-binding"])[3]'));
    this.FRReturnsDispositionQTYCount = element(by.xpath('(//div[@class="ng-binding"])[4]'));
    this.unitPrinceEdit = element(by.xpath('//en-icon[@icon="edit"]'));
    this.updateUnitPrice = element(by.model('item.itemUnitPrice'));
    this.alert = element(by.xpath('//div/div/div[@class="growl-item alert ng-scope alert-error alert-danger icon alert-dismissable"]'));
    
//    var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.returnExpectedReceiptSelectOption = function(selectOption,pool) {
        this.returnExpectedReceiptOption.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        browser.sleep(2000);
        element(by.xpath(temp)).click();
        
        if (selectOption == "Receive Inventory") {
            this.inventoryPoolDropdown.sendKeys(pool);
            browser.sleep(2000);
            this.inventoryReceiveButton.click();
        }
    }

    this.saveReturns = function() {
        return this.saveReturnsButton.click();
    }

    this.saveAndReleaseReturns = function() {
    	
    	return this.saveReleaseButton.click();
    }
    
    this.selectRMALineCheckboxForReceive = function() {
    	this.selectRMALine.click();
    	
    }
    this.selectRMALineClickForReceive = function() {
    	
    	return this.selectLine.click();
    	
    }
    
    this.selectInvPool = function(pool) {
    	
    	this.returnInvPool.sendKeys(pool);
    }
    
    this.itemReceive = function(){
    	
    	return this.itemReceivedButton.click();
    }
    
    this.settingsIconClick = function() {
    	
    	this.settingsIcon.click();
    }
    
    this.deleteButtonClick = function(){
    	
    	this.deleteButton.click();
    }
    
    this.confirmDeleteButtonClick = function() {
    	browser.sleep(1000);
    	return this.confirmDelete.click();
    }
    
    this.FRDispositionAvailability = function() {
    	
    	return this.FRDispositionStatus.isDisplayed();
    } 
    this.FRReturnsShippedQTY = function() {
    	browser.sleep(3000);
    	return this.FRReturnsShippedQTYCount.getText();
    }
    this.FRReturnsDispositionQTY = function() {
    	browser.sleep(2000);
    	return this.FRReturnsDispositionQTYCount.getText();
    }
    
    this.amtFromdispositionDetails = function (amountType) {
        if (amountType == "Discount") {
            return element(by.xpath('//span[contains(text(),"Discount")]/following-sibling::span/strong')).getText();
        } 
        
        else if (amountType == "Discount Price:") {
            return element(by.xpath('(//p/span[@class="text-right ng-binding"])[1]')).getText();
        }
        else if (amountType == "Unit Price") {
            return element(by.xpath('//span/span[@class="text-right ng-binding"]')).getText();
        }else if (amountType == "Tax"){
            return element(by.xpath("//span[contains(text(),'Tax')]/following-sibling::strong")).getText(); 
        }
        else if (amountType == "Discount:"){
            return element(by.xpath("(//small[contains(text(),'Discount:')]/following-sibling::strong)")).getText(); 
        }
    }
    
    this.unitPriceUpateinPaymentdisposition = function(value){
    	this.unitPrinceEdit.click();
    	browser.sleep(1000);
    	this.updateUnitPrice.clear();
    	browser.sleep(1000);
    	this.updateUnitPrice.sendKeys(value);
    	
    }
    
    this.AlertPresence = function(){
    	
    	return this.alert.isPresent();
    	
    }
}

