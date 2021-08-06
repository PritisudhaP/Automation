const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');
 var EC = protractor.ExpectedConditions;
 var length=10;
 var  width=15;
 var height=10;
 var weight=76.9;

 describe('Store_Portalv2_Scenarios', function() { 
     it('Select Bopis Order and complete fulfillment scenario- 19 , 20 , 30', function() {  
		 var v2loc = spv3Obj.spv2screen;
                


                   // //scenario-20      
                   v2loc.fulfillmentHeader.click();
                   v2loc.clickonspv2screen.click();
                   v2loc.filter.click();
                   v2loc.orderfilter.sendKeys('Order #');
                   v2loc.middlefilter.sendKeys('contains');
                   v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                   v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                   browser.sleep(3000)
                   v2loc.picknpack.click();
                   v2loc.orderselectcheckbox.click();
                   v2loc.orderselectceckboxofsecondFR.click();
                   v2loc.plusiconfromfulfillmentscreen.click();
                   v2loc.plusiconofanothersku.click();
                   v2loc.includepackagebutton.click();
                   v2loc.packaging.sendKeys('Test2164');
                   

                   expect(actualvalue).toEqual(weight);
                //    browser.wait(EC.textToBePresentInElementValue(v2loc.length, 'length'), 2000);
                //    console.log("PASSED for length");
                   browser.sleep(3000);


          
    });
    

  
                 
  
                  
            
      



});
