
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
	    		console.log("the combined file name is "+fn);
	    		
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
	 
	 getNumberOfPages : function(file){
		const fs = require('fs');
	    const pdf = require('pdf-page-counter');
	    let dataBuffer = fs.readFileSync(file);
	    return pdf(dataBuffer).then(function(data) {
	    	 // number of pages
	    	 console.log("number of pages"+data.numpages);	    
	    	 return data.numpages;
	    }); 
		 
		 
	 },
	 searchResult : function(){	
		 temp = '//div[@class="en-collection-row"]';
		 return element.all(by.xpath(temp));
		  
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
		errorAlert : function(){
			
			 temp = '//button[@data-dismiss="alert"]';	  
			   var totallines = element.all(by.xpath(temp));
			   totallines.count().then(function (total){
				   var totalcount = total;
				    console.log("the total number of alerts are: "+totalcount);
				     for(var i=1;i<=totalcount;i++){
						   browser.sleep(1000);					 
							element(by.xpath('//button[@data-dismiss="alert"]')).click();
					   }
		     });
			
		},
		
		genRand : function(max) {
			
  	      return Math.floor(Math.random()*89999+10000);
		 //return Math.floor(Math.random() * max);

			
		},	
		
		StopRoute : function(status,route){
			 stopreturnsinvoiceroute = element(by.xpath('(//en-icon[@icon="media-stop"])['+route+']'));
				if(status=="STARTED"){
				     stopreturnsinvoiceroute.click();
				 }
				 else if(status=="STOPPED"){
					 
					 console.log("the Route is already stopped");
				 }
		 	},
		 	
		 startingReturnInvoiceRoute : function(status,line) {
			    var stopreturnsinvoiceroute = element(by.xpath('(//en-icon[@icon="media-stop"])['+line+']'));
		    	temp =  element(by.xpath('(//button/en-icon[@icon="media-play" and @class="text-secondary ng-scope text-accent"])['+line+']'));
		    	if(status=="STARTED"){
		    		console.log("the Route is already started");
				     stopreturnsinvoiceroute.click();
				     browser.sleep(1500);
				     temp.click();

				 }
				 else if(status=="STOPPED"){
			    	 temp.click();
			    	 console.log("Starting the route");
				 }
		 },

		 startJob : function(line) {
		    	temp =  element(by.xpath('(//button/en-icon[@icon="media-play" and @class="text-secondary ng-scope text-accent"])['+line+']'));
		    	
			    	 temp.click();
			    
		 },
		 closeIcon : function(line) {
		    	element(by.xpath('//en-icon[@icon="x-circle"]')).isPresent().then(function(result) {
				    if ( result ) {
				    	temp=element(by.xpath('(//en-icon[@icon="x-circle"])['+line+']'));
						 temp.click();
				    } else {
						 console.log("No close button found")
				    }
				});
		 },
		 ScriptUpdate : function(status) {
			 if(status=="No"){
				element(by.xpath('(//div/div[@class="en-collection-row"])[1]')).click();
				element(by.xpath('//input[@ng-model="script.data.active"]')).click();
				element(by.xpath("(//button/span[contains(text(),'Save')])[1]")).click();
				browser.sleep(1500);
				element(by.xpath("(//button/span[contains(text(),'Cancel')])[1]")).click();
				console.log("the Script updated successfully");
				
			 }	
			 else{
					console.log("the Script is already active");				 
			 }
			 
		 },
		 ScriptCancelButton : function(status) {
			 if(status=="Yes"){
				element(by.xpath('(//div/div[@class="en-collection-row"])[1]')).click();
				browser.sleep(4500);
				element(by.xpath('//input[@ng-model="script.data.active"]')).click();
				browser.sleep(4500);
				element(by.xpath("(//button/span[contains(text(),'Save')])[1]")).click();
				browser.sleep(1500);
				element(by.xpath("(//button/span[contains(text(),'Cancel')])[1]")).click();
				console.log("the Script updated successfully");
			 }	
			 else{
					console.log("the Script is already disabled");				 
			 }
			 
		 },
		 
		 
		 pencilButtonEdit : function(line) {
				element(by.xpath('(//en-icon[@icon="edit"])['+line+']')).click();	 
		 },
		 
		currentURL : function(){
			
			return browser.getCurrentUrl();
		},
		convertDate : function(date,format){
			
			var dates=date.split("/");	//date format received will be MM/DD/YYYY	
			var finaldate="";
			
			switch(format){
			
			 case "dd/mm/yyyy":
				 finaldate=dates[1]+"/"+dates[0]+"/"+dates[2];
				 break;
			 case "yyyy-mm-dd":
				 finaldate=dates[2]+"-"+dates[0]+"-"+dates[1];
				 break;
			 case "MMM/dd/YYYY": //input will be Oct 22 2021 and output date will be in month/Day/Year
				 var d = new Date(date),
			        month = '' + (d.getMonth() + 1),
			        day = '' + d.getDate(),
			        year = d.getFullYear();
			    if (month.length < 2) 
			        month = '0' + month;
			    if (day.length < 2) 
			        day = '0' + day;
			    return [month, day, year].join('/');
			    break;
			 case "YYYY-MM-DD": //input will be Oct 22 2021 and output date will be in Year-month-Day
				 var d = new Date(date),
			        month = '' + (d.getMonth() + 1),
			        day = '' + d.getDate(),
			        year = d.getFullYear();
			    if (month.length < 2) 
			        month = '0' + month;
			    if (day.length < 2) 
			        day = '0' + day;
			    return [year, month, day].join('-');	 
			    break;
			 case "MM/DD/YYYY": //input will be 03/24/2021 and output date will be in 2021-03-24
				 
				finaldate= dates[2]+"-"+dates[0]+"-"+dates[1];
			    return finaldate;
			    break;
			 default:
				 finaldate=date;
			
			}
			return finaldate;
			
		},
		convertTime : function(time,format){
			
			
			var finaltime="";
			
			switch(format){
			
			 case "HHMMZO":
				 var hour=data.substring(0,2);
				 var minute = data.substring(4,6);
				 var zone = data.substring(7);
				 return hour+minute+zone;
				 break;
			 case "24hrs":
				 
				 var hour = parseInt(time.substring(0,2));
				 var minute = time.substring(4,6).trim();
				 var zone = time.substring(7);
				 if(zone=="PM" && hour!=12){
					 
					 hour=hour+12;
					 finaltime=hour+":"+minute;
					 return finaltime;
				 }
				 else {
					 
					 finaltime= hour+":"+minute;
					 return finaltime;
					 
				 }
				 
			 default:
				 finaltime=time;
			
			}
			return finaltime;
			
		},
		
		ScriptUpdateWithVersion : function(status) {
			 if(status=="No"){
				element(by.xpath('(//div/div[@class="en-collection-row"])[1]')).click();
				browser.sleep(4500);
				element(by.model("script.data.scriptVersion")).sendKeys(browser.params.scriptVersion);
				element(by.xpath('//input[@ng-model="script.data.active"]')).click();
				browser.sleep(4500);
				element(by.xpath("(//button/span[contains(text(),'Save')])[1]")).click();
				browser.sleep(1500);
				element(by.xpath("(//button/span[contains(text(),'Cancel')])[1]")).click();
				console.log("the Script updated successfully");
				
			 }	
			 else{
					console.log("the Script is already active");				 
			 }
			 
		 },
		 currentDay: function()
		{
			var today = new Date();
			var day = String(today.getDate()).padStart(2, '0');
			console.log("the current DoM is "+day);
			return day
		},
		currentMonthAndYear : function()
		{
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); 
			var yyyy = today.getFullYear();
			return today = mm + '/' + dd + '/' + yyyy;		
			return today
		},
		 
		foundFile: function(folderpath){ //checking the existance of a file in a directory
			
			const fs = require('fs')
	    	const files = fs.readdirSync(folderpath)
	    	var path="";
	    	for (let file of files) {
	    		path=folderpath+"//"+file;
	    		if(fs.existsSync(path)){
	    			console.log("the file name is "+file)	    		
	    			return true
	    			continue
	    		}
	    		else
	    		{
	    			console.log("file not found!!download fail!!")
	    			return false;
	    			continue
	    			
	    		}
	    	}
			
		},
		currentTime: function(type){
			var Time ="";
			var d = new Date();
			var hour = d.getHours(); 
			var minute = d.getMinutes(); 
			var second = d.getSeconds();
			switch(type){
			
			case "HM":
				
				Time = hour+":"+minute
				return Time;
			
			default:
				return time;
			}
		},
		
		convertFile: function(){

			
		},
		
		convertColor: function(r, g, b){
		
			  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		
		},
		
		
	
	getText : function()
	{
		
	}

}