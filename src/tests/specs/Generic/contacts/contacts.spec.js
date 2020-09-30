var contactsCreateScreen = require(process.cwd() + '/src/tests/screens/contacts/contacts.create.screen.js');
var contactsSummaryScreen = require(process.cwd() + '/src/tests/screens/contacts/contacts.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Contacts creation Flow  : ', function(){
    var contactsCreate = new contactsCreateScreen();
    var contactsSummary = new contactsSummaryScreen();
    var commons = new common();

        it('Create a contact successfully - TC0001', function(){
             
            browser.get(contactsUrl);

            console.log("navigating to contacts screen"); 
            commons.refresh();           
            contactsCreate.newContact();
            contactsCreate.enterFirstName("SarathTC0001");
            contactsCreate.enterLastName("Babu");
            contactsCreate.enterDisplayName("Sarath Babu");
            contactsCreate.enterRole("AccountHolder");
            contactsCreate.enterPrimaryEmail("sbabu@test.com");
            contactsCreate.enterPrimaryPhone("111-111-1111");
            contactsCreate.enterCountry("United States");
            contactsCreate.enterAddress1("1st Street");
            contactsCreate.enterCity("San Diego");
            contactsCreate.enterState("CA");
            contactsCreate.enterZip5("92010");
            contactsCreate.saveContact();
        });
      
        it('Search and Delete Contacts successfully - TC0002', function(){
            browser.get(contactsUrl);
            contactsSummary.contactsSearch("First Name","SarathTC0001");
            browser.sleep(2000);
            contactsSummary.contactsSelectGear("Delete");
        });      

})
