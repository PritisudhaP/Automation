var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');
var skuEditScreen = require(process.cwd() + '/src/tests/screens/sku/sku.edit.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.currentSONumber="";
global.newSONumber="";


describe('Sales Order Flow  : ', function(){
    var mailbox = new mailboxScreen();
    var skuSummary = new skuSummaryScreen();
    var skuEdit = new skuEditScreen();
    var commons = new common();

    it('SKU update event generation - TC0001', function(){

        browser.get(skuUrl);
        commons.multiselect();
//        skuSummary.skuSearch("SKU","DAMAGED-ER");
        commons.searchWithCriteria("SKU","contains","DAMAGED-ER");
        browser.sleep(2000);
        skuSummary.skuSelectGear("Edit");
        skuEdit.editSku();
        skuEdit.saveSku();

        browser.get(mailboxUrl);
        browser.sleep(5000);
        mailbox.selectMailboxType("intermediateboxes");
        browser.sleep(2000);
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","SkuUpdate-OutToWMS");
        browser.sleep(2000);
        mailbox.selectMailbox("SkuUpdate-OutToWMS");
        mailbox.selectMailbox("SkuUpdate-OutToWMS");
//        mailbox.mailboxSearch("sku","DAMAGED-ER");
        commons.searchWithCriteria("Subject","contains","DAMAGED-ER");
        browser.sleep(2000);
        mailbox.msgSelectGear("Edit");
        browser.sleep(2000);
        mailbox.fileView();
        browser.sleep(2000);
        var elem = element(by.xpath('//en-icon[@icon="plus"]'));
        browser.actions().mouseMove(elem).perform();

        expect(mailbox.fileContentOnScreen()).toMatch('<skus>');
        browser.sleep(2000);
        mailbox.back();
        browser.sleep(2000);


    });
})
