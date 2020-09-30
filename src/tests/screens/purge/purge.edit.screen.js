module.exports =function(){
    
    this.newButton = element(by.css('button.button-primary.en-button'));
    
    this.getText  =  function(element, callback) {
        element.getText().then (function(text){             
            callback(text);
         });        

    }
    
    this.new=function(){
     this.newButton.click();   
    }
    
    
    
}
