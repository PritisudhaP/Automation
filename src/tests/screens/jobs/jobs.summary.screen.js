module.exports =function(){

    var jobsDefaultGearIconOption = "View";
    var temp = "";


    this.jobsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.jobsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.jobsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));


    this.jobsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.jobsDeleteFromGearIcon = element(by.xpath('//button/span[contains(text(),"Delete")]/parent::button'));

    this.jobsRunButton = element(by.xpath('//button/en-icon[@icon="media-play"]/parent::button'));
    this.jobsStopButton = element(by.xpath('//button/en-icon[@icon="media-stop"]/parent::button'));


    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    //added by priti
    this.jobfreeSearchTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
   // this.nameOfThefirstJob = element(by.xpath("(//div[@class='ellipsis']/span)[1]"));
  // (//div[@id='BatchJobDefCollection_collectionBody']/div/div)[1]/div/div[4]
   this.nameOfThefirstJob = element(by.xpath("(//div[@id='BatchJobDefCollection_collectionBody']/div/div)[1]/div/div[4]"));
    this.jobStatus = element(by.xpath("(//div[@id='BatchJobDefCollection_collectionBody']/div/div)[1]/div/div[5]"));

    this.jobsSearch = function(criteria, jobsSearchValue){
/*        commons.selectOption(this.jobsSearchCriteriaDropdown,criteria);
        this.jobsSearchTextbox.clear();
//        this.jobsSearchTextbox.sendKeys(jobsSearchValue);

        for (var i = 0, len = jobsSearchValue.length; i < len; i++) {
            this.jobsSearchTextbox.sendKeys(jobsSearchValue[i]);
            browser.sleep(100);
        }

        return this.jobsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = jobsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(jobsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.jobsSelectGear = function(selectOption){
        this.jobsSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();

    }

    this.jobsStart = function() {
        return this.jobsRunButton.click();
    }

    this.jobsStop = function() {
        return this.jobsStopButton.click();
    }
    this.enterjobNameForSearch = function(name)
    {

      for (var i = 0, len = name.length; i < len; i++) {
                        this.jobfreeSearchTextBox.sendKeys(name[i]);
                        browser.sleep(100);
                    }
    }

    this.getNameOfJob = function()
    {
     return this.nameOfThefirstJob.getText();
    }
    this.getJobStatus = function()
    {
     return this.jobStatus.getText();
    }

}

