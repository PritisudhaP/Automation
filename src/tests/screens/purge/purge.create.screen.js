module.exports =function(){

    this.addAssociationsButton = element(by.buttonText("Add Association"));

    this.saveAssociationsButton = element(by.buttonText("Save"));

    this.runAsDropDown = element(by.xpath('//select[@name="runAsId"]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.addAssociation = function(){
        console.log("In Add Associations button click");
        this.addAssociationsButton.click();
    };


    this.setRunAsUser = function(value) {
        commons.selectOption(this.runAsDropDown,value);
    }


    this.saveAssociation = function(){
        this.saveAssociationsButton.click();
    };

    this.createBtn = element(by.id("purgeCreateBtn"));
    this.create = function(){
        browser.driver.sleep(5000);
        this.createBtn.click();

    };

    this.fromMailbox = element(by.model('association.fromDataSource'));

    this.toMailbox = element(by.model('association.toDataSource'));

    this.setFromMailbox = function(fromMailbox){
        return this.fromMailbox.sendKeys(fromMailbox);
    };

    this.setToMailbox = function(toMailbox){
        return this.toMailbox.sendKeys(toMailbox);
    };

    /**
    *   displayName
    **/
    this.displayName = element(by.model('data.displayName'));

    this.setDisplayName = function(displayName){
        return this.displayName.sendKeys(displayName);
    }

    /**
    *   retention period
    **/

    this.retentionTimePeriod = element(by.model('data.retentionTime.timePeriod'));

    this.setRetentionTimePeriod = function(timePeriod){
        return this.retentionTimePeriod.sendKeys(timePeriod);
    }

    this.retentionTimePeriodScale = element(by.model('data.retentionTime.timePeriodScale'));

    this.setRetentionTimePeriodScale = function(timeScale){
        return this.retentionTimePeriodScale.sendKeys(timeScale);
    }

    /**
    *   Batch Size
    **/

    this.batchSize = element(by.model('purgePolicy.data.batchSize'));

    this.setBatchSize = function(batchSize){
        return this.batchSize.sendKeys(batchSize);
    }

    /**
    *   Trigger
    **/

    this.trigger = element(by.model('data.scheduledActionTrigger'));

    this.setTrigger = function(trigger){
        return this.trigger.sendKeys(trigger);
    }

    /**
    *   mailbox
    **/

    this.mailbox = element(by.model('data.selected.id'));

    this.setMailbox = function(mailbox){
        return this.mailbox.sendKeys(mailbox);
    }

    this.dataSourceTypeDropDown = element(by.xpath('//select[@name="moveTotype"]'));

    this.setDataSourceType = function(value){
        commons.selectOption(this.dataSourceTypeDropDown,value);
    }

    this.purgeActionDropDown = element(by.xpath('//select[@name="action"]'));

    this.setPurgeAction = function(value){
        commons.selectOption(this.purgeActionDropDown,value);

    }

    this.selectSourceFileLocation = function(value) {
        temp = "(//span[contains(text(), '" + value + "')])[1]";
        element(by.xpath(temp)).click();
    }

    this.selectDestFileLocation = function(value) {
        temp = "(//span[contains(text(), '" + value + "')])[2]";
        element(by.xpath(temp)).click();
    }


}
