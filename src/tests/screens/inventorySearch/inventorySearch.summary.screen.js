module.exports =function(){

    var temp = "";
    var count = "";

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.siteDropdown = element(by.xpath('//select[@name="siteId"]'));
    this.addSKUButton = element(by.xpath('//button/span[contains(text(), "Add SKUs")]/parent::button'));

    this.selectSKUCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));

    this.addProductButton = element(by.xpath('//button/span[contains(text(), "Add Skus")]/parent::button'));

    this.searchButton = element(by.xpath('//button[contains(text(), "Search")]'));

    this.enterSearchQtyTextbox = element(by.xpath('//input[@name="minimumQty"]'));

    this.availableQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[5]'));
    this.reservedQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[6]'));
    this.organisationDropDown = element(by.xpath("//select[@name='organizationId']"));
    this.excludezeroInventoryCheckBox = element(by.xpath("//input[@name='excludeZeroInventory']"));
    this.inactiveproductCheckBox = element(by.xpath("//input[@name='excludeInactiveProducts']"));
    this.countText = element(by.xpath("//i[@class='ng-binding']"));
     this.inboundcountText = element(by.xpath("//div[@class='en-collection-row']/div[8]"));
        this.atsCountText= element(by.xpath("//div[@class='en-collection-row']/div[5]"));




    this.enterSite = function(site) {
        commons.selectOption(this.siteDropdown,site);
    }

    this.addSKU = function() {
        this.addSKUButton.click();
    }

    this.searchSKU = function(criteria, searchSKUValue){

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = searchSKUValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(searchSKUValue[i]);
            browser.sleep(100);
        }

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.selectSKU = function() {
        return this.selectSKUCheckbox.click();
    }

    this.enterQty = function(value) {
        this.enterSearchQtyTextbox.clear();
        return this.enterSearchQtyTextbox.sendKeys(value);
    }


    this.addProduct = function() {
       return this.addProductButton.click();
    }

    this.searchInventory = function() {
       return this.searchButton.click();
    }

    this.getAvailableQty = function() {
       return this.availableQty.getText();
    }


    this.getReservedQty = function() {
       return this.reservedQty.getText();
    }

    this.selectOrganisation =function(organisationName)
    {
        this.organisationDropDown.click();
        commons.selectOption(this.organisationDropDown, organisationName);
        this.organisationDropDown.click();
    }

    this.excludezeroInventoryProduct = function()
    {
        this.excludezeroInventoryCheckBox.click();

    }
    this.excludeInactiveProduct = function()
    {
        this.inactiveproductCheckBox.click();
    }
    this.countFromInventory = function()
    {
       /* this.countText.getText().then(function(count){
            console.log("value is "+count);
            count = count.replace(' results',"");
            console.log('value is : '+count);
            return count;
        }) */

      return  this.countText.getText();
    }
     this.countInbound = function()
        {
         return  this.inboundcountText.getText();
        }
         this.ATScount= function(){
            return this.atsCountText.getText();
         }

}

