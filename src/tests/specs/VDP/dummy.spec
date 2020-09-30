var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.currentSONumber="";
global.newSONumber="";
global.shipmentRequestNumber="";
global.invoiceNumber="";

global.currentEDISONumber="";
global.newEDISONumber="";
global.shipmentRequestNumberEDI="";
global.invoiceNumberEDI="";


var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');

describe('E2E Flow of loading vendors, products, product cost, sales order and taking it to invoice : ', function(){
    var loginScreen = new loginPage();
    var commons = new common();
    var invoiceSummary = new invoiceSummaryScreen();
 
    it('Load vendors, Product, Cost, Sales order - E2E0001', function(){
            
            browser.get(browser.baseUrl);
            browser.driver.manage().window().maximize();


            loginScreen.setUsername(browser.params.login.vdpUser);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(5000);
            
            newSONumber="VDP_E2E_10120";

                browser.get(invoiceUrl);
                browser.sleep(2000);
                invoiceSummary.invoiceSearch("Order Number", newSONumber);
                browser.sleep(2000);
                commons.refresh();
                browser.sleep(2000);
                invoiceSummary.getInvoiceNumber().then(function(value) {
                    invoiceNumber = value;
                    console.log(invoiceNumber);
                    invoiceSummary.invoiceSelectGear("Release");
                    expect(invoiceSummary.invoiceStatus()).toEqual('RELEASED');

                });




        });
 })
