var inventorypublishcreateScreen = require(process.cwd() + '/screens/InventoryPublish/inventorypublish.create.screen.js');
var inventorypublishsummaryscren = require(process.cwd() + '/screens/InventoryPublish/inventorypublish.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var inventoryLookUp = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');

  global.NumberOfRecords="";
  global.NumberOfRecordsFromInventory="";
  global.fileName="";
  global.fileContent="";
 global.valueOfStatus="";

describe('Inventory Publish Flow ', function(){

    var inventorypublishcreate = new inventorypublishcreateScreen();
    var inventoryPublishsummary =new inventorypublishsummaryscren();
    var commons = new common();
    var inventoryLookUpScreen = new inventoryLookUp();
    var mailbox = new mailboxScreen();


    // TestCase TC0001: Create a mailbox and Inventory Publish Full Sync with Inventory Pool for selected organization
    // Validation: Verify count of inventory publish should same with inventory look up count when search with organization
    // Validation: Verify status should change to COMPLETED after click on publish button.
    // Validation: Verify the filename in mailBox and its content.
    //After Full sync perform partial sync and check count should be zero.

   it('Inventory publish Full Sync-Inventory Pool TC0001', function(){

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
        browser.sleep(900);
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
       browser.sleep(200);
     expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');






      browser.sleep(3000);
       inventoryPublishsummary.expandPlusBlock();

       inventoryPublishsummary.getNumberOfRecords().then(function(value){
        NumberOfRecords = value;
        console.log("NumberOfRecords from InventoryPublish "+NumberOfRecords);
       });
       browser.wait(function(){
        return NumberOfRecords != '';
        }).then(function(){
           browser.get(inventorySearchUrl);
           inventoryLookUpScreen.selectOrganisation(browser.params.orgName);
           inventoryLookUpScreen.searchInventory();
            browser.sleep(900);
            inventoryLookUpScreen.countFromInventory().then(function(inventory){
             NumberOfRecordsFromInventory = inventory;
             NumberOfRecordsFromInventory = NumberOfRecordsFromInventory.replace(' results',"");
             console.log("NumberOfRecordsFromInventory "+NumberOfRecordsFromInventory);
             expect(NumberOfRecords).toEqual(NumberOfRecordsFromInventory);
            });
        });

        browser.get(inventorypublishUrl);
        inventoryPublishsummary.searchInput('Test001');
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
        inventoryPublishsummary.expandPlusBlock();
        browser.sleep(1000);
         inventoryPublishsummary.clickTransmissionId();

        inventoryPublishsummary.getFileName().then(function(file){
         fileName= file;
         fileName = fileName.replace('File Names: ',"");
         console.log("file name is "+fileName);
        });
       browser.wait(function(){
        return fileName!= '';
       }).then(function(){
          browser.get(mailboxUrl);
          browser.sleep(5000);
          mailbox.selectMailboxType("intermediateboxes");
          browser.sleep(2000);
          mailbox.searchMailboxWithinType("pinnedIntermediateboxes","TestBoxForInventoryPublish");
          browser.sleep(2000);
          mailbox.selectMailbox("TestBoxForInventoryPublish");
          mailbox.selectMailbox("TestBoxForInventoryPublish");
          //mailbox.refresh();
          commons.searchWithCriteria("Subject","contains",fileName);
          browser.sleep(1000);
         mailbox.msgSelectGear("Edit");

          mailbox.fileView();
           browser.sleep(5000);
            var elem = element(by.xpath('//en-icon[@icon="plus"]'));
                  browser.actions().mouseMove(elem).perform();
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

              inventoryPublishsummary.getNumberOfRecords().then(function(value){
               NumberOfRecords = value;
               console.log("NumberOfRecords from InventoryPublish "+NumberOfRecords);
               expect(NumberOfRecords).toEqual('0');
              });
              browser.get(inventorypublishUrl);
                     inventoryPublishsummary.searchInput('Test001');
       inventoryPublishsummary.inventoryPublishSelectGear('Delete');



 })

     // TestCase TC0002: Inventory Publish Full Sync with item for selected organization and excluding zeroInventory
     // Validation: Verify count of inventory publish should same with inventory look up count when search with organization and excluding zero Inventory.
     // Validation: Verify status should change to COMPLETED after click on publish button.
     // Validation: Verify the filename in mailBox and its content.


 it('Inventory publish Full Sync-Item Pool TC0002 ',function(){

    browser.get(inventorypublishUrl);
     browser.sleep(900);
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
       inventoryPublishsummary.getNumberOfRecords().then(function(value){
            NumberOfRecords = value;
            console.log("NumberOfRecords from InventoryPublish "+NumberOfRecords);
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

     inventoryPublishsummary.getFileName().then(function(file){
      fileName= file;
      fileName = fileName.replace('File Names: ',"");
      console.log("file name is "+fileName);
     });
    browser.wait(function(){
     return fileName!= '';
    }).then(function(){
       browser.get(mailboxUrl);
       browser.sleep(5000);
       mailbox.selectMailboxType("intermediateboxes");
       browser.sleep(2000);
       mailbox.searchMailboxWithinType("pinnedIntermediateboxes","TestBoxForInventoryPublish");
       browser.sleep(2000);
       mailbox.selectMailbox("TestBoxForInventoryPublish");
       mailbox.selectMailbox("TestBoxForInventoryPublish");
       //mailbox.refresh();
       commons.searchWithCriteria("Subject","contains",fileName);
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

   // TestCase TC0003: Inventory Publish Full Sync with SIte for selected organization and excluding InactiveItem after validation delete mailBox.
    // Validation: Verify count of inventory publish should same with inventory look up count when search with organization and excluding Inactive Item.
    // Validation: Verify status should change to COMPLETED after click on publish button.
     // Validation: Verify the filename in mailBox and its content.


  it('Inventory publish Full Sync-SIte TC0003 ',function(){

     browser.get(inventorypublishUrl);
      browser.sleep(900);
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
     inventoryPublishsummary.expandPlusBlock();
     browser.sleep(200);
     expect(inventoryPublishsummary.CheckStatus()).toEqual('COMPLETED');
     browser.sleep(3000);
     browser.sleep(3000);
     inventoryPublishsummary.expandPlusBlock();
     inventoryPublishsummary.getNumberOfRecords().then(function(value){
     NumberOfRecords = value;
     console.log("NumberOfRecords from InventoryPublish "+NumberOfRecords);
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

      inventoryPublishsummary.getFileName().then(function(file){
       fileName= file;
       fileName = fileName.replace('File Names: ',"");
       console.log("file name is "+fileName);
      });
     browser.wait(function(){
      return fileName!= '';
     }).then(function(){
        browser.get(mailboxUrl);
        browser.sleep(5000);
        mailbox.selectMailboxType("intermediateboxes");
        browser.sleep(2000);
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","TestBoxForInventoryPublish");
        browser.sleep(2000);
        mailbox.selectMailbox("TestBoxForInventoryPublish");
        mailbox.selectMailbox("TestBoxForInventoryPublish");
        //mailbox.refresh();
        commons.searchWithCriteria("Subject","contains",fileName);
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


       // ------ delete mailbox
            browser.get(mailboxUrl);
            mailbox.selectMailboxType('intermediateboxes');
            mailbox.searchMailboxWithinType('pinnedIntermediateboxes','TestBoxForInventoryPublish');
            browser.sleep(2000);
            mailbox.mailboxEdit();
            browser.sleep(2000);
            mailbox.mailboxDelete("TestBoxForInventoryPublish");
            browser.sleep(2000);


  })













    }


)


