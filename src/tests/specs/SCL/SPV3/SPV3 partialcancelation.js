
'use strict';

const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');
 //SLSQ FULL CANCELLATION SLSQ
 describe('Store_Portalv3_cancellation_Scenario1', function() { 
	
	
	it('Select Bopis Order and complete fulfillment', function() {  
		var v3loc = spv3Obj.FRlocators;
        //util.scrollToView(v3loc.fulfillmentHeader);
        v3loc.fulfillmentHeader.click();
        // util.scrollToView(v3loc.clickonspscreen);
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
          v3loc.selectsecondordercheckbox.click();
         //browser.sleep(2000);
         //for MLMQ order
         browser.actions().doubleClick(v3loc.plusiconfromfulfillmentscreen).perform();
         browser.actions().doubleClick(v3loc.plusiconofanothersku).perform();
        //  //for MLSQ order
        //  v3loc.plusiconfromfulfillmentscreen.click();
        //  v3loc.plusiconofanothersku.click();

         v3loc.includepackagebutton.click();
         //browser.sleep(2000);
         v3loc.packaging.sendKeys('Test2164');
         //browser.sleep(2000);
         v3loc.addpackage.click();
        // browser.sleep(2000);
         v3loc.completefulfillment.click();
         v3loc.fulfillmentHeader.click();
         v3loc.clickonspscreen.click();
         v3loc.ordersearchbox.sendKeys(dataFile.SONumber);
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
         browser.sleep(3000)
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
         v3loc.orderselectcheckbox.click();
         v3loc.cancelheaderlevel.click();
         v3loc.partialcanceloption.click();
         browser.sleep(2000);
    });
    it('partial cancelation scenario-01', function() {  
		var v3loc = spv3Obj.FRlocators;
       v3loc.plusiconfromfulfillmentscreen.click();
    v3loc.reasoncodeoption.sendKeys('NotNeeded');
    });
    //    it('partial cancelation scenario-04', function() {  //single line full cancel
    //     var v3loc = spv3Obj.FRlocators;
    //     browser.actions().doubleClick(v3loc.plusiconfromfulfillmentscreen).perform();//scenario-5
    //     v3loc.reasoncodeoption.sendKeys('NotNeeded');
    // });
//     it('partial cancelation scenario-05', function() {  //double line full cancel
//         var v3loc = spv3Obj.FRlocators;
//        //browser.actions().doubleClick(v3loc.plusiconfromfulfillmentscreen).perform();//scenario-4
//        v3loc.plusiconfromfulfillmentscreen.click();
//         v3loc.reasoncodeoption.sendKeys('NotNeeded');
//         v3loc.plusiconofanothersku.click(); //partial cancel
//         //browser.actions().doubleClick(v3loc.plusiconofanothersku).perform();
//         v3loc.reasoncodeanotheritem.sendKeys('NotNeeded');
//         browser.sleep(2000);
    
// });

        // it('partial cancelation scenario-02', function() { 
        //     var v3loc = spv3Obj.FRlocators;
        //     v3loc.riricheckbox.click();
        // });
        it('partial cancelation scenario-03', function() { 
        var v3loc = spv3Obj.FRlocators;
        v3loc.itemsubmitcancelbutton.click();
        browser.sleep(2000);
        v3loc.confirmcancelbutton.click();
        browser.sleep(5000);
});
});
