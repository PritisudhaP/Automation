module.exports =function(){
	
//************************************end of locators******************************//
	
	this.returnToFRscreen = function(line){
			
			temp=element(by.xpath("(//a[@class='text-right']/strong[@class='ng-binding'])[2]"));
			temp.click();
		}
	
	
}