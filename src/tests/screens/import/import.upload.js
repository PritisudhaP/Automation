module.exports =function(){

    this.domainEntryTextBox= element(by.xpath('//input[@name="domain"]'));
    this.serviceNameEntryTextBox= element(by.xpath('//input[@name="serviceName"]'));
    this.classNameEntryTextBox= element(by.xpath('//input[@name="className"]'));
    this.updateObjectsCheckBox= element(by.xpath('//input[@type="checkbox"]'));

    this.selectFilesButton = element(by.xpath('//button/span[contains(text(),"Select Files")]/parent::button'));
    this.selectedFileText = element(by.xpath('//span[@ng-bind="file.name"]'));
    this.uploadButton = element(by.xpath('//button/span[contains(text(),"Upload & Send")]/parent::button'));



    this.enterDomain = function(domainValue) {
        return this.domainEntryTextBox.sendKeys(domainValue);
    }

    this.enterServiceName = function(serviceName) {
        return this.serviceNameEntryTextBox.sendKeys(serviceName);
    }
    
    this.enterClassName = function(className) {
        return this.classNameEntryTextBox.sendKeys(className);
    }

    this.updateObjects = function(updateFlag) {
        if (updateFlag == "Y")  
        	return this.updateObjectsCheckBox.click();
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

    this.uploadFile = function() {
        return this.uploadButton.click();
    }
 
}

