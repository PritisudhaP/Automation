module.exports =function(){

    var purchaseOrderDefaultGearIconOption = "Release";
    var temp = "";

    this.purchaseOrderSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));

    this.purchaseOrderSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.purchaseOrderSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    this.purchaseOrderSearchCriteriaRemove = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));
    
    this.purchaseOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.purchaseOrderReleaseOrderFromGearIcon = element(by.xpath('//span/li/button/span[text()="Release"]/parent::button'));

    this.purchaseOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));
    this.purchaseOrderNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[4])[1]'));


    this.purchaseOrderViewLink = element(by.xpath('//div[@class="en-collection-row"]/div[3]'));

    this.purchaseOrderCSVExportButton = element(by.xpath('//button/en-icon[@icon="file-csv"]/parent::button'));
    this.purchaseOrderCSVExportFileNameEntryTextBox = element(by.xpath('//input[@name="filename"]'));
    this.purchaseOrderCSVExportDownloadButton = element(by.xpath('//button[contains(text(),"Download")]'));

    this.purchaseOrderSavePDFButton = element(by.xpath('//button/a[@title="Download pdf"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.purchaseOrderSearch = function(criteria, purchaseOrderSearchValue){
/*        commons.selectOption(this.purchaseOrderSearchCriteriaDropdown,criteria);
        this.purchaseOrderSearchTextbox.clear();
//        this.purchaseOrderSearchTextbox.sendKeys(purchaseOrderSearchValue);

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = purchaseOrderSearchValue.length; i < len; i++) {
            this.purchaseOrderSearchTextbox.sendKeys(purchaseOrderSearchValue[i]);
            browser.sleep(100);
        }



        return this.purchaseOrderSearchButton.click();
*/

        for (var i = 0, len = purchaseOrderSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(purchaseOrderSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.purchaseOrderSearchRemove = function(count) {
       temp = "(//button/en-icon[@icon='x-circle']/parent::button)[" + count +  "]";
       return element(by.xpath(temp)).click();
    }

    this.purchaseOrderSelectGear = function(selectOption){
        var defer = protractor.promise.defer();
        this.purchaseOrderSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
       
        if (selectOption == "Release") {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            element.all(by.xpath(temp)).get(1).click();
            defer.fulfill();
        } else {
            element(by.xpath(temp)).click();
            defer.fulfill();
        }
	return defer.promise;
    }

    this.purchaseOrderStatus = function() {
        return this.purchaseOrderStatusText.getText();
    }

    this.purchaseOrderNumber = function() {
	return this.purchaseOrderNumberText.getText();
    }
   
    this.purchaseOrderView = function() {
        return this.purchaseOrderViewLink.click();
    }

    this.purchaseOrderCSVExport = function() {
        return this.purchaseOrderCSVExportButton.click();
    }

    this.purchaseOrderCSVFileName = function(fileName) {
        this.purchaseOrderCSVExportFileNameEntryTextBox.clear();
        return this.purchaseOrderCSVExportFileNameEntryTextBox.sendKeys(fileName);
    }

    this.purchaseOrderCSVDownload = function() {
        return this.purchaseOrderCSVExportDownloadButton.click();
    }

    this.purchaseOrderSavePDF = function() {
        return this.purchaseOrderSavePDFButton.click();
    }
}

