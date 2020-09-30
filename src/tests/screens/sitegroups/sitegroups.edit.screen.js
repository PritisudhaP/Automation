module.exports =function(){

    this.chooseSitesButton = element(by.xpath('//button/span[contains(text(),"Choose Sites")]/parent::button'));
    this.searchSitesEntryTextBox = element(by.xpath('//input[@placeholder = "Search Sites"]'));
    this.selectSiteCheckbox = element(by.xpath('(//div/input[@type="checkbox"])[2]'));
    this.selectSitesButton = element(by.xpath('//button/span[contains(text(), "Select Sites")]/parent::button'));
    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.chooseSites = function() {
        this.chooseSitesButton.click();
    }

    this.searchSitesForSelection = function(siteName) {
        this.searchSitesEntryTextBox.sendKeys(siteName);
    }

    this.selectSite = function() {
        return this.selectSiteCheckbox.click();
    }
    
    this.saveSelectedSite = function() {
        return this.selectSitesButton.click();
    }
    
    this.saveSiteGroup = function() {
        return this.saveButton.click();
    }  
    
}

