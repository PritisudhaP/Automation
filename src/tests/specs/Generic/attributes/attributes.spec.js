var attributesCreateScreen = require(process.cwd() + '/src/tests/screens/attributes/attributes.create.screen.js');
var attributesSummaryScreen = require(process.cwd() + '/src/tests/screens/attributes/attributes.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Attribute creation Flow  : ', function(){
    var attributesCreate = new attributesCreateScreen();
    var attributesSummary = new attributesSummaryScreen();
    var commons = new common();

        it('Create a attribute successfully - TC0001', function(){
             
            browser.get(attributesUrl);

            console.log("navigating to attributes screen"); 
            browser.sleep(2000);         
            commons.new();
            attributesCreate.enterLabel("TC0001");
            attributesCreate.enterType("String");
            attributesCreate.enterDesc("TC0001 String");
            attributesCreate.saveattribute();
            browser.sleep(5000);
        });

      
        it('Search and Delete attribute successfully - TC0002', function(){
           browser.get(attributesUrl);           
 //          commons.searchWithCriteria("Name","contains","TC0001");
           attributesSummary.attributesSearch("TC0001");
           browser.sleep(2000);
           attributesSummary.attributesSelectGear("Delete");
        });      

})
