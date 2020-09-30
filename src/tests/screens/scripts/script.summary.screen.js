module.exports =function(){

this.searchscriptTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
this.scriptSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));



 var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();



 this.searchScript = function(name)
 {
  this.searchscriptTextBox.clear();

  for(var i=0;i<name.length;i++)
  {
   this.searchscriptTextBox.sendKeys(name[i]);
   browser.sleep(100);
  }
  this.searchscriptTextBox.sendKeys(protractor.Key.ENTER);
 }


this.scriptSelectGear = function(selectOption){
        this.scriptSelectGearIcon.click();
        temp = "//span[contains(text(),'" + selectOption + "')]/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }




}
