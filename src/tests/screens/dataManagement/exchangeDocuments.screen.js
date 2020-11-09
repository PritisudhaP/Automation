const { element } = require("protractor");

module.exports = function(){

    var doc810 = element(by.cssContainingText('option', '810'));
    var doc850 = element(by.cssContainingText('option', '850'));
    var doc997 = element(by.cssContainingText('option', '997'));
    var searchbtn = element(by.buttonText('Search'));
    var clearsearchbtn = element(by.buttonText('Clear Search'));
    var accept = element(by.cssContainingText('option', 'Accepted'));
    var rejected = element(by.cssContainingText('option', 'Rejected'));
    var all = element(by.cssContainingText('option', '- SHOW ALL -'));
    var nA = element(by.cssContainingText('option', 'N/A'));
    var open850 = element(by.xpath('(//div[text()="850 "])[1]'));
    var open810 = element(by.xpath('(//div[text()="810 "])[1]'));
    var open997 = element(by.xpath('(//div[text()="997 "])[1]'));
    var traceTab = element(by.xpath('//en-tab[contains(text(),"Trace")]'));

    
    /* Document Type filter */
    this.selectDocType = function(type){
     if(type == "810")
     doc810.click();
     else if(type == "850")
     doc850.click();
     else if(type == "997")
     doc997.click();
    }

    /*Acknowledgment Status Filter*/
    this.acknowledgementStatus = function(status){
      if(status == "Accepted")
      accept.click();
      else if(status == "Rejected")
      rejected.click();
      else if(status == "N/A")
      nA.click();
      else if(status == "All")
      all.click();
    }

     this.search = function(){
        searchbtn.click();  
     }

     this.clearSearch = function(){
        clearsearchbtn.click();
     }

     /*Open document*/
     this.clickOnDocument = function(document){
        if(document == "810")
        open810.click();
        else if(document == "850")
        open850.click();
        else if(document == "997")
        open997.click();
     }

     this.clickOnTrace = function(){
        traceTab.click();
     }
}