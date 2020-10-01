module.exports =function(){

this.executeButton= element(by.xpath("//span[contains(text(),'Execute')]"));
this.refNameTextBox = element(by.xpath("//input[@name='siteRefName']"));
this.skuTextBox = element(by.xpath("//input[@name='skuId']"));
this.quantityTextBox = element(by.xpath("//input[@name='onHandQty']"));
this.skuinfoexecuteButton = element(by.xpath("//button[@class='text-center button-primary en-button']//span[@class='ng-scope'][contains(text(),'Execute')]"));


 var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.clickOnExecute = function()
    {
      return this.executeButton.click();
    }

// enterRefName, enterSku,enterQuantity is specific to "Generate event for inbound shipment reconcile" script of presale feature
    this.enterRefName = function(refname)
    {
      for(var i=0; i<refname.length;i++)
      {
       this.refNameTextBox.sendKeys(refname[i]);
       browser.sleep(100);
      }

    }
    this.enterSku = function(sku)
    {
     for(var i=0;i<sku.length;i++)
     {
      this.skuTextBox.sendKeys(sku[i]);
      browser.sleep(100);
     }
    }
    this.enterQuantity = function(value)
    {
     return this.quantityTextBox.sendKeys(value)
    }
  this.clickOnExecuteOfscript = function()
  {
   return this.skuinfoexecuteButton.click();
  }





}
