module.exports =function(){

    var routeDefaultGearIconOption = "Edit";
    var temp = "";


    this.routeSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.routeSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.routeSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.routeSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.routeDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.routeSearch = function(criteria, routeSearchValue){
/*        commons.selectOption(this.routeSearchCriteriaDropdown,criteria);
        this.routeSearchTextbox.clear();
//        this.routeSearchTextbox.sendKeys(routeSearchValue);

        for (var i = 0, len = routeSearchValue.length; i < len; i++) {
            this.routeSearchTextbox.sendKeys(routeSearchValue[i]);
            browser.sleep(100);
        }

        return this.routeSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = routeSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(routeSearchValue[i]);
            browser.sleep(1000);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.routeSelectButton = function(selectOption){
        if (selectOption == "Start") {
            temp = "(//button/en-icon[@icon='media-play']/parent::button)[2]";

            element(by.xpath("//en-label[contains(@class, 'ng-binding label')]")).getText().then(function(value)
                {
                    if(value == "STARTED")
            {
                
                element(by.xpath("(//button/en-icon[@icon='media-stop']/parent::button)[2]")).click();
                browser.sleep(1000);
                element(by.xpath("(//button/en-icon[@icon='media-play']/parent::button)[2]")).click();
                browser.sleep(1000);
            }

            else if(value == "STOPPED")
            {
                 
                 element(by.xpath("(//button/en-icon[@icon='media-play']/parent::button)[2]")).click();
                 browser.sleep(3000);
            }
            
                });

            

        } else if (selectOption == "Stop") {

            console.log("inside stop");
            temp = "(//button/en-icon[@icon='media-stop']/parent::button)[2]";
             element(by.xpath("//en-label[contains(@class, 'ng-binding label')]")).getText().then(function(value)
                {
                    if(value == "STARTED")
            {
                
                element(by.xpath("(//button/en-icon[@icon='media-stop']/parent::button)[2]")).click();
                browser.sleep(1000);
                
            }

            else if(value == "STOPPED")
            {
                 
                 console.log("already stoped");
            }
            
                });

            
               

        }
    }

}

