module.exports = function () {

    this.clearSearchButton = element(by.xpath('//button[@en-tap="clearSearch();"]'));
    this.selectSKUInInventory = element(by.model("skusCollection.checkAllModel"));
    this.selectSKUInResults = element(by.model("inventoryCollection.checkAllModel"));
    this.addToOrderButton = element(by.xpath("//button[@en-tap='goToSalesOrder()']/span"));
    this.attachCustomerButton = element(by.xpath('//button[@class="en-button button-primary"]'));
    this.searchCustomerTextbox = element(by.xpath("(//input[contains(@name,'simplified-text-value')])[2]"));
    this.searchSKUTextBox = element(by.model("apiSearchText.value"));
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
    this.channelText = element(by.xpath("(//div[contains(@id,'collectionBody')]//div[contains(@class,'en-collection-row')])[3]/div[2]"));
    this.reservationDetailsClose = element(by.xpath("//button[@class='en-button']/span[text()='Close']"));
    this.skuLink = element(by.xpath("//a[@class='ellipsis']"));
    this.editSKUQty = element(by.model("product.item.itemQty"));
    this.lineAllocatedCount = element(by.xpath("//div[@class='line-qty']//div[2]/small"));
    this.lineShippedCount = element(by.xpath("//div[@class='line-qty']//div[4]/small"));
    this.notesButton = element(by.xpath("//button/en-icon[@icon='note']"));
    this.noteText = element(by.model("note.text"));
    this.noteType = element(by.model("note.type"));
    this.notesCreateBtn = element(by.xpath("//span[contains(text(),'Create')]"));
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

    this.discountButton = element(by.xpath("//button/en-icon[@icon='discount']"));
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
    this.submitBtn = element(by.xpath("//button[@type='submit'][@object='customer']"));
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
    this.deleteBtn = element(by.xpath("//en-modal-footer//button/span[contains(text(),'Delete')]"));
    //this.errorTextMsg = element(by.xpath("//en-alert[@ng-if='discountError']"));

    this.promoCodeTextBox = element(by.model("promoCode"));
    this.promoCodeApplyBtn = element(by.xpath("//button/span[contains(text(),'Apply')]"));
    this.promoCodeText = element(by.xpath("//span[contains(@ng-if,'item.promo')]"));

    this.salesOrderSelectGearIcon = element(by.xpath("//div[@class='en-collection-row']//en-actions/button"));
    this.packageSelectionDropdown = element(by.xpath('(//select[@name="carrier"])[2]'));
    this.itemQtyInPackageEntryTextBox = element(by.xpath('//input[@ng-model="item.qtyInPackageDefault"]'));
    this.addPackageToShipmentButton = element(by.xpath('//button/span[contains(text(), "Add Package to Shipment")]/parent::button'));
    this.finalizeShipmentButton = element(by.xpath('//button/span[contains(text(), "Finalize Shipment")]/parent::button'));
    this.shipmentRequestSelectGearIcon = element(by.xpath('(//div[@class="en-collection-row"]/div[2])[1]/en-actions/button'));
    //this.lineItemStatus = element(by.xpath("//section[@ng-if='salesOrder.data.lineItems.length']//div[@layout='row']/en-label"));
    this.lineAppeasement = element(by.xpath("//li[@icon='discount']/button//span[contains(text(),'Appeasement')]"));
    this.orderAppeasement = element(by.xpath("//en-field/button/span[text()='Add Appeasement']"));
    this.appeasementTab = element(by.xpath("//en-tab[@pane='appeasementsPane']"));
    this.cartTakeoverGOBtn = element(by.xpath("//button/span[text()='GO']"));
    this.cartTakeoverTextBox = element(by.model("lookupCartId"));
    this.addReferenceBtn = element(by.xpath("(//en-header[@class='underline']/en-icon[@icon='plus'])[2]"));
    this.refNameTextBox = element(by.model("ref.name"));
    this.refValueTextBox = element(by.model("ref.value"));
    this.saveRefBtn = element(by.xpath("//button//span[contains(text(),' Save References')]"));
    this.takeOverBtn = element(by.xpath("//button//span[contains(text(),'Take Over')]"));
    this.cartTakeOverErrMsg = element(by.xpath("//en-msgs[@for='lookupForm.lookupCartId']/en-msg"));
    this.packageUnselect = element(by.model("skipLabelGeneration"));

    var salesChannelEditIcon = element(by.xpath('//en-icon[@en-tap="$root.editChannel=true"]'));
    var channelDropDown = element(by.xpath("//select[contains(@ng-show,'filteredChannels.data.value')]"));
    //var channelDropDown = element(by.xpath("(//select[@name='channel'])[1]"));
    var salesChannelSelectButton = element(by.xpath('//button/en-icon[@icon="check"]'));
    var cancelButtonInInvDetails = element(by.xpath("//button[@class='en-button']/span[text()='Cancel']"));
    var availableQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[7]'));
    var reservedQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[8]'));
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.unselectPkg = function(){
       this.packageUnselect.click();
       browser.sleep(1000);
    }
    this.selectSKUFromSearch = function () {
        return this.selectSKUInInventory.click();
        browser.sleep(1000);

    }
    this.selectSKUFromResults = function () {
        return this.selectSKUInResults.click();
        browser.sleep(1000);

    }
    this.clearSearch = function () {
        this.clearSearchButton.click();
        browser.sleep(1000);
    }
    this.addToOrder = function () {
        this.addToOrderButton.click();
        browser.sleep(1000);
    }
    this.attachCustomer = function () {
        this.attachCustomerButton.click();
        browser.sleep(1000);
    }
    this.filterText = function () {
        browser.driver.sleep(5000);
        return this.closeFilter.getText();
    }
    this.reservationDetailsPopupClose = function () {
        this.reservationDetailsClose.click();
        browser.sleep(1000);
    }
    this.cancelFilter = function () {
        browser.driver.sleep(5000);
        this.closeFilter.click();
        browser.sleep(1000);
    }
    this.searchSKU = function (skuCriteria, skuSearchValue) {
        this.searchSKUTextBox.clear();

        for (var i = 0, len = skuSearchValue.length; i < len; i++) {
            this.searchSKUTextBox.sendKeys(skuSearchValue[i]);
            browser.sleep(100);
        }

        this.searchSKUTextBox.sendKeys(protractor.Key.ENTER);
    }
    this.searchCustomer = function (customerCriteria, customerSearchValue) {
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
    this.addToOrderFromSalesOrder = function () {
        this.addToOrderFromSO.click();
        browser.sleep(1000);
    }
    this.plusIconClick = function () {
        this.plusIcon.click();
        browser.sleep(1000);
    }
    this.inventoryDetailsPopUp = function () {
        this.inventoryDetailsButton.click();
        browser.sleep(1000);
    }
    this.reservationDetails = function () {
        this.reservationDetailsLink.click();
        browser.sleep(1000);
    }
    this.inventoryDetailsSelectGear = function () {
        this.inventoryDetailsSelectGearIcon.click();
        browser.sleep(1000);
    }
    this.getChannelText = function (channel) {
        return this.channelText.getText();
    }
    this.searchWithCriteria = function (criteria, content, searchValue) {
        this.InventorydtlsFilterSearchOption.click();
        browser.sleep(1000);
        this.InventorydtlsFilterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(1000);
        this.InventorydtlsFilterContentDropdown.sendKeys(content);
        browser.sleep(1000);
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
        browser.sleep(1000);
    }
    this.callCenterSKUsGearIcon = function (selectOption) {
        this.callCenterSkuGearIcon.click();
        browser.sleep(1000);
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();            
        else if (selectOption == "Delete") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);
        } else {
            element(by.xpath(temp)).click();
            browser.sleep(1000);
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            //return element.all(by.xpath(temp)).get(1).click();
            return element.all(by.xpath(temp)).get(1).click();
            browser.sleep(1000);
        }

    }

    this.lineItemselectOptions = function (editLineOptions) {

        //this.editLineGearIcon.click();
        temp = "//button/span[contains(text(),'" + editLineOptions + "')]";
        if (editLineOptions == "Change Price")
            return element(by.xpath(temp)).click();
        else if (editLineOptions == "Discounts") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);
        } else if (editLineOptions == "Edit Line") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);
        } else if (editLineOptions == "Appeasement") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);

        }

    }
    this.lineLevelAppeasement = function () {
        browser.sleep(2000);
        this.lineAppeasement.click();
        browser.sleep(1000);
    }
    this.orderLevelAppeasement = function () {
        this.orderAppeasement.click();
        browser.sleep(1000);
    }
    this.appeasementsHeader = function () {
        this.appeasementTab.click();
        browser.sleep(1000);
        /* browser.sleep(1000);
         temp ="//div[@class='ng-binding'][contains(text(),'" + appeasementLevel +"')]";
         if(appeasementLevel == "Order"){
             return element(by.xpath(temp)).
         }*/

    }
    this.salesChannel = function (value) {
        salesChannelEditIcon.click();
        browser.sleep(1000);
        channelDropDown.sendKeys(value);
        browser.sleep(1000);
        salesChannelSelectButton.click();
    }

    this.promisedDate = function (Date) {
        this.editPromisedDate.click();
        browser.sleep(1000);
        this.promisedDateTextBox.sendKeys(Date);
    }
    this.createCustomer = function (displayName, firstName, lastName, address1, city, state, zipcode5) {
        this.createCustomerBtn.click();
        browser.sleep(1000);
        this.customerDisplayName.sendKeys(displayName);
        this.customerNumberBtn.click();
        browser.sleep(1000);
        this.customerFirstName.sendKeys(firstName);
        this.customerLastName.sendKeys(lastName);
        this.addAddressIcon.click();

        browser.sleep(1000);
        // this.addressCheckBox.click();
        this.test();
        this.address1TextBox.sendKeys(address1);
        this.addressCityTextBox.sendKeys(city);
        this.stateDropDown.sendKeys(state);
        this.addressZipCode5.sendKeys(zipcode5);
        this.addressSaveBtn.click();
        browser.sleep(1000);

    }
    this.customerAdvancedSettings = function (customerState, customerPriority) {
        browser.sleep(1000);
        this.advancedSettingsBtn.click();
        browser.sleep(1000);
        this.selectCustomerState.sendKeys(customerState);
        this.selectCustomerPriority.sendKeys(customerPriority);
        browser.sleep(3000);
        this.submitBtn.click();
        browser.sleep(1000);
    }
    this.incrementQty = function () {
        this.incrementQtyArrowUp.click();
        browser.sleep(1000);
    }
    this.decrementQty = function () {
        this.decrementQtyArrowDown.click();
        browser.sleep(1000);
    }
    this.editLine = function () {
        this.editlinePopup.click();
        browser.sleep(1000);
        this.discountButton.click();
        browser.sleep(1000);
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
        browser.sleep(1000);
    }


    this.test = function () {
        var chk = element.all(by.model("roles[role.value]"));
        chk.each(function (elem) {
            elem.click();

            browser.sleep(1000);

        });
    }
    this.changingUnitPrice = function (unitPrice) {
        this.unitPriceTextBox.clear();
        this.unitPriceTextBox.sendKeys(unitPrice);
        browser.sleep(500);
        this.priceSaveBtn.click();
        browser.sleep(1000);
    }
    this.editLinePopUpSaveBtn = function () {
        this.editSKUApplyBtn.click();
        browser.sleep(1000);
    }
    this.discountOptions = function (lineDiscountOptions) {
        this.discountOptionsGearIcon.click();
        temp = "//button//span[contains(text(),'" + lineDiscountOptions + "')]";
        browser.sleep(3000);
        if (lineDiscountOptions == "Edit") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);
        } else if (lineDiscountOptions == "Delete") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);
        }
    }
    this.appeasementOptions = function (headerOptions) {
        this.appeasementOptionsGearIcon.click();
        temp = "//button//span[contains(text(),'" + headerOptions + "')]";
        browser.sleep(3000);
        if (headerOptions == "Edit") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);
        } else if (headerOptions == "Delete") {
            return element(by.xpath(temp)).click();
            browser.sleep(1000);
        }
    }
    this.discountViewNotes = function () {
        //this.discountViewPlusIcon.click();
        browser.sleep(3000);
        this.discountViewButton.click();
        browser.sleep(1000);
    }
    this.appeasementViewNotes = function () {
        browser.sleep(3000);
        this.appeasementViewButton.click();
        browser.sleep(1000);
    }
    this.viewPlusIcon = function (lineViewDetails) {
        temp = "(//section[contains(@ng-if,'salesOrder.data.lineItems.length')]//en-section//small[text()='" + lineViewDetails + "'])";
        if (lineViewDetails == "Discounts") {
            element(by.xpath(temp)).click();
            browser.sleep(1000);
        } else if (lineViewDetails == "Appeasements") {
            element(by.xpath(temp)).click();
            browser.sleep(1000);
        }
    }
    this.ViewNotesClose = function () {
        this.CloseBtn.click();
        browser.sleep(1000);
    }
    this.delete = function () {
        this.deleteBtn.click();
        browser.sleep(1000);
    }
    this.discountAmountValue = function () {
        return this.amountViewPopup.getText();
        browser.sleep(1000);
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
        browser.sleep(1000);
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Create Shipment")
            return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            browser.sleep(1000);
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
            browser.sleep(1000);
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

    this.addPackageToShipment = function () {
        return this.addPackageToShipmentButton.click();
        browser.sleep(1000);
    }


    this.finalizeShipment = function () {
        return this.finalizeShipmentButton.click();
        browser.sleep(1000);
    }
    this.callCenterSalesOrderSelectGear = function (selectOption) {
        this.salesOrderSelectGearIcon.click();
        browser.sleep(1000);
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "View")
            return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            browser.sleep(1000);
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
            browser.sleep(1000);
        }
    }
    this.lineStatus = function () {

        return element.all(by.xpath("//section[@ng-if='salesOrder.data.lineItems.length']//div[@layout='row']/en-label")).getText();

    }
    this.addReferences = function (refNameCartId, cartIDValue) {
        this.addReferenceBtn.click();
        browser.sleep(1000);
        this.refNameTextBox.clear();
        this.refNameTextBox.sendKeys(refNameCartId);
        browser.sleep(1000);
        this.refValueTextBox.clear();
        this.refValueTextBox.sendKeys(cartIDValue);
        browser.sleep(1000);
        this.saveRefBtn.click();
        browser.sleep(1000);
    }
    this.cartTakeOver = function (cartIDValue) {
        this.cartTakeoverTextBox.clear();
        this.cartTakeoverTextBox.sendKeys(cartIDValue);
        browser.sleep(1000);
        this.cartTakeoverGOBtn.click();
        browser.sleep(3000);
        this.salesOrderSelectGearIcon.click();
        browser.sleep(1000);
        this.takeOverBtn.click();
        browser.sleep(1000);
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
        browser.sleep(1000);
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
        } else if (amountType == "Appeasements") {
            return element(by.xpath(temp)).getText();
        }

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
        browser.sleep(1000);
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
    this.editLineGear = function (lineItemNumber) {
        temp = "(//section[contains(@ng-if,'salesOrder.data.lineItems.length')]//en-actions/button/en-icon)[" + lineItemNumber + "]";
        return element(by.xpath(temp)).click();
        browser.sleep(1000);

    }
    this.addNotes = function (textNote, textNoteType) {
        this.notesButton.click();
        browser.sleep(2000);
        this.noteText.sendKeys(textNote);
        this.noteType.sendKeys(textNoteType);
        browser.sleep(2000);
        this.notesCreateBtn.click();
        browser.sleep(1000);
    }
    this.notesView = function () {
        this.notesPane.click();
        browser.sleep(2000);
        return this.notesContent.getText();
    }
    this.lineItemsPane = function () {
        this.itemsPane.click();
        browser.sleep(1000);
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


}
