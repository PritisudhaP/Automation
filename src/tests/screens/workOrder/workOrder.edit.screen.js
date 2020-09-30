module.exports =function(){

    this.workOrderActivitiesOptionsButton = element(by.xpath('//button[contains(@popover-content-template,"activity")]'));
    this.workOrderCreateActivityButton = element(by.xpath('//button/span[contains(text(),"Create Activity")]/parent::button'));
    
    this.activityTypeConfigDropdown = element(by.xpath('//select[@name="activityTypeConfig"]'));
    this.activityTitleTextBox = element(by.xpath('//input[@name="name"]'));
    
    this.activityStateDropdown = element(by.xpath('//select[@name="state"]'));
    
    this.activitySelectSKUButton = element(by.xpath('//button/span[contains(text(),"Select SKUs")]/parent::button'));
    
    this.selectSKUCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));

    this.addProductButton = element(by.xpath('//button/span[contains(text(), "Use Selected Items")]/parent::button'));

    this.activityTimeSheetEntryButton = element(by.xpath('//button/span[contains(text(),"Add Timesheet Entry")]/parent::button'));
    this.activityTimeSheetTitleText = element(by.xpath('//input[@name="title"]'));
    this.activityTimeSheetDateText = element(by.xpath('//input[@name="startDate"]'));
    this.activityTimeSheetTimeText = element(by.xpath('//input[@name="startTime"]'));
    this.activityTimeSheetDurationText = element(by.xpath('//input[@name="durationHrs"]'));
    this.addTimeSheetButton = element(by.xpath('(//button/span[contains(text(),"Create")]/parent::button)[2]'));

    this.workOrderActivityOptionsButton = element(by.xpath('//div[contains(@ng-repeat,"activityCollection")]/div/div[1]'));
    
    this.workOrderSaveActivityButton = element(by.xpath('//button/span[contains(text(),"Create")]/parent::button'));
 
    this.workOrderOptionsButton = element(by.xpath('//div[@class="section-top-bar"]/en-actions/button'));
    
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.createWorkOrderActivity = function(config, title, state, type,value) {
        this.workOrderActivitiesOptionsButton.click();
        this.workOrderCreateActivityButton.click();
        browser.sleep(2000);
        this.activityTypeConfigDropdown.click();
        this.activityTypeConfigDropdown.sendKeys(config);
        browser.sleep(2000);
        this.activityTitleTextBox.clear();
        this.activityTitleTextBox.sendKeys(title);
        browser.sleep(2000);
       // this.activityStateDropdown.sendKeys(state);
        if (type == "inventory_based") {
            this.activitySelectSKUButton.click();
        	element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
            for (var i = 0, len = value.length; i < len; i++) {
                element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(value[i]);
                browser.sleep(100);
            }
            $('body').sendKeys(protractor.Key.ENTER);
            this.selectSKUCheckbox.click();
            this.addProductButton.click();
        } else if (type == "timeentry_based") {
        
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();

            if(dd<10){
                dd='0'+dd;
            }

            if(mm<10){
               mm='0'+mm;
            }

            var formattedToday = mm+'/'+dd+'/'+yyyy;

            this.activityTimeSheetEntryButton.click();
            this.activityTimeSheetTitleText.sendKeys("MyTS1");
            this.activityTimeSheetDateText.sendKeys(formattedToday);
            this.activityTimeSheetTimeText.sendKeys("02:00");
            this.activityTimeSheetTimeText.sendKeys("am");
            this.activityTimeSheetDurationText.sendKeys(value);
            this.addTimeSheetButton.click();
        }
        
        this.workOrderSaveActivityButton.click();       
    }


    this.selectWorkOrderOptions = function(selectOption) {
        this.workOrderOptionsButton.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();        
    }

    this.selectActivityOptions = function(selectOption) {
        this.workOrderActivityOptionsButton.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}

