module.exports =function(){

    this.addDirectoryButton= element(by.xpath('//button/span[contains(text(),"Add Directory")]/parent::button'));
    this.addFilesButton= element(by.xpath('//button/span[contains(text(),"Add Files")]/parent::button'));
    this.directoryNameEntryTextBox= element(by.xpath('//input[@name="name"]'));
    this.createButton= element(by.xpath('//button[contains(text(),"Create")]'));

    this.selectFilesButton = element(by.xpath('//button/span[contains(text(),"Select Files")]/parent::button'));
    this.selectedFileText = element(by.xpath('//span[@ng-bind="file.name"]'));
    this.uploadButton = element(by.xpath('//button/span[contains(text(),"Upload Files")]/parent::button'));
    this.closeButton = element(by.xpath('//button/span[contains(text(),"Close")]/parent::button'));

    this.alertText = element(by.xpath('//div[@ng-bind-html="message.text"]'));

    ////div[contains(text(), "A1")]/../div[2]

    this.renameTextEntryBox = element(by.xpath('//input[@ng-model="data[0].name"]'));

    this.fileViewIcon = element(by.xpath('//button/en-icon[@icon="eye-visible"]/parent::button'));
    this.fileDownloadIcon = element(by.xpath('//a/en-icon[@icon="download"]/parent::a'));
    this.fileViewOnScreenIcon = element(by.xpath('//a/en-icon[@icon="new-window"]/parent::a'));
    this.fileEditContentTypeButton = element(by.xpath('//button/en-icon[@icon="edit"]/parent::button'));
    this.fileContentTypeDropDown = element(by.xpath('//select[@name="contentType"]'));
    this.fileContentTypeSaveButton = element(by.xpath('//button/en-icon[@icon="floppy"]/parent::button'));

    this.saveButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));
    this.fileShareCollapse =  element(by.xpath('//en-collapse-trigger'));
    this.linkExpiryTextEntryBox = element(by.xpath('//input[@ng-model="sharedLink.expireDays"]'));
    this.limitDownloadYesRadioButton = element(by.xpath('//label/input[@name="downloadFlag" and @value="true"]'));

    this.remainingDownloadsTextEntryBox = element(by.xpath('//input[@ng-model="sharedLink.remainingNumDownloads"]'));
    this.createButton = element(by.xpath('//button[contains(text(),"Create")]'));
    this.linkIdTextBox = element(by.xpath('//input[@ng-model="item.id"]'));

    this.linkTextArea = element(by.xpath('(//textarea)[1]'));

    this.refreshScreenButton = element(by.xpath('//button/en-icon[@icon="refresh"]/parent::button'));


    this.filesSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.filesSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.filesSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));


    this.filesSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.filesDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));
        this.countText = element(by.xpath("//i[@class='ng-binding']"));
        this.checkboxSelect= element(by.xpath("//input[@type='checkbox']"));


    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.filesSearch = function(criteria,filesSearchValue){
/*        commons.selectOption(this.filesSearchCriteriaDropdown,criteria);
        this.filesSearchTextbox.clear();
//        this.filesSearchTextbox.sendKeys(filesSearchValue);


        for (var i = 0, len = filesSearchValue.length; i < len; i++) {
            this.filesSearchTextbox.sendKeys(filesSearchValue[i]);
            browser.sleep(100);
        }



        return this.filesSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = filesSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(filesSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }


    this.addDirectory = function() {
        return this.addDirectoryButton.click();
    }

    this.enterDirectoryName = function(dirName) {
	return this.directoryNameEntryTextBox.sendKeys(dirName);
    }

    this.createDirectory = function() {
	return this.createButton.click();
    }

    this.addFile = function() {
	return this.addFilesButton.click();
    }


    this.clickSelectFile = function(fullFileName) {
        var path = require('path');
        var absolutePath = path.resolve(__dirname, fullFileName);

        var fileElem = element(by.css('input[type="file"]'));
        browser.executeScript( "arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px'; arguments[0].style.opacity = 1",
		  fileElem.getWebElement());

        fileElem.sendKeys(absolutePath);
        browser.sleep(1000);

    }

    this.uploadFile = function() {
        return this.uploadButton.click();
    }

    this.close = function() {
        return this.closeButton.click();
    }

    this.select = function(name) {
        file = "//div/span[contains(text(), '" + name + "')]/parent::div";
        // file = "//div[contains(text(), '" + name + "')]";
        return element(by.xpath(file)).click();
    }

    this.filesGearSelect = function(name, selectOption, additionalValue){
        gearIcon = "//div/span[contains(text(), '" + name + "')]/../../div[2]";
        browser.sleep(3000);
        element(by.xpath(gearIcon)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        browser.sleep(3000);
        switch(selectOption) {
            case "Copy":
	         element(by.xpath(temp)).click();
                 temp2 = "(//span[contains(text(), '" + additionalValue + "')])[2]";
                 browser.sleep(2000);
                 element(by.xpath(temp2)).click();
                 element(by.xpath(temp2)).click();
                 browser.sleep(2000);
		 element(by.xpath("(" + temp + ")[1]")).click();
                 break;
            case "Move":
                 element(by.xpath(temp)).click();
	         temp2 = "(//span[contains(text(), '" + additionalValue + "')])[3]";
                 browser.sleep(2000);
                 element(by.xpath(temp2)).click();
                 element(by.xpath(temp2)).click();
                 browser.sleep(2000);
                 element(by.xpath("(" + temp + ")[1]")).click();
                 break;
            case "Rename":
                 element(by.xpath(temp)).click();
                 browser.sleep(2000);
                 this.renameTextEntryBox.sendKeys(additionalValue);
                 browser.sleep(2000);
                 element(by.xpath("(" + temp + ")[2]")).click();
                 break;
            case "Delete":
                 element(by.xpath(temp)).click();
                 browser.sleep(2000);
                 element(by.xpath("(" + temp + ")[2]")).click();
                 break;
        }
    }

    this.filesSelect = function(name){
        selectCheckbox = "//div/span[contains(text(), '" + name + "')]/../../div[1]";
        return element(by.xpath(selectCheckbox)).click();
    }

    this.mainGearSelect = function(selectOption, additionalValue) {
        mainGearIcon = "//div[@class='en-collection-header']/div/div/div/en-actions/button";
        element(by.xpath(mainGearIcon)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";

        switch(selectOption) {
            case "Copy":
                element(by.xpath(temp)).click();
                temp2 = "(//span[contains(text(), '" + additionalValue + "')])[2]";
                browser.sleep(1000);
                element(by.xpath(temp2)).click();
                browser.sleep(1000);
                element(by.xpath("(" + temp + ")[3]")).click();
                break;
            case "Move":
                element(by.xpath(temp)).click();
                temp2 = "(//span[contains(text(), '" + additionalValue + "')])[3]";
                browser.sleep(1000);
                element(by.xpath(temp2)).click();
                browser.sleep(1000);
                element(by.xpath("(" + temp + ")[3]")).click();
                break;
            case "Delete":
                element(by.xpath(temp)).click();
                browser.sleep(2000);
                element(by.xpath("(" + temp + ")[2]")).click();
                break;
        }
    }

    this.alertValue = function() {
        browser.ignoreSynchronization = true;
        return this.alertText.getText();
    }

    this.fileView = function() {
        return this.fileViewIcon.click();
    }

    this.fileDownload = function() {
        return this.fileDownloadIcon.click();
    }

    this.fileViewOnScreen = function() {
        return this.fileViewOnScreenIcon.click();
    }

    this.save = function() {
        return this.saveButton.click();
    }

    this.editContentType = function() {
        return this.fileEditContentTypeButton.click();
    }

    this.setContentType = function(value) {
        commons.selectOption(this.fileContentTypeDropDown,value);
    }

    this.saveContentType = function() {
        return this.fileContentTypeSaveButton.click();
    }

    this.fileShare = function() {
        return this.fileShareCollapse.click();
    }

    this.linkExpiryEntry = function(value) {
        return this.linkExpiryTextEntryBox.sendKeys(value);
    }

    this.limitDownload = function() {
        return this.limitDownloadYesRadioButton.click();
    }

    this.remainingDownloads = function(value) {
        return this.remainingDownloadsTextEntryBox.sendKeys("1");
    }

    this.createSharedLink = function() {
        return this.createButton.click();
    }

    this.clickLinkId = function() {
        return this.linkIdTextBox.click();
    }

    this.getLinkId = function() {
        return this.linkTextArea.getText();
    }

    this.refreshScreen = function() {
        return this.refreshScreenButton.click();
    }

    this.getName = function(name) {
            fileName = "//span[contains(text(), '" + name + "')]";
            //span[contains(text(),'sarath/priti.py')]
            // file = "//div[contains(text(), '" + name + "')]";
            return element(by.xpath(fileName)).getText();
        }
          this.countFromFolder = function()
            {
            return  this.countText.getText();
            }

           this.clickCheckBox= function()
           {
            return this.checkboxSelect.click();
           }


}

