module.exports =function(){


this.maxOrderTextBox = element(by.xpath("//input[@name='maxorder']"));
this.selectStatrtTimeDropDown = element(by.xpath("//select[@name='starttime']"));
this.selectEndTimeDropDown = element(by.xpath("//select[@name='endtime']"));
this.dailyRadioButton = element(by.xpath("//input[@value='Daily']"));
this.dailyRecurringTextBox = element(by.xpath("//input[@name='onday']"));
this.addScheduleButton = element(by.xpath("//button/span[contains(text(),'Add Schedule Rule')]/parent::button"));
this.applyRuleButton = element(by.xpath("//button/span[contains(text(),'Apply Rules')]/parent::button"));
this.confirmButton = element(by.xpath("//button/span[contains(text(),'Confirm')]/parent::button"));
 var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.enterMaxOrder = function(qty)
    {
      return this.maxOrderTextBox.sendKeys(qty);
    }



     this.selectstartTime =function(startTime)
       {
           this.selectStatrtTimeDropDown.click();
           commons.selectOption(this.selectStatrtTimeDropDown,startTime );
           this.selectStatrtTimeDropDown.click();
       }

        this.selectEndTime =function(endTime)
              {
                  this.selectEndTimeDropDown.click();
                  commons.selectOption(this.selectEndTimeDropDown,endTime );
                  this.selectEndTimeDropDown.click();
              }

       this.selcetDailyOption = function()
       {
        return this.dailyRadioButton.click();
       }

     this.enterRecurringDaily = function(count)
     {
      return this.dailyRecurringTextBox.sendKeys(count);
     }
     this.clickOnAddSchedule = function()
     {
      return this.addScheduleButton.click();
     }
     this.clickOnApplyRule = function()
     {
      return this.applyRuleButton.click();
     }
     this.clickOnConfirm = function()
     {
      return this.confirmButton.click();
     }

}

