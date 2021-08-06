const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');

 describe('Store_Portalv2_Scenarios', function() { 
    it('Select Bopis Order and complete fulfillment scenario- 46 , 47 , 48 , 49 , 50', function() {  
		var v2loc = spv3Obj.spv2screen;
                // //scenario-46      
                //  v2loc.fulfillmentHeader.click();
                //  v2loc.clickonspv2screen.click();
                //  v2loc.filter.click();
                //  v2loc.orderfilter.sendKeys('Order #');
                //  v2loc.middlefilter.sendKeys('contains');
                //  v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                //  v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                //  browser.sleep(3000)
                //  v2loc.orderselectcheckbox.click();
                //  v2loc.deleteoption.click();
                //  v2loc.rejectorder.click();
                // v2loc.reasoncodeforrejection.sendKeys('No Stock');
                // v2loc.commentbox.sendKeys(dataFile.Reasontext);
                // v2loc.rejectbutton.click();
                // browser.sleep(3000);

                // //scenario-47      
                //  v2loc.fulfillmentHeader.click();
                //  v2loc.clickonspv2screen.click();
                //  v2loc.filter.click();
                //  v2loc.orderfilter.sendKeys('Order #');
                //  v2loc.middlefilter.sendKeys('contains');
                //  v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                //  v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                //  browser.sleep(3000)
                //  v2loc.picknpack.click();
                //  browser.sleep(2000);
                //  v2loc.selectordercheckbox.click();
                //  v2loc.selectsecondordercheckbox.click();
                //  v2loc.rejectreason.sendKeys('Short Labor');
                //  v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                //  v2loc.rejectremainingitems.click();
                //  v2loc.confirmbutton.click();
                // browser.sleep(5000);

                // //scenario-48      
                //  v2loc.fulfillmentHeader.click();
                //  v2loc.clickonspv2screen.click();
                //  v2loc.filter.click();
                //  v2loc.orderfilter.sendKeys('Order #');
                //  v2loc.middlefilter.sendKeys('contains');
                //  v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                //  v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                //  v2loc.orderselectcheckbox.click();
                //  v2loc.tickmarkoption.click();
                //  v2loc.acceptorder.click();
                //  v2loc.confirmbutton.click();
                //  v2loc.picknpack.click();
                //  browser.sleep(2000);
                //  v2loc.selectordercheckbox.click();
                //  v2loc.rejectremainingitems.click();
                //  v2loc.commentbox.sendKeys(dataFile.Reasontext);
                //  v2loc.rejectreason.sendKeys('Short Labor');
                //  v2loc.confirmbutton.click();
                //  browser.sleep(2000);
                // v2loc.selectordercheckbox.click();
                // v2loc.plusiconfromfulfillmentscreen.click();
                // v2loc.includepackagebutton.click();
                // v2loc.packaging.sendKeys('Test2164');
                // v2loc.addpackage.click();
                // v2loc.completefulfillment.click();
                // browser.sleep(2000);


                // //scenario-49      
                // v2loc.fulfillmentHeader.click();
                // v2loc.clickonspv2screen.click();
                // v2loc.filter.click();
                // v2loc.orderfilter.sendKeys('Order #');
                // v2loc.middlefilter.sendKeys('contains');
                // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                // v2loc.orderselectcheckbox.click();
                // v2loc.tickmarkoption.click();
                // v2loc.acceptpartial.click();
                // v2loc.minusbuttonfirst.click();
                // v2loc.orderselect.click();
                // v2loc.rejectreason.sendKeys('Short Labor');
                // v2loc.acceptorderinppscreen.click();
                // v2loc.confirmbutton.click();
                // v2loc.packnship.click();
                // v2loc.selectordercheckbox.click();
                // v2loc.plusiconfromfulfillmentscreen.click();
                // v2loc.includepackagebutton.click();
                // v2loc.packaging.sendKeys('Test2164');
                // v2loc.addpackage.click();
                // v2loc.completefulfillment.click();
                // browser.sleep(2000);


                //   // //scenario-50      
                  // v2loc.fulfillmentHeader.click();
                  // v2loc.clickonspv2screen.click();
                  // v2loc.filter.click();
                  // v2loc.orderfilter.sendKeys('Order #');
                  // v2loc.middlefilter.sendKeys('contains');
                  // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                  // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                  // v2loc.orderselectcheckbox.click();
                  // v2loc.tickmarkoption.click();
                  // v2loc.acceptpartial.click();
                  // v2loc.minusbuttonfirst.click();
                  // v2loc.orderselect.click();
                  // v2loc.rejectreason.sendKeys('Short Labor');
                  // v2loc.acceptorderinppscreen.click();
                  // v2loc.confirmbutton.click();
                  // v2loc.packnship.click();
                  // v2loc.selectordercheckbox.click();
                  // v2loc.rejectreason.sendKeys('Short Labor');
                  // v2loc.rejectremainingitems.click();
                  // v2loc.confirmbutton.click();
                  // browser.sleep(2000);


          
    });
    it('Select Bopis Order and complete fulfillment scenario- 51 , 52 , 53 , 54 , 55 , 56', function() {  
      var v2loc = spv3Obj.spv2screen;
                  //scenario-51      
                  //  v2loc.fulfillmentHeader.click();
                  //  v2loc.clickonspv2screen.click();
                  //  v2loc.filter.click();
                  //  v2loc.orderfilter.sendKeys('Order #');
                  //  v2loc.middlefilter.sendKeys('contains');
                  //  v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                  //  v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                  //  v2loc.orderselectcheckbox.click();
                  //  v2loc.tickmarkoption.click();
                  //  v2loc.acceptpartial.click();
                  //  v2loc.orderselect.click();
                  //  v2loc.minusbuttonfirst.click();
                  //  v2loc.minusbuttonsecond.click();
                  //  v2loc.rejectreason.sendKeys('Short Labor');
                  //  v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                  //  v2loc.acceptorderinppscreen.click();
                  //  v2loc.confirmbutton.click();
                  //  v2loc.packnship.click();
                  //  v2loc.orderselectcheckbox.click();
                  //  v2loc.orderselectceckboxofsecondFR.click();
                  //    v2loc.plusiconfromfulfillmentscreen.click();
                  //   v2loc.plusiconofanothersku.click();
                  //   v2loc.includepackagebutton.click();
                  //    v2loc.packaging.sendKeys('Test2164');
                  //   v2loc.addpackage.click();
                  //   v2loc.completefulfillment.click();
                  //   browser.sleep(4000);

  
                  // //scenario-52    
                  //  v2loc.fulfillmentHeader.click();
                  //  v2loc.clickonspv2screen.click();
                  //  v2loc.filter.click();
                  //  v2loc.orderfilter.sendKeys('Order #');
                  //  v2loc.middlefilter.sendKeys('contains');
                  //  v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                  //  v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                  //  v2loc.orderselectcheckbox.click();
                  //  v2loc.tickmarkoption.click();
                  //  v2loc.acceptpartial.click();
                  //  v2loc.orderselect.click();
                  //  v2loc.minusbuttonfirst.click();
                  //  v2loc.minusbuttonsecond.click();
                  //  v2loc.rejectreason.sendKeys('Short Labor');
                  //  v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                  //  v2loc.acceptorderinppscreen.click();
                  //  v2loc.confirmbutton.click();
                  //  v2loc.packnship.click();
                  //  v2loc.orderselectcheckbox.click();
                  //  v2loc.orderselectceckboxofsecondFR.click();
                  // //  v2loc.rejectreason.sendKeys('Short Labor');
                  // //  v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                  //   v2loc.rejectremainingitems.click();
                  //  //v2loc.reasoncodeforrejection.click();
                  // //  v2loc.rejectreason.sendKeys('Short Labor');
                  // //  v2loc.commentbox.sendKeys(dataFile.Reasontext);
                  //  v2loc.confirmbutton.click();
                  //   browser.sleep(4000);  
                  
  
                  // //scenario-53      
                  //   v2loc.fulfillmentHeader.click();
                  //   v2loc.clickonspv2screen.click();
                  //   v2loc.filter.click();
                  //   v2loc.orderfilter.sendKeys('Order #');
                  //   v2loc.middlefilter.sendKeys('contains');
                  //   v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                  //   v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                  //     v2loc.orderselectcheckbox.click();
                  //  v2loc.tickmarkoption.click();
                  //  v2loc.acceptorder.click();
                  //  v2loc.confirmbutton.click();
                  //   v2loc.picknpack.click();
                  //   v2loc.orderselectcheckbox.click();
                  //   v2loc.orderselectceckboxofsecondFR.click();
                  //   v2loc.rejectreason.sendKeys('Short Labor');
                  //   v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                  //   v2loc.plusiconfromfulfillmentscreen.click();
                  //   v2loc.plusiconofanothersku.click();
                  //   v2loc.includepackagebutton.click();
                  
                  //    v2loc.packaging.sendKeys('Test2164');
                  //   v2loc.addpackage.click();
                  //   v2loc.completefulfillment.click();
                  //   v2loc.confirmbutton.click();
                  //   browser.sleep(3000);
  
                  // //scenario-54      
                  //   v2loc.fulfillmentHeader.click();
                  //   v2loc.clickonspv2screen.click();
                  //   v2loc.filter.click();
                  //   v2loc.orderfilter.sendKeys('Order #');
                  //   v2loc.middlefilter.sendKeys('contains');
                  //   v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                  //   v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                  //   v2loc.orderselectcheckbox.click();
                  //  v2loc.tickmarkoption.click();
                  //  v2loc.acceptorder.click();
                  //  v2loc.confirmbutton.click();
                  //  v2loc.picknpack.click();
                  //   v2loc.orderselectcheckbox.click();
                  //   v2loc.rejectreason.sendKeys('Short Labor');
                  //   v2loc.rejectremainingitems.click();
                  //   v2loc.confirmbutton.click();
                  //   v2loc.orderselectcheckbox.click();
                  //   v2loc.plusiconfromfulfillmentscreen.click();
                  //   v2loc.includepackagebutton.click();
                  //   v2loc.packaging.sendKeys('Test2164');
                  //   v2loc.addpackage.click();
                  //   v2loc.completefulfillment.click();
                  //   v2loc.reasoncodeforrejection.sendKeys('Short Labor');
                  //   v2loc.commentbox.sendKeys(dataFile.Reasontext);
                  //   v2loc.confirmbutton.click();
                  //    browser.sleep(5000);
  
  
                  //   // //scenario-55      
                    // v2loc.fulfillmentHeader.click();
                    // v2loc.clickonspv2screen.click();
                    // v2loc.filter.click();
                    // v2loc.orderfilter.sendKeys('Order #');
                    // v2loc.middlefilter.sendKeys('contains');
                    // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                    // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                    // v2loc.picknpack.click();
                    // v2loc.orderselectcheckbox.click();
                    // v2loc.orderselectceckboxofsecondFR.click();
                    // v2loc.rejectreason.sendKeys('Short Labor');
                    // v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                    // v2loc.plusiconfromfulfillmentscreen.click();
                    // v2loc.plusiconofanothersku.click();
                    // v2loc.includepackagebutton.click();
                    //  v2loc.packaging.sendKeys('Test2164');
                    // v2loc.addpackage.click();
                    // v2loc.completefulfillment.click();
                    // v2loc.confirmbutton.click();
                    // browser.sleep(3000);

                  //   // //scenario-56     
                    // v2loc.fulfillmentHeader.click();
                    // v2loc.clickonspv2screen.click();
                    // v2loc.filter.click();
                    // v2loc.orderfilter.sendKeys('Order #');
                    // v2loc.middlefilter.sendKeys('contains');
                    // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                    // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                    // v2loc.picknpack.click();
                    // v2loc.orderselectcheckbox.click();
                    // v2loc.rejectreason.sendKeys('Short Labor');
                    // v2loc.rejectremainingitems.click();
                    // v2loc.confirmbutton.click();
                    // v2loc.orderselectcheckbox.click();
                    // v2loc.plusiconfromfulfillmentscreen.click();
                    // v2loc.includepackagebutton.click();
                    // v2loc.packaging.sendKeys('Test2164');
                    // v2loc.addpackage.click();
                    // v2loc.completefulfillment.click();
                    // v2loc.reasoncodeforrejection.sendKeys('Short Labor');
                    // v2loc.commentbox.sendKeys(dataFile.Reasontext);
                    // v2loc.confirmbutton.click();
                    //  browser.sleep(5000);
  
                  
            
      });
     it('Select Bopis Order and complete fulfillment scenario- 36 , 37 , 29', function() {  
		     var v2loc = spv3Obj.spv2screen;

              //scenario-37
                // v2loc.fulfillmentHeader.click();
                // v2loc.clickonspv2screen.click();
                // v2loc.filter.click();
                // v2loc.orderfilter.sendKeys('Order #');
                // v2loc.middlefilter.sendKeys('contains');
                // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                // v2loc.orderselectcheckbox.click();
                // v2loc.tickmarkoption.click();
                // v2loc.acceptpartial.click();
                //  v2loc.minusbuttonfirst.click();
                //    v2loc.minusbuttonsecond.click();
                //    v2loc.orderselect.click();
                //    v2loc.rejectreason.sendKeys('Short Labor');
                //    v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                //    v2loc.acceptorderinppscreen.click();
                //    v2loc.confirmbutton.click();
                //    v2loc.packnship.click();
                //    v2loc.orderselectcheckbox.click();
                //    v2loc.orderselectceckboxofsecondFR.click();
                //    v2loc.rejectremainingitems.click();
                //    v2loc.confirmbutton.click();
                //    browser.sleep(5000);

                   //scenario-36
                // v2loc.fulfillmentHeader.click();
                // v2loc.clickonspv2screen.click();
                // v2loc.filter.click();
                // v2loc.orderfilter.sendKeys('Order #');
                // v2loc.middlefilter.sendKeys('contains');
                // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                // v2loc.orderselectcheckbox.click();
                // v2loc.tickmarkoption.click();
                // v2loc.acceptpartial.click();
                //  v2loc.minusbuttonfirst.click();
                //    v2loc.minusbuttonsecond.click();
                //    v2loc.orderselect.click();
                //    browser.sleep(5000);
                //    v2loc.rejectreason.sendKeys('Short Labor');
                //    v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
                //     v2loc.acceptorderinppscreen.click();
                //    v2loc.confirmbutton.click();
                //    v2loc.packnship.click();
                //    v2loc.orderselectcheckbox.click();
                //    v2loc.orderselectceckboxofsecondFR.click();
                //    v2loc.rejectremainingitems.click();
                //    v2loc.confirmbutton.click();
                //    browser.sleep(5000);

                //scenario-29
                v2loc.fulfillmentHeader.click();
                v2loc.clickonspv2screen.click();
                v2loc.filter.click();
                v2loc.orderfilter.sendKeys('Order #');
                v2loc.middlefilter.sendKeys('contains');
                v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                v2loc.orderselectcheckbox.click();
                v2loc.tickmarkoption.click();
                v2loc.acceptpartial.click();
                v2loc.orderselect.click();
                v2loc.acceptorderinppscreen.click();
                  v2loc.confirmbutton.click();
                  v2loc.packnship.click();
                  v2loc.selectordercheckbox.click();
                v2loc.plusiconfromfulfillmentscreen.click();
                v2loc.includepackagebutton.click();
                v2loc.packaging.sendKeys('Test2164');
                v2loc.addpackage.click();
                v2loc.completefulfillment.click();
                //select 2 nd FR and complete fullfillment
                v2loc.fulfillmentHeader.click();
                v2loc.clickonspv2screen.click();
                v2loc.xmark.click();
                v2loc.filter.click();
                v2loc.orderfilter.sendKeys('Order #');
                v2loc.middlefilter.sendKeys('contains');
                v2loc.lasttextbox.sendKeys(dataFile.SONumber);
                v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
                v2loc.orderselectceckboxofsecondFR.click();
                v2loc.tickmarkoption.click();
                v2loc.acceptpartial.click();
                v2loc.orderselect.click();
                v2loc.acceptorderinppscreen.click();
                  v2loc.confirmbutton.click();
                  v2loc.packnship.click();
                  v2loc.selectordercheckbox.click();
                v2loc.plusiconfromfulfillmentscreen.click();
                v2loc.includepackagebutton.click();
                v2loc.packaging.sendKeys('Test2164');
                v2loc.addpackage.click();
                v2loc.completefulfillment.click();
                
                
                    


  });

//  it('Select Bopis Order and complete fulfillment scenario- 25 , 26,33 ,22', function() {  
//   var v2loc = spv3Obj.spv2screen;

                 //scenario-26
              // v2loc.fulfillmentHeader.click();
              //   v2loc.clickonspv2screen.click();
              //   v2loc.filter.click();
              //   v2loc.orderfilter.sendKeys('Order #');
              //   v2loc.middlefilter.sendKeys('contains');
              //   v2loc.lasttextbox.sendKeys(dataFile.SONumber);
              //   v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
              //   v2loc.orderselectcheckbox.click();
              //   v2loc.tickmarkoption.click();
              //   v2loc.acceptpartial.click();
              //   v2loc.minusbuttonfirst.click();
              //   v2loc.minusbuttonsecond.click();
              //   v2loc.orderselect.click();
              //   v2loc.rejectreason.sendKeys('Short Labor');
              //   v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
              //   v2loc.acceptorderinppscreen.click();
              //   v2loc.confirmbutton.click();
              //   v2loc.packnship.click();
              //   v2loc.selectordercheckbox.click();
              //   v2loc.selectsecondordercheckbox.click();
              //   v2loc.plusiconfromfulfillmentscreen.click();
              //   v2loc.plusiconofanothersku.click();
              //   v2loc.includepackagebutton.click();
              //   v2loc.packaging.sendKeys('Test2164');
              //   v2loc.addpackage.click();
              //   v2loc.completefulfillment.click();
              //   v2loc.confirmbutton.click();
              //   browser.sleep(2000);

               //scenario-25
              // v2loc.fulfillmentHeader.click();
              //   v2loc.clickonspv2screen.click();
              //   v2loc.filter.click();
              //   v2loc.orderfilter.sendKeys('Order #');
              //   v2loc.middlefilter.sendKeys('contains');
              //   v2loc.lasttextbox.sendKeys(dataFile.SONumber);
              //   v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
              //   v2loc.orderselectcheckbox.click();
              //   v2loc.tickmarkoption.click();
              //   v2loc.acceptpartial.click();
              //   v2loc.minusbuttonfirst.click();
              //   v2loc.minusbuttonsecond.click();
              //   v2loc.orderselect.click();
              //   v2loc.rejectreason.sendKeys('Short Labor');
              //   v2loc.rejectreasonofanotherFR.sendKeys('Short Labor');
              //   v2loc.acceptorderinppscreen.click();
              //   v2loc.confirmbutton.click();
              //   v2loc.packnship.click();
              //   v2loc.selectordercheckbox.click();
              //   v2loc.selectsecondordercheckbox.click();
              //     v2loc.rejectremainingitems.click();
              //    v2loc.confirmbutton.click();
              //   browser.sleep(5000);

                  //scenario-22=33
              // v2loc.fulfillmentHeader.click();
              // v2loc.clickonspv2screen.click();
              // v2loc.filter.click();
              // v2loc.orderfilter.sendKeys('Order #');
              // v2loc.middlefilter.sendKeys('contains');
              // v2loc.lasttextbox.sendKeys(dataFile.SONumber);
              // v2loc.lasttextbox.sendKeys(protractor.Key.RETURN);
              // v2loc.orderselectcheckbox.click();
              // v2loc.tickmarkoption.click();
              // v2loc.acceptpartial.click();
              // v2loc.minusbuttonfirst.click();
              // v2loc.orderselect.click();
              // v2loc.rejectreason.sendKeys('Short Labor');
              // v2loc.acceptorderinppscreen.click();
              // v2loc.confirmbutton.click();
              // v2loc.packnship.click();
              // v2loc.selectordercheckbox.click();
              // v2loc.plusiconfromfulfillmentscreen.click();
              //   v2loc.includepackagebutton.click();
              //   v2loc.packaging.sendKeys('Test2164');
              //   v2loc.addpackage.click();
              //   v2loc.completefulfillment.click();
              // browser.sleep(5000);
             
                

//});
});
