module.exports =function(){

    var salesOrderDefaultGearIconOption = "Release";
    var temp = "";


//  var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.salesOrderReferencesEditButton = element(by.xpath('//en-title[contains(text(),"REFERENCES")]/../en-icon[@icon="edit"]'));
    this.salesOrderShippingServiceCodeTextBox = element(by.xpath('//label[contains(text(),"ShippingServiceCode")]/../input'));
    this.salesOrderExportPackingCheckbox = element(by.xpath('//span[contains(text(),"ExportPacking")]/input'));
    this.salesOrderMustShipCheckbox = element(by.xpath('//span[contains(text(),"MustShip")]/input'));
    this.salesOrderSameDayCheckbox = element(by.xpath('//span[contains(text(),"SameDay")]/input'));
    this.salesOrderReferencesSaveButton = element(by.xpath('(//button/span[contains(text(),"Save References")]/parent::button)[1]'));

    this.salesOrderCarrierPencilIcon = element(by.xpath('(//en-icon[@icon="edit" and contains(@en-tap,"editCarrier")])[1]'));
    this.salesOrderCarrierServicePencilIcon = element(by.xpath('(//en-icon[@icon="edit" and contains(@en-tap,"editCarrier")])[2]'));

    this.salesOrderLineStatusText = element(by.xpath('(//section/en-list/en-item/div/div/div)[4]'));

    this.salesOrderCarrierDropdown = element(by.xpath('//select[@name="carrier"]'));
    this.salesOrderCarrierServiceDropdown = element(by.xpath('//select[@name="service"]'));
    this.salesOrderCarrierUpdateButton = element(by.xpath('//button[contains(@en-tap,"editCarrier")]'));
    
    this.salesOrderUpdateCarrierPopupButton = element(by.xpath('(//button[contains(@en-tap,"updateShipmentRequestsInExternalSystem")])[2]'));
    this.salesOrderUpdateCarrierResultText = element(by.xpath('//div[@ng-if="data.externalShipmentShipmentResults"]'));
 

    this.salesOrderShipmentRequestTab = element(by.xpath('//en-tab[contains(text(),"Shipping Requests")]'));
    this.salesOrderShipmentRequestStatusText = element(by.xpath('//small[contains(@ng-if,"supplementalShipmentRequest.data")]'));

    this.salesOrderShipToAddressEditButton = element(by.xpath('//en-title[contains(text(),"Ship To Address")]/a/en-icon'));
    this.salesOrderShipToAddressEditConfirmButton = element(by.xpath('//button/span[text()="Ok"]/parent::button')); 

    this.salesOrderEditLineButton = element(by.xpath('(//div[@class="line-wrapper"]/div/en-actions/button)[1]'));
    this.salesOrderLineEditATSText = element(by.xpath('//en-label[@ng-if="data.useInventory"]'));
  
    this.saveButton = element.all(by.xpath('//button/en-icon[@icon="check-circle"]'));

    this.salesOrderCustomerNumberText = element(by.xpath('//a[contains(@en-tap, "customer: salesOrder.data.customer")]'));
    this.resaveButton = element(by.xpath('//en-icon[@icon="check-circle"]/parent::button'));

// Added by Shyam

    var unitPrice = element(by.model('item.itemUnitPrice'));
    var savePrice = element(by.xpath('//span[text()="Save"]'));

    var itemQty = element(by.model('product.item.itemQty'));

    var payButton = element(by.xpath('//span[text()="Pay"]'));
    var paymentMethod = element(by.model('payment.method'));
    var cardNbr = element(by.model('payment.cardNumber'));
    var cvv = element(by.model('payment.cvv'));
    var nameOnCard = element(by.model('payment.nameOnCard'));
    var expiryMonth = element(by.model('payment.expMonth'));
    var expiryYr = element(by.model('payment.expYear'));
    var submitButton = element(by.xpath('//span[text()="Submit"]'));
    var cancelQty = element(by.xpath('//input[@name="cancelledQty"]'));
    var cancelReasoncode = element(by.xpath('//select[@name="reasonCode"]'));
    var confirm = element(by.xpath('//span[text()="Confirm"]'));

    //
	
    this.salesOrderEditReferences = function() {
        return this.salesOrderReferencesEditButton.click();
    }
   
    this.salesOrderEnterShippingServiceCode = function(serviceCode) {
        return this.salesOrderShippingServiceCodeTextBox.sendKeys(serviceCode);
    }   
    
    this.salesOrderSelectExportPacking = function() {
        return this.salesOrderExportPackingCheckbox.click();
    }

    this.salesOrderSelectMustShip = function() {
        return this.salesOrderMustShipCheckbox.click();
    }
    
    this.salesOrderSelectSameDay = function() {
        return this.salesOrderSameDayCheckbox.click();
    }


    this.salesOrderSaveReferences = function() {
        return this.salesOrderReferencesSaveButton.click();
    }

    this.salesOrderSelectShipmentRequest = function() {
        return this.salesOrderShipmentRequestTab.click();
    }

    this.salesOrderGetShipmentRequestStatus = function() {
        return this.salesOrderShipmentRequestStatusText.getText();
    }

    this.salesOrderEditCarrier = function(carrier,type) {
        this.salesOrderCarrierPencilIcon.click();
        this.salesOrderCarrierDropdown.sendKeys(carrier);
        this.salesOrderCarrierServiceDropdown.sendKeys(type);
        this.salesOrderCarrierUpdateButton.click();

        return this.salesOrderUpdateCarrierPopupButton.click();
    }

    this.salesOrderCarrierUpdateFromWMS = function() {
        return this.salesOrderUpdateCarrierResultText.getText();
    }

    this.salesOrderEditShipToAddress = function() {
         return this.salesOrderShipToAddressEditButton.click();
    }

    this.salesOrderEditShipToAddressConfirm = function() {
         return this.salesOrderShipToAddressEditConfirmButton.click();
    }

    this.salesOrderLineStatus = function() {
         return this.salesOrderLineStatusText.getText();
    }

    this.saveSO = function() {
        return this.saveButton.click();
    }

    this.editLine= function (option,action, value) {
        this.salesOrderEditLineButton.click();
        temp = "//button/span[contains(text(),'" + option + "')]/parent::button";
        element.all(by.xpath(temp)).get(0).click();
        if (action == "view") {
            return true;
        } 
    }

    this.salesOrderLineEditGetATS = function() {
        return this.salesOrderLineEditATSText.getText();
    }

    this.salesOrderGetCustomerNumber = function() {
        return this.salesOrderCustomerNumberText.getText();
    }
    
    this.orderQtyCheck = function(line){
   
    	temp = element(by.xpath('(//div[@class="line-qty is-clickable"]/div/div/small[@class="ng-binding"])['+line+']'))
    	return temp.getText();
    }
 this.orderQtyCheckAfterRelease = function(line){
    	
    	temp = element(by.xpath('(//div[@class="line-qty"]/div/div/small[@class="ng-binding"])['+line+']'))
    	return temp.getText();
    }
	this.QTYCheck = function(line){
	 
	 temp =  element(by.xpath('(//div[@class="line-qty is-clickable"]/div/div/small[@class="ng-binding"])['+line+']'));
	 return temp.getText(); 
    }
    
    this.reSave = function(){
    	
    	this.resaveButton.click();
    }


     // Added by Shyam R
     this.ClickonEditoption = function(value){
        temp = "//span[text()='" +value+ "']";
        element(by.xpath(temp)).click();
    }

    this.selectfromEditOption = function(value){
        element(by.cssContainingText('option', value)).click();
    }

    this.AdjustPriceForSku = function(price){
        unitPrice.clear();
        unitPrice.sendKeys(price);
        savePrice.click();
    }

    this.ItemQtyForSku = function(qty){
        itemQty.clear();
        itemQty.sendKeys(qty);
    }

    this.cancelLineQty = function(qty,reason){
        cancelQty.clear();
        cancelQty.sendKeys(qty);
        cancelReasoncode.sendKeys(reason);
        confirm.click();
    } 

    this.makePayment = function(method,cardNumber,CVV,name,month,year){
        payButton.click();
        paymentMethod.sendKeys(method);
        cardNbr.sendKeys(cardNumber);
        cvv.sendKeys(CVV);
        nameOnCard.sendKeys(name);
        expiryMonth.sendKeys(month);
        expiryYr.sendKeys(year);
        submitButton.click();
     }
    //

}

