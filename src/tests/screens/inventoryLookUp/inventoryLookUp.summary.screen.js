module.exports =function(){

  this.organisationDropDown = element(by.xpath("//select[@name='organizationId']"));
  this.excludezeroInventoryCheckBox = element(by.xpath("//input[@name='excludeZeroInventory']"));
  this.inactiveproductCheckBox = element(by.xpath("//input[@name='excludeInactiveProducts']"));


    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.selectOrganisation =function(organisationName)
    {
        this.organisationDropDown.click();
        commons.selectOption(this.selectPublishMailBox, organisationName);
        this.organisationDropDown.click();
    }

     this.excludezeroInventoryProduct = function()
     {
         this.excludezeroInventoryCheckBox.click();

     }
     this.excludeInactiveProduct = function()
     {
         this.inactiveproductCheckBox.click();
     }
}
