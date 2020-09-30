module.exports =function(){

    this.newPoolButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));

    this.poolNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.catalogDropdown = element(by.xpath('//select[@name="catalog"]'));
    this.chooseChannelButton = element(by.xpath('//button/span[contains(text(),"Choose Channels")]/parent::button'));
    this.searchChannelsTextEntryBox = element(by.xpath('//input[@placeholder="Search Channels"]'));
    this.searchChannelsSearchButton = element(by.xpath('(//button/en-icon[(@icon="search")])[1]/parent::button'));
    this.selectChannelsButton = element(by.xpath('//button/span[contains(text(),"Select Channels")]/parent::button'));
    this.selectChannelCheckbox = element(by.xpath('(//input[@type="checkbox"])[2]'));
    this.channelDropdown = element(by.xpath('//select[@name="channel"]'));
    this.siteIdDropdown = element(by.xpath('//select[@name="siteId"]'));
    this.typeDropdown = element(by.xpath('//select[@name="type"]'));

    this.saveInventoryPoolButton = element(by.xpath('//button[contains(text(),"Inventory Pool")]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.newPool = function() {
        return this.newPoolButton.click();
    }

    this.enterPoolName = function(poolName) {
        return this.poolNameEntryTextBox.sendKeys(poolName);
    }

    this.enterCatalog = function(catalog) {
        commons.selectOption(this.catalogDropdown,catalog);
    }
   
    this.enterChannel = function(channel) {
        commons.selectOption(this.channelDropdown,channel);
    }
   
    this.chooseChannel = function() {
        return this.chooseChannelButton.click();
    }
 
    this.searchChannels = function(channel) {

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = channel.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(channel[i]);
            browser.sleep(100);
        }

    }

    this.searchChannel = function() {
        return this.searchChannelsSearchButton.click();
    }

    this.selectChannel = function() {
       return this.selectChannelCheckbox.click();
    }

    this.saveSelectedChannel = function() {
        return this.selectChannelsButton.click();
    }

    this.enterSiteId = function(siteId) {
        commons.selectOption(this.siteIdDropdown,siteId); 
    }
    
    this.enterType = function(type) {
        commons.selectOption(this.typeDropdown,type);
    }

    this.saveInventoryPool = function() {
        return this.saveInventoryPoolButton.click();
    }  
    
}

