module.exports =function(){

    //Added by shyam
    var ONbr = " ";
     
    var salesOrderDefaultGearIconOption = "Release";
    var temp = "";

    var salesOrderStatustext = element(by.xpath("//*[contains(@ng-repeat,'data track by $index')]/div/div[5]"));
   
    var shipmentNbr = element(by.xpath('(//b[text()="Fulfillment Request #"])/following-sibling::a'));

    //
    this.salesOrderSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.salesOrderSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.salesOrderSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    this.salesOrderSearchCriteriaRemove = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));

   // this.salesOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
   this.salesOrderSelectGearIcon = element(by.xpath('(//div/en-actions/button/en-icon)[2]/parent::button'));
  // this.salesOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.salesOrderReleaseOrderFromGearIcon = element(by.xpath('//span/li/button/span[text()="Release"]/parent::button'));

   // this.salesOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));
   //this.salesOrderStatusText = element(by.xpath('(//en-label/span/span/small)[1]'));
   this.salesOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[2])[1]'));
    this.salesOrderNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[6])[1]/div/small/strong'));
    this.salesOrderEditGear = element(by.xpath("(//div/en-actions/button/en-icon)[1]/parent::button"));
    this.releaseOrderButton = element(by.xpath("//li/button/span[contains(text() , 'Release')]/parent::button"));

    this.salesOrderMatchFilterSelect = element(by.xpath('//select[@name="filter"]'));

    this.salesOrderSelectAllCheckbox = element(by.xpath('//input[@ng-model="salesOrderCollection.checkAllModel"]'));
    this.salesOrderActionAllButton = element(by.xpath('//div[@class="en-collection-title"]/en-actions/button'));
    this.alertMessage= element(by.xpath("//en-alert[@class='alert-error alert-scrollable']/span"));
    this.statusText= element(by.xpath("//span[@class='ellipsis']/span/small"));
    this.ActionAllButton = element(by.xpath("//en-icon[@icon='more-vertical']"));
    this.shippingRequestTab = element(by.xpath('//en-tab[@pane = "shipReqPane"]'));
    this.shippingRequestPlusIcon = element(by.xpath('//en-icon/parent::en-collapse-trigger'));
    this.shippingRequestQuantityCount = element(by.xpath('(//div[@class = "en-collection-row"]/div[3])[1]'));
    this.salesOrderLineQty = element(by.xpath("//div/div/div[@class= 'line-qty']/div/div/span"));
    this.searchTab = element(by.xpath("//form/en-field/en-input/input"));
    this.skuNameOnShipmentRequest = element(by.xpath("(//div[@class = 'en-collection-row']/div[1])[1]"));
    //modified by Priti for presale
    this.skuStatusText= element(by.xpath("//en-label[@class='label-xs bold label-success']/small"));
    this.reservationlink = element(by.xpath("//en-tab[contains(text(),'Reservations')]"));
    this.reservationText = element(by.xpath("//en-title[@class='title-sm ng-binding']"));
    

    var common = require(process.cwd() + '/screens/commons.js');
   // var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    // Added by shyam for zipcodes   
    this.filterText = element(by.model("apiSearchText.value"));
    this.statusEditGear = element(by.xpath('(//en-icon[@icon="more-vertical"])[1]'));
    this.updateOrderStatus = element(by.xpath('//span[text()="Update Status"]'));
    this.delivered = element(by.model('modalObject.status')).element(by.css('option[value="DELIVERED"]'));
    this.orderStatusComments = element(by.model('modalObject.reason'));
    this.orderNbr = element(by.xpath('(//strong)[6]'));
    this.orderStatus = element(by.xpath('(//small[@class="ng-binding"])[2]'));
    this.orderRelease = element(by.xpath('//span[text()="Release"]'));
    this.filter = element(by.model('apiSearchText.value'));
    this.confirmRelease = element(by.xpath('//en-modal-footer/en-footer/div/button[2]/span'));
    this.logsTab = element(by.xpath('//en-tab[text()="Logs"]'));
    this.chevronIcon = element(by.xpath('//en-collapse-trigger/en-icon'));
    this.orderlogCountryZip = element(by.xpath('//small[contains(text(),"37.09024,-95.712891")]'));
    this.orderlogCountryCAZip = element(by.xpath('//small[contains(text(),"56.130366,-106.346771")]'));
    this.orderlogcityZip = element(by.xpath('//small[contains(text(),"33.7489954,-84.3879824")]'));
    this.orderlogcityCAZip = element(by.xpath('//small[contains(text(),"43.653226,-79.383184")]'));
    this.orderlogstateZip = element(by.xpath('//small[contains(text(),"35.20105,-91.831833")]'));
    this.orderlogstateCAZip = element(by.xpath('//small[contains(text(),"70.2997711,-83.10757699999999")]'));
    this.resolveLabel = element(by.xpath('//small[contains(text(),"Trying to resolve")]'));
    this.citywithSpaces = element(by.xpath('//small[contains(text(),"37.7749295,-122.4194155")]'));
    this.validZipcode = element(by.xpath('//small[contains(text(),"37.15833480000001,-79.233837")]'));
    this.customeredit = element(by.xpath('(//en-icon[@class="xs"])[2]'));
    this.geardots = element(by.xpath('(//en-icon[@icon="more-vertical"])[3]'));
    this.error = element(by.xpath('(//div[@ng-class="alertClasses(message)"])[1]'));	
    
    // Added by Shyam
    
    this.channelEditBtn = element(by.xpath('(//en-icon[@icon="edit"])[2]'));
    this.tick = element(by.xpath('//en-icon[@icon="check"]'));
    this.callIn = element(by.xpath('//strong[contains(text(),"Call-In")]'));

    this.cancelbtn = element(by.xpath('//span[text()="Cancel"]'));
    this.ShipmentTab = element(by.xpath('//en-tab[text()="Shipping Requests"]'));
    this.clickonFR = element(by.xpath('//section/div/a'));

    this.selectChannel = function(channel){
        this.channelEditBtn.click();
        element(by.cssContainingText('option',channel)).click();
        this.tick.click();
    }

    this.attachCustomer = function(){
        return this.callIn.click();
    }

    this.clickOnShipmentTab = function(){
        this.ShipmentTab.click();
        this.chevronIcon.click();
        this.clickonFR.click();
    }
   
    this.filter = function(){
        var value = ONbr;
        console.log("filter value:",value)
        this.filterText.sendKeys(value);
    }


    //
    this.salesOrderSearch = function(criteria, salesOrderSearchValue){
/*        commons.selectOption(this.salesOrderSearchCriteriaDropdown,criteria);
        this.salesOrderSearchTextbox.clear();
//        this.salesOrderSearchTextbox.sendKeys(salesOrderSearchValue);

        for (var i = 0, len = salesOrderSearchValue.length; i < len; i++) {
            this.salesOrderSearchTextbox.sendKeys(salesOrderSearchValue[i]);
            browser.sleep(100);
        }

        return this.salesOrderSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = salesOrderSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(salesOrderSearchValue[i]);
            browser.sleep(100);
        }

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.clickOnReleaseOrderButton = function()
    {
        this.salesOrderEditGear.click();
        browser.sleep(1000);
        return this.releaseOrderButton.click();
    }

    this.clearSearchTab = function () {
        return this.searchTab.clear();
    }

    this.salesOrderSearchRemove = function(count) {
       temp = "(//button/en-icon[@icon='x-circle']/parent::button)[" + count +  "]";
       return element(by.xpath(temp)).click();
    }

    this.getSalesOrderLineQty = function () {
        return this.salesOrderLineQty.getText();
    }

    this.clickOnshippingRequestTab = function()
    {
        return this.shippingRequestTab.click();
    }

    this.viewShippingRequest = function(){
        return this.shippingRequestPlusIcon.click();
    }

    this.getShippingQuantityValue = function () {
        return this.shippingRequestQuantityCount.getText();
    }
    this.getSkuNameOnShipmentRequest = function () {
        return this.skuNameOnShipmentRequest.getText();
    }




    this.salesOrderSelectGear = function(selectOption){
        this.salesOrderSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "View")
            return element(by.xpath(temp)).click();
        else {
                element(by.xpath(temp)).click();
                temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
                return element.all(by.xpath(temp)).get(1).click();
        }
    }

   this.salesOrderStatus = function() {
        return this.salesOrderStatusText.getText();
   }

   this.salesOrderNumber = function() {
       return this.salesOrderNumberText.getText();
   }

   this.salesOrderMatchFilter = function(value) {
       return this.salesOrderMatchFilterSelect.sendKeys(value);
   }

    this.multiSalesorderAction = function(action) {
       this.salesOrderSelectAllCheckbox.click();
       this.salesOrderActionAllButton.click();
       temp = "//button/span[contains(text(),'" + action + "')]/parent::button";
       element.all(by.xpath(temp)).get(0).click();
       element.all(by.xpath(temp)).get(1).click();

    }
    this.alertMessageOnValidateOrder =function()
    {
       return this.alertMessage.getText();
    }
    this.status= function()
    {
      return this.statusText.getText();
    }
    this.multiAction = function(action)
    {
      this.salesOrderSelectAllCheckbox.click();
             this.ActionAllButton.click();
             temp = "//button/span[contains(text(),'" + action + "')]/parent::button";
             element.all(by.xpath(temp)).get(0).click();

    }
    this.verifySkuStatus = function()
    {
      return this.skuStatusText.getText();
    }
    this.clickOnReservationsTab = function()
    {
      return this.reservationlink.click();
    }
    this.verifyReservationText = function()
    {
     return this.reservationText.getText();
    }
   // Added by Shyam 

    this.EditGear =function()
    {
        return this.statusEditGear.click();
    }
    this.updateStatus =function()
    {
        return this.updateOrderStatus.click();
    }
    this.updateComments= function()
    {
        return this.orderStatusComments.sendKeys("Automation scripts");
    }
    this.printOrderNbr = function(){
        this.orderNbr.getText().then(function(nbr){
            console.log("OrderNbr:",nbr)
        }); 
        }
    
    this.verifyorderStatus = function(value) {
        return  this.orderStatus.getText().then(function (orderStatus) {
            console.log("Order Status: ",orderStatus)
            expect(orderStatus).toBe(value)
        });
    }
    this.clickonRelease = function(){
        this.orderRelease.click();
        this.confirmRelease.click();
    }

    this.Logs = function(){
   return this.logsTab.click();
    }

    this.clickonLogs = function(){
        return this.chevronIcon.click();
    }

    this.checkCountryzip = function(){
        this.orderlogCountryZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogCountryZip.isPresent()).toBe(true);
    }

    this.checkCountryCAzip = function(){
        this.orderlogCountryCAZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogCountryCAZip.isPresent()).toBe(true);
    }
    this.checkCityzip = function(){
        this.orderlogcityZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogcityZip.isPresent()).toBe(true);
    }
    this.checkCityCAzip = function(){
        this.orderlogcityCAZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogcityCAZip.isPresent()).toBe(true);
    }
    this.checkStatezip = function(){
        this.orderlogstateZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogstateZip.isPresent()).toBe(true);
    }
    this.checkStateCAzip = function(){
        this.orderlogstateCAZip.getText().then(function(resolve){
            console.log("",resolve);
        })
        expect(this.orderlogstateCAZip.isPresent()).toBe(true);
    }
    this.checkResolveLabel = function(){
        expect(this.resolveLabel.isPresent()).toBe(false);
        console.log("valid zipcode")
    }
    this.checkcitywithspaces = function(){
        expect(this.citywithSpaces.isPresent()).toBe(true);
        this.citywithSpaces.getText().then(console.log);
    }
    this.checkvalidZipcode = function(){
        expect(this.validZipcode.isPresent()).toBe(true);
        this.validZipcode.getText().then(console.log);
    }

    this.customerEdit = function(){
        return this.customeredit.click();
    }

    this.soGeardots = function(){
        return this.geardots.click();
    }

    this.sogeardots2 = function(){
        element(by.xpath('(//en-icon[@icon="more-vertical"])[4]')).click();
    }

    this.verifypopupError = function(){
        return this.error.click();
    }
    this.clickonCancelbtn = function(){
        return this.cancelbtn.click();
    }

   this.capture = function(){
         ONbr = this.orderNbr.getText().then(console.log);
       return ONbr;
   }

   this.salesOrderNbr = function() {
    return this.orderNbr.getText();
}

this.clickOnStatustext = function(){
    salesOrderStatustext.click();
}


 this.clickOnStab = function(){
    this.ShipmentTab.click();
    this.chevronIcon.click();
 }

 this.clickOnitemtab = function(){
    element(by.xpath('//en-tab[@pane="itemsPane"]')).click();
 }

 this.getShipmentReqNbr = function(){
     return this.shipmentNbr.getText();
 }
    //
}
