
'use strict';
var fs = require(process.cwd()+'/src/tests/node_modules/fs-extra');

module.exports = { 
		
	utilLocators : 
	{
		popMessage : element(by.className('growl-item alert ng-scope alert-error alert-danger icon alert-dismissable')),
	},
		
	fluentWaitForPresence : function(locValue)
	{
		var EC = protractor.ExpectedConditions;		// Waits for the element to be present in the dom.
		browser.wait(EC.presenceOf(locValue),10000);
	},
	
	fluentWaitForClickable : function(locValue)
	{
		var EC = protractor.ExpectedConditions;		// Waits for the element to be clickable in the dom.
		browser.wait(EC.elementToBeClickable(locValue),10000);
	},
	
	handleAppAlert : function()
	{
		
		   	var utilLoc = this.utilLocators;
		    var EC = protractor.ExpectedConditions;
	  	    var popUp = Boolean(browser.wait(EC.presenceOf(utilLoc.popMessage), 3000).then(() => {
	  	    if (popUp == true)
		    {
			    var closePopupBtn = utilLoc.popMessage.element(by.xpath('//button[@type="button"]'));
	  	       	element.all(protractor.By.className('growl-item alert ng-scope alert-error alert-danger icon alert-dismissable')).count()
	  	    	.then(function(count) {
	  	    		console.log('Popup Count is : '+count);
	  	    		while(!count == 0)
	    			{
	  	    			browser.waitForAngularEnabled(true);
	  	    			browser.actions().mouseMove(closePopupBtn).click().perform();
	  	    			count--;
	  	    			//console.log("Count value in loop : "+count);
	    			}
	  	    	});
			}
	  	    }).catch((error) => {
	  	        console.log('element not found');
	        }));
	},
	
	closePopUp : function(){
		
	},
  
	waitForElement : function(element) {
		  return browser.wait(
		    ExpectedConditions.visibilityOf(element),
		    3000,
		    'Unable to find the element'
		  );
	},
	
	scrollDownByPixel : function()
	{
		browser.executeScript('window.scrollTo(0,-250);');
		browser.sleep(500);
	},
	
	scrollToView : function(locValue)
	{
		browser.executeScript("arguments[0].scrollIntoView();", locValue.getWebElement());
		browser.sleep(500);
	},
	
	scrollHorizontal : function(locValue)
	{
		browser.executeScript('window.scrollTo(300,0);', locValue.getWebElement);
		browser.sleep(500);
	},
	
    elementCountByRepeater : function(locValue)
	{
		var count;
		return element.all(by.repeater(locValue)).count()
	    	.then(function(count) {
	       		return count;
	    	});
		
	},
	
	getRMANo : function(filename, popUpText)
	{
		return element(by.xpath('/html/body/en-win/en-modal/en-modal-body/en-content/b')).getText()
		.then(function(text) {
			  var RMANo = text.substring(14,24);
			  var file = require(filename);
			  file.RMANo = RMANo;
			  fs.writeFile(filename, JSON.stringify(file), function (err) {
			    if (err) return console.log(err);
			    console.log(JSON.stringify(file, null, 2));
			    console.log('writing to ' + filename);
			  });
		});
	},
	
	getSONo : function(filePath)
	{
		return element(by.xpath('//*[text()[contains(.,"OMS Order #:")]]/following-sibling::strong')).getText()
		.then(function(text) {
			  var SONo = text;
			  var file = require(filePath);
			  file.SONumber = SONo;
			  fs.writeFile(filePath, JSON.stringify(file), function (err) {
			    if (err) return console.log(err);
			    console.log(JSON.stringify(file, null, 2));
			    console.log('writing to ' + filePath);
			    
			  });
			  return text;
		});
	},
	
	refresh : function() {
        browser.executeScript('window.localStorage.clear();');
        browser.driver.manage().deleteAllCookies(); 
	},
	
	getText : function()
	{
		
	}

}