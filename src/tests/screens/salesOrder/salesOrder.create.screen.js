module.exports =function(){


    this.salesChannelEditIcon = element(by.xpath('//en-icon[@en-tap="$root.editChannel=true"]'));
    this.salesChannelDropdown = element(by.xpath('(//select[@name="channel"])[1]'));
    this.salesChannelSelectButton = element(by.xpath('//button/en-icon[@icon="check"]'));

    this.shipCompleteEditButton = element(by.xpath('//en-icon[@en-tap="$root.editShipComplete=true"]'));
    this.shipCompleteSelectButton = element(by.xpath('//input[@name="shipComplete"]'));
    this.carticonclickbutton=element(by.xpath("//en-icon[@icon='cart-plus']"));

    this.attachCustomerButton = element(by.xpath('//div/en-icon[@icon="customer"]'));
	this.editLineIcon = element(by.xpath("(//div/en-actions/button/en-icon)[2]"));
    this.orderErrorMessage = element(by.xpath("//en-content/section/en-alert[@class = 'alert-error ng-binding']"));

    this.customerSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchText.value"]'));

    this.selectCustomerCheckbox = element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input'));
    this.useSelectedCustomerButton = element(by.xpath('//button/span[contains(text(), "Use Selected Customer")]/parent::button'));

    this.addToCartButton = element(by.xpath('//button/en-icon[@icon="cart-plus"]/parent::button'));

    this.searchProductTextBox = element(by.xpath('//input[@placeholder = "Search Skus"]'));

    this.selectSKUCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));
    this.selectAllSKUCheckbox = element(by.xpath('//div[@class="en-collection-header"]/div/div/input'));

    this.addProductButton = element(by.xpath('//button/span[contains(text(), "Add Skus")]/parent::button'));
    this.enterItemQtyTextBox = element(by.xpath('//input[@ng-model="item.orderQty"]'));

    this.searchButtonInPopup = element.all(by.xpath('//button[contains(@class,"en-button en-collection-search-button")][1]')).get(1);

    this.saveOptionButton = element.all(by.xpath('//button/en-icon[@icon="check-circle"]'));

    this.saveAsDraftButton = element.all(by.xpath('//button/span[contains(text(),"Save as Draft")]'));
    this.saveButton = element.all(by.xpath('//button/span[text()="Save"]'));

    this.salesOrderNumberText = element(by.xpath('//div/span[contains(text(),"OMS Order #")]/parent::div/strong'));

    this.useSuggestedAddressText = element(by.xpath('(//input[@data-ng-model="data.selectedAddress"])[1]/parent::label'));
    this.confirmCustomerAddressButton = element(by.xpath('//button/span[contains(text(),"Ok")]/parent::button'));
    
    this.skuATSText = element(by.xpath('(//div[@class="en-collection-row"]/div[@ng-if="data.useInventory"])[3]'));
    this.errorTabText = element(by.xpath("//en-tab[contains(text(),'Errors')]/en-label"));
    this.selectGear =element(by.xpath("//button/en-icon[@icon='more-vertical']"));
    this.validateOrderButton= element(by.xpath("//span[contains(text(),'Validate Order')]"));
    this.alertMessage = element(by.xpath("//en-alert[1]/span[1]"));
	this.orderSelectGearIcon = element(by.xpath("//button/en-icon[@icon = 'more-vertical']/parent::button"));
    this.secondLineStatus = element(by.xpath("(//div/div/div[@layout ='column']/div/en-label/small)[2]"));
    this.thirdLineStatus = element(by.xpath("(//div/div/div[@flex = '25']/div/en-label/small)[3]"));
    this.salesOrderEditGearIcon = element(by.xpath("(//en-actions/button/en-icon)[1]"));
    this.salesOrderReleaseButton = element(by.xpath("//span/li/button/span[text() = 'Release']/parent::button"));
    this.salesOrderConfirmReleaseButton = element(by.xpath("//div/button/span[text() = 'Release']/parent::button"));
	this.changePriceButton = element(by.xpath("//span[contains(text(), 'Change Price')]"));
    this.confirmCancelButton = element(by.xpath("//div/button/span[contains(text(),'Yes')]/parent::button"));
    this.unitPriceTextBox = element(by.model("item.itemUnitPrice"));
    this.PriceSaveButton=element(by.xpath("(//button/span[@class = 'ng-scope'])[2]"));
    this.payButton = element(by.xpath("//span[@ng-show = '!salesOrder.putting && !salesOrder.getting']"));
    this.paymentMethod = element(by.model("payment.method"));
    this.CreditCardNumber = element(by.model("payment.cardNumber"));
    this.creditCardCVVNumber = element(by.model("payment.cvv"));
    this.nameOnCreditCard = element(by.model("payment.nameOnCard"));
    this.creditCardExpMonth = element(by.model("payment.expMonth"));
    this.creditCardExpYear = element(by.model("payment.expYear"));
    this.PaymentAmount = element(by.model("payment.amount"));
    this.SubmitPayment = element(by.xpath("//button/span[@contains(text(),'Submit')]"));
    this.orderStatus = element(by.xpath("(//div/en-label[@ng-if = 'salesOrder.data.header.status'])"));
    this.releaseButton = element(by.xpath("//span/li/button/span[text()='Release']/parent::button"));
    this.cancelButton = element(by.xpath("//span/li/button/span[text()='Cancel']/parent::button"));

    this.salesOrderLineStatusText = element(by.xpath('(//section/en-list/en-item/div/div/div)[4]'));
    this.subsistutionIcon = element(by.xpath("//div/en-icon[@popover-title = 'Substitution Applicable']"));
    this.substitutionItem = element(by.xpath("//div/p/input[@name = 'substitution']"));
    this.applySubstitutionButton = element(by.xpath("//button/span[text() = 'Apply Substitution']/parent::button"));
    this.lineOneStatus = element(by.xpath("(//section/en-list/en-item/div/div/div)[4]/div/en-label/small"));
    this.orderHeaderStatus = element(by.xpath("(//div/en-label[@ng-if = 'salesOrder.data.header.status'])"));
    this.orderQtyBox = element(by.xpath("//input[@ng-model = 'item.orderQty']"));
    this.confirmCancellationButton = element(by.xpath("//en-modal-footer/div/button/span[text() = 'Yes']/parent::button"));
    this.confirmRelease = element(by.xpath("//button/span[text() = 'Release']/parent::button"));

    this.reservationCount = element(by.xpath("//en-body/en-tabs/en-tab[@pane = 'reservationPane']/en-label"));
    this.shippingRequestCount = element(by.xpath("//en-body/en-tabs/en-tab[@pane = 'shipReqPane']/en-label"));
    this.confirmCancelLineButton = element(by.xpath("//div/button/span[text() = 'Yes']/parent::button"));
    this.skuAliasesTab = element(by.xpath("//en-tab[@pane = 'skuOptionPanes_SkuAliases']"));
    this.skuTab = element(by.xpath("//en-tab[@pane = 'skuOptionPanes_Skus']"));
    this.allocatedSkuName = element(by.xpath("//div/div/div/div[@class = 'line-title']/strong"));
    this.lineTitle = element(by.xpath("//div[@class = 'line-title']/strong"));
    this.replacementSkuName = element(by.xpath("//form/section/p/strong[text() ='Sku:']/parent::p"));
    this.originalSkuName = element(by.xpath("//form/section/p/strong[text() ='Description:']/parent::p"));
    this.reshipButton = element(by.xpath("//span/li/button/span[text()='Re-Ship']/parent::button"));
    this.reasonCode = element(by.xpath("//en-control/select/option[@label = 'delayed']"));
    this.reshipComments = element(by.xpath("//en-control/textarea"));
    this.createReshipOrderButton = element(by.xpath("//div/button/span[text() = 'Reship']"));
    this.orderStatusValue = element(by.xpath("(//div/en-label/small)[1]"));
    this.orderStatusValue = element(by.xpath("(//div/en-label/small)[1]"));
    this.firstLineQty = element(by.xpath("//div/div[@class = 'line-qty is-clickable']/span"));
    this.reshipReason = element(by.xpath("//div/span[text() = 'Reship Reason:']/following-sibling::strong"));
    this.reshipCommentsOnOrder = element(by.xpath("//div/span[text() = 'Reship Comment:']/following-sibling::strong"));
    //this.linePriceAmount = element(by.xpath("(//div[@class = 'line-details']/div/div/strong)[2]"));
    this.balanceDueAmount = element(by.xpath("//en-list/en-item/small[text() = 'Balance Due ']/following-sibling::strong"));
    this.saveOrderButton = element(by.xpath("//button/en-icon[@icon = 'check-circle']/parent::button"));
    //this.savebutton = element(by.xpath("//li/button/span[text() = 'Save']/parent::button"));
     this.lineqty = element(by.xpath("//div/div[@class = 'line-qty is-clickable']"));
     this.modifyQty = element(by.name("qty"));
     this.minusIcon = element(by.xpath("//en-icon[@icon = 'minus']"));
     this.applyChangesButton = element(by.xpath("//en-footer/button/span[contains(text(),'Apply')]//parent::button"));
     this.cancelSKuChangesButton = element(by.xpath('//en-footer/button/span[contains(text(),"Cancel")]//parent::button'));
     this.editSkuPlusIcon = element(by.xpath("//button/en-icon[@icon = 'plus']/parent::button"));
     this.editCustomerDetailsIcon = element(by.xpath("//div/div/button/en-icon[@icon='edit']/parent::button"));
     this.customerDetailsUpdateIcon = element(by.xpath("(//div/button/en-icon[@icon='plus-circle']//parent::button)[1]"));
     this.shipToAddressEditIcon = element(by.xpath("//en-title[contains(text(),'Ship To Address')]/button/en-icon[@icon = 'edit']/parent::button"));
     this.shipToAddressFirstName =element(by.xpath("//div/en-control/input[@name='firstName']"));
     this.shipToAddressOkButton = element(by.xpath("//button[@type ='submit']/span[text() ='Ok']"));
     this.editSkuPencilIcon = element(by.xpath("//button/en-icon[@icon = 'edit']/parent::button"));
     this.lineItemEditFromGearIcon = element(by.xpath("//div[@class='line-qty is-clickable']"));
     this.editLineButton =element(by.xpath("//button/span[text()= 'Edit Line']/parent::button"));
     this.subsistueSkueditPencilIcon = element(by.model("substituteItem.sku"));
     this.confirmCancelButton =element(by.xpath("//div/button/span[text() = 'Yes']/parent::button"));
     this.ordersatus = element(by.xpath("(//div/en-label/small)[1]"));
     this.parentOrderLink = element(by.xpath("//div/small[contains(@ng-if, 'salesOrder.data.parentLinkedOrder')]/a"));
	 
	//modified by Priti
	this.callcenterattachcustomerButton = element(by.xpath("//button[@class='en-button button-primary']"));
    this.callcentersearchcustomerTextBox = element(by.xpath("(//input[@name='simplified-text-value'])[2]"));
    this.callcenterfindProductTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
	this.selectProductCheckBox = element(by.xpath("//input[@id='skusCollection_checkbox_0_0']"));
    this.searchProductButton = element(by.xpath("//en-panel[@class='panel-primary']//div//button[1]"));
    this.selectsecondProductCheckBox = element(by.xpath("//input[@id='inventoryCollection_checkbox_0_0']"));
	this.addtoorderButton=  element(by.xpath("//span[contains(text(),'Add to Order')]"));
    this.futurecountText = element(by.xpath("//div[@id='inventoryCollection_collectionBody']//div[8]"));
    this.inboundcountText = element(by.xpath("//div[@id='inventoryCollection_collectionBody']//div[11]"));
    this.presaleLabelAtProductSearch = element(by.xpath("//en-label[@ng-if='item.presale']/small"));
    this.presaleLabelAtskuresults = element(by.xpath("//en-label[@class='label-xs bold label-warn ng-scope']/small"));

	var common = require(process.cwd() + '/screens/commons.js');
    // var common = require(process.cwd() + '/screens/commons.js');

    // Added by shyam

    this.selectItemCheckbox = element(by.xpath('(//input[@type="checkbox"])[2]'));
    this.shipFullOrderEdit = element(by.xpath('(//en-icon[@icon="edit"])[4]'));
    this.shipfullOrderCheckbox = element(by.model('salesOrder.data.header.shipComplete'));
    this.chk = element(by.xpath('//en-icon[@icon="check"]'));
    this.createCustomer = element(by.xpath('//span[text()="Create Customer"]'));
    this.addaddressIcon = element(by.xpath('(//en-icon[@icon="plus-circle"])[2]'));
    this.advanceSettings = element(by.xpath('//en-tab[@pane="advanced-settings"]'));
    this.createbtn = element(by.xpath('//en-icon[@icon="doc-edit"]'));
    this.atsColumn = element(by.xpath('(//div[text()="ATS"])[1]'));
    this.searchOrder = element(by.model('apiSearchText.value'));
       
   //added By Vishak
    this.salesOrderUnitPrice = element(by.xpath("//small[contains(text(),'Unit Price')]/following-sibling::small"));
    this.arrowUp = element(by.xpath('//en-icon[@icon="arrow-up"]'));
    this.arrowDown = element(by.xpath('//en-icon[@icon="arrow-down"]'));
    this.orderQtyButton  = element(by.xpath('(//div/div/div/span[@class="ng-binding"])[2]'));
    this.incQuantity = element(by.model("product.item.itemQty"));
    this.decQTYDisabledButton = element(by.xpath('//en-icon[@disabled="disabled"]'));
    this.addSku = element(by.xpath("//button/span[contains(text(),'Add SKUs')]"));
    this.useSelectedSKU = element(by.xpath("//button/span[contains(text(),'Add Skus')]"));
    this.minimumSkuQTY = element(by.model("sku.qty"));
    this.skuSearchButton = element(by.xpath("//button[contains(text(),'Search')]"));
    this.entryAdjustmentButton =  element(by.xpath('//en-tab[@has-permission="InventoryPoolEntry:Update"]'));
    this.adjustedQTY = element(by.model("entry.data.amountToAdjust"));
    this.adjustmentReason = element(by.model("entry.data.description"));
    this.fullfillmentTypeDropdown = element(by.model("product.item.fulfillmentType"));
    this.availableStoreDropdown = element(by.model("product.item.fulfillmentSite"));
    this.OrderatportalselectAllCheckbox = element(by.xpath('//div[@checkbox-value="item.id"]'));
    this.truckIconatHeader = element(by.xpath('(//button/en-icon[@icon="truck"])[1]'));
    this.pickupButton = element(by.xpath('(//button[@class="button-popover-dark trim en-button"])'));
    this.pickedUpBy = element(by.model("data.pickUpDetails.pickedUpBy"));
    this.verifiedWith = element(by.model("data.pickUpDetails.verificationProof"));
    this.enterID = element(by.model("data.pickUpDetails.verificationID"));
    this.pickupNote = element(by.model("data.pickUpDetails.notes"));
    this.reasondropdown = element(by.model("modalObject.reasonCode"));
    this.rejectComments =  element(by.model("modalObject.reason"));
	this.orderSelectionDropdown = element(by.model("salesOrder.data.header.orderType"));
    this.SubscriptionFrequencySelect = element(by.model("subscriptionInfo.frequency"));
    this.SubscriptionEndDateButton= element(by.model("subscriptionInfo.endDate"));
    
    //!*************************************************************************!// 
    this.clickonCreatebtn = function(){
        return this.createbtn.click();
    }

    this.clickonAdvancesettings = function(){
        return this.advanceSettings.click();
    }

    this.customerSearch = function(value){
       return this.customerSearchTextbox.sendKeys(value);

    }

    this.ClickonSKUcheckbox = function(){
       return this.selectItemCheckbox.click();

    }

    this.clickonShipfullOrder = function(){
       this.shipFullOrderEdit.click();
       this.shipfullOrderCheckbox.click();
       this.chk.click();
    }
       
    this.clickonCreateCustomer = function(){
     return this.createCustomer.click();
    }

    this.clickonaddAddressplus = function(){
        return this.addaddressIcon.click();
    }

    this.verifyATScolumn = function(){
        this.atsColumn.isPresent().then(function(value){
            console.log("ATS column:",value);
           })
    }

    this.orderSearch = function(value){
       this.searchOrder.sendKeys(value);
    }

    this.increaseQty = function(){
       this.arrowUp.click();
    }
    

   //



    var commons = new common();
	    this.setSalesChannel = function(salesChannelName){
         this.salesChannelEditIcon.click();
         commons.selectOption(this.salesChannelDropdown,salesChannelName);
         this.salesChannelSelectButton.click();
    }
    this.clickOnApplySubstitutionButton = function()
    {
        return this.applySubstitutionButton.click();
    }
    this.selectSubstitutionItem = function()
    {
        return this.substitutionItem.click();
    }
    this.getLineOneStatus = function () {
        return this.lineOneStatus.getText();
    }
    this.getSecondLineStatus = function () {
        return this.secondLineStatus.getText();
    }
    this.getThirdLineStatus = function () {
        return this.thirdLineStatus.getText()
    }
    this.cancelSalesOrder = function () {
         this.cancelButton.click();
         browser.sleep(2000);
         return this.confirmCancellationButton.click();
    }

    this.releaseSalesOrder = function () {

        this.salesOrderEditGearIcon.click();
        browser.sleep(1000);
        this.salesOrderReleaseButton.click();
        browser.sleep(3000);
        return this.salesOrderConfirmReleaseButton.click();
    }
    this.clickOnSkuWithAliasTab = function () {
        return this.skuAliasesTab.click();

    }
    this.clickOnSkuTab = function () {
        return this.skuTab.click();

    }
    this.nameOfAllocatedSku = function () {
        return this.allocatedSkuName.getText();
    }


    this.salesOrderLineStatus = function() {
        return this.salesOrderLineStatusText.getText();
    }
    this.clickOnOrderSelectGearIcon = function()
    {
        return this.orderSelectGearIcon.click();
    }
    this.getErrorMessage = function () {
        return this.orderErrorMessage.getText();
    }

    this.attachCustomer = function() {
        this.attachCustomerButton.click();
    }
    this.getSkuName = function () {
        return this.lineTitle.getText();
    }
	this.numberOfReservationCreated = function () {
        return this.reservationCount.getText();
    }

    this.numberOfShippingRequestsCreated = function () {
        return this.shippingRequestCount.getText();
    }

    this.clickOnReleaseButton = function () {
         this.releaseButton.click();
         browser.sleep(3000);
         return this.confirmRelease.click();
    }
    this.clickOnSubsistutionIcon = function () {
        return this.subsistutionIcon.click();
    }

    this.confirmCancellation = function()
    {
        return this.confirmCancelButton.click();
    }

    this.verifyOrderTypeHeader = function () {
        browser.driver.sleep(3000);
        return this.orderHeaderStatus.getText();
    }
    this.clickOnEditLineIcon = function (lineNumber) {
        var count = parseInt(lineNumber) + 2;
        temp = "(//div/en-actions/button/en-icon)["+count+"]";
        return element(by.xpath(temp)).click();
        //return this.editLineIcon.click();
    }
    this.lineItemselectOptions = function (editLineOptions) {


        browser.sleep(3000);
        temp = "//button/span[contains(text(),'" + editLineOptions + "')]/parent::button";
        if (editLineOptions == "Change Price")
            return element(by.xpath(temp)).click();
        else if(editLineOptions == "Cancel Line") {
             element(by.xpath(temp)).click();
             return this.confirmCancelLineButton.click();
        }
        else if (editLineOptions == "Discounts") {
            return element(by.xpath(temp)).click();
        } else if (editLineOptions == "Edit Line") {
            return element(by.xpath(temp)).click();
        } else if (editLineOptions == "Appeasement") {
            return element(by.xpath(temp)).click();

        }
        else if (editLineOptions == "SKU Replacement History") {
            return element(by.xpath(temp)).click();

        }

    }

    this.getlineStatus = function (lineNumber) {
        temp = "(//section/en-list/en-item["+lineNumber+"]/div/div/div)[4]";
        return element(by.xpath(temp)).getText();
    }

    this.searchCustomer = function(criteria, searchValue) {
        this.customerSearchTextbox.clear();

        for (var i = 0, len = searchValue.length; i < len; i++) {
            this.customerSearchTextbox.sendKeys(searchValue[i]);
            browser.sleep(100);
        }

        this.customerSearchTextbox.sendKeys(protractor.Key.ENTER);
    }
    this.releaseOrder = function () {
        this.salesOrderReleaseButton.click();
        browser.sleep(3000);
        return this.salesOrderConfirmReleaseButton.click();
    }


    this.selectCustomer = function() {
        return this.selectCustomerCheckbox.click();
    }

    this.useSelectedCustomer = function() {
        return this.useSelectedCustomerButton.click();
    }


   this.addItem = function() {
       return this.addToCartButton.click();
   }

   this.searchProduct = function(searchProductValue) {
      //return this.searchProductTextBox.sendKeys(searchProductValue);
       //return  element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(searchProductValue);
       element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = searchProductValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(searchProductValue[i]);
            browser.sleep(1000);
        }

         browser.sleep(2000);
//        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

   }
    this.enterQuantity = function(qty)
    {
        return this.orderQtyBox.clear().sendKeys(qty);
        qtyUpdateBox.clear().sendKeys(qty);
    }
    this.selectSKU = function() {
        return this.selectSKUCheckbox.click();
    }

    this.selectAllSKU = function() {
        return this.selectAllSKUCheckbox.click();
   }

   this.enterQty = function(qty) {
       this.enterItemQtyTextBox.clear();
       return this.enterItemQtyTextBox.sendKeys(qty);
   }

   this.addProduct = function() {
       return this.addProductButton.click();
   }


   this.searchInPopup = function() {
       //return this.searchButtonInPopup.click();
	$('body').sendKeys(protractor.Key.ENTER);
   }

   this.saveOption = function(option) {
        this.saveOptionButton.click();

       temp = "//button/span[text()='" + option + "']";
       return element(by.xpath(temp)).click();
   }
   this.saveOrder = function(){
       return this.saveOptionButton.click();
   }


    this.salesOrderNumber = function() {
        return this.salesOrderNumberText.getText();
    }

   this.setShipComplete = function() {
        this.shipCompleteEditButton.click();
        return this.shipCompleteSelectButton.click();
   }

    this.confirmCustomerAddress = function() {
        this.confirmCustomerAddressButton.click();
   }

    this.getSuggestedAddressText = function() {
        return this.useSuggestedAddressText.getText();
    }

    this.getSKUATSValue = function() {
        return this.skuATSText.getText();
    }
    this.errorTabCount = function()
    {
      return this.errorTabText.getText();
    }
    this.clickonValidateOrder= function()
    {
      this.selectGear.click();
      return this.validateOrderButton.click();

    }
    this.alertMessageValidateOrder =function()
    {
     return this.alertMessage.getText();
    }

					   
    this.verifyOrderStatus = function () {
        browser.driver.sleep(3000);
        return this.orderStatus.getText();
    }
												   
	 
															 

    this.editLineGear = function (lineItemNumber) {
        temp = "(//section[contains(@ng-if,'salesOrder.data.lineItems.length')]//en-actions/button/en-icon)[" + lineItemNumber + "]";
        return element(by.xpath(temp)).click();
    }

																 
																		  
									 
			   

    this.getAllocatedCountOfTheLine = function(lineNumber){
        temp = "(//div/div/div[contains(@class , 'line-qty')]/div/div/small[contains(text(), 'Allocated')])["+lineNumber+"]";
        return  element(by.xpath(temp)).getText();
    }

    this.getBackOrderedCountOfTheLine = function(lineNumber){
        temp = "(//div/div/div[contains(@class , 'line-qty')]/div/div/small[contains(text(), 'BackOrdered')])["+lineNumber+"]";
        return element(by.xpath(temp)).getText();
				   
    }
																	   

    this.getShippedCountOfTheLine = function(lineNumber){
        temp = "(//div/div/div[contains(@class , 'line-qty')]/div/div/small[contains(text(), 'Shipped')])["+lineNumber+"]";
        return element(by.xpath(temp)).getText();
    }
    this.getCancelledCountOfTheLine = function(lineNumber){
        temp = "(//div/div/div[contains(@class , 'line-qty')]/div/div/small[contains(text(), 'Cancelled')])["+lineNumber+"]";
        return element(by.xpath(temp)).getText();
    }
    this.getReplacementSkuNameFromHistory = function () {
        return this.replacementSkuName.getText();
    }
    this.getOrginalSkuNameFromHistory = function () {
        return this.originalSkuName.getText();
    }
    this.clickOnReshipButton = function () {
        return this.reshipButton.click();
    }

    this.selectReasonCode = function()
    {
        return this.reasonCode.click();
    }

    this.enterReshipComments = function (comments) {
        return this.reshipComments.sendKeys(comments);
    }
    this.clickOnCreateReshipOrderButton = function () {
	 
        return this.createReshipOrderButton.click();
    }
    this.getOrderStatusValue = function () {
	 
        return this.orderStatusValue.getText();
    }
    this.getFirstLineQty = function () {
	 
        return this.firstLineQty.getText();
    }
    this.getReshipReason = function () {
	 
        return this.reshipReason.getText();
    }
    this.getReshipCommentsOnOrder = function () {
	 
        return this.reshipCommentsOnOrder.getText();
    }
    this.getLinePriceAmount = function (linenumber) {
        temp = "((//div[@class = 'line-details'])["+linenumber+"]/div/div/strong)[2]"
        return element(by.xpath(temp)).getText();
    }
    this.getBalanceDueAmount = function () {
        return this.balanceDueAmount.getText();
    }
    this.clickOnSaveOrderButton = function () {
        return this.saveOrderButton.click();

    }
    this.getReshipOrderNumber = function (orderCount) {
        temp = "(//small/span/a)["+orderCount+"]";
        return element(by.xpath(temp)).getText();
    }
    this.clickOnReshipOrderLink = function(orderCount){
        temp = "(//small/a)["+orderCount+"]";
        return element(by.xpath(temp)).click();

    }
    this.clickOnLineQty = function()
    {
        return this.lineqty.click();
    }

    this.modifyQtyValue = function(qty){
        this.modifyQty.clear();
        browser.sleep(1000);
        return this.modifyQty.sendKeys(qty);

    }
    this.ValidateApplyButtonEnablement = function () {
        return this.applyChangesButton.isEnabled();

    }
    this.clickOnCancelSkuUpdates = function () {
        return this.cancelSKuChangesButton.click();
    }

    this.isItemQtyUpdateIconEnabled = function () {
        return this.editSkuPlusIcon.isEnabled();
    }
    this.applyChanges = function () {
        return this.applyChangesButton.click();
    }
    this.verifyCustomerDetailsEditIconEnablement = function () {
        return this.editCustomerDetailsIcon.isEnabled();
    }

    this.verifyCustomerDetailsUpdateIconEnablement = function () {
        return this.customerDetailsUpdateIcon.isEnabled();
    }
    this.verifyShipToAddressEditEnablement = function () {
        return this.shipToAddressEditIcon.isEnabled();
    }
    this.clickOnShipToAddressEditIcon = function () {
        return this.shipToAddressEditIcon.click();
    }
    this.getShipToAddressFirstName = function () {
         //return this.shipToAddressFirstName.getText();
        //return this.shipToAddressFirstName.getAttribute();
        return this.shipToAddressFirstName.getAttribute('value');

    }

    this.updateShipToAddressFirstName = function (name) {
        this.shipToAddressFirstName.clear();
        browser.sleep(1000);
         return this.shipToAddressFirstName.sendKeys(name);

    }
    this.clickOnOkButton = function () {
        return this.shipToAddressOkButton.click();
    }
    this.clickOnEditSkuPencilIcon = function () {
        return this.editSkuPencilIcon.isEnabled();
    }

    this.clickOnEditLineButton = function () {
        return this.lineItemEditFromGearIcon.click();
        browser.sleep(2000);


    }
    this.verifySubsistueSkuNameEnablement = function () {
        return this.subsistueSkueditPencilIcon.isEnabled();
    }
    this.clickOnSalesOrderEditGear = function(){
        this.salesOrderEditGearIcon.click();
    }

    this.clickOnCancelSalesOrderButton = function () {

        this.cancelButton.click();
        browser.sleep(2000);
        return this.confirmCancelButton.click();
    }

    this.verifyOrderstatus = function () {
        return this.ordersatus.getText();
    }
    this.clickOnParentOrderLink = function () {
        return this.parentOrderLink.click();
    }
	
    this.setSalesChannel = function(salesChannelName){
         this.salesChannelEditIcon.click();
         commons.selectOption(this.salesChannelDropdown,salesChannelName);
         this.salesChannelSelectButton.click();
    }
    this.attachCustomer = function() {
        this.attachCustomerButton.click();
    }
    this.searchCustomer = function(criteria, searchValue) {
        this.customerSearchTextbox.clear();

        for (var i = 0, len = searchValue.length; i < len; i++) {
            this.customerSearchTextbox.sendKeys(searchValue[i]);
            browser.sleep(100);
        }

        this.customerSearchTextbox.sendKeys(protractor.Key.ENTER);
    }
    this.selectCustomer = function() {
        return this.selectCustomerCheckbox.click();
    }

    this.useSelectedCustomer = function() {
        this.useSelectedCustomerButton.click();
        element(by.xpath("//span[contains(text(),'Ok')]/parent::button")).isPresent().then(function(result) {
		    if ( result ) {
		    	temp=element(by.xpath("//span[contains(text(),'Ok')]/parent::button"));
				 temp.click();
		    } else {
				 console.log("No OK Button found")
		    }
    }


   this.addItem = function() {
       return this.addToCartButton.click();
   }

   this.searchProduct = function(searchProductValue) {
//       return this.searchProductTextBox.sendKeys(searchProductValue);

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = searchProductValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(searchProductValue[i]);
            browser.sleep(100);
        }

         browser.sleep(2000);
//        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

   }
    this.selectSKU = function() {
        return this.selectSKUCheckbox.click();
    }

    this.selectAllSKU = function() {
        return this.selectAllSKUCheckbox.click();
   }

   this.enterQty = function(qty) {
       this.enterItemQtyTextBox.clear();
       return this.enterItemQtyTextBox.sendKeys(qty);
   }

   this.addProduct = function() {
       return this.addProductButton.click();
   }


   this.searchInPopup = function() {
       //return this.searchButtonInPopup.click();
	$('body').sendKeys(protractor.Key.ENTER);
   }

   this.saveOption = function(option) {
       this.saveOptionButton.click();
       temp = "//button/span[text()='" + option + "']";
       return element(by.xpath(temp)).click();
   }
    this.salesOrderNumber = function() {
        return this.salesOrderNumberText.getText();
    }

   this.setShipComplete = function() {
        this.shipCompleteEditButton.click();
        return this.shipCompleteSelectButton.click();
   }

    this.confirmCustomerAddress = function() {
        this.confirmCustomerAddressButton.click();
   }

    this.getSuggestedAddressText = function() {
        return this.useSuggestedAddressText.getText();
    }

    this.getSKUATSValue = function() {
        return this.skuATSText.getText();
    }
    this.errorTabCount = function()
    {
      return this.errorTabText.getText();
    }
    this.clickonValidateOrder= function()
    {
      this.selectGear.click();
      return this.validateOrderButton.click();

    }
    this.alertMessageValidateOrder =function()
    {
     return this.alertMessage.getText();
    }

    //modified by Priti
    this.callcenterAttachCustomer = function()
    {
      return this.callcenterattachcustomerButton.click();
    }
    this.callcenterSearchCustomer = function(value)
    {
      //this.callcentersearchcustomerTextBox.sendKeys(value);

      this.callcentersearchcustomerTextBox.clear();

              for (var i = 0, len = value.length; i < len; i++) {
                  this.callcentersearchcustomerTextBox.sendKeys(value[i]);
                  browser.sleep(100);
              }

              this.callcentersearchcustomerTextBox.sendKeys(protractor.Key.ENTER);
    }

    this.searchProductofcallcenter = function(skuname)
    {
    // return this.callcenterfindProductTextBox.sendKeys(skuname);
      this.callcenterfindProductTextBox.clear();
      for(var i=0, len=skuname.length;i<len;i++)
      {
        this.callcenterfindProductTextBox.sendKeys(skuname[i]);
        browser.sleep(100);
      }
      this.callcenterfindProductTextBox.sendKeys(protractor.Key.ENTER);

    }
    this.selectProductofcallcenter = function()
    {
     return this.selectProductCheckBox.click();
    }
    this.search = function()
    {
      return this.searchProductButton.click();
    }
    this.verifypresaletextonSearch = function()
    {
      return this.presaleLabelAtProductSearch.getText();
    }
    this.selecttheProduct = function()
    {
       return this.selectsecondProductCheckBox.click();
    }
    this.verifypresalelabelAtskulevel = function()
    {
     return this.presaleLabelAtskuresults.getText();
    }
    this.verifyfuturequantity = function()
    {
      return this.futurecountText.getText();
    }
    this.verifyinboundQuantity = function()
    {
     return this.inboundcountText.getText();
    }
    this.addTOorder =function()
    {
     return this.addtoorderButton.click();
    }
 //added by vishak      
    this.cartIconClick =function(){
    	
    	return this.carticonclickbutton.click();
    }
    
    this.getSalesOrderUnitPrice = function(){
    	
    	return this.salesOrderUnitPrice.getText();
    } 
    this.SaveAsDraft = function(){
    	
    	this.saveAsDraftButton.click();
    }
    
    this.incrementQty = function(value){
    	for(i=0;i<value;i++){
    		browser.sleep(1000);
    		this.arrowUp.click();
       }
    }
    
    this.decrementQTy = function(value){
    	for(i=0;i<value;i++){   
    		browser.sleep(2000);
    	    this.arrowDown.click();
    	}
    }
    this.OrderItemCount = function(){
    	
    	return this.orderQtyButton.getText();
    }
    
    this.decrementQTYDisabled = function(){
    	
    	return this.decQTYDisabledButton.isPresent();
    	
    }
    
    this.ATSCountcheck = function(line){
        temp = '(//div[@class="ng-binding ng-scope"])['+line+']';
        return element(by.xpath(temp)).getText().then(function(count){
            browser.driver.sleep(3000);
            return parseInt(count);
        });
    }
 
    this.ATSCountupdate = function(count){
    	if(count==0)
		{
    		//cancel= element(by.buttonText("Cancel"));
    		//return cancel.click();
    		console.log("the count is 0")
		}
    	else{
    		
    		temp = element(by.xpath('(//div/div[@class="en-collection-row"])[1]')).click();
       		entryAdjustment = element(by.xpath('//en-tab[@has-permission="InventoryPoolEntry:Update"]')).click();
    		qty = element(by.model("entry.data.amountToAdjust")).sendKeys("-"+count);
    		browser.sleep(10000);
    		reason = element(by.model("entry.data.description")).sendKeys("Adjustment for partial return");
    		cancel = element(by.buttonText("Save")).click();
	
    	}
    }
    
    this.AddSkuOption = function(){
    	
    	this.addSku.click();
    }
  
    this.SelectFirstSKU = function(line){
    	
    	element(by.xpath('(//input[@ng-model="checked"])['+line+']')).click();
    	
    }
    
    this.useSelectedSkuOption = function(){
    	
    	this.useSelectedSKU.click();
    }
   
    this.minimumSkuQTYUpdate = function(){
    	
    	this.minimumSkuQTY.clear();
    	this.minimumSkuQTY.sendKeys(0);
    }
   
    this.skuSearch = function(){
    	
    	this.skuSearchButton.click();
    	
    }
  
    this.invCountcheck = function(){
    	
        InvCountLabel = '//div[@ng-if="pools.data "]/div/strong[@class="text-white ng-binding ng-scope"]';
    	return element(by.xpath(InvCountLabel)).getText().then(function(count){
            browser.driver.sleep(3000);
            return parseInt(count);
        });
    }
    
    this.entryAdjustment = function(ATS,Adjustment,reason){
    	
    	this.entryAdjustmentButton.click();
    	qty=Adjustment-ATS;//calculating the adjustment
		this.adjustedQTY.sendKeys(qty);
		this.adjustmentReason.sendKeys(reason);
		browser.sleep(2000);
		element(by.xpath("//button/span[contains(text(),'Save')]")).click();
		
    }
    this.fullfillmentType = function(type){
    	
    	this.fullfillmentTypeDropdown.sendKeys(type);
    	
    }
    
    this.availableStore = function(store){
    	
    	 this.availableStoreDropdown.sendKeys(store);
    }
    this.orderSelectAllATV2Portal = function(){
    	
    	this.OrderatportalselectAllCheckbox.click();
    	
    }
    
    this.TruckIconHeaderClick = function(){
    	this.truckIconatHeader.click();
    	this.pickupButton.click();
    	
    }
    
    this.pickupDetails = function(name,id,number,note){
    	
    	this.pickedUpBy.sendKeys(name);
    	this.verifiedWith.sendKeys(id);
    	this.enterID.sendKeys(number);
    	this.pickupNote.sendKeys(note);
    	
    }
	this.FRReject = function(reason,comment){
    	element(by.model("modalObject.reasonCode")).isPresent().then(function(result) {
	    if ( result ) {
	        
	    	this.reasondropdown.sendKeys(reason);
	    	this.rejectComments.sendKeys(comment);
	    	
	    } else {
	    	
			 console.log("Reject reason pop up not avilable")
	    	}
    	});
    }
    this.incQuantity = function(value,line){
    	temp = element(by.xpath('//en-icon[@icon="arrow-up"]['+line+']'));
    	for(i=0;i<(value-1);i++){
    		browser.sleep(1000);
    		temp.click();
       }
    }										 
	this.orderTypeSelection = function(orderType){
    	
    	this.orderSelectionDropdown.sendKeys(orderType);
    }
    
    this.SubscriptionFrequency = function(frequency){
    	
    	this.SubscriptionFrequencySelect.sendKeys(frequency);
    	
    }
    this.subscriptionEndDate = function(){
    	
    	element(by.xpath('//input[@name="subscriptionEndDateEditable"]')).click();
    	element(by.xpath('//div/a[@en-tap="nextMonth()"]')).click();
    	element(by.xpath('(//div/a[@class="cal-day ng-binding ng-scope"])[27]')).click();
    }
    this.day =function() {
		 var date = new Date();
		 var today = date.getDay()
		 console.log("the current day is "+today)
		 switch(today){
		 
		 case 0:
			 element(by.xpath('//select/option[@label="SUNDAY"]')).click();
			 element(by.xpath('(//en-icon[@icon="chevron-right-double"])[2]')).click();

			 break;
		 case 1:
			 element(by.xpath('//select/option[@label="MONDAY"]')).click();			
			 element(by.xpath('(//en-icon[@icon="chevron-right-double"])[2]')).click();
			 break;
		 
		 case 2:
			 element(by.xpath('//select/option[@label="TUESDAY"]')).click();	
			 element(by.xpath('(//en-icon[@icon="chevron-right-double"])[2]')).click();
			 break;
		 
		 case 3:
			 element(by.xpath('//select/option[@label="WEDNESDAY"]')).click();
			 element(by.xpath('(//en-icon[@icon="chevron-right-double"])[2]')).click();
			 break;
			 
		 case 4:
			 element(by.xpath('//select/option[@label="THURSDAY"]')).click();
			 element(by.xpath('(//en-icon[@icon="chevron-right-double"])[2]')).click();
			 break;
			 
		 case 5:
			 element(by.xpath('//select/option[@label="FRIDAY"]')).click();
			 element(by.xpath('(//en-icon[@icon="chevron-right-double"])[2]')).click();
			 break;
			 
		 case 6:
			 element(by.xpath('//select/option[@label="SATURDAY"]')).click();
			 element(by.xpath('(//en-icon[@icon="chevron-right-double"])[2]')).click();
			 break;
		 
		 }
	 }
    
    this.editPencilButton = function(line){
    	
    	temp = '(//en-icon[@icon="edit"])['+line+']';
    	return element(by.xpath(temp)).click();
    }
}

