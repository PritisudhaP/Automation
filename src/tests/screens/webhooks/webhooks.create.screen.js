module.exports =function(){

    this.newWebhooksButton = element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.webhooksEventSelectionDropdown = element(by.xpath('//select[@name="event"]'));
    this.webhooksMediaTypeDropdown = element(by.xpath('//select[@name="mediaType"]'));
    
    this.webhooksUrlEntryTextBox = element(by.xpath('//input[@name="primaryUrl"]'));
    this.webhooksMethodDropdown = element(by.xpath('//select[@name="primaryHttpMethod"]'));
    
    this.webhooksRetryEntryTextBox = element(by.xpath('//input[@name="retry"]'));
    this.webhooksRetryTimeEntryTextBox = element(by.xpath('//input[@name="retryDelayMillis"]'));
    this.webhooksEnableFailoverCheckbox = element(by.xpath('//label[contains(text(),"Enable Failover?")]/input'));
    this.webhooksEnableWebhooksCheckbox = element(by.xpath('//label[contains(text(),"Enable Web Hook?")]/input'));

    this.webhooksFailoverUrlEntryTextBox = element(by.xpath('//input[@name="failureUrl"]'));
    this.webhooksFailoverMethodDropdown = element(by.xpath('//select[@name="failureHttpMethod"]'));

    this.webhooksFailureMailBoxNameTextBox = element(by.xpath('//input[@name="failureMailboxRefName"]'));
    this.webhooksMessageSubjectTextBox = element(by.xpath('//input[@name="failureMailboxEntrySubject"]'));
                      

    this.webhooksMessgaeContentsTextBox = element(by.xpath('//textarea[@name="failureMailboxEntryMsg"]'));

    
    
    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.newWebhooks = function() {
        return this.newWebhooksButton.click();
    }

    this.selectEvent = function(event) {
        commons.selectOption(this.webhooksEventSelectionDropdown,event);
    }

    this.selectDatadomain = function(dataDomain) {
        temp = "//label[contains(text(),'Data Domains')]/../select/option[contains(text(),'" + dataDomain + "')]";
        return element(by.xpath(temp)).click();
    }

    this.selectFormat = function(format) {
        commons.selectOption(this.webhooksMediaTypeDropdown,format);
    }

    this.enterUrl = function(url) {
        return this.webhooksUrlEntryTextBox.sendKeys(url);
    }

    this.selectMethod = function(method) {
        commons.selectOption(this.webhooksMethodDropdown,method);
    }


    this.enterRetryCount = function(retryCount) {
        return this.webhooksRetryEntryTextBox.sendKeys(retryCount);
    }

    this.enterRetryTime = function(time) {
        return this.webhooksRetryTimeEntryTextBox.sendKeys(time);
    }


    this.enableFailover = function() {
        return this.webhooksEnableFailoverCheckbox.click();
    }

    this.enableWebhook = function() {
        return this.webhooksEnableWebhooksCheckbox.click();
    }


    this.enterFailoverUrl = function(failoverUrl) {
        return this.webhooksFailoverUrlEntryTextBox.sendKeys(failoverUrl);
    }

    this.selectFailoverMethod = function(failoverMethod) {
        commons.selectOption(this.webhooksFailoverMethodDropdown,failoverMethod); 
    }

    this.saveWebhooks = function() {
        return this.saveButton.click();
    }

    // new mandatory fields 
    //Author- Pritisudha 03/09/2018

    this.enterFailureMailBoxName = function(mailboxname) {
        return this.webhooksFailureMailBoxNameTextBox.sendKeys(mailboxname);
    }
    this.enterMessageSubject = function(subject) {
        return this.webhooksMessageSubjectTextBox.sendKeys(subject);
    }
    this.enterMessageContent = function(contents) {
        return this.webhooksMessgaeContentsTextBox.sendKeys(contents);
    }
}

