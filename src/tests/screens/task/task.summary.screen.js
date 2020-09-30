module.exports =function(){

    var taskDefaultGearIconOption = "Edit";
    var temp = "";


    this.taskSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.taskSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.taskSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.taskSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.taskDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    this.taskStatusUpdateDropdown = element(by.xpath('//select[@ng-model="data.status"]'));
    this.taskUpdateButton = element(by.xpath('//button/span[contains(text(),"Update")]/parent::button'));

    this.taskMarkButton = element(by.xpath('//button/en-icon[contains(@icon,"check-block")]/parent::button'));
    this.taskMoreButton = element(by.xpath('//button/en-icon[contains(@icon,"more-vertical")]/parent::button'));
    this.taskMarkascompletedButton = element(by.xpath('//button/span[contains(text(),"Mark as Completed")]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.getTaskStatus = function(taskRow) {
        temp = "(//div[@class='en-collection-row']/div[4])[" + taskRow + "]";
        return element(by.xpath(temp)).getText();
        
    }

    this.taskSearch = function(criteria, taskSearchValue){
/*        commons.selectOption(this.taskSearchCriteriaDropdown,criteria);
        this.taskSearchTextbox.clear();
//        this.taskSearchTextbox.sendKeys(taskSearchValue);

        for (var i = 0, len = taskSearchValue.length; i < len; i++) {
            this.taskSearchTextbox.sendKeys(taskSearchValue[i]);
            browser.sleep(100);
        }

        return this.taskSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = taskSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(taskSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);


    }

    this.taskSelectGear = function(selectOption){
        this.taskSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

    this.taskSelect = function(name){
        selectCheckbox = "//div[contains(text(), '" + name + "')]/../div[1]/input";
        return element(by.xpath(selectCheckbox)).click();
    }


    this.taskMainGearSelect = function(selectOption, additionalValue) {
        mainGearIcon = "//div[@class='en-collection-header']/div/div/div/en-actions/button";
        element(by.xpath(mainGearIcon)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";

        switch(selectOption) {
            case "Update":
                element(by.xpath(temp)).click();
                commons.selectOption(this.taskStatusUpdateDropdown,additionalValue);
                element(by.xpath("(" + temp + ")[2]")).click();
                break;
            case "Delete":
                element(by.xpath(temp)).click();
                browser.sleep(2000);
                element(by.xpath("(" + temp + ")[2]")).click();
                break;
            case "Mark as Completed":
                element(by.xpath(temp)).click();
                browser.sleep(2000);
                break;
        }
    }

    this.taskMark = function() {
        return this.taskMarkButton.click();
    }
    
    this.taskMore = function() {
        return this.taskMoreButton.click();
    }
    
    this.taskMarkCompleted = function() {
        return this.taskMarkascompletedButton.click();
    }

}
