module.exports =function(){

    this.newworkOrderButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.titleEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.stateDropdown = element(by.xpath('//select[@name="state"]'));

    this.customerSelectSearchButton = element(by.xpath('//en-field/input[contains(@ng-model,"customer")]/../button/en-icon[@icon="search"]/parent::button'));    
    this.customerSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchText.value"]'));
    this.selectCustomerCheckbox = element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input'));
    this.useSelectedCustomerButton = element(by.xpath('//button/span[contains(text(), "Use Selected Customer")]/parent::button'));

    this.siteSelectSearchButton = element(by.xpath('//en-field/input[@name="site"]/../button/en-icon[@icon="search"]/parent::button'));
    this.siteSearchTextbox = element(by.xpath('//input[@placeholder = "Search Sites"]'));
    this.selectSiteCheckbox = element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input'));
    this.useSelectedSiteButton = element(by.xpath('//button/span[contains(text(), "Use Selected Site")]/parent::button'));
    
    this.saveButton = element(by.xpath('(//button/span[contains(text(),"Create")]/parent::button)[1]'));

    this.workOrderNumberText = element(by.xpath('//div/label[contains(text(),"Order Number")]/../strong'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.newworkOrder = function() {
        return this.newworkOrderButton.click();
    }

    this.enterTitle = function(title) {
        return this.titleEntryTextBox.sendKeys(title);
    }

    this.selectState = function(state) {
        return this.stateDropdown.sendKeys(state);
    }
   
    this.selectCustomer = function(customer) {
        this.customerSelectSearchButton.click();
        this.customerSearchTextbox.clear();
        
        for (var i = 0, len = customer.length; i < len; i++) {
            this.customerSearchTextbox.sendKeys(customer[i]);
            browser.sleep(100);
        }

        this.customerSearchTextbox.sendKeys(protractor.Key.ENTER);
        this.selectCustomerCheckbox.click();
        return this.useSelectedCustomerButton.click();
    }

    this.selectSite = function(site) {
        this.siteSelectSearchButton.click();
        this.siteSearchTextbox.clear();
        
        for (var i = 0, len = site.length; i < len; i++) {
            this.siteSearchTextbox.sendKeys(site[i]);
            browser.sleep(100);
        }

        this.siteSearchTextbox.sendKeys(protractor.Key.ENTER);
        this.selectSiteCheckbox.click();
        return this.useSelectedSiteButton.click();
    }

    this.saveworkOrder = function() {
        return this.saveButton.click();
    }
    
    this.getWorkOrderNumber = function() {
        return this.workOrderNumberText.getText();
    }
}

