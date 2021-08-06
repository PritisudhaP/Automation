
'use strict';

const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');
 //SLSQ FULL CANCELLATION SLSQ
 describe('Store_Portalv3_submitnpickonly_Scenarios', function() { 
	//var salesOrderSummary = new salesOrdersummaryscreen();
     //Place an Order and Release it 
	
// 	it('Submit n pack scenarios from spv3 79 , 80',  function() {  
//         //scenario-79 , 80
// 		var v3loc = spv3Obj.FRlocators;
//          v3loc.fulfillmentHeader.click();
//          v3loc.clickonspscreen.click();
//          v3loc.filter.click();
//          v3loc.orderfilter.sendKeys('Order #');
//          v3loc.middlefilter.sendKeys('contains');
//          v3loc.lasttextbox.sendKeys(dataFile.SONumber);
//          v3loc.lasttextbox.sendKeys(protractor.Key.RETURN);
//          v3loc.clickonlinelevelFR.click();
//          v3loc.sumbitnpickonly.click();
//          v3loc.confirmbutton.click();
//          browser.sleep(5000);

//     });

it('Submit n pack scenarios from spv3  81 to 86',  function() {  
     //scenario-81 =85
     //   var v3loc = spv3Obj.FRlocators;
     //  v3loc.fulfillmentHeader.click();
     //  v3loc.clickonspscreen.click();
     //  v3loc.filter.click();
     //  v3loc.orderfilter.sendKeys('Order #');
     //  v3loc.middlefilter.sendKeys('contains');
     //  v3loc.lasttextbox.sendKeys(dataFile.SONumber);
     //  v3loc.lasttextbox.sendKeys(protractor.Key.RETURN);
     //  v3loc.clickonlinelevelFR.click();
     //  v3loc.sumbitnpickonly.click();
     //  v3loc.confirmbutton.click();
     //  browser.sleep(5000);

//     //scenario-82 
//      var v3loc = spv3Obj.FRlocators;
//      v3loc.fulfillmentHeader.click();
//      v3loc.clickonspscreen.click();
//      v3loc.filter.click();
//      v3loc.orderfilter.sendKeys('Order #');
//      v3loc.middlefilter.sendKeys('contains');
//      v3loc.lasttextbox.sendKeys(dataFile.SONumber);
//      v3loc.lasttextbox.sendKeys(protractor.Key.RETURN);
//      v3loc.clickonlinelevelFR.click();
//      v3loc.rejectreason.sendKeys('No Stock');
//      v3loc.minusbuttonfirst.click();
//      v3loc.sumbitnpickonly.click();
//      v3loc.confirmbutton.click();
//      browser.sleep(5000);

        //scenario-83 
     // var v3loc = spv3Obj.FRlocators;
     // v3loc.fulfillmentHeader.click();
     // v3loc.clickonspscreen.click();
     // v3loc.filter.click();
     // v3loc.orderfilter.sendKeys('Order #');
     // v3loc.middlefilter.sendKeys('contains');
     // v3loc.lasttextbox.sendKeys(dataFile.SONumber);
     // v3loc.lasttextbox.sendKeys(protractor.Key.RETURN);
     // v3loc.clickonlinelevelFR.click();
     // v3loc.rejectreason.sendKeys('No Stock');
     // browser.actions().doubleClick(v3loc.minusbuttonfirst).perform();
     // v3loc.sumbitnpickonly.click();
     // v3loc.confirmbutton.click();
     // browser.sleep(5000);

      //scenario-84
     // var v3loc = spv3Obj.FRlocators;
     // v3loc.fulfillmentHeader.click();
     // v3loc.clickonspscreen.click();
     // v3loc.filter.click();
     // v3loc.orderfilter.sendKeys('Order #');
     // v3loc.middlefilter.sendKeys('contains');
     // v3loc.lasttextbox.sendKeys(dataFile.SONumber);
     // v3loc.lasttextbox.sendKeys(protractor.Key.RETURN);
     // v3loc.clickonlinelevelFR.click();
     // v3loc.rejectreason.sendKeys('No Stock');
     // v3loc.rejectreasonofanotherFR.sendKeys('No Stock');
     // browser.actions().doubleClick(v3loc.minusbuttonfirst).perform();
     // browser.actions().doubleClick(v3loc.minusbuttonsecond).perform();
     // v3loc.sumbitnpickonly.click();
     // v3loc.confirmbutton.click();
     // browser.sleep(5000);

       //scenario-86
     var v3loc = spv3Obj.FRlocators;
     v3loc.fulfillmentHeader.click();
     v3loc.clickonspscreen.click();
     v3loc.filter.click();
     v3loc.orderfilter.sendKeys('Order #');
     v3loc.middlefilter.sendKeys('contains');
     v3loc.lasttextbox.sendKeys(dataFile.SONumber);
     v3loc.lasttextbox.sendKeys(protractor.Key.RETURN);
     v3loc.clickonlinelevelFR.click();
     v3loc.rejectreason.sendKeys('No Stock');
     v3loc.rejectreasonofanotherFR.sendKeys('No Stock');
     v3loc.minusbuttonfirst.click();
     v3loc.minusbuttonsecond.click();
     v3loc.sumbitnpickonly.click();
     v3loc.confirmbutton.click();
     browser.sleep(5000);

 

 });

    
    
});
