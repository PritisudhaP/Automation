module.exports =function(){

    this.newButton = element(by.xpath("//span[contains(text(),'New')]"));
    this.searchTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
    this.inventoryPublishSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.publishButton = element(by.xpath("//a[@en-tap='publishNow(item)']"));
    this.plusButton = element(by.xpath("//en-icon[@icon='plus-block']"));
    this.StatusCheck = element(by.xpath("(//small[@class='ng-binding'])[1]"));
    var status ='';
    var filename = '';
    var totalrecord = '';
    var valueofStatus = '';
    this.getRecord = element(by.xpath("//div[@flex='50']//p[2]//span[2]"));
    this.transmissionlink = element(by.xpath("//div[@class='en-collection-expand ng-scope']/section/div[2]/p[3]/a"));
    this.getFileName = element(by.xpath("//p[3]/strong"));
         var count=0;



    this.clicknewButton =function(){
        return this.newButton.click();
    }


    this.searchInput = function(name)
    {

        for (var i = 0, len = name.length; i < len; i++) {
            this.searchTextBox.sendKeys(name[i]);
            browser.sleep(100);
        }

    }


    this.inventoryPublishSelectGear = function(selectOption){
        this.inventoryPublishSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "View")
            return element(by.xpath(temp)).click();
        else if(selectOption == "Edit")
        {
            return element(by.xpath(temp)).click();
        }

        else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            //return element.all(by.xpath(temp)).get(1).click();
            return element.all(by.xpath(temp)).get(1).click();
        }
    }

    this.clickPublish = function()
    {
        this.publishButton.click();
    }

    this.expandPlusBlock = function()
    {
        this.plusButton.click();
        //browser.sleep(300);
    }

    this.CheckStatus =function()
    {
        //element(by.xpath("//en-label[@class='uppercase label-success']/small")).getText().then(function(status)

        return element(by.xpath("//en-label[@class='uppercase label-success']/small")).getText().then(function(valueofStatus){

            for(var i=0; i<4;i++) {
                if (valueofStatus == 'STARTED') {
                    console.log("inside if block");
                    browser.sleep(2000);
                    continue;
                }

                else  {

                    console.log("inside else block");
                    console.log("");
                    return valueofStatus;
                }
            }

        });

    }

  this.CheckStatusISCompletedORNOT =function()
  {
    while(count!=1){
       element.all(by.xpath("(//div[@class='en-collection-row'])[2]/div[6]/a")).then(function (arr) {
  //                 count=arr.length;
      count=1;
                   console.log("length is "+count);


                   })
                         element(by.xpath("//button/en-icon[@icon='refresh']/parent::button")).click();
                                      browser.sleep(3000);

          }
}


    this.getNumberOfRecords =function()
    {


        return element(by.xpath("//div[@flex='50']//p[2]//span[2]")).getText();
    }
    this.clickTransmissionId =function()
    {
        this.transmissionlink.click();
        browser.sleep();
    }
    this.getFileName =function()
    {
       /* element(by.xpath("//p[3][strong='File Names:']")).getText().then(function(filename)
        {
           // console.log("file name is "+ filename);
            return filename;
        }); */

       return element(by.xpath("//p[3][strong='File Names:']")).getText();
    }



}
