module.exports =function(){

    this.displayName = element(by.model('trigger.data.displayName'));

    this.setDisplayName = function(displayname){
        return this.displayName.sendKeys(displayname);
    };

    this.step1NxtBtn = element(by.xpath('(//button/span[contains(text(),"Next")]/parent::button)[1]'));
    this.step1Nxt = function(){
        this.step1NxtBtn.click();

    };

    this.step2NxtBtn = element(by.xpath('(//button/span[contains(text(),"Next")]/parent::button)[2]'));
    this.step2Nxt = function(){
        this.step2NxtBtn.click();

    };

    this.step3NxtBtn = element(by.xpath('(//button/span[contains(text(),"Next")]/parent::button)[3]'));
    this.step3Nxt = function(){
        this.step3NxtBtn.click();

    };

    this.step4NxtBtn = element(by.xpath('(//button/span[contains(text(),"Next")]/parent::button)[4]'));
    this.step4Nxt = function(){
        this.step4NxtBtn.click();

    };

    this.step5SaveBtn = element(by.xpath('(//button/span[contains(text(),"Save")]/parent::button)[1]'));
    this.step5Save = function(){
        this.step5SaveBtn.click();

    };

    this.triggerType_hourly = element(by.id('hourly'));
    this.triggerType_daily = element(by.id('daily'));
    this.triggerType_weekly = element(by.id('weekly'));
    this.triggerType_cron = element(by.id('cronExpression'));
    this.triggerType_simple = element(by.xpath('//input[@value="simpleRepeat"]'));


    this.setTriggerType  =  function(element) {
        element.click();
    }

    this.setSimpleTrigger = function() {
        return this.triggerType_simple.click();
    }

    this.notBeforeTime = element(by.model('notBeforeTime'));

    this.setNotBeforeTime = function(notBeforeTime){
        return this.notBeforeTime.sendKeys(notBeforeTime);
    };

    this.priority = element(by.model('trigger.data.priority'));

    this.setPriority = function(priority){
        return this.priority.sendKeys(priority);
    };

    this.derivedCronType1Mins = element(by.model('derivedCronType1.mins'));
    this.setDerivedCronType1Mins = function(derivedCronType1Mins){
        return this.derivedCronType1Mins.sendKeys(derivedCronType1Mins);
    };

    this.derivedCronType1Secs = element(by.model('derivedCronType1.secs'));
    this.setDerivedCronType1Secs = function(derivedCronType1Secs){
        return this.derivedCronType1Secs.sendKeys(derivedCronType1Secs);
    };


    this.derivedCronType2Hrs = element(by.model('derivedCronType2.hrs'));
    this.setDerivedCronType2Hrs = function(derivedCronType2Hrs){
        return this.derivedCronType2Hrs.sendKeys(derivedCronType2Hrs);
    };

    this.derivedCronType2Mins = element(by.model('derivedCronType2.mins'));
    this.setDerivedCronType2Mins = function(derivedCronType2Mins){
        return this.derivedCronType2Mins.sendKeys(derivedCronType2Mins);
    };

    this.derivedCronType2Secs = element(by.model('derivedCronType2.secs'));
    this.setDerivedCronType2Secs = function(derivedCronType2Secs){
        return this.derivedCronType2Secs.sendKeys(derivedCronType2Secs);
    };



    this.derivedCronType3Hrs = element(by.model('derivedCronType3.hrs'));
    this.setDerivedCronType3Hrs = function(derivedCronType3Hrs){
        return this.derivedCronType3Hrs.sendKeys(derivedCronType3Hrs);
    };

    this.derivedCronType3Mins = element(by.model('derivedCronType3.mins'));
    this.setDerivedCronType3Mins = function(derivedCronType3Mins){
        return this.derivedCronType3Mins.sendKeys(derivedCronType3Mins);
    };

    this.derivedCronType3Secs = element(by.model('derivedCronType3.secs'));
    this.setDerivedCronType3Secs = function(derivedCronType3Secs){
        return this.derivedCronType3Secs.sendKeys(derivedCronType3Secs);
    };

    this.monday = element(by.id('monday'));
    this.tuesday = element(by.id('tuesday'));
    this.wednesday = element(by.id('wednesday'));
    this.thursday = element(by.id('thursday'));
    this.friday = element(by.id('friday'));
    this.saturday = element(by.id('saturday'));
    this.sunday = element(by.id('sunday'));

    this.setDayInaWeek = function(elem){
        elem.click();
    };

    this.cronCheck = element(by.model('data.cronCheck'));

    this.setCronCheck = function(croncheck){
        return this.cronCheck.sendKeys(croncheck);
    }

    this.cronExpression = element(by.model('trigger.data.cronExpression.expression'));

    this.setCronExpression = function(cronExpression){
        return this.cronExpression.sendKeys(cronExpression);
    }

    this.simpleTriggerIntervalValue = element(by.xpath('//input[@name="intervalBtwRepeats"]'));
    this.simpleTriggerIntervalUnit = element(by.xpath('//select[@name="repeatIntervalUnit"]'));

    this.setTriggerIntervalValue = function(value){
        return this.simpleTriggerIntervalValue.sendKeys(value);
    }

    this.setTriggerIntervalUnit = function(value){
        return this.simpleTriggerIntervalUnit.sendKeys(value);
    }



}
