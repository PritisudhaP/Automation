var purchaseOrderCreateScreen = require(process.cwd() + '/src/tests/screens/purchaseOrder/purchaseOrder.create.screen.js');
var purchaseOrderEditScreen = require(process.cwd() + '/src/tests/screens/purchaseOrder/purchaseOrder.edit.screen.js');
var purchaseOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/purchaseOrder/purchaseOrder.summary.screen.js');
var reportsSummaryScreen = require(process.cwd() + '/src/tests/screens/reports/reports.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var erpProfileId = "4d164d55-66f7-47dc-832e-fa1e26bd1a19";
global.PONumber="";
global.tempCookie="";

describe('Purchase Order Flow  : ', function(){
    var purchaseOrderCreate = new purchaseOrderCreateScreen();
    var purchaseOrderEdit = new purchaseOrderEditScreen();
    var purchaseOrderSummary = new purchaseOrderSummaryScreen();
    var reportsSummary = new reportsSummaryScreen();
    var commons = new common();


        it('Purchase order that release successfully - TC0001', function(){
             
            browser.get(purchaseOrderUrl);

            console.log("navigating to purchase order new screen"); 
            browser.sleep(5000);
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();

            purchaseOrderCreate.vendorSelection(); 
            purchaseOrderCreate.vendorLookup();
            purchaseOrderCreate.enterVendorName("LUX");

            purchaseOrderCreate.search();
            purchaseOrderCreate.selectVendor();
            purchaseOrderCreate.useSelectedVendor();

            purchaseOrderCreate.siteLookup();
            purchaseOrderCreate.enterSiteName("The Sherry");
         
            purchaseOrderCreate.search();   
 
            purchaseOrderCreate.selectSite();
            purchaseOrderCreate.useSelectedSite();

            purchaseOrderCreate.poolSelection("781 Fifth Avenue-NY-NY"); 
            
            purchaseOrderCreate.enterBuyerOrg("Ghurka");
            purchaseOrderCreate.addItem();
            purchaseOrderCreate.enterProductName("ZZGGA230BTTB");
           
            purchaseOrderCreate.search();
            purchaseOrderCreate.selectProduct();
            purchaseOrderCreate.addProduct();

            purchaseOrderCreate.savePO();
            browser.sleep(3000);
            browser.get(purchaseOrderUrl); 
            purchaseOrderSummary.purchaseOrderSearch("Status", "OPEN");
            browser.sleep(2000);
            purchaseOrderSummary.purchaseOrderSelectGear("Release");
            // purchaseOrderSummary.purchaseOrderSearchRemove("1");
            expect(purchaseOrderSummary.purchaseOrderStatus()).toEqual('RELEASED');
             
        });

      
        it('Purchase order with SAC charges, currency conversion, more than 2 decimals - TC0002', function(){

            browser.get(purchaseOrderUrl);

            console.log("navigating to purchase order new screen");
            commons.new();
            browser.driver.sleep(2);
            browser.waitForAngular();

            purchaseOrderCreate.vendorSelection();
            purchaseOrderCreate.vendorLookup();
            purchaseOrderCreate.enterVendorName("LUX");

            purchaseOrderCreate.search();
            purchaseOrderCreate.selectVendor();
            purchaseOrderCreate.useSelectedVendor();

            purchaseOrderCreate.siteLookup();
            purchaseOrderCreate.enterSiteName("TOTAL");

            purchaseOrderCreate.search();

            purchaseOrderCreate.selectSite();
            purchaseOrderCreate.useSelectedSite();

            purchaseOrderCreate.poolSelection("DC-TR - Retail_Ecommerce");
            purchaseOrderCreate.enterBuyerOrg("Ghurka");
            purchaseOrderCreate.addItem();
            browser.sleep(4000);
            purchaseOrderCreate.enterProductName("ZZGGA230BTTB");
            purchaseOrderCreate.search();
            purchaseOrderCreate.selectProduct();
            purchaseOrderCreate.qty(10);
            purchaseOrderCreate.addProduct();

            purchaseOrderCreate.addItem();
            purchaseOrderCreate.enterProductName("ZZGGA231TUBK");
            purchaseOrderCreate.search();
            purchaseOrderCreate.selectProduct();
            purchaseOrderCreate.addProduct();

            purchaseOrderCreate.addItem();
            purchaseOrderCreate.enterProductName("ZZGGA230VBKZ");
            purchaseOrderCreate.search();
            purchaseOrderCreate.selectProduct();
            purchaseOrderCreate.addProduct();

            
            purchaseOrderCreate.updateDiscount("9.85647","1");
            purchaseOrderCreate.updateQty("5", "2");
            purchaseOrderCreate.updateDiscount("1.99882","2");
           
            purchaseOrderCreate.savePO();
            browser.sleep(3000);
            browser.get(purchaseOrderUrl);
            purchaseOrderSummary.purchaseOrderSearch("Status","OPEN");
            browser.sleep(2000);
            var PONumber =  purchaseOrderSummary.purchaseOrderNumber();
            
            purchaseOrderSummary.purchaseOrderView();
            expect(purchaseOrderEdit.getLineItemTotal(1)).toEqual('$801.44');
            expect(purchaseOrderEdit.getLineItemTotal(2)).toEqual('$725.01');
            expect(purchaseOrderEdit.getLineItemTotal(3)).toEqual('$137.00');
            expect(purchaseOrderEdit.getTotalDollars()).toEqual('$1,663.44');

            var lineItem1Total = purchaseOrderEdit.getLineItemTotal(1);
            var lineItem2Total = purchaseOrderEdit.getLineItemTotal(2);
            var lineItem3Total = purchaseOrderEdit.getLineItemTotal(3);

            browser.sleep(2000);
            purchaseOrderEdit.selectLineItem("3");
            browser.sleep(3000);
            purchaseOrderEdit.editLineItem();
            browser.sleep(1000);
            purchaseOrderEdit.updateLineItemQty("8");
            purchaseOrderEdit.updateLineItemPrice("49.996839");
            purchaseOrderEdit.updateLineItemDiscount("1.99989");
            purchaseOrderEdit.updateLineItem();
            expect(purchaseOrderEdit.getLineItemTotal(3)).toEqual('$383.98');
            expect(purchaseOrderEdit.getTotalDollars()).toEqual('$1,910.42');

            browser.sleep(3000);
            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("ALLOWANCE");
            purchaseOrderEdit.chargeName("A1");
            purchaseOrderEdit.chargeKind("Amount");
            purchaseOrderEdit.chargeAmount("9.56599");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("ALLOWANCE");
            purchaseOrderEdit.chargeName("A2");
            purchaseOrderEdit.chargeKind("Percentage");
            purchaseOrderEdit.chargePercentage("1.99098");
            purchaseOrderEdit.createSAC();


            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("CHARGE");
            purchaseOrderEdit.chargeName("C1");
            purchaseOrderEdit.chargeKind("Amount");
            purchaseOrderEdit.chargeAmount("0.565");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("CHARGE");
            purchaseOrderEdit.chargeName("C2");
            purchaseOrderEdit.chargeKind("Percentage");
            purchaseOrderEdit.chargePercentage("0.565");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("SERVICE");
            purchaseOrderEdit.chargeName("S1");
            purchaseOrderEdit.chargeKind("Amount");
            purchaseOrderEdit.chargeAmount("0.15699");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("SERVICE");
            purchaseOrderEdit.chargeName("S2");
            purchaseOrderEdit.chargeKind("Percentage");
            purchaseOrderEdit.chargePercentage("2.5119");
            purchaseOrderEdit.createSAC();
           
            expect(purchaseOrderEdit.allowanceAmountFeesDollars()).toEqual('($9.57)');
            expect(purchaseOrderEdit.allowanceAmountPercentageDollars()).toEqual('($38.04)');
            expect(purchaseOrderEdit.chargeAmountFeesDollars()).toEqual('$0.57');
            expect(purchaseOrderEdit.chargeAmountPercentageDollars()).toEqual('$10.79');
            expect(purchaseOrderEdit.serviceAmountFeesDollars()).toEqual('$0.16');
            expect(purchaseOrderEdit.serviceAmountPercentageDollars()).toEqual('$47.99');
            expect(purchaseOrderEdit.getTotalDollars()).toEqual('$1,922.32');
            

            var totalInDollars = purchaseOrderEdit.getTotalDollars();
            var totalAllowanceDollars = "Allowances Total:" + "\\$" + " " + "47.60";
            var totalChargeDollars = "Charges Total:" + "\\$" + " " + "11.36";
            var totalServiceDollars = "Services Total:" + "\\$" + " " +"48.15";
            var totalAmountDollars = "Order Total:" + "\\$" + " " + "1,910.42";
            var totalAmountDueDollars = "Total Due:" + "\\$" + " " + "1,922.32";


            browser.get(purchaseOrderUrl);
 //           purchaseOrderSummary.purchaseOrderSearchRemove("1");
            purchaseOrderSummary.purchaseOrderSearch("PO Number", PONumber);
            browser.sleep(2000);
            purchaseOrderSummary.purchaseOrderSelectGear("Print");

            var sourcePDF = "./tempFiles/export.pdf";
            var destTxt = "./tempFiles/export.txt";

            var fssourcePDF = require('fs');
            var fsdestTxt = require('fs');

            if (fssourcePDF.existsSync(sourcePDF)) {
                // Make sure the browser doesn't have to rename the download
               fssourcePDF.unlinkSync(sourcePDF);
            }

            if (fsdestTxt.existsSync(destTxt)) {
                // Make sure the browser doesn't have to rename the download
                var tempFile10 = fsdestTxt.openSync(destTxt,'r');
                fsdestTxt.closeSync(tempFile10);
                fsdestTxt.unlinkSync(destTxt);
            }

            purchaseOrderSummary.purchaseOrderSavePDF();
 
            browser.driver.wait(function() {
                return fssourcePDF.existsSync(sourcePDF);
            }, 30000).then(function() {
                
                 commons.parsePdf(sourcePDF, destTxt);
                
                 browser.driver.wait(function() {
                      return fsdestTxt.existsSync(destTxt);
                 }, 30000).then(function() {
                        expect(fsdestTxt.readFileSync(destTxt, { encoding: 'utf8' })).toMatch(totalAllowanceDollars);
                        expect(fsdestTxt.readFileSync(destTxt, { encoding: 'utf8' })).toMatch(totalChargeDollars);
                        expect(fsdestTxt.readFileSync(destTxt, { encoding: 'utf8' })).toMatch(totalServiceDollars);
                        expect(fsdestTxt.readFileSync(destTxt, { encoding: 'utf8' })).toMatch(totalAmountDollars);
                        expect(fsdestTxt.readFileSync(destTxt, { encoding: 'utf8' })).toMatch(totalAmountDueDollars);
                        
                        
                }); 
            });

            browser.get(purchaseOrderUrl);
 //           purchaseOrderSummary.purchaseOrderSearchRemove("1");
            purchaseOrderSummary.purchaseOrderSearch("PO Number",PONumber);
            browser.sleep(2000);
            purchaseOrderSummary.purchaseOrderView();            
                        
            purchaseOrderEdit.editCurrency();
            purchaseOrderEdit.changeSellerCurrency("EURO");
            purchaseOrderEdit.changeExchangeRate("0.9002");
            purchaseOrderEdit.saveCurrency();
            
            expect(purchaseOrderEdit.allowanceAmountFeesEuros()).toEqual('(€8.61)');
            expect(purchaseOrderEdit.allowanceAmountPercentageEuros()).toEqual('(€34.24)');
            expect(purchaseOrderEdit.chargeAmountFeesEuros()).toEqual('€0.51');
            expect(purchaseOrderEdit.chargeAmountPercentageEuros()).toEqual('€9.72');
            expect(purchaseOrderEdit.serviceAmountFeesEuros()).toEqual('€0.14');
            expect(purchaseOrderEdit.serviceAmountPercentageEuros()).toEqual('€43.20');
            expect(purchaseOrderEdit.getTotalEuros()).toEqual('€1,730.47');
            
            
            var totalAllowanceEuros = "Allowances Total:€ " + "42.85";
            var totalChargeEuros = "Charges Total:€ " + "10.23";
            var totalServiceEuros = "Services Total:€ " + "43.34";
            var totalAmountEuros = "Order Total:€ " + "1,719.76";
            var totalAmountDueEuros = "Total Due:€ " + "1,730.47";            
            
            
            browser.get(purchaseOrderUrl);        
     //       purchaseOrderSummary.purchaseOrderSearchRemove("1");
            purchaseOrderSummary.purchaseOrderCSVExport();
 
            var filename = './tempFiles/purchaseOrder.csv';
            var fs = require('fs');

            if (fs.existsSync(filename)) {
                // Make sure the browser doesn't have to rename the download.
                fs.unlinkSync(filename);
            }
          
            purchaseOrderSummary.purchaseOrderCSVDownload();



            browser.driver.wait(function() {
                return fs.existsSync(filename);
            }, 30000).then(function() {
                var regExp = PONumber + ".*" + totalInDollars;
                expect(fs.readFileSync(filename, { encoding: 'utf8' })).toMatch(regExp);
            });


           browser.get(reportsUrl);

           var filename2 = './tempFiles/PurchaseOrderWIPCSV.csv';
           var fs2 = require('fs');

           if (fs2.existsSync(filename2)) {
               // Make sure the browser doesn't have to rename the download.
               fs2.unlinkSync(filename2);
           }

           reportsSummary.purchaseOrderWIPCSVDownload();

            browser.driver.wait(function() {
                return fs2.existsSync(filename2);
            }, 30000).then(function() {

                var checkLine1 = PONumber + ".*" + lineItem1Total;
                var checkLine2 = PONumber + ".*" + lineItem2Total;
                var checkLine3 = PONumber + ".*" + lineItem3Total;
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine1);
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine2);
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine3);

            });

           browser.get(purchaseOrderUrl);
           purchaseOrderSummary.purchaseOrderSearch("PO Number", PONumber);
           browser.sleep(2000);
           purchaseOrderSummary.purchaseOrderSelectGear("Print");

           var sourcePDF2 = "./tempFiles/export (1).pdf";
           var destTxt2 = "./tempFiles/export (1).txt";

           fssourcePDF2 = require('fs');
           fsdestTxt2 = require('fs');

           if (fssourcePDF2.existsSync(sourcePDF2)) {
               // Make sure the browser doesn't have to rename the download
               fssourcePDF2.unlinkSync(sourcePDF2);
           }

           if (fsdestTxt2.existsSync(destTxt2)) {
               // Make sure the browser doesn't have to rename the download               
               fsdestTxt2.unlinkSync(destTxt2);
           }

           purchaseOrderSummary.purchaseOrderSavePDF();

           browser.driver.wait(function() {
               return fssourcePDF2.existsSync(sourcePDF2);
           }, 30000).then(function() {
                
                commons.parsePdf(sourcePDF2, destTxt2);
                
                browser.driver.wait(function() {
                     return fsdestTxt2.existsSync(destTxt2);
                }, 30000).then(function() {
                       expect(fsdestTxt2.readFileSync(destTxt2, { encoding: 'utf8' })).toMatch(totalAllowanceEuros);
                       expect(fsdestTxt2.readFileSync(destTxt2, { encoding: 'utf8' })).toMatch(totalChargeEuros);
                       expect(fsdestTxt2.readFileSync(destTxt2, { encoding: 'utf8' })).toMatch(totalServiceEuros);
                       expect(fsdestTxt2.readFileSync(destTxt2, { encoding: 'utf8' })).toMatch(totalAmountEuros);
                       expect(fsdestTxt2.readFileSync(destTxt2, { encoding: 'utf8' })).toMatch(totalAmountDueEuros); 
                       
               });
           });
                

        });


        it('Purchase order with SAC charges, currency conversion, more than 2 decimals - TC0003', function(){

            browser.get(purchaseOrderUrl);

            console.log("navigating to purchase order new screen");
            commons.new();
            browser.driver.sleep(2);
            browser.waitForAngular();

            purchaseOrderCreate.vendorSelection();
            purchaseOrderCreate.vendorLookup();
            purchaseOrderCreate.enterVendorName("LUX");

            purchaseOrderCreate.search();
            purchaseOrderCreate.selectVendor();
            purchaseOrderCreate.useSelectedVendor();

            purchaseOrderCreate.siteLookup();
            purchaseOrderCreate.enterSiteName("TOTAL");

            purchaseOrderCreate.search();

            purchaseOrderCreate.selectSite();
            purchaseOrderCreate.useSelectedSite();

            purchaseOrderCreate.poolSelection("DC-TR - Retail_Ecommerce");
            purchaseOrderCreate.enterBuyerOrg("Ghurka");
            purchaseOrderCreate.addItem();

            purchaseOrderCreate.enterProductName("ZZGGA230BTTB");
            purchaseOrderCreate.search();
            purchaseOrderCreate.selectProduct();
            purchaseOrderCreate.qty(3);
            purchaseOrderCreate.addProduct();

            browser.sleep(2000);
            purchaseOrderCreate.addItem();
            purchaseOrderCreate.enterProductName("ZZGGA231TUBK");
            purchaseOrderCreate.search();
            purchaseOrderCreate.selectProduct();
            purchaseOrderCreate.addProduct();
            browser.sleep(2000);
            purchaseOrderCreate.addItem();
            purchaseOrderCreate.enterProductName("ZZGGA230VBKZ");
            purchaseOrderCreate.search();
            purchaseOrderCreate.selectProduct();
            purchaseOrderCreate.addProduct();

            browser.sleep(2000); 
            purchaseOrderCreate.updateDiscount("9.85647","1");
            purchaseOrderCreate.updateQty("12", "2");
            purchaseOrderCreate.updateDiscount("1.99882","2");
           
            purchaseOrderCreate.savePO();
            browser.sleep(3000);
            browser.get(purchaseOrderUrl);
            purchaseOrderSummary.purchaseOrderSearch("Status","OPEN");
  			
            purchaseOrderSummary.purchaseOrderNumber().then(function(value) {
            	PONumber = value;
            });
            browser.sleep(2000);
  			
            purchaseOrderSummary.purchaseOrderView();
            expect(purchaseOrderEdit.getLineItemTotal(1)).toEqual('$240.43');
            expect(purchaseOrderEdit.getLineItemTotal(2)).toEqual('$1,740.01');
            expect(purchaseOrderEdit.getLineItemTotal(3)).toEqual('$137.00');
            expect(purchaseOrderEdit.getTotalDollars()).toEqual('$2,117.45');

            var lineItem1Total = purchaseOrderEdit.getLineItemTotal(1);
            var lineItem2Total = purchaseOrderEdit.getLineItemTotal(2);
            var lineItem3Total = purchaseOrderEdit.getLineItemTotal(3);

            browser.sleep(2000);
            purchaseOrderEdit.selectLineItem("3");
            browser.sleep(3000);
            purchaseOrderEdit.editLineItem();
            purchaseOrderEdit.updateLineItemQty("13");
            purchaseOrderEdit.updateLineItemPrice("49.99999");
            purchaseOrderEdit.updateLineItemDiscount("1");
            purchaseOrderEdit.updateLineItem();
            expect(purchaseOrderEdit.getLineItemTotal(3)).toEqual('$637.00');
            expect(purchaseOrderEdit.getTotalDollars()).toEqual('$2,617.45');


            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("ALLOWANCE");
            purchaseOrderEdit.chargeName("A1");
            purchaseOrderEdit.chargeKind("Amount");
            purchaseOrderEdit.chargeAmount("19.616162");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("ALLOWANCE");
            purchaseOrderEdit.chargeName("A2");
            purchaseOrderEdit.chargeKind("Percentage");
            purchaseOrderEdit.chargePercentage("1.09098");
            purchaseOrderEdit.createSAC();


            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("CHARGE");
            purchaseOrderEdit.chargeName("C1");
            purchaseOrderEdit.chargeKind("Amount");
            purchaseOrderEdit.chargeAmount("0.92565");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("CHARGE");
            purchaseOrderEdit.chargeName("C2");
            purchaseOrderEdit.chargeKind("Percentage");
            purchaseOrderEdit.chargePercentage("0.1565");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("SERVICE");
            purchaseOrderEdit.chargeName("S1");
            purchaseOrderEdit.chargeKind("Amount");
            purchaseOrderEdit.chargeAmount("0.95699");
            purchaseOrderEdit.createSAC();

            purchaseOrderEdit.goToSAC();
            purchaseOrderEdit.newSAC();
            purchaseOrderEdit.chargeType("SERVICE");
            purchaseOrderEdit.chargeName("S2");
            purchaseOrderEdit.chargeKind("Percentage");
            purchaseOrderEdit.chargePercentage("2.45619");
            purchaseOrderEdit.createSAC();
           
            expect(purchaseOrderEdit.allowanceAmountFeesDollars()).toEqual('($19.62)');
            expect(purchaseOrderEdit.allowanceAmountPercentageDollars()).toEqual('($28.56)');
            expect(purchaseOrderEdit.chargeAmountFeesDollars()).toEqual('$0.93');
            expect(purchaseOrderEdit.chargeAmountPercentageDollars()).toEqual('$4.10');
            expect(purchaseOrderEdit.serviceAmountFeesDollars()).toEqual('$0.96');
            expect(purchaseOrderEdit.serviceAmountPercentageDollars()).toEqual('$64.29');
            expect(purchaseOrderEdit.getTotalDollars()).toEqual('$2,639.54');

            var totalInDollars = purchaseOrderEdit.getTotalDollars();

            var totalAllowanceDollars = "Allowances Total:\\$ " + "48.17";
            var totalChargeDollars = "Charges Total:\\$ " + "5.02";
            var totalServiceDollars = "Services Total:\\$ " + "65.25";
            var totalAmountDollars = "Order Total:\\$ " + "2,617.44";
            var totalAmountDueDollars = "Total Due:\\$ " + "2,639.54";


            browser.get(purchaseOrderUrl);
      //      purchaseOrderSummary.purchaseOrderSearchRemove("1");
            
            purchaseOrderSummary.purchaseOrderSearch("PO Number", PONumber);
            browser.sleep(2000);
            purchaseOrderSummary.purchaseOrderSelectGear("Print");

            var sourcePDFTC0003 = "./tempFiles/export.pdf";
            var destTxtTC0003 = "./tempFiles/export.txt";

            var fssourcePDFTC0003 = require('fs');
            var fsdestTxtTC0003 = require('fs');

            if (fssourcePDFTC0003.existsSync(sourcePDFTC0003)) {
                // Make sure the browser doesn't have to rename the download
               fssourcePDFTC0003.unlinkSync(sourcePDFTC0003);
            }

            if (fsdestTxtTC0003.existsSync(destTxtTC0003)) {
                // Make sure the browser doesn't have to rename the download
                var tempFile10 = fsdestTxtTC0003.openSync(destTxtTC0003,'r');
                fsdestTxtTC0003.closeSync(tempFile10);
                fsdestTxtTC0003.unlinkSync(destTxtTC0003);
            }

            purchaseOrderSummary.purchaseOrderSavePDF();

            fssourcePDFTC0003 = require('fs');
            fsdestTxtTC0003 = require('fs');

            sourcePDFTC0003 = "../protractor_1.5/tempFiles/export.pdf";
            destTxtTC0003 = "./tempFiles/export.txt";

            browser.driver.wait(function() {
                return fssourcePDFTC0003.existsSync(sourcePDFTC0003);
            }, 30000).then(function() {
                
                 commons.parsePdf(sourcePDFTC0003, destTxtTC0003);
                
                 browser.driver.wait(function() {
                      return fsdestTxtTC0003.existsSync(destTxtTC0003);
                 }, 30000).then(function() {
                        expect(fsdestTxtTC0003.readFileSync(destTxtTC0003, { encoding: 'utf8' })).toMatch(totalAllowanceDollars);
                        expect(fsdestTxtTC0003.readFileSync(destTxtTC0003, { encoding: 'utf8' })).toMatch(totalChargeDollars);
                        expect(fsdestTxtTC0003.readFileSync(destTxtTC0003, { encoding: 'utf8' })).toMatch(totalServiceDollars);
                        expect(fsdestTxtTC0003.readFileSync(destTxtTC0003, { encoding: 'utf8' })).toMatch(totalAmountDollars);
                        expect(fsdestTxtTC0003.readFileSync(destTxtTC0003, { encoding: 'utf8' })).toMatch(totalAmountDueDollars);
                        
                });
            });

            browser.get(purchaseOrderUrl);
         //   purchaseOrderSummary.purchaseOrderSearchRemove("1");
            
            purchaseOrderSummary.purchaseOrderSearch("PO Number", PONumber);
            browser.sleep(2000);
            purchaseOrderSummary.purchaseOrderView();
            
            purchaseOrderEdit.editCurrency();
            purchaseOrderEdit.changeSellerCurrency("EURO");
            purchaseOrderEdit.changeExchangeRate("0.7229");
            purchaseOrderEdit.saveCurrency();
            
            expect(purchaseOrderEdit.allowanceAmountFeesEuros()).toEqual('(€14.18)');
            expect(purchaseOrderEdit.allowanceAmountPercentageEuros()).toEqual('(€20.64)');
            expect(purchaseOrderEdit.chargeAmountFeesEuros()).toEqual('€0.67');
            expect(purchaseOrderEdit.chargeAmountPercentageEuros()).toEqual('€2.96');
            expect(purchaseOrderEdit.serviceAmountFeesEuros()).toEqual('€0.69');
            expect(purchaseOrderEdit.serviceAmountPercentageEuros()).toEqual('€46.48');
            expect(purchaseOrderEdit.getTotalEuros()).toEqual('€1,908.12');

            var totalInEuros = purchaseOrderEdit.getTotalEuros();

            var totalAllowanceEuros = "Allowances Total:€ " + "34.82";
            var totalChargeEuros = "Charges Total:€ " + "3.63";
            var totalServiceEuros = "Services Total:€ " + "47.17";
            var totalAmountEuros = "Order Total:€ " + "1,892.15";
            var totalAmountDueEuros = "Total Due:€ " + "1,908.12";


            browser.get(purchaseOrderUrl);        
            purchaseOrderSummary.purchaseOrderCSVExport();
 
            var filename = './tempFiles/purchaseOrder.csv';
            var fs = require('fs');

            if (fs.existsSync(filename)) {
                // Make sure the browser doesn't have to rename the download.
                fs.unlinkSync(filename);
            }
          
            purchaseOrderSummary.purchaseOrderCSVDownload();

            browser.driver.wait(function() {
                return fs.existsSync(filename);
            }, 30000).then(function() {
                var regExp = PONumber + ".*" + totalInDollars;
                expect(fs.readFileSync(filename, { encoding: 'utf8' })).toMatch(regExp);
            });


           browser.get(reportsUrl);

           var filename2 = './tempFiles/PurchaseOrderWIPCSV.csv';
           var fs2 = require('fs');

           if (fs2.existsSync(filename2)) {
               // Make sure the browser doesn't have to rename the download.
               fs2.unlinkSync(filename2);
           }

           reportsSummary.purchaseOrderWIPCSVDownload();

            browser.driver.wait(function() {
                return fs2.existsSync(filename2);
            }, 30000).then(function() {

                var checkLine1 = PONumber + ".*" + lineItem1Total;
                var checkLine2 = PONumber + ".*" + lineItem2Total;
                var checkLine3 = PONumber + ".*" + lineItem3Total;
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine1);
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine2);
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine3);

            });


           var sourcePDF2TC0003 = "./tempFiles/export (1).pdf";
           var destTxt2TC0003 = "./tempFiles/export (1).txt";

           fssourcePDF2TC0003 = require('fs');
           fsdestTxt2TC0003 = require('fs');

           if (fssourcePDF2TC0003.existsSync(sourcePDF2TC0003)) {
               // Make sure the browser doesn't have to rename the download
               fssourcePDF2TC0003.unlinkSync(sourcePDF2TC0003);
           }

           if (fsdestTxt2TC0003.existsSync(destTxt2TC0003)) {
               // Make sure the browser doesn't have to rename the download               
               fsdestTxt2TC0003.unlinkSync(destTxt2TC0003);
           }
 
           browser.get(purchaseOrderUrl);
     //      purchaseOrderSummary.purchaseOrderSearchRemove("1");
           
           purchaseOrderSummary.purchaseOrderSearch("PO Number", PONumber);
           browser.sleep(2000);
           purchaseOrderSummary.purchaseOrderSelectGear("Print");

           purchaseOrderSummary.purchaseOrderSavePDF();

           fssourcePDF2TC0003 = require('fs');
           fsdestTxt2TC0003 = require('fs');

           sourcePDF2TC0003 = "../protractor_1.5/tempFiles/export (1).pdf";
           destTxt2TC0003 = "./tempFiles/export (1).txt";
           browser.driver.wait(function() {
               return fssourcePDF2TC0003.existsSync(sourcePDF2TC0003);
           }, 30000).then(function() {
                
                commons.parsePdf(sourcePDF2TC0003, destTxt2TC0003);
                
                browser.driver.wait(function() {
                     return fsdestTxt2TC0003.existsSync(destTxt2TC0003);
                }, 30000).then(function() {
                	   expect(fsdestTxt2TC0003.readFileSync(destTxt2TC0003, { encoding: 'utf8' })).toMatch(totalAllowanceEuros);
                       expect(fsdestTxt2TC0003.readFileSync(destTxt2TC0003, { encoding: 'utf8' })).toMatch(totalChargeEuros);
                       expect(fsdestTxt2TC0003.readFileSync(destTxt2TC0003, { encoding: 'utf8' })).toMatch(totalServiceEuros);
                       expect(fsdestTxt2TC0003.readFileSync(destTxt2TC0003, { encoding: 'utf8' })).toMatch(totalAmountEuros);
                       expect(fsdestTxt2TC0003.readFileSync(destTxt2TC0003, { encoding: 'utf8' })).toMatch(totalAmountDueEuros);
				});
         	}); 	 
 
           browser.get(purchaseOrderUrl);
        //   purchaseOrderSummary.purchaseOrderSearchRemove("1");


		   flow1 = protractor.promise.controlFlow();
		   flow2 = protractor.promise.controlFlow();
             browser.manage().getCookie('envisionSession').then(function(cookie) {
      				tempCookie = cookie.value;
   				 });
   				 
   				 browser.get(purchaseOrderUrl);
   				 purchaseOrderSummary.purchaseOrderSearch("PO Number", PONumber);
                                 browser.sleep(2000);
   				 purchaseOrderSummary.purchaseOrderSelectGear("Release");
   				 browser.get(purchaseOrderUrl);
         //        purchaseOrderSummary.purchaseOrderSearchRemove("1");

   				 
           flow1.wait(protractor.promise.delayed(240000)).then(function() {

   				 browser.get(purchaseOrderUrl); 
   				 purchaseOrderSummary.purchaseOrderSearch("PO Number", PONumber);
                                 browser.sleep(2000);	
 						var options1 = {
								host: 'cantata.qa.enspirecommerce.com',
								path: "/api/v1/quickbooks/purchaseOrder/" + erpProfileId + "/" + PONumber,
								method: 'GET',
									headers: {
											'Cookie': "envisionSession=" + tempCookie,
											'accept': '*/*'
									},
		
								};
								
 						var options2 = {
								host: 'cantata.qa.enspirecommerce.com',
								path: "/api/v1/quickbooks/purchaseOrderReceipt/" + erpProfileId + "/" + PONumber,
								method: 'GET',
									headers: {
											'Cookie': "envisionSession=" + tempCookie,
											'accept': '*/*'
									},
		
								};
								
						 var expectedOutput1 = "\<TotalAmount\>1892.15\<\/TotalAmount\>";
					  	 var expectedOutput2 = "\<TotalAmountInHomeCurrency\>2617.44\<\/TotalAmountInHomeCurrency\>";
	             		 var expectedOutput3 = "\<Amount\>173.81\<\/Amount\>" ;
						 var expectedOutput4 = "<Amount>1257.86</Amount>";
						 var expectedOutput5 = "\<Amount\>460.49\<\/Amount\>";
			
						
						commons.httpGet(options1).then(function(result) {
                                                                        console.log(result.bodyString);
									expect(result.bodyString).toMatch(expectedOutput1);
									expect(result.bodyString).toMatch(expectedOutput2);
									expect(result.bodyString).toMatch(expectedOutput3);
									expect(result.bodyString).toMatch(expectedOutput4);
									expect(result.bodyString).toMatch(expectedOutput5);						
						});

						commons.httpGet(options2).then(function(result) {
									expect(result.bodyString).toMatch(expectedOutput1);
									expect(result.bodyString).toMatch(expectedOutput2);
									expect(result.bodyString).toMatch(expectedOutput3);
									expect(result.bodyString).toMatch(expectedOutput4);
									expect(result.bodyString).toMatch(expectedOutput5);						
						});




			});


        });
        
})

