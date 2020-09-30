module.exports =function() {

    this.nameTextBox = element(by.xpath("//input[@name='displayName']"));
    this.activeConfigCheckBox = element(by.xpath("//input[@name='active']"));
    this.descTextBox = element(by.xpath("//textarea[@name='shortdesc']"));
    this.tagTextBox = element(by.xpath("//input[@ng-model='newTag.text']"));
    this.selectPublishMode = element(by.xpath("//select[@name=\"publishMode\"]"));
    this.selectSummaryLevel = element(by.xpath("//select[@name='summaryLevel']"));
    this.chooseOrganisationButton = element(by.xpath("//span[contains(text(),'Choose Organizations')]"));
    this.selectOrganisationTextBox = element(by.xpath("//input[@placeHolder='selectorganisation']"));
    this.OrganisationCheckBox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));
    this.cancelButton = element(by.xpath("//en-modal-footer//button[1]"));
    this.selectOrganisationButton = element(by.xpath("//span[contains(text(),'Select Organizations')]"));
    this.excludezeroInventoryCheckBox = element(by.xpath("//input[@name='excludeZeroInventory']"));
    this.excludeInactiveItemsCheckBox = element(by.xpath("//input[@name='excludeInactiveItems']"));
    this.selectPublishMailBox = element(by.xpath("//select[@name='publishMailbox']"));
    this.scheduleCheckBox = element(by.xpath("//input[@name='scheduled']"));
    this.selectschedule =element(by.xpath("//select[@name='trigger']"));
    this.saveButton = element(by.xpath("//div[@class='panel-secondary panel-borderless-header']//button[@type='submit'][contains(text(),'Save')]"));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.enterName = function (name) {
        return this.nameTextBox.sendKeys(name);
    }

    this.clickactivecheckbox = function () {
        return this.activeConfigCheckBox.click();

    }


    this.setPublishMode = function (modename) {
        this.selectPublishMode.click();
        commons.selectOption(this.selectPublishMode, modename);
        this.selectPublishMode.click();
    }

    this.setSummaryLevel = function (summarylevel) {
        this.selectSummaryLevel.click();
        commons.selectOption(this.selectSummaryLevel, summarylevel);
            this.selectSummaryLevel.click();
    }

    this.clickChooseOrganisation = function () {
        return this.chooseOrganisationButton.click();
    }

    this.searchOrganisation = function (organisationName) {

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = organisationName.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(organisationName[i]);
            browser.sleep(100);
        }
        browser.sleep(2000);
    }

    this.selectOrganisation = function()
    {
        this.OrganisationCheckBox.click();
    }
    this.addOrganisation = function()
    {
        this.selectOrganisationButton.click();
    }

    this.selectMailBox =function(mailboxname)
    {
        this.selectPublishMailBox.click();
        commons.selectOption(this.selectPublishMailBox, mailboxname);
        this.selectPublishMailBox.click();
    }

    this.clickSchedule = function()
    {
        this.scheduleCheckBox.click();
        browser.sleep(200);
    }
    this.setSchedule = function(triggername)
    {
        this.selectschedule.click();
        commons.selectOption(this.selectschedule,triggername);
        this.selectschedule.click();
    }
    this.clickSave = function()
    {
        this.saveButton.click();
    }
    this.clickexcludezeroInventory =function()
    {
       this.excludezeroInventoryCheckBox.click();
    }
    this.clickexcludeInactiveItem = function()
    {
        this.excludeInactiveItemsCheckBox.click();
    }
}
