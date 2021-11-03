module.exports = function () {

	this.pickupStartDateText = element(by.xpath('//strong[@ng-hide="pickUpStartDateEditable"]'));
	this.pickupEndDateText = element(by.xpath('//strong[@ng-hide="pickUpEndDateEditable"]'));
	this.pickupStartTimeText = element(by.xpath('//strong[@ng-hide="pickUpStartTimeEditable"]'));
	this.pickupEndTimeText = element(by.xpath('//strong[@ng-hide="pickUpEndTimeEditable"]'));
	this.lineLevelPickupStartDateTextbox = element(by.model("product.item.pickUpStartDate"));
	this.lineLevelPickupEndDateTextbox = element(by.model("product.item.pickUpEndDate"));
	this.lineLevelPickupStartTimeTextbox = element(by.model("product.item.pickUpStartTime"));
	this.lineLevelPickupEndTimeTextbox = element(by.model("product.item.pickUpEndTime"));

	this.fulfillmentTypeValidation = function(line){
		
		temp='(//div/span[@class="faded ng-binding ng-scope"])['+line+']';
		return element(by.xpath(temp)).getText();
		
	}
	
	this.pickupStartDate = function(line){
		
		return this.pickupStartDateText.getText();
		
	}
	
	this.pickupEndDate = function(line){
		
		return this.pickupEndDateText.getText();
		
	}

	this.pickupStartTime = function(line){
		
		return this.pickupStartTimeText.getText();
		
	}

	this.pickupEndTime = function(line){
		
		return this.pickupEndTimeText.getText();
		
	}
	this.frScreenCarrierType = function(line){
		 
		 temp = element(by.xpath('(//div/p/strong[@class="ng-binding ng-scope"])['+line+']'));
		 return temp.getText();		 
	 }
	 
	 this.frSCreenServiceType = function(line){
		 
		 temp = element(by.xpath('(//div/p/strong[@class="ng-binding ng-scope"])['+line+']'));
		 return temp.getText();	
	 }

	 this.lineLevelPickupStartDate = function(){
	    	
	    	return this.lineLevelPickupStartDateTextbox.getAttribute('value');

	    }
	    
	    this.lineLevelPickupEndDate = function(){
	    	
	    	return this.lineLevelPickupEndDateTextbox.getAttribute('value');

	    }
	    
	    this.lineLevelPickupStartTime = function(){
	    	
	    	return this.lineLevelPickupStartTimeTextbox.getAttribute('value');

	    }

		this.lineLevelPickupEndTime = function(){
		
		return this.lineLevelPickupEndTimeTextbox.getAttribute('value');
	}
	    
		
		this.siteCalenderEndDateChecking = function(start,end,endDate){
			var finaldate="";
			
			if(start>end){
				var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
				var day = currentDate.getDate()
				var month = currentDate.getMonth() + 1
				var year = currentDate.getFullYear();
				finaldate = month+"/"+day+"/"+year;
				console.log("the next day in if block is "+finaldate);
				return  finaldate;
				
			}
			else{
				finaldate = endDate 
				console.log("the next day in else block is "+finaldate);
				return finaldate;
			}
			return finaldate;
		}
		
		this.PickUpTimeDifference = function(start,end){
			
			var d = new Date();
			var closeTime = (browser.params.storeCloseTime24hours).split(":");
			var startTime = (browser.params.storeStartTime24hours).split(":");
			var pickupStartTime = start.split(":");
			var pickUpEndTime = end.split(":");
			console.log("end pick up time "+pickUpEndTime[0]);
			var hour = d.getHours(); 
			var minute = d.getMinutes();
			var Time="";
			var startPickup = parseInt(pickupStartTime[0]);
			var endPickup = parseInt(pickUpEndTime[0])
			console.log("pickupstart time "+startPickup);
			console.log("pickupEnd time before conversion "+pickUpEndTime[0]);
			console.log("pickupEnd time after conversion "+endPickup);
			
			if(startPickup>endPickup){
				
				var Hour1="";
				Hour1= closeTime[0] - pickupStartTime[0];
				console.log("the first hour difference "+Math.abs(Hour1));
				var Minute1 = closeTime[1] - pickupStartTime[1];
				console.log("the first minute difference "+Minute1);
				//var time1 = 
				if(Minute1<0)
					Hour1 = Hour1-1;
				console.log("the first absolute minute difference "+Math.abs(Minute1));
				var Hour2 = pickUpEndTime[0]-startTime[0];
				console.log("the second hour difference "+Hour2);
				var Minute2 = pickUpEndTime[1] - startTime[1];
				console.log("the second minute difference "+Minute2);
				if(Minute2<0)
					Hour2 = Hour2-1;
				else if(Minute2>0)
					Hour2 = Hour2+1;
				console.log("the second absolute minute difference "+Math.abs(Minute2));
				var time1="";
				var time2 = Minute1 + Minute2;
				if(time2==0)
					time2 = "00";	
				console.log("the minute difference all "+time2);
				if(time2=>60){
				time1= Hour1+Hour2;
				}else{
					time1 = Hour1+Hour2;
				}
				console.log("the hour is "+time1);
				Time = time1+":"+time2;
				console.log("the time difference is "+Time)
				return Time;
			}
			else{
				
				var Hour = pickUpEndTime[0] - pickupStartTime[0];
				console.log("the hour difference "+Hour);
				if(pickUpEndTime[1]<pickupStartTime[1]){
					var Minute = parseInt(pickUpEndTime[1]) + parseInt( pickupStartTime[1]);
					Hour = Hour-1;
				}
				else{
					var Minute = pickUpEndTime[1] - pickupStartTime[1];
				}
				console.log("the minute difference "+Minute);
				if(Minute<0)
					Hour = Hour-1;
				Minute = Math.abs(Minute)
				console.log("the absolute minute difference "+Minute);
				if(Minute==0)
					Minute = "00";
				Time = Hour+":"+Minute;
				console.log("the time difference is "+Time)
				return Time;
				
				
			}
		} 
	 
		this.lagTimeCheck = function(start,end){
			
			var d = new Date();
			var closeTime = (browser.params.storeCloseTime24hours).split(":");
			var pickupStartTime = start.split(":");
			var pickUpEndTime = end.split(":");
			var hour =parseInt(d.getHours()); 
			var minute = parseInt(d.getMinutes());
			var closeTimeHour = parseInt(closeTime[0]);
			var startTimeHour = parseInt(pickupStartTime[0]);
			var startTimeMinute = parseInt(pickupStartTime[1]);
			var Time="";
			console.log("current hour "+hour);
			console.log("start Time Hour"+startTimeHour);
			console.log("Close Time Hour"+closeTimeHour);
			if((closeTimeHour-hour)<3){
				
				
			}
			else{
				if(hour<startTimeHour){
				
				var time1 = startTimeHour - hour;
				var time2 = "00";
				Time = time1+":"+time2;
				return Time;
				}
				else{
					
					var time1 = hour - startTimeHour
					var time2 = "00";
					Time = time1+":"+time2;
					return Time;
				}
				
			}
			
			
		}
		
		this.lineLevelPickupStartDateEdit = function(date){
			
			this.lineLevelPickupStartDateTextbox.click();
			this.lineLevelPickupStartDateTextbox.clear();
			this.lineLevelPickupStartDateTextbox.sendKeys(date);
			this.lineLevelPickupStartTimeTextbox.click();

		}

		this.lineLevelPickupEndDateEdit = function(date){
			
			this.lineLevelPickupEndDateTextbox.click()
			this.lineLevelPickupEndDateTextbox.clear()
			this.lineLevelPickupEndDateTextbox.sendKeys(date);
			
		}
}