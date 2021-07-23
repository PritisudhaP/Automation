
'use strict';
var fs = require(process.cwd()+'/src/tests/node_modules/fs-extra');
global.filename="";
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
	currentDate : function()
	{
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); 
		var yyyy = today.getFullYear();
		return today = mm + '/' + dd + '/' + yyyy;		
		return today
	},
	pdfFolderCleanUp : function(folderpath){
		const fs = require('fs');
        const path = require('path');
        const directory =folderpath;
        fs.readdir(directory, (err, files) => {
          if (err) throw err;
          for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
              if (err) throw err;
            });
          }
          console.log("directory cleared")
        });
		browser.sleep(1000); 
	 },
	  pdfRead : function(pdfFilePath){	
		  const fs = require('fs');
	      const pdf = require('pdf-parse');
	      var pdfstr = "";
	      let dataBuffer = fs.readFileSync(pdfFilePath);	       
	      return pdf(dataBuffer).then(function(data) {
	          pdfstr = data.text.trim();	    
	          return pdfstr;
	    });		  		   
		  
	  },
	 getFileName : function(folderpath,name,BatchId){ 
	    	const fs = require('fs')
	    	const files = fs.readdirSync(folderpath)
	    	for (let file of files) {
	    		var fn=name+BatchId;
	    		
	    		if (file.startsWith(fn)) {
	    			console.log('File already exists')
	    			console.log("the file name is "+file)
	    			return file;
	    			continue
	    		}
	    		
	    		else if (file.startsWith(fn)) {
	    			console.log('File already exists')
	    			console.log("the file name is "+file)
	    			return file;
	    			continue
	    		}
	    		else if (file.startsWith(fn)) {
	    			console.log('File already exists')
	    			console.log("the file name is "+file)
	    			return file;
	    			continue
	    		}
	    		else if (file.startsWith(BatchId)) {
	    			console.log('File already exists')
	    			console.log("the file name is "+file)
	    			return file;
	    			continue
	    		}
    			
	    	}
		 
	 },
	 searchResult : function(){	
		 temp = element(by.xpath('(//div[@class="en-collection-row"])'));
		 var totalline = "";
		 var totallines = element.all(by.xpath(temp));
		 return totallines.count().then(function (total){
				var totalline = total;
				console.log("total lines in the order confirm screen is "+totalline)
				return totalline;
		});
		  
	  },
	  
	  Login : function(username,password){	
			 
	  	 browser.get(browser.baseUrl);
         browser.driver.manage().window().maximize();
         element(by.model("loginForm.username")).sendKeys(username)
         element(by.model("loginForm.password")).sendKeys(password)
         element(by.buttonText('Login')).click();
         browser.sleep(4000);
	  }, 
	  status : function(line1,line2){
			
			temp= element(by.xpath('(//div[@class="en-collection-row"]/div['+line1+'])['+line2+']'));
			return temp.getText();
			
		},
	
	getText : function()
	{
		
	}

}