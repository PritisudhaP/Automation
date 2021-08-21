module.exports =function(){

    this.newMailboxButton= element(by.xpath('//en-title[contains(text(),"Other Mailboxes")]/button/en-icon[@icon="plus-circle"]/parent::button'));
    this.mailboxEditButton = element(by.xpath('//en-title[contains(text(),"Other Mailboxes")]/button/en-icon[@icon="edit"]/parent::button'));

    this.mailboxNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.mailboxRefnameEntryTextBox= element(by.xpath('//input[@name="refName"]'));
    this.mailboxTypeDropDown=element(by.xpath('//select[@name="mailboxRole"]'));
    this.mailboxPinCheckbox= element(by.xpath('//label/input[@name="pinned"]'));
    this.mailboxBlobStoreAccessorDropdown = element(by.xpath('//select[@name="blobstore"]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Create")]'));

    this.createMailboxRuleMsgButton = element(by.xpath('//button/en-icon[@icon="gears"]/parent::button'));
    this.createMailboxMsgMenu = element(by.xpath('//span[contains(text(),"New Message")]/parent::button'));

    this.newMessageToEntryTextBox = element(by.xpath('//input[@name="toUserId"]'));
    this.newMessageFromEntryTextBox = element(by.xpath('//input[@name="fromUserId"]'));
    this.newMessageSubjectEntryTextBox = element(by.xpath('//input[@name="subject"]'));

    this.addFilesButton= element(by.xpath('//button/span[contains(text(),"Add Files")]/parent::button'));
    this.selectedFileText = element(by.xpath('//span[@ng-bind="attachment.name"]'));
    this.uploadButton = element(by.xpath('//button/span[contains(text(),"Upload & Send")]/parent::button'));
    this.closeButton = element(by.xpath('//button/span[contains(text(),"Done")]/parent::button'));

    this.backButton = element(by.xpath('//button/span[contains(text(),"Back")]/parent::button'));

    this.msgSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.mutiselectCheckbox = element(by.xpath('//div[@class="en-collection-header"]/div/div[1]'));
    this.multiselectGearIcon = element(by.xpath('//div[@class="en-collection-header"]/div/div[2]'));

    this.fileViewIcon = element(by.xpath('//button/en-icon[@icon="eye"]/parent::button'));
    this.fileDownloadIcon = element(by.xpath('//a/en-icon[@icon="download"]/parent::a'));
    this.fileContentOnScreenIcon = element(by.xpath('(//div[@class="ace_line"])[1]'));

     this.fileContentallOnScreenIcon = element.all(by.xpath('(//div[@class="ace_line"])'));

    this.refreshIcon = element(by.xpath('//button/en-icon[@icon="refresh"]/parent::button'));

    //added by priti for control cenetr
    this.fullcontent = element(by.xpath("//span[@class='leaf-value ng-binding ng-scope']"));


    //var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/screens/commons.js');
    //var global = require(process.cwd() + '/screens/global.js');
    var commons = new common();
    //var waitUtil = new global();


    this.newmailbox = function() {
        return this.newMailboxButton.click();
    }

    this.mailboxEdit = function() {
        return this.mailboxEditButton.click();
    }

    this.mailboxDelete = function(mailboxName) {
        temp = "//div[contains(text(),'" + mailboxName + "')]/../../div/en-icon[@icon='trash']";
        element(by.xpath(temp)).click();
        browser.sleep(1000);
        element(by.xpath('//button/span[contains(text(), "Delete")]/parent::button')).click();
    }

    this.enterMailboxName = function(mailboxName) {
        return this.mailboxNameEntryTextBox.sendKeys(mailboxName);
    }

    this.enterMailboxRefName = function(refName) {
        return this.mailboxRefnameEntryTextBox.sendKeys(refName);
    }


    this.enterMailboxType = function(mailboxType) {
        commons.selectOption(this.mailboxTypeDropDown,mailboxType);
    }

    this.pinMailbox = function() {
        return this.mailboxPinCheckbox.click();
    }

    this.enterMailboxBlobStoreAccessor = function(blobStoreAccessor) {
        commons.selectOption(this.mailboxBlobStoreAccessorDropdown,blobStoreAccessor);
    }

    this.createMailbox = function() {
        return this.saveButton.click();
    }

    this.selectMailboxType = function(type) {
    //changed by Priti
    // temp = "(//en-tab[@pane='" + type + "'])[2]";

        temp = "//en-tab[@pane='" + type + "']";
        return element(by.xpath(temp)).click();
    }

    this.searchMailboxWithinType = function (type, name) {
        temp = "//en-collection-search[@object='" + type + "']/form/en-control/en-field/en-input/input";
        element(by.xpath(temp)).clear();
        element(by.xpath(temp)).sendKeys(name);

        temp = "//en-collection-search[@object='" + type + "']/form/en-control/en-field/button";
        return element(by.xpath(temp)).click();
    }

    this.selectMailbox = function(name) {
        temp = "(//div[contains(text(),'" + name + "')])[1]";
        return element(by.xpath(temp)).click();
    }

    this.addNew = function() {
        return this.createMailboxRuleMsgButton.click();
    }

    this.addNewMsg = function() {
//        return this.createMailboxMsgMenu.click();
          element(by.xpath('//span[contains(text(),"New Message")]/parent::button')).click();
    }

    this.enterTo = function(to) {
        return this.newMessageToEntryTextBox.sendKeys(to);
    }

    this.enterFrom = function(from) {
        return this.newMessageFromEntryTextBox.sendKeys(from);
    }

    this.enterSubject = function(subject) {
        return this.newMessageSubjectEntryTextBox.sendKeys(subject);
    }

    this.addAttachment = function() {
        return this.addFilesButton.click();
    }

    this.clickSelectFile = function(fullFileName) {

       // this.selectFilesButton.click();

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

    this.back = function() {
        return this.backButton.click();
    }

    this.msgSelectGear = function(selectOption){
        this.msgSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();
        else {
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            element(by.xpath(temp)).click();
            return element.all(by.xpath(temp)).get(1).click();
        }
    }



    this.multiselectMsgs = function() {
        return this.mutiselectCheckbox.click();
    }


    this.multiSelectGear = function(selectOption, additionalValue){
        this.multiselectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        this.transferSelectionDropdown = element(by.xpath('//select[@name="destination"]'));

        if (selectOption == "Move Selected") {
            element(by.xpath(temp)).click();
            commons.selectOption(this.transferSelectionDropdown,additionalValue);
            return element(by.xpath('//button[contains(text(),"Transfer")]')).click();

        }
        else {
            return element.all(by.xpath(temp)).get(0).click();
        }
    }



    this.fileView = function() {
        return this.fileViewIcon.click();
    }

    this.fileDownload = function() {
        return this.fileDownloadIcon.click();
    }

    this.fileContentOnScreen = function() {


        return this.fileContentOnScreenIcon.getText();

    }

    this.fileFullContentOnScreenIcon = function()
    {

      //  waitUtil.waitUntilReady(fileContentallOnScreenIcon);
        return this.fileContentallOnScreenIcon.getText();
    }

    this.refresh = function() {
        return this.refreshIcon.click();
    }


    this.mailboxSearch = function(criteria, mailboxSearchValue){
    /*        commons.selectOption(this.salesOrderSearchCriteriaDropdown,criteria);
            this.salesOrderSearchTextbox.clear();
    //        this.salesOrderSearchTextbox.sendKeys(salesOrderSearchValue);

        for (var i = 0, len = salesOrderSearchValue.length; i < len; i++) {
            this.salesOrderSearchTextbox.sendKeys(salesOrderSearchValue[i]);
            browser.sleep(100);
        }

        return this.salesOrderSearchButton.click();
    */

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = mailboxSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(mailboxSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.fullContentOfObject = function()
    {
           return this.fullcontent.getText();
    }





}

