
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
          //MLMQ Scenario-1
          v3loc.selectordercheckbox.click();
          v3loc.selectsecondordercheckbox.click();
         browser.actions().doubleClick(v3loc.plusiconfromfulfillmentscreen).perform();
         browser.actions().doubleClick(v3loc.plusiconofanothersku).perform();
         //SLMQ Scenario-2
        //  v3loc.selectordercheckbox.click();
        //  browser.actions().doubleClick(v3loc.plusiconfromfulfillmentscreen).perform();

         v3loc.includepackagebutton.click();
         v3loc.packaging.sendKeys('Test2164');
         v3loc.addpackage.click();
         v3loc.completefulfillment.click();
         v3loc.fulfillmentHeader.click();
         v3loc.clickonspscreen.click();
        v3loc.ordersearchbox.sendKeys(dataFile.SONumber);
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
         browser.sleep(2000)
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
    });

    it('Customer_pickup_scenario_01', function() {  
		var v3loc = spv3Obj.FRlocators;
        v3loc.ordersearchbox.sendKeys(dataFile.SONumber);
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
         browser.sleep(2000)
         v3loc.ordersearchbox.sendKeys(protractor.Key.RETURN);
         v3loc.briefcasemanu.click();
         browser.sleep(2000);
        });

         it('Customer_pickup_scenario_03 & 04', function() { 
         var v3loc = spv3Obj.FRlocators; 
         //for single line cancelation partial 
     //     v3loc.minusbuttonfirst.click();
     //     v3loc.clickonfirstreasonoption.sendKeys("High price");
         //for all units cancelations
         //scenario-5
         //single line full cancelation
     //     browser.actions().doubleClick(v3loc.minusbuttonfirst).perform();
     //     v3loc.clickonfirstreasonoption.sendKeys("High price");
        //double line full cancelations
        browser.actions().doubleClick(v3loc.minusbuttonfirst).perform();
         v3loc.firstitemreasoncode.sendKeys("High price");
         browser.sleep(2000);
         browser.actions().doubleClick(v3loc.minusbuttonsecond).perform();
          v3loc.clickonsecondreasonoption.sendKeys("NotNeeded");

        });
         //scenario-4
         it('Customer_pickup_scenario_05 & 06', function() { 
            var v3loc = spv3Obj.FRlocators; 
            //scenario-6
         v3loc.riricheckboxincpscreen.click();

         v3loc.confirmbutton.click();
         browser.sleep(10000);
        });
        
    
    


});
