module.exports = function () {

    var fulfillmentHeader = element(by.xpath("//en-title[text()='Fulfillment']"));
    var storePortalHeader = element(by.xpath("//h2[text()='Store Portal']"));
    var screenHeading = element(by.xpath("(//en-title[@class='ng-binding'])[2]"));
    var picklistButton = element(by.xpath("//span[text()='PRINT PICKLIST BY ORDER']"));
    var multiselectButton = element(by.model("checked"));
    var viewFulfillButton = element(by.xpath("//span[text()='VIEW FULFILLMENT']"));
    var FRSelectGearIcon = element(by.xpath("//div[contains(@class,'en-collection-row')]/div[2]//en-actions/button"));
    var editOption = element(by.xpath("//span/li/button/span[text()='Edit']/parent::button"));
    var verticalEllipsisButton = element(by.xpath("//en-header/input[@type='checkbox']"));
    var acceptOrderButton = element(by.xpath("//span[text()='ACCEPT ORDER']"));
    var acceptOrder2Button = element(by.xpath("//span[text()='Accept Order']"));
    var rejectButton = element(by.xpath("//span[text()='REJECT ORDER']"));
    var acceptPartialButton = element(by.xpath("//span[text()='ACCEPT PARTIAL']"));
    var reasonCodeDropdown = element(by.model("modalObject.reasonCode"));
    var reasonCodeOption = element(by.xpath("//select/option[@label='No Stock']"));
    var rejectComments = element(by.xpath("//input[@type='text']"));
    var confirmReject = element(by.xpath("//span[text()='Reject']"));
    var confirmDialogYesButton = element(by.xpath("//button/span[text()='Yes']"));
    var pickAndPackButton = element(by.xpath("//div/button/span[text()='Pick & Pack']"));
    var statusText = element(by.xpath("//en-title/strong[@class='capitalized ng-binding']"));
    var rejectRemainingItemsButton = element(by.xpath("//span[text()='Reject Remaining Items']"));
    var fulfillmentIcon = element(by.xpath("//en-title[text()='Fulfillment']"));
    var incrementPickQty = element(by.xpath("//en-icon[@icon='plus']"));
    var includeInPackageButton = element(by.xpath("//span[text()='Include in Package']"));
    var packageDropdown = element(by.xpath("//select[@name='carrier']"));
    var boxPkgOption = element(by.xpath("//select[@name='carrier']/option[2]"));
    var addPkgButton = element(by.xpath("//button/span[contains(text(),'Add Package')]/parent::button"));
    var removePkgButton = element(by.xpath("//span[text()='Remove Package']"));
    var finalizeFulfillment = element(by.xpath("//span[text()='Complete Fulfillment']"));
    var statusTextPS = element(by.xpath("(//en-title/strong[contains(@class,'ng-binding')])[2]"));

    var printAllDocumentsButton = element(by.xpath("//button/span[text()='Print Documents']"));
    var printPickListByOrder = element(by.xpath("//span[text()='PRINT PICKLIST BY ORDER']"));
    var printPickListByItem = element(by.xpath("//span[text()='PRINT PICKLIST BY ITEM']"));
    var qtyUpdateBox = element(by.model("item.orderQty"));

    var searchOption = element(by.xpath("//button/div/span[contains(text(),'Filters')]/parent::div/parent::button"));
    var filterCriteriaDropdown = element(by.xpath("//select[@name='filter-criteria']"));
    var filterContentDropdown = element(by.xpath("//select[@name='filter-content']"));
    var valueDropDown = element(by.xpath("//select[@name='filter-content'and @ng-model='apiSearchFilter.value']"));
    //var searchValueTextbox = element(by.model("apiSearchFilter.value"));

    var inputTextBox = element(by.model("apiSearchFilter.value"));
    var goButton = element(by.xpath("//span[text()='Go']"));

    var pdfPrintButton = element(by.xpath("//nav/button/en-icon[@icon='print']"));
    var category = element(by.id("pdf"));
    var pdfSaveButton = element(by.xpath("//button/a/en-icon[@icon='disk-floppy']"));
    // var pickListSavePDFButton = element(by.xpath('//button/a[@title="Download pdf"]/parent::button'));
    var pickListSavePDFButton = element(by.xpath("//button/a[contains(@title,'Download pdf')]/parent::button"));

    var searchTextBox = element(by.xpath("//input[contains(@class, 'adv-search-input')]"));
    var salesOrderStatusText = element(by.xpath("//*[contains(@ng-repeat,'data track by $index')]/div/div[5]"));
    var packageSelectionDropdown = element(by.xpath("(//select[@name='carrier'])[2]"));
    var minusIcon = element(by.xpath("//en-icon[@icon='minus']"));

    var packShipIconButton = element(by.xpath("(//ng-template[contains(@ng-if,'count')]/li)[2]"));
    // var statusHomePage = element(by.xpath("//div[@class='en-collection-row']/div[5]//en-label"));
    var statusHomePage = element(by.xpath("//div[contains(@class,'en-collection-row')]/div[5]//en-label"));

    var availableQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[5]'));
    var reservedQty = element(by.xpath('//div[contains(@ng-repeat,"item in inventoryCollection.data")]/div/div[6]'));
    var orderIDtext = element(by.xpath("//div[contains(@class,'en-collection-row')]/div[8]//span"));
    var matchingCriteria = element(by.model("object.search.matchAll"));
    var indexDD = element(by.xpath("//select[contains(@ng-if,'filterType')]/option[2]"));
    var accButton = element(by.xpath("//button[contains(@ng-disabled,'isAcceptRejectDisabled')]"));
    var padButton = element(by.xpath("(//li[contains(@ng-disabled,'action.enableOnStatus')])[2]"));
    var salesChannelEditIcon = element(by.xpath('//en-icon[@en-tap="$root.editChannel=true"]'));
    var channelDropDown = element(by.xpath("//select[contains(@ng-show,'filteredChannels.data.value')]"));
    var salesChannelSelectButton = element(by.xpath('//button/en-icon[@icon="check"]'));
    var itemPickedQtyButton = element(by.xpath("(//button[contains(@ng-disabled,'AcceptPartial')])[1]"));
    var qtyPick = element(by.xpath("(//button[contains(@ng-disabled,'itemQtyPicked')])[1]"));
    var rejRemButtonStatus = element(by.xpath("//button[contains(@ng-disabled,'enableDisableRejectRemaining')]"));
    var finalShipButtonStatus = element(by.xpath("//button[contains(@ng-disabled,'disableFinalize')]"));
    var shipmentsPane = element(by.xpath("//en-tab[text()='Shipments']"));
    var shipmentID = element(by.xpath("//en-panel//en-title[text()='Shipment #: ']"));
//en-panel[contains(@ng-repeat, 'shipmentPackages')]//child::en-title

    var shipmentGear = element(by.xpath("//en-icon[@icon='more-vertical']/parent::button"));
   // var valueDropDown = element(by.xpath(" //select[@name='filter-content'and @ng-model='apiSearchFilter.value']"));
 //   var valueDropDown = element(by.xpath("//select[@ng-options='item as item.name for item in filterTypeValues']"));
    var itemQtyInPackageEntryTextBox = element(by.xpath('//input[@ng-model="item.qtyInPackageDefault"]'));
    var searchTextbox = element(by.xpath("//input[@ng-model='apiSearchText.value']"));
    // Bopis locators
    var fulfillmentType = element(by.xpath('//select[@name="fulfillmentType"]'));
    var selectedStore = element(by.xpath('//select[@name="selectedStore"]'));
    var storePortalV2Header =  element(by.xpath("//h2[text()='Store Portal - V2']"));
    var pickUpOrderButton = element(by.xpath("//span[text()='PICK UP ORDER']"));
    var cancelOrderButton = element(by.xpath("//span[text()='CANCEL ORDER']"));
    var actualPickUpDate = element(by.xpath("//input[@name='pickUpDate']"));
    var actualPickUpTime = element(by.xpath("//input[@name='pickUpTime']"));
    var pickedUpByText = element(by.xpath("//input[@name='pickedUpBy']"));
    var verificationTypeDrpdwn = element(by.xpath("//select[@name='verificationProof']"));
    var verificationIDTextBox = element(by.xpath("//input[@name='verificationID']"));
    var notesTextBox = element(by.xpath("//textarea[@name='notes']"));
    var confirmButton = element(by.xpath("//button/span[text()='Confirm']"));
    var FRStatus = element(by.xpath("//div[@ng-class='rowClass']/div[5]/strong"));
    var pickupStartDateBtn = element(by.xpath("(//div[contains(@ng-if,'flagIsCompleteFulfillmentTypePickAtStore')]/strong/en-icon)[1]"));
    var cancelOrderHeaderlvlBtn = element(by.xpath("//button/span[text()='Cancel Order']"));
    var cancelBtnAtlinelvl = element(by.xpath("//button[text()='Cancel']"));
    var reasonCodeDropdown = element(by.model("modalObject.reasonCode"));
    var cancelReasonCodeOption = element(by.xpath("//select/option[@label='NotNeeded']"));
    var cancelComments = element(by.model("modalObject.reason"));
    var confirmCancel = element(by.xpath("//span[text()='Confirm']"));
    var cancelqty = element(by.xpath("//input[@name='itemQty']"));
    var pickupWindowAtV2Header = element(by.xpath("(//en-label[contains(@ng-if,'item.header.fulfillmentType')])[1]"));
    var pickandPackIcon = element(by.xpath("//button/en-icon[@icon='truck']"));
    var printPickListIcon = element(by.xpath("(//button/en-icon[@icon='print'])"));
    var printedPickListIcon = element(by.xpath("//div/en-icon[@icon='check-ring']"));
    var pendingFulfillmentCount = element(by.xpath("(//en-subheader/div/div/h3[2])[1]"));
    var filtericon= element(by.xpath("//button/div/en-icon[@icon=\"caret-down\"]"))

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.filerIconclick  = function () {
        fulfillmentHeader.click();
    }

    this.selectFulfillmentType = function(typesOfFulfillment){
        fulfillmentType.sendKeys(typesOfFulfillment);
    }
    this.selectStores = function(availableStores){
        selectedStore.sendKeys(availableStores);
    }
    this.navigateToStorePortalV2Screen = function () {
        fulfillmentIcon.click();
        browser.sleep(2000);
        storePortalV2Header.click();

    }

    this.clickFulfillmentHeader = function () {
        fulfillmentHeader.click();
        browser.sleep(2000);
        storePortalHeader.click();
        browser.sleep(2000);
    }
    this.pickupWindowfromHeader = function(pickupDates){
        return pickupWindowAtV2Header.getText();
    }
    this.PickupWindowDates = function(value,pickupWindow){
        temp = "//en-title/strong[contains(@ng-class,'"+ value +"')]";
        if(value == "shipmentRequest")
            return element(by.xpath(temp)).getText();
        else if(value == "order")
            return element(by.xpath(temp)).getText();
    }

    this.headerColumnStatus = function(value,columnValue){
        temp = "(//div[@class='ng-binding'])["+ value +"]";
        if(value == "7")
           return element(by.xpath(temp)).getText();
        else if(value == "8")
            return element(by.xpath(temp)).getText();
        else if(value == "9")
           return  element(by.xpath(temp)).getText();
    }
    this.pickUpOrder = function(){
        pickUpOrderButton.click();
    }
    this.headerIcons = function(selectOption){
        temp = "//en-actions[@icon='"+ selectOption +"']/button";
    if(selectOption == "print")
            element(by.xpath(temp)).click();
       else if(selectOption == "trash")
            element(by.xpath(temp)).click();
        else if(selectOption == "check-circle")
            element(by.xpath(temp)).click();
        else if(selectOption == "box-unpack")
            element(by.xpath(temp)).click();
        else if(selectOption == "truck")
        element(by.xpath(temp)).click();
    }
    this.headerActionButtons = function(selectAction){

        temp = "//span[text()='"+ selectAction +"']";
        if(selectAction == "PICK UP ORDER")
            element(by.xpath(temp)).click();
        else if(selectAction == "REJECT ORDER")
            element(by.xpath(temp)).click();
       else if(selectAction == "CANCEL ORDER")
            element(by.xpath(temp)).click();
        else if(selectAction == "RELEASE INVENTORY")
            element(by.xpath(temp)).click();
        else if(selectAction == "ACCEPT ORDER")
            element(by.xpath(temp)).click();
        else if(selectAction == "ACCEPT PARTIAL")
            element(by.xpath(temp)).click();
        else if(selectAction == "PRINT PICKLIST BY ORDER")
            element(by.xpath(temp)).click();
        else if(selectAction == "PRINT PICKLIST BY ITEM")
            element(by.xpath(temp)).click();
    }
    this.cancelOrder = function(cancelCommenttext){
        cancelOrderHeaderlvlBtn.click();
        browser.sleep(1000);
        reasonCodeDropdown.click();
        browser.sleep(1000);
        cancelReasonCodeOption.click();
        browser.sleep(1000);
        cancelComments.sendKeys(cancelCommenttext);
        confirmCancel.click();
    }
    this.cancelAtLinelvl = function(cancelQuantity,cancelCommenttext){
        cancelBtnAtlinelvl.click();
        browser.sleep(3000);
        cancelqty.clear().sendKeys(cancelQuantity);
        reasonCodeDropdown.click();
        browser.sleep(1000);
        cancelReasonCodeOption.click();
        browser.sleep(1000);
        cancelComments.sendKeys(cancelCommenttext);
        confirmCancel.click();

    }
    this.releaseInventory = function(){
        confirmDialogYesButton.click();
    }
    this.actualpickUpDate = function(actualPickDate){
        return actualPickUpDate.getText();
    }
    this.actualpickUpTime = function(actualPickTime){
        return actualPickUpTime.getText();
    }
    /*this.pickupDetails = function(selectOption,Value,pickupValue){
        temp = "//input[@name='"+ selectOption +"']";
        if(selectOption == "pickUpDate")
            return element(by.xpath(temp)).getText();
         if(selectOption == "pickUpTime")
        return element(by.xpath(temp)).getText();
         if(selectOption == "verificationID")
             element(by.xpath(temp)).sendKeys(Value);
           browser.sleep(1000);
           return element(by.xpath(temp)).getText();
        if(selectOption == "pickedUpBy")
            element(by.xpath(temp)).sendKeys(Value);
          browser.sleep(1000);
          return element(by.xpath(temp)).getText();
    }*/
    this.pickedUpBy = function(pickedUpByName,pickedName){
         pickedUpByText.sendKeys(pickedUpByName);
         browser.sleep(1000);
         return pickedUpByText.getText();
    }

   /* this.categorySearch = function(){
       console.log(category.getText());
      //  category.getText().then(function (text) {
      //      console.log(text);
        //    var a= console.log(text);
       //   expect(a).toMatch("Category");
       //})


    }*/


    this.verificationType = function(selectType){
        verificationTypeDrpdwn.sendKeys(selectType);
    }
    this.verificationID = function(IdVerification){
        verificationIDTextBox.sendKeys(IdVerification);
    }
    this.pickupNotes = function(notes){
        notesTextBox.sendKeys(notes);
    }
    this.confirmBtn = function(){
        confirmButton.click();
    }
    this.getFRStatus = function(FrStatus){
        return FRStatus.getText();
    }
    this.pickupDateAndTime = function(value,textValue){
        temp = "(//div[contains(@ng-if,'flagIsCompleteFulfillmentTypePickAtStore')]/strong)["+ value +"]";
        if(value == "1")
            return element(by.xpath(temp)).getText();
        else if(value == "2")
            return element(by.xpath(temp)).getText();
        else if(value == "3")
            return element(by.xpath(temp)).getText();
        else if(value == "4")
            return element(by.xpath(temp)).getText();
    }
    this.editPickupDates = function(selectValue){
        temp = "(//div[contains(@ng-if,'flagIsCompleteFulfillmentTypePickAtStore')]/strong/en-icon)["+ selectValue +"]";
        if(selectValue == "1")
            element(by.xpath(temp)).click();
        if(selectValue == "2")
            element(by.xpath(temp)).click();
        if(selectValue == "3")
            element(by.xpath(temp)).click();
        if(selectValue == "4")
            element(by.xpath(temp)).click();
    }
    this.pickupDates = function(selectDate,pickupDates){
        temp = "//input[@name='"+ selectDate +"']";
    if(selectDate == "pickUpStartDate")
        element(by.xpath(temp)).clear().sendKeys(pickupDates);
        if(selectDate == "pickUpEndDate")
            element(by.xpath(temp)).clear().sendKeys(pickupDates);

    }
    this.pickupTime = function(selectTime,pickupTime){
        temp = "//input[@name='"+ selectTime +"']";
        if(selectDate == "pickUpStartTime")
            element(by.xpath(temp)).clear().sendKeys(pickupTime);
        if(selectDate == "pickUpEndTime")
            element(by.xpath(temp)).clear().sendKeys(pickupTime);
    }
    this.ordersPendingCount = function(){
        return pendingFulfillmentCount.getWebElement().toString();
    }

    this.isFulfillmentManagementHederDisplayed = function () {
        return picklistButton.isDisplayed();
    }


    this.multiSelect = function () {
        multiselectButton.click();
    }

    this.viewFulfillment = function () {
        viewFulfillButton.click();
        browser.sleep(3000);
    }
    this.clickGear = function () {
        FRSelectGearIcon.click();
        browser.sleep(3000);
    }

    this.clickMultipleGear = function (index) {
        temp = "(//div[contains(@class,'en-collection-row')]/div[2]//en-actions/button)[" + index + "]";
        element(by.xpath(temp)).click();
        browser.sleep(3000);
    }
//*********t\<< To select an option from 3 (...) dots >>>>>************
    this.FRSelectGear = function (selectOption) {
        // FRSelectGearIcon.click();
        browser.sleep(3000);
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "AcceptPartial")
            return element(by.xpath(temp)).click();
        else {
            //element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            console.log(temp);
            return element(by.xpath(temp)).click();
        }
    }
    this.acceptOrder = function () {
        verticalEllipsisButton.click();
        browser.sleep(2000);
        acceptOrder2Button.click();
        browser.sleep(2000);
        confirmDialogYesButton.click();
        browser.sleep(2000);
    }
    this.acceptOrderHome = function () {
        //verticalEllipsisButton.click();
        browser.sleep(2000);
        acceptOrderButton.click();
        browser.sleep(2000);
        confirmDialogYesButton.click();
        browser.sleep(2000);
    }

    this.packAndShipOrder = function () {
       pickAndPackButton.click();
    }

    this.printPickList = function() {
        printPickListIcon.click();
    }
    this.getStatus = function () {
        return statusText.getText();
    }

    this.getStatusPS = function () {
        return statusTextPS.getText();
    }

    this.qtyPick = function () {
        browser.sleep(1000);
        multiselectButton.click();
        browser.sleep(1000);
        incrementPickQty.click();
        browser.sleep(1000);
        includeInPackageButton.click();
    }


    this.addpkg = function () {
        browser.sleep(1000);
        return addPkgButton.click();

    }
    this.completeFulfill = function () {
        browser.sleep(1000);
        finalizeFulfillment.click();
        console.log("Success");
        browser.sleep(2000);
    }

    this.rejectRemainingItems = function () {
        multiselectButton.click();
        browser.sleep(2000);
        rejectRemainingItemsButton.click();
    }

    this.printDocuments = function () {
        printAllDocumentsButton.click();
        console.log("Print Successful");
        browser.sleep(2000);

    }
    this.pickListByOrderSavePDF = function () {
        browser.sleep(2000);
        printPickListByOrder.click();
        browser.sleep(2000);
        pickListSavePDFButton.click();
        browser.sleep(10000);

    }
    this.pickListByItemSavePDF = function () {
        browser.sleep(2000);
        printPickListByItem.click();
        browser.sleep(2000);
        pickListSavePDFButton.click();
        browser.sleep(10000);

    }
    this.qtyUpdate = function (qty) {
        browser.sleep(2000);
        qtyUpdateBox.clear().sendKeys(qty);
    }

    this.packShipIcon = function () {
        browser.sleep(2000);
        packShipIconButton.click();
    }

    this.getStatusHomePage = function () {
        return statusHomePage.getText();
    }

    this.rejectOrder = function (comment) {
        rejectButton.click();
        browser.sleep(1000);
        reasonCodeDropdown.click();
        browser.sleep(1000);
        reasonCodeOption.click();
        browser.sleep(1000);
        rejectComments.sendKeys(comment);
        confirmReject.click();

    }

    this.decrementLine = function () {
        minusIcon.click();
        browser.sleep(1000);
    }

    this.searchQueryCriteria = function (criteria, searchValue) {
       // var serachValue = by.xpath("//select/option[text()='Pending']");
        searchOption.click();
        browser.sleep(100);
        filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(100);
        //filterContentDropdown.sendKeys(content);
        browser.sleep(500);
        valueDropDown.click();
        valueDropDown.sendKeys(searchValue);
        valueDropDown.sendKeys(protractor.Key.ENTER);
        //select/option[text()='Accepted']
        browser.sleep(1000);

    }

    //Below method is with go button
    this.searchOrderCriteria = function (criteria, content, searchValue) {
        searchOption.click();
        browser.sleep(100);
        filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(100);
        filterContentDropdown.sendKeys(content);
        browser.sleep(100);
        inputTextBox.sendKeys(searchValue);
        browser.sleep(500);
        goButton.click();
        browser.sleep(500);
    }

    //Below method is without go button
    this.searchShipment = function (criteria, content, searchValue) {
        searchOption.click();
        browser.sleep(100);
        filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(100);
        filterContentDropdown.sendKeys(content);
        browser.sleep(100);
        inputTextBox.sendKeys(searchValue);
        inputTextBox.sendKeys(protractor.Key.ENTER);
        browser.sleep(500);
    }
    this.singleOrderSelect = function () {
        browser.sleep(500);
        element(by.xpath("(//input[@ng-model='checked'])[1]")).click();

    }
    this.multipleOrderSelect = function () {
        multiselectButton.click();
        browser.sleep(500);
        element(by.xpath("(//input[@ng-model='checked'])[2]")).click();

    }

    this.boxPkg = function (type) {
        browser.sleep(1000);
        packageDropdown.sendKeys(type);
        browser.sleep(500);

    }

    this.removePackage = function () {
        browser.sleep(500);
        removePkgButton.click();
        browser.sleep(500);
    }

    this.confirmShipment = function () {
        confirmDialogYesButton.click();
        browser.sleep(1000);
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

    this.salesOrderStatus = function () {
        browser.driver.sleep(20000);
        element(by.xpath("//*[ @ng-repeat='item in allLocalOrdersCollection.data track by $index']/div/div[1]")).getText();
        return status;

    }

    this.salesOrderNumber = function () {
        return orderIDtext.getText();

    }

    this.multipleOrdersFilter = function () {
        element.all(by.xpath("//input[@ng-model='checked']")).filter(function (elem) {
            return elem.element(by.xpath("//div[contains(@class,'en-collection-row')]/div[8]//span")).getText().then(function (text) {
            });
        }).first().element(by.xpath("(//input[@ng-model='checked'])[1]")).click();

    }

    this.getElements = function () {
        element.all(by.xpath("//input[@ng-model='checked']").getText()).then(function (text) {
            console.log(text);
        });
    }




    this.selectMatchingCriertia = function (value) {
        browser.driver.sleep(1000);
        matchingCriteria.sendKeys(value);
    }

    this.searchIndexCriteria = function (criteria) {
        searchOption.click();
        browser.sleep(100);
        filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(100);
    }

    this.index = function (index) {
        temp = "//select[contains(@ng-if,'filterType')]/option[" + index + "]";
        element(by.xpath(temp)).click();
        browser.sleep(1000);

    }

    this.soLineStatus = function (line) {
        temp = "((//section/en-list/en-item)[" + line + "]/div/div/div)[4]";
        return element(by.xpath(temp)).getText();
    }

    this.frUnits = function (i) {
        temp = "(//div[contains(@class,'en-collection-row')])[" + i + "]/div[12]";
        return element(by.xpath(temp)).getText();
    }

    this.accStatus = function () {
        return accButton.getAttribute("disabled");

    }

    this.padButtonStatus = function () {
        return padButton.getAttribute("disabled");

    }
    this.salesChannel = function (value) {
        salesChannelEditIcon.click();
        browser.sleep(100);
        channelDropDown.sendKeys(value);
        browser.sleep(100);
        salesChannelSelectButton.click();
    }


    this.isAcceptPartialPresent = function () {
        return acceptPartialButton.isEnabled();
    }

    this.acceptPartialOption = function () {
        browser.sleep(3000);
        return element(by.xpath("//span/li/button/span[text()='Accept Partial']/parent::button")).isEnabled();

    }
    this.itemPickerButtonStatus = function () {
        return itemPickedQtyButton.getAttribute("disabled");

    }

    this.clickOrder = function (orderNo) {
        browser.driver.sleep(2000);
        temp = "//div[@class='en-collection-row']//div/span[contains(text()," + orderNo + ")]";
        console.log(orderNo);
        return element(by.xpath(temp)).click();
        browser.driver.sleep(3000);
    }

    this.qtyPickedStatus = function () {
        return qtyPick.getAttribute("disabled");

    }

    this.rejectRemainingDisabled = function () {
        multiselectButton.click();
        browser.sleep(2000);
        return rejRemButtonStatus.getAttribute("disabled");
    }

    this.completeFulfillDisabled = function () {
        return finalShipButtonStatus.getAttribute("disabled");
    }

    this.navigateToShipmentsPane = function () {
        shipmentsPane.click();
    }

    this.lineFRStatus = function (line) {
        // temp ="(//div[contains(@ng-repeat,'lineItemsCollection')])[" + line + "]";
        temp = "(//div[contains(@ng-repeat,'lineItemsCollection')])[" + line + "]//div[5]/en-label";
        return element(by.xpath(temp)).getText();
    }

    this.enterItemQty = function (line, qtyValue) {
        temp = "(//input[@ng-model='item.qtyInPackageDefault'])[" + line + "]";
        return element(by.xpath(temp)).sendKeys(qtyValue);
    }

    this.getShipment = function () {
        return shipmentID.getText();
    }
    this.naviagteToShipments = function () {
        shipmentID.click();
    }

    this.shipmentGearButton = function () {
        shipmentGear.click();
        //span[text()='PRINT PICKLIST BY ORDER']
    }

    this.shipmentGearSelect = function (selectOption) {
        browser.sleep(3000);
        temp = "//span[text()='" + selectOption + "']";
        if (selectOption == "Generate Packing Slips")

            return element(by.xpath(temp)).click();
        else {
            //element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            console.log(temp);
            return element(by.xpath(temp)).click();
        }
    }

    this.enterItemQty = function (index,qtyValue) {

        temp = "(//input[@ng-model='item.qtyInPackageDefault'])[" + index + "]";
        return element(by.xpath(temp)).sendKeys(qtyValue);
    }
}


