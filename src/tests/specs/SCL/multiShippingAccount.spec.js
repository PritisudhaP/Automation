var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
global.SONumber="";
global.errormsg="";


describe('Shipment creation with sites having multiple shipping Fedex accounts  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var commons = new common();

        it('Shipment creation with sites having multiple shipping Fedex accounts - TC0001', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("B2C");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("B4");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();


            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            browser.sleep(2000)

            salesOrderCreate.saveOption("Save");
            browser.sleep(2000)
            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",SONumber);

                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });

            browser.get(shipmentRequestsUrl);

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);


                                shipmentRequestsSummary.shipmentRequestSearch("Order #",SONumber);
                                browser.sleep(3000);
                                shipmentRequestsSummary.shipmentRequestSelectGear("Edit");
                                browser.sleep(3000);
                                shipmentRequestsCreate.createShipment();
                                browser.sleep(3000);
                                shipmentRequestsCreate.doNotGenerateLabel('Uncheck');

                                shipmentRequestsCreate.selectShippingAccount("test");

                                shipmentRequestsCreate.packageSelection("tst");

                                shipmentRequestsCreate.enterItemQty("1");

                                shipmentRequestsCreate.addPackageToShipment();

                                shipmentRequestsCreate.finalizeShipment();

                                expect(shipmentRequestsCreate.shipmentErrorMsg()).toContain('Error generating label for Shipment');
                              shipmentRequestsCreate.shipmentCancel();








                                browser.get(shipmentRequestsUrl);

                                shipmentRequestsSummary.shipmentRequestSearch("Order #",SONumber);
                                browser.sleep(3000);
                                shipmentRequestsSummary.shipmentRequestSelectGear("Edit");

                                browser.sleep(3000);
                                shipmentRequestsCreate.createShipment();
                                shipmentRequestsCreate.doNotGenerateLabel('Uncheck');
                                shipmentRequestsCreate.selectShippingAccount("247981470");
                                shipmentRequestsCreate.packageSelection("tst");
                                shipmentRequestsCreate.enterItemQty("1");
                                shipmentRequestsCreate.addPackageToShipment();
                                shipmentRequestsCreate.finalizeShipment();
                                browser.sleep(4000);


                                browser.get(shipmentRequestsUrl);
                                shipmentRequestsSummary.shipmentRequestSearch("Order #",SONumber);
                                browser.sleep(2000);
                                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');





            });




        });


})
