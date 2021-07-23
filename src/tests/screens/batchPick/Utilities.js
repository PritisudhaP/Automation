global.filename="";
module.exports = { 
		
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
	    		//console.log("the combined file name is "+fn);
	    		
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
		    	temp =  element(by.xpath('(//button/en-icon[@icon="media-play" and @class="text-secondary ng-scope text-accent"])['+line+']'));
		    	if(status=="STARTED"){
		    		console.log("the Route is already started");
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
		 closeIcon : function() {
		    	element(by.xpath('//en-icon[@icon="x-circle"]')).isPresent().then(function(result) {
				    if ( result ) {
				    	temp=element(by.xpath('//en-icon[@icon="x-circle"]'));
						 temp.click();
				    } else {
						 console.log("No close butto found")
				    }
				});
		 },
		getText : function()
		{
			
		}

}

