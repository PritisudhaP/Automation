
'use strict';

const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');

 describe('Store_Portalv2_Scenarios', function() { 
	
	// it('Select Bopis Order and complete fulfillment scenario-16 & 17', function() {  
	// 	var v2loc = spv3Obj.spv2screen;
    //     //from scenario-16 of store portal module
       
    //      v2loc.fulfillmentHeader.click();
    //      v2loc.clickonspv2screen.click();
    //      v2loc.filter.click();
    //      v2loc.orderfilter.sendKeys('Order #');
    //      v2loc.middlefilter.sendKeys('contains');
    //      v2loc.lasttextbox.sendKeys(dataFile.SONumber);
    //      v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
    //      browser.sleep(3000)
    //      v2loc.orderselectcheckbox.click();
    //      v2loc.tickmarkoption.click();
    //      v2loc.acceptorder.click();
    //      v2loc.confirmbutton.click();
    //      v2loc.picknpack.click();
    //      browser.sleep(3000);
    //      //for SLSQ Order (Scenario-16)
    //     //  v2loc.selectordercheckbox.click();
    //     //  v2loc.plusiconfromfulfillmentscreen.click();
        
    //     //for MLMQ Order (scenario-17)
    //      v2loc.selectordercheckbox.click();
    //      v2loc.selectsecondordercheckbox.click();
    //      browser.actions().doubleClick(v2loc.plusiconfromfulfillmentscreen).perform();
    //      browser.actions().doubleClick(v2loc.plusiconofanothersku).perform();

    //      v2loc.includepackagebutton.click();
    //      v2loc.packaging.sendKeys('Test2164');
    //      v2loc.addpackage.click();
    //      v2loc.completefulfillment.click();
    // });

//     it('Select Bopis Order and complete fulfillment scenario-18', function() {  

// 	 	var v2loc = spv3Obj.spv2screen;//comment above it block while running this it block

//          v2loc.fulfillmentHeader.click();
//          v2loc.clickonspv2screen.click();
//          v2loc.filter.click();
//          v2loc.orderfilter.sendKeys('Order #');
//          v2loc.middlefilter.sendKeys('contains');
//          v2loc.lasttextbox.sendKeys(dataFile.SONumber);
//          v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
//          browser.sleep(3000)
//          v2loc.orderselectcheckbox.click();
//          v2loc.tickmarkoption.click();
//          v2loc.acceptorder.click();
//          v2loc.confirmbutton.click();
//          v2loc.picknpack.click();
//          v2loc.selectordercheckbox.click();
//          browser.actions().doubleClick(v2loc.plusiconfromfulfillmentscreen).perform();
//          v2loc.includepackagebutton.click();
//          v2loc.packaging.sendKeys('Test2164');
//          v2loc.addpackage.click();
//          v2loc.completefulfillment.click();
//          browser.sleep(3000);
//          //select second FR
         
//          v2loc.fulfillmentHeader.click();
//          v2loc.clickonspv2screen.click();
//          v2loc.xmark.click();
//          v2loc.filter.click();
//          v2loc.orderfilter.sendKeys('Order #');
//          v2loc.middlefilter.sendKeys('contains');
//          v2loc.lasttextbox.sendKeys(dataFile.SONumber);
//          v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
//          //
//          v2loc.orderselectceckboxofsecondFR.click();
//          v2loc.tickmarkoption.click();
//          v2loc.acceptorder.click();
//          v2loc.confirmbutton.click();
//          v2loc.picknpacksecondFR.click();
//          v2loc.selectordercheckbox.click();
//          browser.actions().doubleClick(v2loc.plusiconfromfulfillmentscreen).perform();
//          v2loc.includepackagebutton.click();
//          v2loc.packaging.sendKeys('Test2164');
//          v2loc.addpackage.click();
//          v2loc.completefulfillment.click();
//          browser.sleep(3000);

// });

	// it('Select Bopis Order and complete fulfillment scenario-23 ,24,35', function() {  
	// 	var v2loc = spv3Obj.spv2screen;
    
       
    //              v2loc.fulfillmentHeader.click();
    //              v2loc.clickonspv2screen.click();
    //              v2loc.filter.click();
    //              v2loc.orderfilter.sendKeys('Order #');
    //              v2loc.middlefilter.sendKeys('contains');
    //              v2loc.lasttextbox.sendKeys(dataFile.SONumber);
    //              v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
    //              browser.sleep(3000)
    //              v2loc.orderselectcheckbox.click();
    //              v2loc.deleteoption.click();
    //              v2loc.rejectorder.click();
    //              browser.sleep(3000);
    //              v2loc.reasoncodeforrejection.sendKeys('No Stock');
    //              v2loc.commentbox.sendKeys(dataFile.Reasontext);
    //              v2loc.rejectbutton.click();
                
    // });
    // it('Select Bopis Order and complete fulfillment scenario-27 & 28 , 44 , 45', function() {  
	// 	var v2loc = spv3Obj.spv2screen;
        
       
    //      v2loc.fulfillmentHeader.click();
    //      v2loc.clickonspv2screen.click();
    //      v2loc.filter.click();
    //      v2loc.orderfilter.sendKeys('Order #');
    //      v2loc.middlefilter.sendKeys('contains');
    //      v2loc.lasttextbox.sendKeys(dataFile.SONumber);
    //      v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
    //      browser.sleep(3000)
    //      //for scenario 44 comment from 132 to 134
    //     //  v2loc.orderselectcheckbox.click();
    //     //  v2loc.tickmarkoption.click();
    //     //  v2loc.acceptorder.click();

    //     // v2loc.confirmbutton.click();
    //      v2loc.picknpack.click();
    //      browser.sleep(3000);
    //      //for MLSQ Order 

         
        
    //     //for MLMQ Order (scenario-28)
    //      v2loc.selectordercheckbox.click();
    //      v2loc.selectsecondordercheckbox.click();
    //     //  browser.actions().doubleClick(v2loc.plusiconfromfulfillmentscreen).perform();
    //     //  browser.actions().doubleClick(v2loc.plusiconofanothersku).perform();
    //      //for MLSQ Order (scenario-27 , 45 )
        
    //      v2loc.plusiconfromfulfillmentscreen.click();
    //      v2loc.plusiconofanothersku.click();

    //      v2loc.includepackagebutton.click();
    //      v2loc.packaging.sendKeys('Test2164');
    //      v2loc.addpackage.click();
    //      v2loc.completefulfillment.click();
    // });
    it('Select Bopis Order and complete fulfillment scenario-38 , 39,40,41,42 , 43', function() {  
		var v2loc = spv3Obj.spv2screen;
                //scenario-38       
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

                //scenario-40
                // v2loc.fulfillmentHeader.click();
                //  v2loc.clickonspv2screen.click();
                //  v2loc.filter.click();
                //  v2loc.orderfilter.sendKeys('Order #');
                //  v2loc.middlefilter.sendKeys('contains');
                //  v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                //  v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                //  browser.sleep(3000)
                //  v2loc.orderselectceckboxofsecondFR.click();
                //  v2loc.tickmarkoption.click();
                //  v2loc.acceptorder.click();
                //  v2loc.confirmbutton.click();
                //  v2loc.picknpack.click();
                //  v2loc.selectordercheckbox.click();
                //  browser.actions().doubleClick(v2loc.minusbuttonfirst).perform();
                //  v2loc.rejectreason.sendKeys('No Stock');
                //  v2loc.rejectremainingitems.click();
                //  browser.sleep(3000);

            // //scenario-41
                 
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
            //  v2loc.acceptpartial.click();
           // v2loc.orderselect.click();
            //  v2loc.minusbuttonfirst.click();
            //  v2loc.rejectreason.sendKeys('No Stock');
            //  v2loc.acceptorderinppscreen.click();
            //  v2loc.confirmbutton.click();
            //  v2loc.packnship.click();
            //  v2loc.selectordercheckbox.click();
            //  v2loc.includepackagebutton.click();
            //  v2loc.packaging.sendKeys('Test2164');
            //  v2loc.addpackage.click();
            //  v2loc.completefulfillment.click();
            //  browser.sleep(3000);

            //scenario-42 , 39 
                 
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
            v2loc.orderselect.click();
            v2loc.acceptorderinppscreen.click();
            v2loc.confirmbutton.click();
            v2loc.packnship.click();
            v2loc.selectordercheckbox.click();
            v2loc.minusbuttonfirst.click();
            v2loc.includepackagebutton.click();
            v2loc.rejectreason.sendKeys('Product Damaged');
            v2loc.packaging.sendKeys('Test2164');
            v2loc.addpackage.click();
            v2loc.completefulfillment.click();
            v2loc.confirmbutton.click();
            browser.sleep(3000);

        //scenario-43
           
        // v2loc.fulfillmentHeader.click();
        // v2loc.clickonspv2screen.click();
        // v2loc.filter.click();
        // v2loc.orderfilter.sendKeys('Order #');
        // v2loc.middlefilter.sendKeys('contains');
        // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
        // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
        // browser.sleep(3000)
        // v2loc.orderselectcheckbox.click();
        // v2loc.deleteoption.click();
        // v2loc.rejectorder.click();
        // browser.sleep(3000);
        // v2loc.reasoncodeforrejection.sendKeys('No Stock');
        // v2loc.commentbox.sendKeys(dataFile.Reasontext);
        // v2loc.rejectbutton.click();
        // browser.sleep(3000);
          
    });



});
