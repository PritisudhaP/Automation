module.exports =function(){

    this.returnExpectedReceiptOption = element(by.xpath('//div[contains(@en-tap,"showModal")]/div/en-actions/button'));
    this.inventoryPoolDropdown = element(by.xpath('//select[@name="pool"]'));
    this.inventoryReceiveButton = element(by.xpath('//button[contains(text(),"Receive")]'));

    this.saveReturnsButton = element(by.xpath('//button[contains(text(), "Save")]'));


    var common = require(process.cwd() + '/src/tests/screens/commons.js');
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

}

