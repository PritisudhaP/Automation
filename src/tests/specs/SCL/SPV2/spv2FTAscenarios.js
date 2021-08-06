const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');

 describe('Store_Portalv2_Scenarios', function() { 
     it('Select Bopis Order and complete fulfillment scenario- 19 , 20 , 30,31', function() {  
		 var v2loc = spv3Obj.spv2screen;
                // //scenario-19 =30    
                //  v2loc.fulfillmentHeader.click();
                //  v2loc.clickonspv2screen.click();
                //  v2loc.filter.click();
                //  v2loc.orderfilter.sendKeys('Order #');
                //  v2loc.middlefilter.sendKeys('contains');
                //  v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                //  v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                //  browser.sleep(3000)
                //  v2loc.orderselectcheckbox.click();
                //  v2loc.tickmarkoption.click();
                //  v2loc.acceptorder.click();
                //  v2loc.confirmbutton.click();
                //  v2loc.picknpack.click();
                //  v2loc.selectordercheckbox.click();
                //  browser.actions().doubleClick(v2loc.plusiconfromfulfillmentscreen).perform();
                //  v2loc.includepackagebutton.click();
                //  v2loc.packaging.sendKeys('Test2164');
                //  v2loc.addpackage.click();
                //  v2loc.completefulfillment.click();
                //  browser.sleep(3000);


                //    // //scenario-20      
                //    v2loc.fulfillmentHeader.click();
                //    v2loc.clickonspv2screen.click();
                //    v2loc.filter.click();
                //    v2loc.orderfilter.sendKeys('Order #');
                //    v2loc.middlefilter.sendKeys('contains');
                //    v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                //    v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                //    browser.sleep(3000)
                //    v2loc.orderselectcheckbox.click();
                //    v2loc.tickmarkoption.click();
                //    v2loc.acceptpartial.click();
                //    v2loc.minusbuttonfirst.click();
                //    v2loc.orderselect.click();
                //   v2loc.rejectreason.sendKeys('Short Labor');
                //   v2loc.acceptorderinppscreen.click();
                //   v2loc.confirmbutton.click();
                //   v2loc.packnship.click();
                //    v2loc.selectordercheckbox.click();
                //    browser.actions().doubleClick(v2loc.plusiconfromfulfillmentscreen).perform();
                //    v2loc.includepackagebutton.click();
                //    v2loc.packaging.sendKeys('Test2164');
                //    v2loc.addpackage.click();
                //    v2loc.completefulfillment.click();
                //    browser.sleep(3000);

                 // //scenario-31      
                 v2loc.fulfillmentHeader.click();
                 v2loc.clickonspv2screen.click();
                 v2loc.filter.click();
                 v2loc.orderfilter.sendKeys('Order #');
                 v2loc.middlefilter.sendKeys('contains');
                 v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                 v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                 browser.sleep(3000)
                 v2loc.orderselectcheckbox.click();
                 v2loc.tickmarkoption.click();
                 v2loc.acceptpartial.click();
                 v2loc.minusbuttonfirst.click();
                 v2loc.orderselect.click();
                v2loc.rejectreason.sendKeys('Short Labor');
                v2loc.acceptorderinppscreen.click();
                v2loc.confirmbutton.click();
                v2loc.packnship.click();
                 v2loc.selectordercheckbox.click();
                 v2loc.plusiconfromfulfillmentscreen.click();
                 v2loc.includepackagebutton.click();
                 v2loc.packaging.sendKeys('Test2164');
                 v2loc.addpackage.click();
                 v2loc.completefulfillment.click();
                 v2loc.confirmbutton.click();

                 browser.sleep(3000);


          
    });
    

  
                 
  
                  
            
      



});
