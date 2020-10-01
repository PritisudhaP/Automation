var inventorypublishcreateScreen = require(process.cwd() + '/screens/inventoryPublish/inventorypublish.create.screen.js');
var inventorypublishsummaryscren = require(process.cwd() + '/screens/inventoryPublish/inventorypublish.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var inventoryLookUp = require(process.cwd() + '/screens/inventoryLooKUp/inventoryLookUp.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');

global.NumberOfRecords = "";
global.NumberOfRecordsFromInventory = "";
global.siteValue1 = "";
global.siteValue2 = "";
global.siteSumvalue = "";
global.fileName = "";
global.fileContent = "";
global.valueOfStatus = "";

describe('Inventory Publish Flow ', function () {

    var inventorypublishcreate = new inventorypublishcreateScreen();
    var inventoryPublishsummary = new inventorypublishsummaryscren();
    var commons = new common();
    var inventoryLookUpScreen = new inventoryLookUp();
    var inventorySearch = new inventorySearchScreen();
    var mailbox = new mailboxScreen();


    // TestCase TC00101: Create a mailbox and Inventory Publish Full Sync with Inventory Pool for selected organization
    // Validation: Verify count of inventory publish should same with inventory look up count when search with organization
    // Validation: Verify status should change to COMPLETED after click on publish button.
    // Validation: Verify the filename in mailBox and its content.
    //After Full sync perform partial sync and check count should be zero.

    it('Inventory publish Full Sync-Inventory Pool TC0001', function () {

        browser.get(mailboxUrl);
        browser.sleep(2000);
        mailbox.newmailbox();
        browser.sleep(2000);
        mailbox.enterMailboxName('TestBoxForInventoryPublish');
        mailbox.enterMailboxRefName('TestBoxForInventoryPublish');
        mailbox.enterMailboxType('INTERMEDIATE');
        mailbox.pinMailbox();
        mailbox.createMailbox();
        browser.sleep(2000);

        browser.get(inventorypublishUrl);
        browser.sleep(2000);
        inventoryPublishsummary.clicknewButton();
        inventorypublishcreate.enterName('Test001');
        inventorypublishcreate.clickactivecheckbox();
        inventorypublishcreate.setPublishMode('Full Sync');
        inventorypublishcreate.setSummaryLevel('Inventory Pool');
        browser.sleep(2000);
        inventorypublishcreate.clickChooseOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.searchOrganisation(browser.params.orgName);
        inventorypublishcreate.selectOrganisation();
        inventorypublishcreate.addOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.selectMailBox('TestBoxForInventoryPublish');
        inventorypublishcreate.clickSave();
        browser.sleep(3000);
        browser.get(inventorypublishUrl);
        browser.sleep(3000);
        inventoryPublishsummary.searchInput('Test001');
        browser.sleep(1000);

        inventoryPublishsummary.clickPublish();
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(2000);
        expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');

        browser.sleep(3000);
        inventoryPublishsummary.expandPlusBlock();

        inventoryPublishsummary.getNumberOfRecords().then(function (value) {
            NumberOfRecords = value;
            console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);
        });
        browser.wait(function () {
            return NumberOfRecords != '';
        }).then(function () {
            browser.get(inventorySearchUrl);
            inventoryLookUpScreen.selectOrganisation(browser.params.orgName);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            inventorySearch.countFromInventory().then(function (inventory) {
                NumberOfRecordsFromInventory = inventory;
                NumberOfRecordsFromInventory = NumberOfRecordsFromInventory.replace(' results', "");
                console.log("NumberOfRecordsFromInventory " + NumberOfRecordsFromInventory);
                expect(NumberOfRecords).toEqual(NumberOfRecordsFromInventory);
            });


            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test001');
            browser.sleep(1000);
            inventoryPublishsummary.expandPlusBlock();
            browser.sleep(1000);
            inventoryPublishsummary.expandPlusBlock();
            browser.sleep(1000);
            inventoryPublishsummary.clickTransmissionId();

            inventoryPublishsummary.getFileName().then(function (file) {
                fileName = file;
                fileName = fileName.replace('File Names: ', "");
                console.log("file name is " + fileName);
            });
            browser.wait(function () {
                return fileName != '';
            }).then(function () {
                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes", "TestBoxForInventoryPublish");
                browser.sleep(2000);
                mailbox.selectMailbox("TestBoxForInventoryPublish");
                mailbox.selectMailbox("TestBoxForInventoryPublish");
                //mailbox.refresh();
                commons.searchWithCriteria("Subject", "contains", fileName);
                browser.sleep(1000);
                mailbox.msgSelectGear("Edit");

                mailbox.fileView();
                browser.sleep(5000);
                var elem = element(by.xpath('//en-icon[@icon="plus"]'));
                browser.actions().mouseMove(elem).perform();
                browser.sleep(2000);
                expect(mailbox.fileFullContentOnScreenIcon()).toMatch('<inventoryPoolRef>');


            });


            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test001');
            browser.sleep(3000);
            inventoryPublishsummary.inventoryPublishSelectGear('Edit');
            browser.sleep(3000);
            inventorypublishcreate.setPublishMode('Partial Sync');
            inventorypublishcreate.clickSave();
            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test001');
            browser.sleep(1000);

            inventoryPublishsummary.clickPublish();
            inventoryPublishsummary.expandPlusBlock();
            browser.sleep(200);
            browser.sleep(3000);
            expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
            inventoryPublishsummary.expandPlusBlock();

            inventoryPublishsummary.getNumberOfRecords().then(function (value) {
                NumberOfRecords = value;
                console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);
                expect(NumberOfRecords).toEqual('0');
            });
            browser.sleep(2000);
            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test001');
            inventoryPublishsummary.inventoryPublishSelectGear('Delete');
        });

    })

    // TestCase TC00102: Inventory Publish Full Sync with item for selected organization and excluding zeroInventory
    // Validation: Verify count of inventory publish should same with inventory look up count when search with organization and excluding zero Inventory.
    // Validation: Verify status should change to COMPLETED after click on publish button.
    // Validation: Verify the filename in mailBox and its content.


    it('Inventory publish Full Sync-Item Pool TC0002 ', function () {

        browser.get(inventorypublishUrl);
        browser.sleep(2000);
        inventoryPublishsummary.clicknewButton();
        inventorypublishcreate.enterName('Test002');
        inventorypublishcreate.clickactivecheckbox();
        inventorypublishcreate.setPublishMode('Full Sync');
        inventorypublishcreate.setSummaryLevel('Item');
        browser.sleep(2000);
        inventorypublishcreate.clickChooseOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.searchOrganisation(browser.params.orgName);
        inventorypublishcreate.selectOrganisation();
        inventorypublishcreate.addOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.selectMailBox('TestBoxForInventoryPublish');
        inventorypublishcreate.clickexcludezeroInventory();
        inventorypublishcreate.clickSave();
        browser.sleep(3000);
        browser.get(inventorypublishUrl);
        browser.sleep(3000);
        inventoryPublishsummary.searchInput('Test002');
        browser.sleep(1000);
        //inventoryPublishsummary.searchInput('Test002');
        inventoryPublishsummary.clickPublish();
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(200);
        expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
        browser.sleep(3000);
        inventoryPublishsummary.expandPlusBlock();
        inventoryPublishsummary.getNumberOfRecords().then(function (value) {
            NumberOfRecords = value;
            console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);
            expect(NumberOfRecords).toBeGreaterThan(0);

        });
        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test002');
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
        inventoryPublishsummary.clickTransmissionId();

        inventoryPublishsummary.getFileName().then(function (file) {
            fileName = file;
            fileName = fileName.replace('File Names: ', "");
            console.log("file name is " + fileName);
        });
        browser.wait(function () {
            return fileName != '';
        }).then(function () {
            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes", "TestBoxForInventoryPublish");
            browser.sleep(2000);
            mailbox.selectMailbox("TestBoxForInventoryPublish");
            mailbox.selectMailbox("TestBoxForInventoryPublish");
            //mailbox.refresh();
            commons.searchWithCriteria("Subject", "contains", fileName);
            browser.sleep(1000);
            mailbox.msgSelectGear("Edit");


            mailbox.fileView();
            browser.sleep(5000);
            var elem = element(by.xpath('//en-icon[@icon="plus"]'));
            browser.actions().mouseMove(elem).perform();
            expect(mailbox.fileFullContentOnScreenIcon()).toMatch('<skuId>');

        });

        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test002');
        browser.sleep(3000);
        inventoryPublishsummary.inventoryPublishSelectGear('Delete');


    })

    // TestCase TC00103: Inventory Publish Full Sync with SIte for selected organization and excluding InactiveItem after validation delete mailBox.
    // Validation: Verify count of inventory publish should same with inventory look up count when search with organization and excluding Inactive Item.
    // Validation: Verify status should change to COMPLETED after click on publish button.
    // Validation: Verify the filename in mailBox and its content.


    it('Inventory publish Full Sync-SIte TC0003 ', function () {

        browser.get(inventorypublishUrl);
        browser.sleep(2000);
        inventoryPublishsummary.clicknewButton();
        inventorypublishcreate.enterName('Test003');
        inventorypublishcreate.clickactivecheckbox();
        inventorypublishcreate.setPublishMode('Full Sync');
        inventorypublishcreate.setSummaryLevel('Site');
        browser.sleep(2000);
        inventorypublishcreate.clickChooseOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.searchOrganisation(browser.params.orgName);
        inventorypublishcreate.selectOrganisation();
        inventorypublishcreate.addOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.selectMailBox('TestBoxForInventoryPublish');
        inventorypublishcreate.clickexcludeInactiveItem();
        inventorypublishcreate.clickSave();
        browser.sleep(3000);
        browser.get(inventorypublishUrl);
        browser.sleep(3000);
        inventoryPublishsummary.searchInput('Test003');
        browser.sleep(1000);
        //inventoryPublishsummary.searchInput('Test003');
        inventoryPublishsummary.clickPublish();
        browser.sleep(40000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(200);
        expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
        browser.sleep(3000);
        inventoryPublishsummary.expandPlusBlock();
        inventoryPublishsummary.getNumberOfRecords().then(function (value) {
            NumberOfRecords = value;
            console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);
            expect(NumberOfRecords).toBeGreaterThan(0);
        });
        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test003');
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
        inventoryPublishsummary.clickTransmissionId();

        inventoryPublishsummary.getFileName().then(function (file) {
            fileName = file;
            fileName = fileName.replace('File Names: ', "");
            console.log("file name is " + fileName);
        });
        browser.wait(function () {
            return fileName != '';
        }).then(function () {
            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes", "TestBoxForInventoryPublish");
            browser.sleep(2000);
            mailbox.selectMailbox("TestBoxForInventoryPublish");
            mailbox.selectMailbox("TestBoxForInventoryPublish");
            //mailbox.refresh();
            commons.searchWithCriteria("Subject", "contains", fileName);
            browser.sleep(1000);
            mailbox.msgSelectGear("Edit");

            mailbox.fileView();
            browser.sleep(5000);
            var elem = element(by.xpath('//en-icon[@icon="plus"]'));
            browser.actions().mouseMove(elem).perform();
            expect(mailbox.fileFullContentOnScreenIcon()).toMatch('<siteRef>');


        });

        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test003');
        browser.sleep(3000);
        inventoryPublishsummary.inventoryPublishSelectGear('Delete');
    })

    // TestCase TC00104: Inventory Publish Full Sync with Inventory pool for selected organization and selected site type with excluding Zero inventory and Inactive item.
    // Validation: Verify count of inventory publish should same with inventory look up count when search with organization.
    // Validation: Verify status should change to COMPLETED after click on publish button.
    // Validation: Verify the filename in mailBox and its content.

 it('Inventory publish Full Sync-Inventory pool TC0004 ', function () {

        browser.get(inventorypublishUrl);
        browser.sleep(2000);
        inventoryPublishsummary.clicknewButton();
        inventorypublishcreate.enterName('Test004');
        inventorypublishcreate.clickactivecheckbox();
        inventorypublishcreate.setPublishMode('Full Sync');
        inventorypublishcreate.setSummaryLevel('Inventory Pool ');
        browser.sleep(2000);
        inventorypublishcreate.clickChooseOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.searchOrganisation(browser.params.orgName);
        inventorypublishcreate.selectOrganisation();
        inventorypublishcreate.addOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.clickChooseSiteType();
        browser.sleep(2000);
        inventorypublishcreate.selectSiteName("Distribution Center ");
        inventorypublishcreate.addSiteType();
        inventorypublishcreate.selectMailBox('TestBoxForInventoryPublish');
        inventorypublishcreate.clickexcludezeroInventory();
        inventorypublishcreate.clickexcludeInactiveItem();
        inventorypublishcreate.clickSave();
        browser.sleep(3000);
        browser.get(inventorypublishUrl);
        browser.sleep(3000);
        inventoryPublishsummary.searchInput('Test004');
        browser.sleep(2000);
        inventoryPublishsummary.clickPublish();
        browser.sleep(40000);
        inventoryPublishsummary.expandPlusBlock();

        expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
        browser.sleep(3000);
        inventoryPublishsummary.expandPlusBlock();
        inventoryPublishsummary.getNumberOfRecords().then(function (value) {
            NumberOfRecords = parseInt(value);
            console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);
        });
        browser.wait(function () {
            return NumberOfRecords != '';
        }).then(function () {
            browser.get(inventorySearchUrl);
            inventoryLookUpScreen.selectOrganisation(browser.params.orgName);
            inventoryLookUpScreen.selectSite(browser.params.DCSiteName);
            inventoryLookUpScreen.excludezeroInventoryProduct();
            browser.sleep(2000);
            inventoryLookUpScreen.excludeInactiveProduct();
            inventorySearch.searchInventory();
            browser.sleep(900);
            inventorySearch.countFromInventory().then(function (inventory) {
                NumberOfRecordsFromInventory = parseInt(inventory);
                console.log("NumberOfRecordsFromInventory " + NumberOfRecordsFromInventory);
                expect(NumberOfRecords).toEqual(NumberOfRecordsFromInventory);
            });

        });

        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test004');
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
        inventoryPublishsummary.clickTransmissionId();

        inventoryPublishsummary.getFileName().then(function (file) {
            fileName = file;
            fileName = fileName.replace('File Names: ', "");
            console.log("file name is " + fileName);
        });
        browser.wait(function () {
            return fileName != '';
        }).then(function () {
            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes", "TestBoxForInventoryPublish");
            browser.sleep(2000);
            mailbox.selectMailbox("TestBoxForInventoryPublish");
            mailbox.selectMailbox("TestBoxForInventoryPublish");
            //mailbox.refresh();
            commons.searchWithCriteria("Subject", "contains", fileName);
            browser.sleep(1000);
            mailbox.msgSelectGear("Edit");

            mailbox.fileView();
            browser.sleep(5000);
            var elem = element(by.xpath('//en-icon[@icon="plus"]'));
            browser.actions().mouseMove(elem).perform();
            expect(mailbox.fileFullContentOnScreenIcon()).toMatch('<inventoryPoolRef>');


        });
        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test004');
        browser.sleep(3000);
        inventoryPublishsummary.inventoryPublishSelectGear('Edit');
        browser.sleep(3000);
        inventorypublishcreate.setPublishMode('Partial Sync');
        inventorypublishcreate.clickSave();
        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test004');
        browser.sleep(1000);

        inventoryPublishsummary.clickPublish();
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(200);
        browser.sleep(3000);
        expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
        inventoryPublishsummary.expandPlusBlock();

        inventoryPublishsummary.getNumberOfRecords().then(function (value) {
            NumberOfRecords = value;
            console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);
            expect(NumberOfRecords).toEqual('0');
        });
        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test004');
        inventoryPublishsummary.inventoryPublishSelectGear('Delete');

    })



// TestCase TC00105: Inventory Publish Full Sync with Inventory pool for selected organization and multiple site types.
// Validation: Verify count of inventory publish should same with inventory look up count when search with organization.
// Validation: Verify status should change to COMPLETED after click on publish button.
// Validation: Verify the filename in mailBox and its content.

    it('Inventory publish Full Sync-Inventory pool TC0005 ', function () {

        browser.get(inventorypublishUrl);
        browser.sleep(3000);
        inventoryPublishsummary.clicknewButton();
        inventorypublishcreate.enterName('Test005');
        inventorypublishcreate.clickactivecheckbox();
        inventorypublishcreate.setPublishMode('Full Sync');
        inventorypublishcreate.setSummaryLevel('Inventory Pool ');
        browser.sleep(2000);
        inventorypublishcreate.clickChooseOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.searchOrganisation(browser.params.orgName);
        inventorypublishcreate.selectOrganisation();
        inventorypublishcreate.addOrganisation();
        browser.sleep(2000);
        inventorypublishcreate.clickChooseSiteType();
        browser.sleep(2000);
        inventorypublishcreate.selectSiteName("Vendor ");
        browser.sleep(2000);
        inventorypublishcreate.selectSiteName("Customer ");
        inventorypublishcreate.addSiteType();
        inventorypublishcreate.selectMailBox('TestBoxForInventoryPublish');
        inventorypublishcreate.clickSave();
        browser.sleep(3000);
        browser.get(inventorypublishUrl);
        browser.sleep(3000);
        inventoryPublishsummary.searchInput('Test005');
        browser.sleep(2000);
        inventoryPublishsummary.clickPublish();
        browser.sleep(20000);
        inventoryPublishsummary.expandPlusBlock();

        expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
        browser.sleep(3000);
        inventoryPublishsummary.expandPlusBlock();
        inventoryPublishsummary.getNumberOfRecords().then(function (value) {
            NumberOfRecords = parseInt(value);
            console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);

        });

        browser.wait(function () {
            return NumberOfRecords != '';
        }).then(function () {
            browser.get(inventorySearchUrl);
            inventoryLookUpScreen.selectOrganisation(browser.params.orgName);
            browser.sleep(3000);
            inventoryLookUpScreen.selectSite(browser.params.vendorSiteName);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            inventorySearch.countFromInventory().then(function (inventory) {
                siteValue1 = parseInt(inventory);
                console.log("NumberOfRecordsFromInventory " + siteValue1);
                browser.get(inventorySearchUrl);
                inventoryLookUpScreen.selectOrganisation(browser.params.orgName);
                inventoryLookUpScreen.selectSite(browser.params.customerSiteName);
                inventorySearch.searchInventory();
                browser.sleep(2000);
                inventorySearch.countFromInventory().then(function (inventory) {
                    siteValue2 = parseInt(inventory);
                    //siteValue2 = siteValue2.replace(' results', "");
                    console.log("NumberOfRecordsFromInventory " + siteValue2);
                    expect(siteValue1 + siteValue2).toEqual(NumberOfRecords);
                });

            });

            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test005');
            browser.sleep(1000);
            inventoryPublishsummary.expandPlusBlock();
            browser.sleep(1000);
            inventoryPublishsummary.expandPlusBlock();
            browser.sleep(1000);
            inventoryPublishsummary.clickTransmissionId();

            inventoryPublishsummary.getFileName().then(function (file) {
                fileName = file;
                fileName = fileName.replace('File Names: ', "");
                console.log("file name is " + fileName);
            });
            browser.wait(function () {
                return fileName != '';
            }).then(function () {
                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes", "TestBoxForInventoryPublish");
                browser.sleep(2000);
                mailbox.selectMailbox("TestBoxForInventoryPublish");
                mailbox.selectMailbox("TestBoxForInventoryPublish");
                //mailbox.refresh();
                commons.searchWithCriteria("Subject", "contains", fileName);
                browser.sleep(1000);
                mailbox.msgSelectGear("Edit");

                mailbox.fileView();
                browser.sleep(5000);
                var elem = element(by.xpath('//en-icon[@icon="plus"]'));
                browser.actions().mouseMove(elem).perform();
                expect(mailbox.fileFullContentOnScreenIcon()).toMatch('<inventoryPoolRef>');


            });
            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test005');
            browser.sleep(3000);
            inventoryPublishsummary.inventoryPublishSelectGear('Edit');
            browser.sleep(3000);
            inventorypublishcreate.setPublishMode('Partial Sync');
            inventorypublishcreate.clickSave();
            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test005');
            browser.sleep(1000);

            inventoryPublishsummary.clickPublish();
            inventoryPublishsummary.expandPlusBlock();
            browser.sleep(2000);
            browser.sleep(3000);
            expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
            inventoryPublishsummary.expandPlusBlock();

            inventoryPublishsummary.getNumberOfRecords().then(function (value) {
                NumberOfRecords = value;
                console.log("NumberOfRecords from InventoryPublish " + NumberOfRecords);
                expect(NumberOfRecords).toEqual('0');
            });
            browser.get(inventorypublishUrl);
            inventoryPublishsummary.searchInput('Test005');
            inventoryPublishsummary.inventoryPublishSelectGear('Delete');

        });


        // ------ delete mailbox
        browser.get(mailboxUrl);
        mailbox.selectMailboxType('intermediateboxes');
        mailbox.searchMailboxWithinType('pinnedIntermediateboxes', 'TestBoxForInventoryPublish');
        browser.sleep(2000);
        mailbox.mailboxEdit();
        browser.sleep(2000);
        mailbox.mailboxDelete("TestBoxForInventoryPublish");
        browser.sleep(2000);

    })


})




