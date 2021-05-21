
'use strict';

const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');
 //SLSQ FULL CANCELLATION SLSQ
 describe('Store_Portalv3_cancellation_Scenario1', function() { 
	//var salesOrderSummary = new salesOrdersummaryscreen();
     //Place an Order and Release it 
	
	it('Select Bopis Order and complete fulfillment', function() {  
		var v3loc = spv3Obj.FRlocators;
        v3loc.fulfillmentHeader.click();
         v3loc.clickonspscreen.click();
         v3loc.ordersearchbox.sendKeys(dataFile.SONumber);
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
         browser.sleep(2000)
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
         v3loc.orderselectcheckbox.click();
         browser.sleep(2000);
         v3loc.pickorderbutton.click();
          browser.sleep(2000);
          v3loc.submitpackbutton.click();
          browser.sleep(3000);
          v3loc.selectordercheckbox.click();
          //browser.sleep(2000);
          //for single unit order
        // v3loc.plusiconfromfulfillmentscreen.click();
         //browser.sleep(2000);
         //for double unit order 
         browser.actions().doubleClick(v3loc.plusiconfromfulfillmentscreen).perform();
         v3loc.includepackagebutton.click();
         //browser.sleep(2000);
         v3loc.packaging.sendKeys('Test2164');
         //browser.sleep(2000);
         v3loc.addpackage.click();
        // browser.sleep(2000);
         v3loc.completefulfillment.click();
        //for print document option 
        v3loc.printdocumentbutton.click();
        browser.sleep(4000);
        


    });

    
    
});
