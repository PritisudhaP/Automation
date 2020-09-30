module.exports =function(){

    this.expectedReceiptGearIcon = element(by.xpath('//button/en-icon[@icon="gear"]/parent::button'));
    this.inventoryPoolDropdown = element(by.xpath('//select[@name="pool"]'));
    this.inventoryReceiveButton = element(by.xpath('//button[contains(text(),"Receive")]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.expectedReceiptSelectOption = function(selectOption,pool) {
        this.expectedReceiptGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        browser.sleep(2000);
        element(by.xpath(temp)).click();
        
        if (selectOption == "Receive Inventory") {
            this.inventoryPoolDropdown.sendKeys(pool);
            browser.sleep(2000);
            this.inventoryReceiveButton.click();
        }
    }

}

