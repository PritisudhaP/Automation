module.exports =function(){

    this.newJobsButton = element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    
    this.jobsNameEntryTextBox = element(by.xpath('//input[@name="displayName"]'));
    this.jobsDescTextarea = element(by.xpath('//textarea[@name="description"]'));

    this.jobsDefTextarea = element(by.xpath('(//textarea)[2]'));

    this.saveButton = element(by.xpath('//button/span[contains(text(),"Create")]'));

    this.nextScreenStep1Button = element(by.xpath('//button[contains(@ng-disabled, "step1")]/span[contains(text(),"Next") ]/parent::button'));
    this.nextScreenStep2Button = element(by.xpath('//button[contains(@ng-disabled, "step2")]/span[contains(text(),"Next") ]/parent::button'));
    this.nextScreenStep4Button = element(by.xpath('//button[contains(@ng-disabled, "step4")]/span[contains(text(),"Next") ]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.newJobs = function() {
        return this.newJobsButton.click();
    }

    this.enterJobName = function(name) {
        return this.jobsNameEntryTextBox.sendKeys(name);
    }

    this.enterJobDesc = function(desc) {
        this.jobsDescTextarea.click();
        return this.jobsDescTextarea.sendKeys(desc);
    }

    this.enterJobDef = function(def) {
        return this.jobsDefTextarea.sendKeys(def);
    }

    this.selectType = function(type) {
        if (type == "Advanced") {
            element(by.xpath('//input[@type="radio" and @value="ADVANCED"]')).click();
        }
    }

    this.nextScreen = function(step) {
        switch(step) {
            case "1":
                this.nextScreenStep1Button.click();
                break;
            case "2":
                this.nextScreenStep2Button.click();
                break;
            case "4":
                this.nextScreenStep4Button.click();
                break;
        }
    }

    this.saveJobs = function() {
        return this.saveButton.click();
    }
}

