//var pdfReader = require(process.cwd() + '/node_modules/pdfreader/PdfReader.js');
var pdfReader = require(process.cwd() + '/src/tests/node_modules/pdfreader/PdfReader.js');


module.exports =function(){
    var pdfRead = new pdfReader();

    this.createButton = element(by.buttonText('Create'));
    this.saveButton = element(by.buttonText('Save'));

    this.cancelButton = element(by.buttonText('Cancel'));

    this.newButton = element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.searchButton = element(by.xpath('//button/en-icon[@icon="search"]/parent::button'));
    this.refreshButton = element(by.xpath('//button/en-icon[@icon="refresh"]/parent::button'));

    this.importUploadButton = element(by.xpath('//button/en-icon[@icon="cloud-upload"]/parent::button'));
    this.selectFilesForUploadButton = element(by.xpath('//button/span[text()="Select Files"]/parent::button'));
    this.uploadSelectedFileButton = element(by.xpath('//button/span[text()="Upload & Send"]/parent::button'));
    this.importResultsLink = element(by.xpath('//en-alert/p/strong[contains(text(),"Import")]'));
    this.importResultsSuccessCountText = element(by.xpath('(//div[text()="SUCCESSES"]/parent::div)/div[2]'));
    this.importResultsErrorCountText = element(by.xpath('(//div[text()="ERRORS"]/parent::div)/div[2]'));

    this.multiselectButton = element(by.xpath('//button/en-icon[@icon="check-block"]/parent::button'));
    this.goButton = element(by.xpath("//div/en-field/button/span/parent::button"));

    this.panelTitle = element(by.css('en-panel.panel-primary en-title'));

    this.customerLookupButton = element(by.xpath('//button/span[text()="Customer Lookup"]/parent::button'));

    this.subHeaderTab = element(by.css('en-panel.panel-primary en-subheader en-tabs en-tab'));

    this.errorMsgs = element(by.css('en-msgs en-msg[when="required"]'));

    this.alertError = element(by.css('en-alert.alert-error'));

    this.moveSelectedOption = element(by.xpath('(//button/en-icon[@icon="chevron-right-double"])[1]/parent::button'));

    this.searchOption = element(by.xpath('//button/div/span[contains(text(),"Filters")]/parent::div/parent::button'));
    this.filterCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.filterContentDropdown = element(by.xpath('//select[@name="filter-content"]'));
    this.searchValueTextbox = element(by.xpath('//input[@name="filter-value"]'));
    this.fulfilmentEditLineGear = element(by.xpath("(//en-actions/button/en-icon/parent::button)[3]"));
    this.secondFulfilmentEditLineGear = element(by.xpath("(//en-actions/button/en-icon/parent::button)[4]"));

    this.createShipmentButton = element(by.xpath("//li/button/span[contains(text() , 'Create Shipment')]/parent::button"));


    this.removeSearchFilterButton = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));
    this.clearSearchResults = element(by.xpath("(//button/en-icon[@icon = 'x-circle'])[1]"));
    this.noResultMessage= element(by.xpath("//div[@class='en-collection-overlay-empty']"));


    // Added by shyam

    this.chevronBackBtn = element(by.xpath('(//en-icon[@icon="chevron-left-double"])[1]'));

    //

    this.getText  =  function(element, callback) {
        element.getText().then (function(text){
            console.log(text);
            callback(trim(text));
         });
    }
    this.clickOnGoButton = function () {
        return this.goButton.clik();
    }
    this.createShipment = function()
    {
        this.fulfilmentEditLineGear.click();
        return this.createShipmentButton.click();

    }
    this.createSecondShipmentRequest = function () {
        this.secondFulfilmentEditLineGear.click();
        return this.createShipmentButton.click();
    }

    this.searchWithCriteria = function(criteria,content, searchValue){
        this.searchOption.click();
        browser.sleep(100);
        this.filterCriteriaDropdown.sendKeys(criteria);

        browser.sleep(300);
      this.filterContentDropdown.sendKeys(content);

        browser.sleep(100);
        this.searchValueTextbox.sendKeys(searchValue);

        element(by.xpath('//input[contains(@class, "adv-search-input") and @name="filter-value"]')).sendKeys(protractor.Key.ENTER);


    }

    this.clearSearch = function(){
        return this.clearSearchResults.click();
    }


    this.parsePdf = function(sourcePDFFile, destTXTFile) {
        var fs1 = require('fs');
        var fs2 = require('fs');
        pdfRead.parseFileItems(sourcePDFFile, function(err,item) {
              if (err) {
              }
              else if (!item) {
               }
              else if (item.text) {
                  fs2.appendFileSync(destTXTFile, item.text);
              }
        });
    }


    this.clickSelectFile = function(fullFileName) {

       // this.selectFilesButton.click();

        var path = require('path');
        var absolutePath = path.resolve(__dirname, fullFileName);

        var fileElem = element(by.css('input[type="file"]'));
        browser.executeScript( "arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px'; arguments[0].style.opacity = 1",
      fileElem.getWebElement());

        fileElem.sendKeys(absolutePath);
        browser.sleep(1000);

    }



    this.new = function(){
        this.newButton.click();
    }

    this.create = function(){
        this.createButton.click();
    }

    this.save = function(){
        this.saveButton.click();
    }

    this.cancel = function(){
        this.cancelButton.click();
    }

    this.refresh = function(){
        this.refreshButton.click();
    }

    this.multiselect = function(){
        this.multiselectButton.click();
    }


    this.moveSelected = function(){
        this.moveSelectedOption.click();
    }


    this.customerLookup = function(){
       this.customerLookupButton.click();
    }


    this.importUpload = function(){
        this.importUploadButton.click();
    }


    this.selecteFileForImport = function(){
        this.selectFilesForUploadButton.click();
    }

    this.uploadSelectedFile = function(){
        this.uploadSelectedFileButton.click();
    }


    this.viewImportResults = function(){
        this.importResultsLink.click();
    }

    this.importResultsGetSuccessCount = function(){
        return this.importResultsSuccessCountText.getText();
    }


    this.importResultsGetErrorCount = function(){
        return this.importResultsErrorCountText.getText();
    }





    this.search = function(){
        // this.searchButton.click();
        $('body').sendKeys(protractor.Key.ENTER);
    }

    this.removeSearchFilter = function(){
        return this.removeSearchFilterButton.click();
    }


    this.restPost = function(postValue, callback) {
         var request = require('request');
         request(postValue, function(error, response, body){
                 callback(body);
         });
    }

   this.httpGet = function(siteUrl) {
       var http = require('http');
       var defer = protractor.promise.defer();
       http.get(siteUrl, function(response) {
           var bodyString = '';
           response.setEncoding('utf8');

           response.on("data", function(chunk) {
                bodyString += chunk;
           });

           response.on('end', function() {
               defer.fulfill({
                 statusCode: response.statusCode,
                 bodyString: bodyString
               });
            });
            }).on('error', function(e) {
             defer.reject("Got http.get error: " + e.message);
            });
        return defer.promise;
     }


 this.selectOption = function(selectList, item){
    if (browser.browserName.toUpperCase() === "Chrome".toUpperCase()) {
   //     selectList.click();
        selectList.sendKeys(item);
   //     selectList.sendKeys(protractor.Key.ENTER);
    } else if (browser.browserName.toUpperCase() === "Safari".toUpperCase()) {
        var desiredOption2;
        selectList.click();
//      element(by.cssContainingText('option', item)).click();

        selectList.all(protractor.By.tagName('option')).then(function findMatchingOption(options) {
            options.some(function (option) {
                option.getText().then(function doesOptionMatch(text) {
                    if (item === text) {
                        desiredOption2 = option;
                        return true;
                    }
                  });
              });
           }).then(function clickOption() {
               if (desiredOption2) {
                   desiredOption2.click();
               }
           });

    } else if (browser.browserName.toUpperCase() === "Firefox".toUpperCase()) {

        var optionsElements = selectList.all(by.tagName('option'));
        var flag = true;
        var counter = 1;
        optionsElements.count().then(function(count) {
            selectList.click().then(function(){
                counter = 1;
                optionsElements.get(0).getText().then(function() {
                    counter = 0;
                });
                for (var i = 0; i < count; ++i) {
                            optionsElements.get(i).getText().then(function(value) {
                                if (value === item) {
                                   desiredOption = value;
                                   flag = false;
                                   return true;
                                 } else {
                                    if (flag)
                                        selectList.sendKeys(protractor.Key.ARROW_DOWN);
                                 }
                             });
                 }
                 });
       }).then(function clickOption() {
        if (desiredOption) {
           selectList.sendKeys(protractor.Key.ENTER);
         }
       });
    }
 }
 this.noResult= function()
 {
   return this.noResultMessage.getText();
 }

 // Added by Shyam 

   this.back = function(){
       return this.chevronBackBtn.click();
   }
}
