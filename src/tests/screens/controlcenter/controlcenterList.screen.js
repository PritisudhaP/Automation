module.exports =function(){

   // this.listCheckBox = element(by.xpath("//input[@id='controlCenter_checkbox_0_0']"));
   this.listCheckBox =element(by.xpath("//strong[contains(text(),'AutomationControlCenter')]/preceding::input[1]"));
    this.scheduleOneTimeClosureButton = element(by.xpath("//span[contains(text(),'Schedule One-Time Closure')]"));
    this.viewItemButton = element(by.xpath("//span[contains(text(),'View Item')]"));
    this.editScheduleButton = element(by.xpath("//span[contains(text(),'Edit Schedule')]"));
    this.businessCalendarGraph = element(by.xpath("(//*[name()='svg']/*[name()='g']//*[name()='rect'])[1]"))
    this.shipToCustomerGraph = element(by.xpath("(//*[name()='svg']/*[name()='g']//*[name()='rect'])[4]"));
    this.pickupatstoreGraph = element(by.xpath("(//*[name()='svg']/*[name()='g']//*[name()='rect''])[7]"))
  //  this.disableLabel= element(by.xpath("(//en-label)[1]"));
  this.disableLabel= element(by.xpath("//strong[contains(text(), 'AutomationControlCenter')]/preceding::en-label[1]"));



    this.clickOnSite =function(){
        return this.listCheckBox.click();
    }

    this.clickOnscheduleOneTimeClosure = function()
    {
      return this.scheduleOneTimeClosureButton.click();
    }

    this.clickOnviewItem = function()
    {
      return this.viewItemButton.click();
    }

    this.clickOneditSchedule = function()
    {
      return this.editScheduleButton.click();

    }

    this.verifybusinessgraph = function()
    {
     return this.businessCalendarGraph.getAttribute("class");

    }

    this.verifyHeightOfBusiness = function()
    {
     return this.businessCalendarGraph.getAttribute('height');
    }
    this.getLabel = function()
    {
     return this.disableLabel.getText();
    }








}

