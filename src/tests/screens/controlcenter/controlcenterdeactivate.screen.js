module.exports =function(){


this.pendingOrderCount=element(by.xpath("(//div[@class='en-collection-row'])[1]/div[2]/span"));
this.deactivateCheckBox= element(by.xpath("//input[@ng-model='deactivate']"));
this.rejectOrderCheckBox= element(by.xpath("//input[@ng-model='reject']"));
this.reasonDropdown= element(by.xpath("//select[@name='item']"));
this.NoteTextBox=element(by.xpath("//textarea[@name='siteDeactivationNotes']"));
this.nextButton = element(by.xpath("//span[contains(text(),'Next')]"));
this.noneRadioButton= element(by.xpath("//input[@value='None']"));
this.confirmAndSubmitButton= element(by.xpath("//span[@class='ng-scope'][contains(text(),'Confirm & Submit')]"));
this.confirmButton=element(by.xpath("(//button/span[contains(text(),'Confirm')])[2]"));
 var common = require(process.cwd() + '/src/tests/screens/commons.js');

    var commons = new common();

    this.pendingOrder = function()
    {
      return this.pendingOrderCount.getText();
    }
    this.clickDeactivateCheckBox = function()
    {
      return this.deactivateCheckBox.click();
    }
    this.clickOnRejectOrderCheckBox= function()
    {
     return this.rejectOrderCheckBox.click();
    }

     this.setReason = function(reasonName){
             this.reasonDropdown.click();
             commons.selectOption(this.reasonDropdown,reasonName);
        }
   this.enterNote = function(notes)
   {
     return this.NoteTextBox.sendKeys(notes);
   }
   this.clickOnNext = function()
   {
    return this.nextButton.click();
   }
   this.clickOnNone= function()
   {
    return this.noneRadioButton.click();
   }
   this.clickOnConfirmAndSubmit = function()
   {
    return this.confirmAndSubmitButton.click();
   }
   this.clickOnConfirm = function()
   {
    return this.confirmButton.click();
   }




}
