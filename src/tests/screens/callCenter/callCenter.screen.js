module.exports = function () {

    this.clearSearchButton = element(by.xpath('//button[@en-tap="clearSearch();"]'));
    this.selectSKUInInventory = element(by.model("skusCollection.checkAllModel"));
	this.selectSKUInInventory = element(by.xpath("//div/div/div/div/input[@id = 'skusCollection_checkbox_0_0']"));
    this.selectSKUInResults = element(by.model("inventoryCollection.checkAllModel"));
    this.addToOrderButton = element(by.xpath("//button[@en-tap='goToSalesOrder()']/span"));
    this.attachCustomerButton = element(by.xpath('//button[@class="en-button button-primary"]'));
    //this.searchCustomerTextbox = element(by.xpath("(//input[(@name = 'simplified-text-value')])[2]"));
//this is for P0
    this.searchCustomerTextbox = element(by.xpath("(//input[contains(@name,'simplified-text-value')])[2]"));
 //this is for P2
    //this.searchCustomerTextbox = element(by.xpath("(//input[contains(@name,'simplified-text-value')])[1]"));
    this.deleteCustomerSearchBox = element(by.model("apiSearchText.value"));
    //this.searchProductTextbox = element(by.xpath("(//input[contains(@name,'simplified-text-value')])[1]"));
    this.plusIcon = element(by.xpath("//en-icon[@icon='plus-block']"));
    this.callCenterSkuGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.addToOrderFromSO = element(by.xpath("//button[@class='button-primary en-button']/span"));
    this.inventoryDetailsButton = element(by.xpath('//button[@class="en-button button-primary"]'));
    this.reservationDetailsLink = element(by.xpath("(//div[contains(@ng-repeat,'inventoryCollection')]//a)[2]"));
    this.closeFilter = element(by.xpath("//en-modal-body//button/en-icon[@icon='x-circle']/parent::button"));
    //this.closeFilter = element(by.xpath("//div[contains(@ng-if,'search')]/en-api-search-controls/button"));
    this.InventorydtlsFilterSearchOption = element(by.xpath('(//button/div/span[contains(text(),"Filters")]/parent::div/parent::button)[2]'));
    this.InventorydtlsFilterCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.InventorydtlsFilterContentDropdown = element(by.xpath('//select[@name="filter-content"]'));
    this.InventorydtlsSearchValueTextbox = element(by.xpath('//input[@name="filter-value"]'));
    this.inventoryDetailsTotalCount = element(by.xpath("//en-tab-pane[@name='lineOptionPane_Inventory']/div/div/div[1]/strong"));
    this.inventoryDetailsSelectGearIcon = element(by.xpath("//button/span[contains(text(),'Inventory Details')]/parent::button"));
  //this.channelText = element(by.xpath("(//div[contains(@id,'collectionBody')]//div[contains(@class,'en-collection-row')])[3]/div[2]"));
	this.channelText = element(by.xpath("(//div[contains(@id,'collectionBody')]//div[contains(@class,'en-collection-row')])[3]/div[1]"));//modified by vishak
    this.reservationDetailsClose = element(by.xpath("//button[@class='en-button']/span[text()='Close']"));
    this.skuLink = element(by.xpath("//a[@class='ellipsis']"));
	this.trackingNumber = element(by.xpath("//en-control/input[@name = 'trackingNumber']"));			
    this.editSKUQty = element(by.model("product.item.itemQty"));
    this.lineAllocatedCount = element(by.xpath("//div[@class='line-qty']//div[2]/small"));
    this.lineShippedCount = element(by.xpath("//div[@class='line-qty']//div[4]/small"));
    this.notesButton = element(by.xpath("//button/en-icon[@icon='note']"));
    this.noteText = element(by.model("note.text"));
    this.noteType = element(by.model("note.type"));
    //this.notesCreateBtn = element(by.xpath("//span[contains(text(),'Create')]"));
	this.notesCreateBtn = element(by.xpath("//en-icon[@icon='check-circle' and @class='ng-scope' ]"));
    this.notesPane = element(by.xpath("//en-tab[@pane='notesPane']"));
    this.notesContent = element(by.xpath("//en-tab-pane[@name='notesPane']//en-content//p"));
    this.itemsPane = element(by.xpath("//en-tab[@pane='itemsPane']"));
    //this.inventoryATSCount = element(by.xpath("//div[contains(@ng-repeat,'item in inventoryCollection.data')]/div/div[@class='ng-binding'][1]"));																							   
    this.editPromisedDate = element(by.xpath("//en-icon[@en-tap='promiseDateEditable=true']"));
    this.promisedDateTextBox = element(by.xpath("//input[@name='promiseDate']"));
    this.incrementQtyArrowUp = element(by.xpath("//div[@layout='row']/en-icon[@icon='arrow-up']"));
    this.decrementQtyArrowDown = element(by.xpath("//div[@layout='row']/en-icon[@icon='arrow-down']"));
    this.unitPriceTextBox = element(by.model("item.itemUnitPrice"));
    this.priceSaveBtn = element(by.xpath("//button/span[contains(text(),'Save')]"));
    this.editlinePopup = element(by.xpath("//div[@class='line-qty is-clickable']"));
	this.editLineGear = element(by.xpath("(//button/en-icon[@icon ='more-vertical'])[3]"));
	this.discountButton = element(by.xpath("//button/en-icon[@icon='discount']//parent::button"));
    //this.discountButton = element(by.xpath("//button/en-icon[@icon='discount']"));
    this.discountPercentageTextBox = element(by.model("discount.discountPercent"));
    this.discountAmtTextBox = element(by.model("discount.discountAmount"));
    this.discountReason = element(by.model("discount.discountName"));
    this.discountDescription = element(by.model("discount.description"));
    this.discountNotes = element(by.model("discount.notes[0].text"));
    this.appeasementPercentageTextBox = element(by.model("appeasement.appeasementPercent"));
    this.appeasementAmtTextBox = element(by.model("appeasement.appeasementAmount"));
    this.appeasementReason = element(by.model("appeasement.reasonCode"));
    this.appeasementDesc = element(by.model("appeasement.description"));
    this.appeasementNotes = element(by.model("appeasement.notes[0].text"));
    this.applyBtn = element(by.xpath("//en-modal-footer/div//button/span[contains(text(),'Apply')]"));
    this.appeasementsGearIcon = element(by.xpath("//div[@class='en-collection-row']//en-actions/button"));																								
    this.editSKUApplyBtn = element(by.xpath("//en-modal//en-footer//button/span[contains(text(),'Apply')]"));
    this.createCustomerBtn = element(by.xpath("//button/span[contains(text(),'Create Customer')]"));
    this.customerDisplayName = element(by.model("customer.data.displayName"));
    this.customerNumberBtn = element(by.xpath("//button/en-icon[@icon='key']"));
    this.customerFirstName = element(by.model("customer.data.name.firstName"));
    this.customerLastName = element(by.model("customer.data.name.lastName"));
    this.addAddressIcon = element(by.xpath("(//button[@class='button-primary trim en-button']/en-icon[@icon='plus-circle'])[1]"));
    //this.addressCheckBox = element(by.model("roles[role.value]"));
    this.address1TextBox = element(by.model("address.address1"));
    this.addressCityTextBox = element(by.model("address.city"));
    this.stateDropDown = element(by.model("address.state"));
    this.addressZipCode5 = element(by.model("address.zip5"));
    this.addressSaveBtn = element(by.xpath("//button[@type='submit']/span[contains(text(),'Save')]"));
    this.advancedSettingsBtn = element(by.xpath("//en-tab[@pane='advanced-settings']"));
    this.selectCustomerState = element(by.model("customer.data.state"));
    this.selectCustomerPriority = element(by.model("customer.data.priority"));
	this.submitBtn = element(by.xpath("//button[@type='submit']"));
    //this.submitBtn = element(by.xpath("//button[@type='submit'][@object='customer']"));
    //this.lineDiscountAmount = element(by.xpath("//small[contains(text(),'Discount:')]/following-sibling::small"));																						  
    this.orderlvlappeasementText = element(by.xpath("(//div[@class='en-collection-row'])[1]/div[2]"));
    this.orderlvlappeasementValue = element(by.xpath("(//div[@class='en-collection-row'])[1]/div[9]"));
    this.discountViewButton = element(by.xpath("(//button[contains(text(),'View')])[1]"));
    this.appeasementViewButton = element(by.xpath("(//button[contains(text(),'View')])[2]"));
    // this.discountTextValue = element(by.xpath("//div[@class='en-collection-row']//span[@ng-if='item.discountPercent > 0']"));
    this.amountViewPopup = element(by.xpath("//span[contains(text(),'Amount:')]/following-sibling::span"));
    this.CloseBtn = element(by.xpath("//button/span[contains(text(),'Close')]"));
    this.discountOptionsGearIcon = element(by.xpath("//div[@class='en-collection-row']//en-actions/button/en-icon"));
    this.appeasementOptionsGearIcon = element(by.xpath("//div[@class='en-collection-row']//en-actions/button/en-icon"));
    //this.discountViewPlusIcon = element(by.xpath("//div[contains(@ng-if,'item.shipToAddressName')]//en-section//small[text()='Discounts']"));
    //added by vishak//
    this.discountViewPlusIcon = element(by.xpath("//small[@class='text-muted uppercase semibold']"));
    this.deleteBtn = element(by.xpath("//en-modal-footer//button/span[contains(text(),'Delete')]"));
    //this.errorTextMsg = element(by.xpath("//en-alert[@ng-if='discountError']"));																					
    this.promoCodeTextBox = element(by.model("promoCode"));
    this.promoCodeApplyBtn = element(by.xpath("//button/span[contains(text(),'Apply')]"));
	//this.promoCodeText = element(by.xpath("//span[contains(@ng-if,'item.promo')]"));
    this.promoCodeText = element(by.xpath("(//span[contains(@ng-if,'item.promo')])[1]"));//updated by vishak
    this.salesOrderSelectGearIcon = element(by.xpath("//div[@class='en-collection-row']//en-actions/button"));
    this.packageSelectionDropdown = element(by.xpath('(//select[@name="carrier"])[2]'));
    this.itemQtyInPackageEntryTextBox = element(by.xpath('//input[@ng-model="item.qtyInPackageDefault"]'));
    this.addPackageToShipmentButton = element(by.xpath('//button/span[contains(text(), "Add Package to Shipment")]/parent::button'));
    //this.finalizeShipmentButton = element(by.xpath('(//button/span[contains(text(), "Finalize Shipment")]/parent::button)[2]'));
	this.finalizeShipmentButton = element(by.xpath('(//span[contains(text(), "Finalize Shipment")])[2]'));
																									  
    this.shipmentRequestSelectGearIcon = element(by.xpath('(//div[@class="en-collection-row"]/div[2])[1]/en-actions/button'));
    //this.lineItemStatus = element(by.xpath("//section[@ng-if='salesOrder.data.lineItems.length']//div[@layout='row']/en-label"));
    //this.lineAppeasement = element(by.xpath("//li[@icon='discount']/button//span[contains(text(),'Appeasement')]"));//updated by vishak
    this.lineAppeasement = element(by.xpath("//button//span[contains(text(),'Add Line Appeasement')]"));//for P2 Env
    //    this.orderAppeasement = element(by.xpath("//en-field/button/span[text()='Add Appeasement']"));
	this.orderAppeasement = element(by.xpath("//en-field/button/span[text()='Add Header Appeasement']"));
    this.appeasementTab = element(by.xpath("//en-tab[@pane='appeasementsPane']"));
    this.cartTakeoverGOBtn = element(by.xpath("//button/span[text()='GO']"));
    this.cartTakeoverTextBox = element(by.model("lookupCartId"));
    this.addReferenceBtn = element(by.xpath("(//en-header[@class='underline']/en-icon[@icon='plus'])[2]"));
    this.refNameTextBox = element(by.model("ref.name"));
    this.refValueTextBox = element(by.model("ref.value"));
    this.reftrashbutton=element(by.xpath("//en-icon[@icon='trash']"));
    this.addnewreferencesbutton=element(by.xpath("//button[@class='button-xs margin-left-sm en-button ng-scope']"));
    this.saveRefBtn = element(by.xpath("//button//span[contains(text(),' Save References')]"));
    this.takeOverBtn = element(by.xpath("//button//span[contains(text(),'Take Over')]"));
    this.cartTakeOverErrMsg = element(by.xpath("//en-msgs[@for='lookupForm.lookupCartId']/en-msg"));
    this.packageUnselect = element(by.model("skipLabelGeneration"));
    this.trackingnumber = element(by.model("package.trackingNumber"));//added by vishak
	//this.payButton = element(by.xpath("//button/span[@contains(@ng-show , '!salesOrder.putting && !salesOrder.getting']/parent::button"));
    this.payButton = element(by.xpath("//button/span[contains(@ng-show,'salesOrder.putting')]/parent::button"));
    this.paymentMethod = element(by.model("payment.method"));
    this.creditCardNumber = element(by.model("payment.cardNumber"));
    this.creditCardCVVNumber = element(by.model("payment.cvv"));
    this.nameOnCreditCard = element(by.model("payment.nameOnCard"));
    this.creditCardExpMonth = element(by.model("payment.expMonth"));
    this.creditCardExpYear = element(by.model("payment.expYear"));
    this.paymentAmount = element(by.model("payment.amount"));
    this.submitPayment = element(by.xpath("//button/span[@contains(text(),'Submit')]"))																									
    var salesChannelEditIcon = element(by.xpath('//en-icon[@en-tap="$root.editChannel=true"]'));
    var channelDropDown = element(by.xpath("//select[contains(@ng-show,'filteredChannels.data.value')]"));
    //var channelDropDown = element(by.xpath("(//select[@name='channel'])[1]"));
    var salesChannelSelectButton = element(by.xpath('//button/en-icon[@icon="check"]'));
    var cancelButtonInInvDetails = element(by.xpath("//button[@class='en-button']/span[text()='Cancel']"));
    var availableQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[7]'));
    var reservedQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[8]'));
    this.changePriceButton = element(by.xpath("//span[contains(text(), 'Change Price')]"));
    this.unitPriceTextBox = element(by.model("item.itemUnitPrice"));
    this.priceSaveButton=element(by.xpath("(//button/span[@class = 'ng-scope'])[2]"));
    this.paymentMethod = element(by.name("method_0"));
    this.creditCardNumber = element(by.model("payment.cardNumber"));
    this.creditCardCVVNumber = element(by.model("payment.cvv"));
    this.nameOnCreditCard = element(by.model("payment.nameOnCard"));
    this.creditCardExpMonth = element(by.model("payment.expMonth"));
    this.creditCardExpYear = element(by.model("payment.expYear"));
    this.paymentAmount = element(by.model("payment.amount"));
    this.submitPayment = element(by.xpath("//button/span[text()='Submit']"));
    this.searchForSkuAvailability =  element(by.xpath("//div/button[text()='Search']"));
    this.orderStatus = element(by.xpath("(//div/en-label[@ng-if = 'salesOrder.data.header.status'])"));
    this.searchButton = element(by.xpath("//div/button[text()='Search']"));																			   
    this.cancelPayButton = element(by.xpath("//button/span[text()='Cancel']"));
    this.itemQty2InPackageEntryTextBox = element(by.xpath('(//input[@ng-model="item.qtyInPackageDefault"])[3]'));
    this.addMethodButton = element(by.xpath("//button/span[text()='Add method']"));
    this.alternativePaymentMethod = element(by.name("method_1"));
    this.alternativeCreditCardNumber = element(by.name("cardNumber_1"));
    this.alternativeCreditCardCVV = element(by.name("cvv_1"));
    this.alternativeCreditCardName = element(by.name("nameOnCard1"));
    this.alternativeCreditCardExpMonth = element(by.name("expMonth_1"));
    this.alternativeCreditCardExpYear  = element(by.name("expYear_1"));
    this.alternativePaymentAmount = element(by.name("paymentAmount_1"));
    this.giftCardPinNumber = element(by.model("payment.giftCardPin"));
    this.dueAmount = element(by.xpath("//en-title[contains(text(),'Amount Due')]"));
    this.confirmCustomerAddressButton = element(by.xpath('//button/span[contains(text(),"Ok")]/parent::button'));
    this.channelName = element(by.xpath("//strong[@ng-if =\"!$root.editChannel\"]"));
    this.verifyAddress = element(by.xpath("(//div/div/div[@class = 'en-collection-row']/div[@class = 'ng-binding'])[1]"));
    this.unitPrice = element(by.xpath("//div/div/div/small[text()= 'Unit Price:']/following-sibling::small"));
    this.linePrice = element(by.xpath("//div/div/div/small[text()= 'Line Price:']/following-sibling::small"));
    this.discountamount =  element(by.xpath("//div/small[text()= 'Discount:']/following-sibling::small"));
    this.taxamount =  element(by.xpath("//div/small[text()= 'Sales Tax:']/following-sibling::small"));
    this.shippingcharges = element(by.xpath("//div/small[text()= 'Shipping Tax:']/following-sibling::small"));
    this.appeasementAmount = element(by.xpath("//en-item/small[contains(text(),'Appeasement:')]/following-sibling::strong"));
    this.orderSelectGear = element(by.xpath("(//en-actions/button)[1]"));
    this.manualAlloactionButton = element(by.xpath("//li/button/span[text() = 'Manual Allocation']//parent::button"));
    //this.siteCheckBox = element(by.xpath("//div/div/span[text() = 'Joliet-DC']/parent::div/parent::div/preceding-sibling::div"));
    this.saveAndReleaseSalesOrderButton = element(by.xpath("//button/div[text() = 'Save and Release']//parent::button"));
	this.cancelAllocation = element(by.xpath("//button/span[text() = 'Cancel']//parent::button"));																							  
    this.orderStatusText = element(by.xpath("//en-label[@ng-if = 'salesOrder.data.header.status']/small"));
    this.allocatedSiteName = element(by.xpath("//section/div/b[text() = 'Site:']/parent::div"));
    this.markAsShippedButton = element(by.xpath("//li/button/span[contains(text(),'Mark As Shipped')]/parent::button"));
    this.confirmMarkAsShipped = element(by.xpath("//button/span[text() = 'Yes']/parent::button"));
    this.editChannelButton = element(by.xpath("//li/button/span[contains(text(),'Edit Channel')]/parent::button"));
    this.chooseselection = element(by.xpath("//en-control/span/input[@name = 'avoidReallocationToSameSite']"));
    this.saveChannelButton = element(by.xpath("//en-modal-footer/button[contains(text(),'Save')]"));
    this.searchBox = element(by.xpath("//form/en-field/en-input/input"));
    this.shipementRequestCount = element(by.xpath("//en-body/en-tabs/en-tab[@pane = 'shipReqPane']/en-label"));	
  //added by vishak
    this.discountButtonInEditLine=element(by.xpath("//button[@class='trim button-md gradient-light block en-button']"));
    this.shipmentStatusEditButton=element(by.xpath("//button[@class='en-button margin-right-sm trim']"))
    this.shipmentStatusChangeConfirmation=element(by.xpath("//button[@class='text-center button-primary en-button']"));
    this.shipmentstatus=element(by.xpath("//en-label[@class='margin-right ng-binding label-success']"));
    this.shipaccount = element(by.model("shipAccount"));
    this.cartTakeovereType = element(by.model("ref.type"));
    this.selectINVfromSOscreen = element(by.model("inventoryCollection.checkAllModel"));
    this.qtytoReject = element(by.xpath('//input[@name="itemQty"]'));
    this.qtyRejectReasonCode = element(by.xpath('//select[@name="reasonCode"]'));
    this.qtyRejectReason = element(by.xpath('//textarea[@name="reason"]'));
    this.rejectButton = element(by.xpath('//button[@class="button text-center button-error en-button ng-scope"]'));
    this.itemsPerPageDropdown = element(by.model("object.limit"));
    this.fullFillmentPageHeader = element(by.xpath('//en-icon[@icon="truck"]/parent::div'));
	this.ordersPageHeader = element(by.xpath('(//en-icon[@icon="invoice"]/parent::div)[1]'));    
	this.callCenterPageHeader = element(by.xpath('(//en-icon[@icon="cloud-upload"]/parent::div)[1]'));
	this.primaryemailTextBox = element(by.model("customer.data.primaryEmail.address"));																				
    
    
	var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.unselectPkg = function(){
      // this.packageUnselect.click();
    	
        element(by.model("skipLabelGeneration")).isSelected().then(function(result) {
		    if ( result ) {
		        
				 console.log("already disabled the label generation")
		    	
		    } else {
		    	console.log("disabling the label generation")
		        element(by.model("skipLabelGeneration")).click();
		    }
		});												   
    }
	this.clickOnManualAllocationButton = function () {

        this.orderSelectGear.click();
        browser.sleep(2000);
        this.manualAlloactionButton.click();
    }
    this.chooseSite = function (siteName) {
        temp = "//div/div/span[text() = '"+siteName+"']/parent::div/parent::div/preceding-sibling::div";
        return element(by.xpath(temp)).click();

    }
    this.clickOnSaveAndReleaseButton = function() {
        this.saveAndReleaseSalesOrderButton.click();
        browser.sleep(5000);
    }

    this.clickOnCancelAllocationButton = function () {
        this.cancelAllocation.click();
    }
    this.getorderStatusText = function () {

        return this.orderStatusText.getText();
    }
    this.getAllocatedSiteName = function () {
        return this.allocatedSiteName.getText();
    }
    this.clickMarkAsShippedButton = function () {
         this.salesOrderSelectGearIcon.click();
         browser.sleep(2000);
         this.markAsShippedButton.click();
         browser.sleep(2000);
         return this.confirmMarkAsShipped.click();
    }
    this.clickOnEditChannelSettings = function () {
        this.salesOrderSelectGearIcon.click();
        browser.sleep(2000);
        return this.editChannelButton.click();

    }
    this.selectOptionInChannelScreen = function(){
        this.chooseselection.click();
    }
    this.saveChannel = function() {
        return this.saveChannelButton.click();
    }
    this.searchForSku = function (skuname) {
        this.searchBox.clear();
        for (var i = 0, len = skuname.length; i < len; i++) {
            this.searchBox.sendKeys(skuname[i]);
            browser.sleep(100);
        }
        this.searchBox.sendKeys(protractor.Key.ENTER);
    }
    this.getShipementRequestCount = function () {
          return this.shipementRequestCount.getText();
    }

    this.verifyShippingAddress = function()
    {
        return this.verifyAddress.getText();
    }

    this.editLine = function () {
        this.editlinePopup.click();
        browser.sleep(1000);
        this.discountButton.click();
    }
    this.clickOnDiscountButton = function(){
        this.editLineGear.click();
        browser.sleep(1000);
        return this.discountButton.click();
    }

    this.getChannelName = function()
    {
        return this.channelName.getText();
    }
	
    this.selectSKUFromSearch = function () {
        return this.selectSKUInInventory.click();

    }
    this.selectSKUFromResults = function () {
        return this.selectSKUInResults.click();

    }
	this.searchForSelectedSku = function () {
        return this.searchForSkuAvailability.click();
    }									   
    this.clearSearch = function () {
        this.clearSearchButton.click();
    }
    this.addToOrder = function () {
        this.addToOrderButton.click();
    }
    this.attachCustomer = function () {						  
		browser.executeScript('window.scrollTo(0,-250);');
		browser.sleep(500);
        this.attachCustomerButton.click();
    }
    this.filterText = function () {
        browser.driver.sleep(5000);
        return this.closeFilter.getText();
    }
	    this.searchForSelectedSku = function () {
        return this.searchForSkuAvailability.click();
    }						 
    this.reservationDetailsPopupClose = function () {
        this.reservationDetailsClose.click();
    }
	this.increaseLineQty = function (linenumber , qty) {
        temp = "(//div/div/en-icon[@icon = 'arrow-up'])["+linenumber+"]";
        for(i =1;i< qty;i++){
            element(by.xpath(temp)).click();
        }

    }

    this.clickSearch = function () {
        return this.searchButton.click();
    }
	
    this.cancelFilter = function () {
        browser.driver.sleep(5000);
        this.closeFilter.click();
    }
    this.searchCustomer = function (customerCriteria, customerSearchValue) {
        browser.driver.sleep(5000);
        this.searchCustomerTextbox.clear();

        for (var i = 0, len = customerSearchValue.length; i < len; i++) {
            this.searchCustomerTextbox.sendKeys(customerSearchValue[i]);
            browser.sleep(100);
        }

        this.searchCustomerTextbox.sendKeys(protractor.Key.ENTER);
    }
    this.deleteCustomerSearch = function (customerCriteria, customerSearchValue) {
        this.deleteCustomerSearchBox.clear();

        for (var i = 0, len = customerSearchValue.length; i < len; i++) {
            this.deleteCustomerSearchBox.sendKeys(customerSearchValue[i]);
            browser.sleep(100);
        }

        this.deleteCustomerSearchBox.sendKeys(protractor.Key.ENTER);
    }
	this.setItemTrackingNumber = function(trackingNumber)
    {
        return  this.trackingNumber.sendKeys(trackingNumber);
    }									  
    this.addToOrderFromSalesOrder = function () {
        this.addToOrderFromSO.click();
    }
    this.plusIconClick = function () {
        this.plusIcon.click();
    }
    this.inventoryDetailsPopUp = function () {
        this.inventoryDetailsButton.click();
    }
    this.reservationDetails = function () {
        this.reservationDetailsLink.click();
    }
    this.inventoryDetailsSelectGear = function () {
        this.inventoryDetailsSelectGearIcon.click();
    }
    this.getChannelText = function (channel) {
        return this.channelText.getText();
    }
    this.searchWithCriteria = function (criteria, content, searchValue) {
        this.InventorydtlsFilterSearchOption.click();
        browser.sleep(100);
        this.InventorydtlsFilterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(100);
        this.InventorydtlsFilterContentDropdown.sendKeys(content);
        browser.sleep(100);
        this.InventorydtlsSearchValueTextbox.sendKeys(searchValue);

        element(by.xpath('//input[contains(@class, "adv-search-input") and @name="filter-value"]')).sendKeys(protractor.Key.ENTER);


    }
    this.totalAvailableInventoryCount = function () {
        return this.inventoryDetailsTotalCount.getText().then(function (TotalCount) {
            browser.sleep(3000);
            return parseInt(TotalCount);
            console.log(TotalCount);
        });
    }
    this.getAvailableQty = function () {
        return availableQty.getText().then(function (Qty) {
            browser.driver.sleep(5000);
            return parseInt(Qty);
        });
    }


    this.getReservedQty = function () {
        return reservedQty.getText().then(function (Qty) {
            browser.driver.sleep(5000);
            return parseInt(Qty);
        });
    }
    this.cancelInvDetailsPopUp = function () {
        return cancelButtonInInvDetails.click();
    }
    this.callCenterSKUsGearIcon = function (selectOption) {
        this.callCenterSkuGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();
        else if (selectOption == "Delete") {
            return element(by.xpath(temp)).click();
        } else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            //return element.all(by.xpath(temp)).get(1).click();
            return element.all(by.xpath(temp)).get(1).click();
        }

    }

    this.lineItemselectOptions = function (editLineOptions) {
    	
   

   //  this.editLineGearIcon.click();//till here
        
    	
        temp = "//button/span[contains(text(),'" + editLineOptions + "')]";
        if (editLineOptions == "Change Price")
            return element(by.xpath(temp)).click();
        else if (editLineOptions == "Discounts") {
            return element(by.xpath(temp)).click();
        } else if (editLineOptions == "Edit Line") {
            return element(by.xpath(temp)).click();
        } else if (editLineOptions == "Appeasement") {
            return element(by.xpath(temp)).click();
        }
        else
        	return element(by.xpath(temp)).click();

    }
    this.lineLevelAppeasement = function () {
        browser.sleep(2000);
        this.lineAppeasement.click();
    }
    this.orderLevelAppeasement = function () {
        this.orderAppeasement.click();
    }
    this.appeasementsHeader = function () {
        this.appeasementTab.click();
        /* browser.sleep(1000);
         temp ="//div[@class='ng-binding'][contains(text(),'" + appeasementLevel +"')]";
         if(appeasementLevel == "Order"){
             return element(by.xpath(temp)).
         }*/

    }
    this.salesChannel = function (value) {
        salesChannelEditIcon.click();
        browser.sleep(100);
        channelDropDown.sendKeys(value);
        browser.sleep(100);
        salesChannelSelectButton.click();
    }

    this.promisedDate = function (Date) {
        this.editPromisedDate.click();
        browser.sleep(2000);
        this.promisedDateTextBox.sendKeys(Date);
    }
    this.createCustomer = function (displayName, firstName, lastName, address1, city, state, zipcode5,email) {
        this.createCustomerBtn.click();
        browser.sleep(1000);
        this.customerDisplayName.sendKeys(displayName);
        this.customerNumberBtn.click();
        browser.sleep(1000);
        this.customerFirstName.sendKeys(firstName);
        this.customerLastName.sendKeys(lastName);
        this.primaryemailTextBox.sendKeys(email)
        this.addAddressIcon.click();

        browser.sleep(1000);
        // this.addressCheckBox.click();
        this.test();
        this.address1TextBox.sendKeys(address1);
        this.addressCityTextBox.sendKeys(city);
        this.stateDropDown.sendKeys(state);
        this.addressZipCode5.sendKeys(zipcode5);
        this.addressSaveBtn.click();

    }
    this.customerAdvancedSettings = function (customerState, customerPriority) {
        browser.sleep(1000);
        this.advancedSettingsBtn.click();
        browser.sleep(1000);
        this.selectCustomerState.sendKeys(customerState);
        this.selectCustomerPriority.sendKeys(customerPriority);
        browser.sleep(3000);
        this.submitBtn.click();
    }
    this.incrementQty = function () {
        this.incrementQtyArrowUp.click();
    }
    this.decrementQty = function () {
        this.decrementQtyArrowDown.click();
    }
    this.editLine = function () {
        this.editlinePopup.click();
        browser.sleep(1000);
        this.discountButton.click();
    }
 
    this.discountButtonEditLine= function() {
    	//this.editlinePopup.click();
        browser.sleep(1000);
    	this.discountButtonInEditLine.click();
	}
    
    
    this.applyDiscount = function (discountType, discountAmtNumber, reason, description, notes) {
        browser.sleep(1000);
        temp = "//button/span[contains(text(),'" + discountType + "')]";
        //console.log("discountType::" + temp);
        if (discountType == 'Percentage') {
            element(by.xpath(temp)).click();
            browser.driver.sleep(3000);
            this.discountPercentageTextBox.clear();
            this.discountPercentageTextBox.sendKeys(discountAmtNumber);
        } else if (discountType == 'Amount') {
            element(by.xpath(temp)).click();
            browser.driver.sleep(3000);
            this.discountAmtTextBox.clear();
            this.discountAmtTextBox.sendKeys(discountAmtNumber);
        }
        this.discountReason.sendKeys(reason);
        this.discountDescription.clear();
        this.discountDescription.sendKeys(description);
        this.discountNotes.clear();
        this.discountNotes.sendKeys(notes);
    }
	this.getDiscountAmount =function()
    {
        return this.discountamount.getText();
    }						
    this.applyAppeasement = function (appeasementType, appeasementAmt, reason, description, notes) {
        browser.sleep(1000);
        temp = "//button/span[contains(text(),'" + appeasementType + "')]";
        //console.log("appeasementType::" + temp);
        if (appeasementType == 'Percentage') {
            element(by.xpath(temp)).click();
            browser.driver.sleep(3000);
            this.appeasementPercentageTextBox.clear();
            this.appeasementPercentageTextBox.sendKeys(appeasementAmt);
        } else if (appeasementType == 'Amount') {
            element(by.xpath(temp)).click();
            browser.driver.sleep(3000);
            this.appeasementAmtTextBox.clear();
            this.appeasementAmtTextBox.sendKeys(appeasementAmt);

        }
        this.appeasementReason.sendKeys(reason);
        this.appeasementDesc.clear();
        this.appeasementDesc.sendKeys(description);
        this.appeasementNotes.clear();
        this.appeasementNotes.sendKeys(notes);
    }
    this.applyButton = function () {
        browser.sleep(1000);
        this.applyBtn.click();
    }


    this.test = function () {
        var chk = element.all(by.model("roles[role.value]"));
        chk.each(function (elem) {
            elem.click();

            browser.sleep(500);

        });
    }
    this.changingUnitPrice = function (unitPrice) {
        this.unitPriceTextBox.clear();
        this.unitPriceTextBox.sendKeys(unitPrice);
        browser.sleep(500);
        this.priceSaveBtn.click();
    }
    this.editLinePopUpSaveBtn = function () {
        this.editSKUApplyBtn.click();
    }
    this.discountOptions = function (lineDiscountOptions) {
        this.discountOptionsGearIcon.click();
        temp = "//button//span[contains(text(),'" + lineDiscountOptions + "')]";
        browser.sleep(3000);
        if (lineDiscountOptions == "Edit") {
            return element(by.xpath(temp)).click();
        } else if (lineDiscountOptions == "Delete") {
            return element(by.xpath(temp)).click();
        }
    }
    this.appeasementOptions = function (headerOptions) {
        this.appeasementOptionsGearIcon.click();
        temp = "//button//span[contains(text(),'" + headerOptions + "')]";
        browser.sleep(3000);
        if (headerOptions == "Edit") {
            return element(by.xpath(temp)).click();
        } else if (headerOptions == "Delete") {
            return element(by.xpath(temp)).click();
        }
    }
    this.discountViewNotes = function () {
       // this.discountViewPlusIcon.click();// updated by vishak
        browser.sleep(6000);
        this.discountViewButton.click();
    }
    this.appeasementViewNotes = function () {
        browser.sleep(3000);
        this.appeasementViewButton.click();
    }
    this.viewPlusIcon = function (lineViewDetails) {
       //updated by Vishak // temp = "//div[contains(@ng-if,'item.shipToAddressName')]//en-section//small[text()='" + lineViewDetails + "']";

    	if (lineViewDetails == "Discounts") {
    		temp="(//en-icon[@icon='chevron-right'])[5]";
            element(by.xpath(temp)).click(); 
    		
        } 
   //need to check the code 	
    	else if (lineViewDetails == "Appeasements") {
        	
        	temp="//en-section[@ng-if= 'item.lineAppeasements.length > 0']";
            element(by.xpath(temp)).click();
            
        }
    }
    this.ViewNotesClose = function () {
        this.CloseBtn.click();
    }
    this.delete = function () {
        this.deleteBtn.click();
    }
    this.discountAmountValue = function () {
        return this.amountViewPopup.getText();
    }

    this.viewNotesDetails = function (viewDetails) {
        temp = "//span[contains(text(),'" + viewDetails + "')]/following-sibling::span";
        if (viewDetails == "Reason:") {
            return element(by.xpath(temp)).getText();
        } else if (viewDetails == "Amount:") {
            return element(by.xpath(temp)).getText();
        } else if (viewDetails == "Description:") {
            return element(by.xpath(temp)).getText();
        }
    }
    this.OrderNumberSearch = function (criteria, salesOrderSearchValue) {

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = salesOrderSearchValue.length; i < len; i++) {
            console.log(salesOrderSearchValue);
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(salesOrderSearchValue[i]);
            browser.sleep(100);

        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }
    this.fulfillmentOrderSelectGear = function (selectOption) {
        this.salesOrderSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Create Shipment")
            return element(by.xpath(temp)).click();
        else if(selectOption == "Mark As Shipped")
        	return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }
    this.packageSelection = function (packageValue) {
        // commons.selectOption(this.packageSelectionDropdown,packageValue);
        this.packageSelectionDropdown.sendKeys(packageValue);
    }

    this.enterItemQty = function (qtyValue) {
        this.itemQtyInPackageEntryTextBox.clear();
        browser.sleep(1000);
        return this.itemQtyInPackageEntryTextBox.sendKeys(qtyValue);
    }
	this.enterItemQty2 = function (qtyValue) {
        this.itemQty2InPackageEntryTextBox.clear();
        browser.sleep(1000);
        return this.itemQty2InPackageEntryTextBox.sendKeys(qtyValue);
    }
    
	this.addPackageToShipment = function () {
        return this.addPackageToShipmentButton.click();
    }


    this.finalizeShipment = function () {
        return this.finalizeShipmentButton.click();
    }
    this.callCenterSalesOrderSelectGear = function (selectOption) {
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
    this.lineStatus = function () {

        return element.all(by.xpath("//section[@ng-if='salesOrder.data.lineItems.length']//div[@layout='row']/en-label")).getText();

    }
    this.addReferences = function (type,refNameCartId, cartIDValue) {
    	browser.sleep(4000);
        this.addReferenceBtn.click();
        browser.sleep(1000);        
    	this.addnewreferencesbutton.click();
    	this.cartTakeovereType.sendKeys(type);
    	this.refNameTextBox.clear();
        this.refNameTextBox.sendKeys(refNameCartId);
        browser.sleep(1000);
        this.refValueTextBox.clear();
        this.refValueTextBox.sendKeys(cartIDValue);
        browser.sleep(1000);
        this.saveRefBtn.click();

    }
    this.cartTakeOver = function (cartIDValue) {
        this.cartTakeoverTextBox.clear();
        this.cartTakeoverTextBox.sendKeys(cartIDValue);
        browser.sleep(1000);
        this.cartTakeoverGOBtn.click();
        browser.sleep(3000);
        this.salesOrderSelectGearIcon.click();
        this.takeOverBtn.click();
    }
    this.cartTakeOverErrorMsg = function (incorrectCartId){
        this.cartTakeoverTextBox.clear();
        this.cartTakeoverTextBox.sendKeys(incorrectCartId);
        browser.sleep(2000);
        return this.cartTakeOverErrMsg.getText();

    }
    this.promoCode = function (promoCodeValue) {
        this.promoCodeTextBox.clear();
        this.promoCodeTextBox.sendKeys(promoCodeValue);
        browser.sleep(2000);
        this.promoCodeApplyBtn.click();
    }
    this.checkPromoCode = function () {
        //this.discountViewPlusIcon.click();
        browser.sleep(2000);
        return this.promoCodeText.getText();
    }
    this.errorMessages = function (errorMsg) {
        temp = "//en-alert[@ng-if='" + errorMsg + "']";
        if (errorMsg == "discountError") {
            return element(by.xpath(temp)).getText();
        } else if (errorMsg == "appeasementError") {
            return element(by.xpath(temp)).getText();
        }

    }

    this.discountAmtAtLineItem = function (LineDiscount) {
        temp = "(//small[contains(text(),'Discount:')]/following-sibling::small)[" + LineDiscount + "]";
        browser.driver.sleep(1000);
        return element(by.xpath(temp)).getText();
    }
    this.amountFromDetails = function (amountType, lineItemAmt) {
        temp = "(//small[contains(text(),'" + amountType + "')]/following-sibling::strong)[" + lineItemAmt + "]";
        if (amountType == "Discounts") {
            return element(by.xpath(temp)).getText();
        }
        else if (amountType == "Discount") {
            return element(by.xpath(temp)).getText();
        }
        else if (amountType == "Appeasements") {
            return element(by.xpath(temp)).getText();
        }
        else if(amountType =="Authorized: :")
        	 return element(by.xpath(temp)).getText();

    }
    this.amtFromBilledDetails = function (amountType) {
        temp = "//small[contains(text(),'" + amountType + "')]/following-sibling::strong";
        if (amountType == "Discount:") {
            return element(by.xpath(temp)).getText();
        } else if (amountType == "Appeasement:") {
            return element(by.xpath(temp)).getText();
        }else if (amountType == "Tax:"){
            return element(by.xpath(temp)).getText(); 
        }
    }
    this.orderAppeasementTxt = function () {
        browser.driver.sleep(1000);
        return this.orderlvlappeasementText.getText();
    }
    this.orderAppeasementValue = function () {
        browser.driver.sleep(1000);
        return this.orderlvlappeasementValue.getText();
    }
    this.skuLinkAtInventory = function () {
        this.skuLink.click();
    }
    this.editSKUQuantity = function (skuQty) {
        this.editSKUQty.clear();
        this.editSKUQty.sendKeys(skuQty);
    }
    this.allocatedLineCount = function () {
        return this.lineAllocatedCount.getText();
    }
    this.shippedLineCount = function () {
        return this.lineShippedCount.getText();
    }
 /*//updated by vishak
  *    this.editLineGear = function (lineItemNumber) {
        temp = "(//button[@class='en-button text-right margin-left-xs button-primary trim'])[" + lineItemNumber + "]";
        return element(by.xpath(temp)).click();

    }
 */   
    this.addNotes = function (textNote, textNoteType) {
    	browser.sleep(5000)
        this.notesButton.click();
        browser.sleep(2000);
        this.noteText.sendKeys(textNote);
        this.noteType.sendKeys(textNoteType);
        browser.sleep(5000);
        this.notesCreateBtn.click();
    }
    this.notesView = function () {
        this.notesPane.click();
        browser.sleep(2000);
        return this.notesContent.getText();
    }
    this.lineItemsPane = function () {
        this.itemsPane.click();
    }
    /*this.inventoryCount = function(){
        temp="//div[contains(@ng-repeat,'item in inventoryCollection.data')]/div/div[@class='ng-binding']["+ inventoryValue +"]";
        return this.element(xpath(temp)).getText();
    }*/
    this.inventoryDetailsCount = function (inventoryCount){
        temp = "(//div[@ng-if='pools.data']/div/strong)["+ inventoryCount +"]";
        return element(by.xpath(temp)).getText().then(function(count){
            browser.driver.sleep(3000);
            return parseInt(count);
        })
    }

	this.editLineGear = function (lineItemNumber) {
		browser.sleep(5000);
        temp = "(//button/en-icon[@icon ='more-vertical'])[" + lineItemNumber + "]";
        return element(by.xpath(temp)).click();
    }											   
	this.lineItemselectOptions = function (editLineOptions) {
		
		//updated by vishak////
	//	this.editLineGearIcon=element(by.xpath("//button[@class='en-button text-right margin-left-xs button-primary trim']"));
     //   this.editLineGearIcon.click();//till here
        browser.sleep(3000);
        temp = "//button/span[contains(text(),'" + editLineOptions + "')]";
        if (editLineOptions == "Change Price")
            return element(by.xpath(temp)).click();
        else if (editLineOptions == "Discounts") {
            return element(by.xpath(temp)).click();
        } else if (editLineOptions == "Edit Line") {
            return element(by.xpath(temp)).click();
        } else if (editLineOptions == "Appeasement") {
            return element(by.xpath(temp)).click();
        }
        else if (editLineOptions == "VIEW") {
    	
        	return element(by.xpath(temp)).click();
    	}
        else
        	return element(by.xpath(temp)).click();

 	}
	
    this.clickOnPayButton = function () {
        return this.payButton.click();
        browser.sleep(2000);
    }

    this.choosePaymentMethod = function (paymentMethod) {
        temp = "//select/option[@label = '" + paymentMethod + "']";

        if (paymentMethod == "Credit Card") {
            element(by.xpath(temp)).click();
            // return console.log(element(by.xpath(temp)).getText());
            console.log("temp>>",+temp);
        } else if (paymentMethod == "Gift Card") {
            element(by.xpath(temp)).click();

        }

    }

    this.enterCreditCardNumber = function (creditCardNumber) {
        this.creditCardNumber.clear();
        this.creditCardNumber.sendKeys(creditCardNumber);
        browser.sleep(2000);

    }

    this.enterCreditCardCVV = function (creditCardCvv) {
        this.creditCardCVVNumber.clear();
        this.creditCardCVVNumber.sendKeys(creditCardCvv);
        browser.sleep(2000);

    }

    this.enterNameOnCreditCard = function (nameOnCreditCard) {
        this.nameOnCreditCard.clear();
        this.nameOnCreditCard.sendKeys(nameOnCreditCard);
        browser.sleep(2000);

    }

    this.selectExpiryMonthOfCreditCard = function (expiryMonth) {
        temp = "//select/option[@value ='string:" + expiryMonth + "']";
        element(by.xpath(temp)).click();
        browser.sleep(2000);
    }

    this.selectCreditCardExpYear = function (expiryYear) {
        temp = "//select/option[@label ='" + expiryYear + "']";
        element(by.xpath(temp)).click();
        browser.sleep(2000);
    }

    this.getPaymentAmount = function() {
        return this.dueAmount.getText();
//        console.log("no value is being returned" + temp);
    }
    this.enterPaymentAmount = function(paymentAmount) {
        this.paymentAmount.clear();
        this.paymentAmount.sendKeys(paymentAmount);
        browser.sleep(2000);
    }



    this.clickSubmitButton = function() {
        this.submitPayment.click();
    }

    this.verifyOrderTypeHeader = function () {
        browser.driver.sleep(3000);
        return this.orderStatus.getText();
    }

    this.clickOnAddMethodButton = function()
    {
        this.addMethodButton.click();
    }
    this.chooseAlternativePaymentMethod = function (alternativePaymentMethod) {
        //temp = "//select[@name = 'method_1']/option[@label = ' "+ AlternativePaymentMethod + " ']";
        temp = "(//select/option[@label = '" + alternativePaymentMethod +"'])[2]";

        if (alternativePaymentMethod == "Credit Card") {
            element(by.xpath(temp)).click();
            console.log("temp>>",+temp);
        } else if (alternativePaymentMethod == "Gift Card") {
            element(by.xpath(temp)).click();

        }

    }

    this.enterAlternativeCreditCardNumber = function (alternativeCreditcardNumber) {
        this.alternativeCreditCardNumber.clear();
        this.alternativeCreditCardNumber.sendKeys(alternativeCreditcardNumber);
        browser.sleep(2000);

    }

    this.enterAlternativeCreditCardCVV = function (alternativeCreditcardCvv) {
        this.alternativeCreditCardCVV.clear();
        this.alternativeCreditCardCVV.sendKeys(alternativeCreditcardCvv);
        browser.sleep(2000);

    }

    this.nameOnAlternativeCreditCard = function (alternativeNameOnCreditcard) {
        this.alternativeCreditCardName.clear();
        this.alternativeCreditCardName.sendKeys(alternativeNameOnCreditcard);
        browser.sleep(2000);

    }

    this.selectExpiryMonthOfAlternativeCreditCard = function (alternativeExpiryMonth) {
        temp = "//select[@name = 'expMonth_1']/option[@value ='string:" + alternativeExpiryMonth + "']";
        element(by.xpath(temp)).click();
        browser.sleep(2000);
    }

    this.selectAlternativeCreditCardExpYear = function (alternativeExpiryYear) {
        temp = "//select[@name = 'expYear_1']/option[@label ='" + alternativeExpiryYear + "']";
        element(by.xpath(temp)).click();
        browser.sleep(2000);
    }

    this.enterRemainingPaymentAmount = function(remainingPaymentAmount) {
        this.alternativePaymentAmount.clear();
        this.alternativePaymentAmount.sendKeys(remainingPaymentAmount);
        browser.sleep(2000);
    }

    this.clickOnCancelButton = function () {
        this.cancelPayButton.click();
    }

    this.enterGiftCardPinNumber = function(giftCardPin)
    {
        this.giftCardPinNumber.sendKeys(giftCardPin);
    }

    this.clickOnconfirmCustomerAddressButton = function()
    {
        this.confirmCustomerAddressButton.click();
    }

    this.getAppeasementAmount = function () {
        return this.appeasementAmount.gettext();
    }
    this.getUnitPrice  = function()
    {
        return this.unitPrice.getText();
    }
    this.getLinePrice = function()
    {
        return this.linePrice.getText();
    }
    this.getDiscountamount  = function()
    {
        return this.discountamount.getText();
    }
    this.getTaxamount = function()
    {
        return this.taxamount.getText();
    }
 
//Below functions are added by vishak
    
    this.packageTrackingNumber= function(number){
    	this.trackingnumber.sendKeys(number);
    }
    
    this.addDiscount = function (discountlinenumber){
    	this.adddiscountBtn=element(by.xpath("(//span[contains(text(),'Add Discount')])["+discountlinenumber+"]"));
    	this.adddiscountBtn.click();
    	
    }
    
  /*  this.changeShipmentStatus = function(){
    	
    	this.shipmentStatusEditButton.click();
    }
    */
    this.fulfillmentOrderShipmentStatusChanage = function (selectOption) {
    	this.shipmentStatusEditButton.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if(selectOption == "Mark As Shipped")
        	return element(by.xpath(temp)).click();
        else if(selectOption =="Create Shipment")
        	return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }
    
    this.shipmentChangeStatusConfimation = function(){
    	
    	this.shipmentStatusChangeConfirmation.click();
    }
    
    this.shipmentStatusLabel = function(){
    	return this.shipmentstatus.getText();
    }
    
    this.shipAccountselect = function(account){
	//this.shipaccount.sendKeys(account);
    	browser.sleep(1500);
    	element(by.xpath('//select[@name="shipAccount"]')).isPresent().then(function(result) {
		    if ( result ) {
		    	temp=element(by.xpath('//select[@name="shipAccount"]'));
				 temp.sendKeys(account);
		    } else {
				 console.log("No ship acount found")
		    }
    });
}
    
    this.selectItemFromSOScreen = function(){
    	
    	this.selectINVfromSOscreen.click();
    }
    this.shipmentLineReject = function(line) {
	    shipmentLineRejectbutton = "(//button[@class='button-error button-xs margin-right-sm en-button'])";
	    return element(by.xpath((shipmentLineRejectbutton)+"["+line+"]")).click();
	   
   }
    this.ShipmentReject = function(qty,code,reason){
    	
    	this.qtytoReject.clear();
    	browser.sleep(500)
    	this.qtytoReject.sendKeys(qty);
    	browser.sleep(500)
    	this.qtyRejectReasonCode.sendKeys(code);
    	browser.sleep(500)
    	this.qtyRejectReason.sendKeys(reason);
    	browser.sleep(500)
    	this.rejectButton.click();
    }
    
    this.multiplePackage = function(line,qty){
 	   packageqty = element(by.xpath("(//input[@ng-model='item.qtyInPackageDefault'])[" + line + "]"));
 	   packageqty.clear();
        browser.sleep(1000);
        return packageqty.sendKeys(qty);
 	   
    }
    
 this.invSelection = function(line){
    	
    	temp=element(by.xpath("(//button[contains(text(),'Inventory Details')])["+line+"]"));
    	return temp.click();
    }

 this.totalPaymentAmount = function(line){
	 
	 temp=element(by.xpath('(//en-item/div/div/div/div/div//strong[@class="ng-binding"])['+line+']'));
	 return temp.getText();
 }
   
 this.itemsPerPage = function(value){
	 
	 this.itemsPerPageDropdown.sendKeys(value);
	 
 }
 this.selectAllSKU = function(){ 
	 temp = element(by.xpath('//input[@ng-change="collectionCheckAll(skusCollection,0)"]'));
	 return temp.click();
 }
 this.preseneceChecking = function(){
	
	 temp=element(by.xpath('//div/div[@class="line-wrapper-inner"]'));
	 var until = protractor.ExpectedConditions;
	const prsence = until.visibilityOf(temp)
	return browser.wait(prsence, 155000, 'SKUs are not loading as expected');
 }
 
  this.fullFillmentPage = function () {
			
		  this.fullFillmentPageHeader.click();
	}
    
	 this.page = function(name){
		 
		 temp= element(by.xpath("//div/h2[contains(text(),'"+name+"')]/parent::div"));
		 temp.click();

	 }
	 this.OrdersPage = function () {

		 this.ordersPageHeader.click();
		 
	}
    this.CallCenterPage = function () {

		 this.callCenterPageHeader.click();
		 
	 }	 
	 
	 this.rejectLines = function(line,reason){
		 
		 temp='(//select[@ng-model="item.rejectionCode"])['+line+']'
		 element(by.xpath(temp)).click();
		 return element(by.xpath(temp)).sendKeys(reason);
	 }
}
