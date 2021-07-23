var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.RMANumber = "";
global.orderStatus = "";
global.SONumber = "";
global.RMAStatus = "";
describe("Order returns : ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();  
		it('Blind Return-TC0021', function(){
			
			browser.get(returnsUrl);
	        browser.driver.manage().window().maximize();
            console.log("navigating to Returns  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();
            returnsCreate.BlindreturnClick();
            returnsCreate.ChannelSelectiondropdown(browser.params.channelName);
            commons.customerLookup();
            commons.searchWithCriteria("Name","contains",browser.params.custFirstName);
            browser.sleep(1000);
            returnsCreate.selectCustomer();
            browser.sleep(1000);
            returnsCreate.useSelectedCustomer();
            browser.sleep(1000);
            returnsCreate.returnLocationSelect("Joliet-DC");
            returnsCreate.saveBlindReturns();             
            browser.sleep(1000);
            returnsCreate.productLookup();
            browser.sleep(2000);
            returnsCreate.productSearchScreen(browser.params.searchValueSKU1);
            browser.sleep(1000);
            returnsCreate.BlindReturnSelectProduct();
            browser.sleep(1000);
            returnsCreate.addSelectedProductsButton();
            browser.sleep(2000);
            returnsCreate.totalReturnsItem("DAMAGED");
            returnsCreate.creditType("REFUND");
            browser.sleep(3000);            
            returnsEdit.saveReturns();
            expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save button
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber = value.substring(34,44);
                console.log("the RMA number is "+RMANumber)
            });
            returnsEdit.saveAndReleaseReturns();
            expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save and release button
            browser.sleep(3000);        
            returnsCreate.saveandreleaseIcon();
            returnsCreate.RMAGenerate(); 
            browser.sleep(2000)
            browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('RELEASED');

	          });      
         });  
	});
});
