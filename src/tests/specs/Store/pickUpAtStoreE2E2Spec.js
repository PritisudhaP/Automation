//********************************************************* Valid test case ****************************************************
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');
var storePortal = require(process.cwd() + '/src/tests/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');
var storePortalBopisScreen = require(process.cwd() + '/src/tests/screens/storePortalV2/storePortalBopis.screen.js')

global.orderStatus = "";
global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";
global.postInventoryCount = "";
global.resInventoryCount = "";
global.updatedResCount = "";
global.postResCount = "";

describe('Verify  if user can  accept the orders (Accept Full-Pick Partial)-multiple lines :TC0006 ', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var callCenter = new callCenterScreen();
    var commons = new common();
    var inventorySearch = new inventorySearchScreen();
    var storePortalBopis = new storePortalBopisScreen();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    it('print pick list by order for single line - TC0001', function () {
        storePortalBopis.navigateToStorePortalV2Screen();
        browser.sleep(1000);
      //  storePortalBopis.filerIconclick();
        storePortalBopis.searchQueryCriteria("Status","Pending");
       storePortalBopis.singleOrderSelect();

      //  storePortalBopis.printPickList();

     //   storePortalBopis.pickListByOrderSavePDF();
        browser.sleep(2000);

       var sourcePDF = "./tempFiles/export.pdf";
        var destTxt = "./tempFiles/export.txt";

     //   var sourcePDF1 = "./Files1/export.pdf";

        var fssourcePDF = require('fs');
        var fsdestTxt = require('fs');

       if (fssourcePDF.existsSync(sourcePDF)) {
            // Make sure the browser doesn't have to rename the download
            fssourcePDF.unlinkSync(sourcePDF);
        }

        if (fsdestTxt.existsSync(destTxt)) {
            // Make sure the browser doesn't have to rename the download
            var tempFile10 = fsdestTxt.openSync(destTxt, 'r');
            fsdestTxt.closeSync(tempFile10);
            fsdestTxt.unlinkSync(destTxt);
        }
//*******************<<< print picklist and download the pick list in the pdf format >>>>>**********///////
        storePortalBopis.printPickList();
        storePortals.pickListByItemSavePDF();

        browser.sleep(4000);
        browser.driver.wait(function () {
            return fssourcePDF.existsSync(sourcePDF);
        }, 30000).then(function () {
            browser.sleep(3000);
            /*******<<<<<< Parsing pdf: convert pdf to txt  >>>>>>>>>>>************///

            commons.parsePdf(sourcePDF, destTxt);

            browser.sleep(4000);
            browser.driver.wait(function () {
                return fsdestTxt.existsSync(destTxt);
            }, 30000).then(function () {
                console.log(fsdestTxt.readFileSync(destTxt, {encoding: 'utf8'}));
                expect(fsdestTxt.readFileSync(destTxt, {encoding: 'utf8'})).toMatch('Qty Needed2');

            });
            element(by.xpath("//span[text()='Close']")).click();
        })

      //  storePortalBopis.categorySearch();
    })
 /* it('print pick list by item  for - TC0001', function () {
        browser.sleep(1000);
        //  storePortalBopis.filerIconclick();
        storePortalBopis.searchQueryCriteria("Status","Pending");
        storePortalBopis.singleOrderSelect();
        storePortalBopis.printPickList();
        browser.sleep(10000);
        storePortalBopis.pickListByitemSavePDF();
        browser.sleep(10000);
        storePortalBopis.categorySearch();
    }) */
 /*  it('print pick list by order for single line - TC0001', function () {
        storePortalBopis.navigateToStorePortalV2Screen();
        browser.sleep(1000);
        //  storePortalBopis.filerIconclick();
        storePortalBopis.searchQueryCriteria("Status","Pending");
        storePortalBopis.multipleOrderSelect();
        storePortalBopis.printPickList();
        browser.sleep(10000);
        storePortalBopis.pickListByOrderSavePDF();
        browser.sleep(10000);
        storePortalBopis.categorySearch();
    })
    it('print pick list by order for single line - TC0001', function () {
        storePortalBopis.navigateToStorePortalV2Screen();
        browser.sleep(1000);
        //  storePortalBopis.filerIconclick();
        storePortalBopis.searchQueryCriteria("Status","Pending");
        storePortalBopis.multipleOrderSelect();
        storePortalBopis.printPickList();
        browser.sleep(10000);
        storePortalBopis.pickListByitemSavePDF();
        browser.sleep(10000);
        storePortalBopis.categorySearch();
    })*/

    })





