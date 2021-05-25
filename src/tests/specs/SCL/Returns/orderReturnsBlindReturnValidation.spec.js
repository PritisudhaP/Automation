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
		it('Blind Return Validation-TC0022', function(){
			
			browser.get(returnsUrl);
	        browser.driver.manage().window().maximize();
            console.log("navigating to Returns  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();
            returnsCreate.BlindreturnClick();
 //no channel selected           
            returnsCreate.saveBlindReturns();                  
            expect(returnsCreate.reasonvalidation()).toBe(true); 
            browser.sleep(1000);
            returnsCreate.ChannelSelectiondropdown(browser.params.channelName);
//customer Name search      
            commons.customerLookup();
            browser.sleep(3000);
            commons.searchWithCriteria('Name', 'contains',browser.params.custDisplayName);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
            browser.sleep(1000);
            expect(returnsCreate.filterCheck(1)).toContain(browser.params.custFirstName);
            browser.refresh();     
            browser.sleep(3000);
 //customer search using Email address 
            returnsCreate.ChannelSelectiondropdown(browser.params.channelName);
            commons.customerLookup();
            browser.sleep(2000);
            commons.searchWithCriteria('Customer Email Address', 'contains',browser.params.customerEmail);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
            browser.sleep(1000);
            expect(returnsCreate.filterCheck(2)).toEqual(browser.params.customerEmail);
//end//            
            returnsCreate.selectCustomer();
            returnsCreate.useSelectedCustomer();
            browser.sleep(2000);  
            
//Return location error message validation            
            
            returnsCreate.saveBlindReturns();                  
            expect(returnsCreate.reasonvalidation()).toBe(true); 
            browser.sleep(1000);
            returnsCreate.returnLocationSelect("Joliet-DC");
            browser.sleep(1000);
            returnsCreate.saveBlindReturns();  
//end                   
            returnsCreate.productLookup();
            browser.sleep(1000);
            returnsCreate.productSearchScreen("AcuSKU11");
            browser.sleep(1000);
            returnsCreate.BlindReturnSelectProduct();
            browser.sleep(1000);
            returnsCreate.addSelectedProductsButton();
  //without refund method        
            browser.sleep(3000);
            returnsEdit.saveReturns();
            expect(returnsCreate.reasonvalidation()).toBe(true);            
//creating the RMA
            browser.refresh();
            browser.sleep(3000);
            returnsCreate.productLookup();
            returnsCreate.productSearchScreen("AcuSKU11");
            browser.sleep(1000);
            returnsCreate.BlindReturnSelectProduct();
            browser.sleep(1000);
            returnsCreate.addSelectedProductsButton();
            browser.sleep(2000);
            returnsCreate.totalReturnsItem("DAMAGED");
            returnsCreate.creditType("REFUND");
            returnsEdit.saveReturns();
            expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save button
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber = value.substring(34,44);
                console.log("the RMA number is "+RMANumber)
            });
            browser.sleep(3000);
            returnsEdit.saveAndReleaseReturns();
            expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save and release button
            browser.sleep(3000);        
            returnsCreate.saveandreleaseIcon();
            returnsCreate.RMAGenerate(); 
            expect(returnsEdit.AlertPresence()).toBe(false);
            
//Save and release without selecting the line item.
            browser.sleep(2000);
            browser.refresh();
            returnsCreate.creditType("REFUND");
            returnsEdit.saveAndReleaseReturns();
            returnsCreate.RMAGenerate(); 
            expect(returnsCreate.noItemAlert()).toBe(true); 
	})
})
			