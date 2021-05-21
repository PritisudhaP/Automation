'use strict';
const { element } = require("protractor");

 

module.exports = {  
		
	SOLocators: { 
    menuCallCenter : element(by.xpath('(//*[text()[contains(.,"Call Center")]])[1]')),
	tileSalesOrders : element(by.xpath('(//div[@class="card card-bordered card-split card-lifted is-clickable"])[3]')),
	newOrderButton : element(by.xpath('//button[@class="button-primary en-button"]')),
	attachCustomerBtn : element(by.xpath('//*[text()[contains(.,"Attach Customer")]]')),
	savedCustSearchFilter : element(by.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])[2]')),
	custSelectFilter : element(by.xpath('(//*[text()[contains(.,"Filters")]])[2]')),
    custSelectSearchCriteria : element(by.model('apiSearchFilter.filter')),
    custSelectSearchFilter : element(by.model('apiSearchFilter.arg')),
    custSearchTextBox : element(by.model('apiSearchFilter.value')),
    selectCustCheckBox : element(by.xpath("//div[@class = 'en-collection-row']/div/input")),
    selectCustomer : element(by.xpath('//*[text()[contains(.,"Use Selected Customer")]]')),
    savedItemSearchFilter : element(by.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])[1]')),
    itemSelectFilter : element(by.xpath('(//*[text()[contains(.,"Filters")]])[1]')),
    itemSelectSearchCriteria : element(by.model('apiSearchFilter.filter')),
    itemSelectSearchFilter : element(by.model('apiSearchFilter.arg')),
    itemSearchTextBox : element(by.model('apiSearchFilter.value')),
    selectSearchItem : element(by.model('checked')),
    selectsecondsku:element(by.xpath("//input[@id='skusCollection_checkbox_2_0']")),
    searchBtn : element(by.xpath('(//button[@class="en-button button-primary padding-left"])[1]')),
    selectItem : element(by.xpath('//*[@id="inventoryCollection_checkbox_0_0"]')),
    selectitemformultiorder:element(by.model('inventoryCollection.checkAllModel')),
    addToOrder : element(by.xpath('(//*[text()[contains(.,"Add to Order")]])[1]')),
	soQtyBtn : element(by.xpath('//*[@class="trim button-md en-button ng-scope"]')),
    changePrice : element(by.xpath('(//*[text()[contains(.,"Change Price")]])[1]')),
    priceTextBox : element(by.model('item.itemUnitPrice')),
    savePrice : element(by.xpath('(//*[text()[contains(.,"Save")]])[3]')),
    item1PopUp : element(by.xpath('(//*[text()[contains(.,"BackOrdered")]])[1]')),
    item2PopUp : element(by.xpath('(//*[text()[contains(.,"BackOrdered")]])[2]')),
    item3PopUp : element(by.xpath('(//*[text()[contains(.,"BackOrdered")]])[3]')),
    fulfillmentType : element(by.model('product.item.fulfillmentType')),
    fulfillmentStore : element(by.model('product.item.fulfillmentSite')),
    applyBtn : element(by.xpath('(//button[@class="button-primary en-button"])')), 	
    saveSalesOrder : element(by.xpath('(//button[@class="en-button padding-left-sm button-md trim"])[1]')),
    confirmSalesOrder : element(by.xpath('(//button[@class="button-popover-dark trim en-button"])[2]')),
    SONo : element(by.xpath('//*[text()[contains(.,"OMS Order #:")]]/following-sibling::strong')),
	filterSOTextBox : element(by.model('apiSearchText.value')),
    morebutton :  element(by.xpath("//button[@class='en-button text-right margin-left-xs button-primary trim']/en-icon[1]")),
    firstmorebutton:element(by.xpath("//section[@class='ng-scope']//en-item[1]//button[@class='en-button text-right margin-left-xs button-primary trim']")),
    secondmorebutton:element(by.xpath("//section[@class='ng-scope']//en-item[2]//button[@class='en-button text-right margin-left-xs button-primary trim']")),
    editline : element(by.xpath("//div[@class='popover-content']//li[3]//en-icon[@class='ng-scope']")),
    increasequantity:element(by.xpath("//button[@class='trim button-md en-button ng-scope']/en-icon[1]"))

        //tilefulfillment: element(by.xpath('(//div[@class="ng-scope active"]')),
        //titletheultimateSP: element(by.xpath('(//div[@class="nav-content ng-scope']//div[7]//p[.='Manage fulfillment request for Store Portal"])),
        },
        
        releaseSOLocators: {
         //Release starts here
         statusHamburgerBtn : element(by.xpath('(//button[@class="padding-left-sm trim"])[1]')),//3  dot option 
         releaseOrder : element(by.xpath('//*[@class="ng-binding ng-scope" and text()[contains(.,"Release")]]')),
          //releaseOrder : element(by.xpath('//span[text()="Release"]')),
         confirmRelease : element(by.xpath('(//*[text()[contains(.,"Release")]])[4]')) 
            },

             FRlocators: {
             //Fulfillment  starts here
            //editline : element(by.xpath("//div[@class='popover-content']//li[3]//en-icon[@class='ng-scope']"))
            fulfillmentHeader :element(by.xpath("//en-title[.='Fulfillment']")),
            clickonspscreen : element(by.xpath("//div[@class='nav-content ng-scope']//div[7]//div[@class='card-split-title']//en-icon[1]")),
            ordersearchbox : element(by.model('apiSearchText.value')),
             orderselectcheckbox:element(by.model('checked')),
             pickorderbutton:element(by.xpath("//button//span[text()='Pick Order']")),
             submitpackbutton:element(by.xpath("//button//span[text()='Submit & Pack']")),
             selectordercheckbox:element(by.xpath("(//input[@ng-model='checked'])[1]")),
             selectsecondordercheckbox:element(by.xpath("(//input[@ng-model='checked'])[2]")),
             //selectordercheckbox:element(by.xpath("(//input[@type='checkbox' and @ng-model='YobXRqNVCljPwcdmowPyrEBNDPfiKFuV.checkAllModel']")),
             plusiconfromfulfillmentscreen:element(by.xpath("//en-icon[@icon='plus']")),
             plusiconofanothersku:element(by.xpath("(//en-icon[@icon='plus'])[2]")),
             includepackagebutton: element(by.xpath("//button//span[@class='ng-scope' and text()='Include in Package']")),
            fulfillorderbuttonheaderlevel:element(by.xpath('(//button//span[text()="Fulfill Order"]')),
            packaging:element(by.model('order.package.packageType')),
            completefulfillment:element(by.xpath("//span[text()='Complete Fulfillment']")),
            addpackage:element(by.xpath("//span[text()='Add Package']")),
            printdocumentbutton:element(by.xpath("//span[text()='Print Documents']")),
             cancelheaderlevel:element(by.xpath("//button[contains(text(),'Cancel Order')]")),
             fullcancelloption:element(by.xpath("//ul/li//span[text()='Full Cancel']")),
             partialcanceloption:element(by.xpath("//ul/li//span[text()='Partial Cancel']")),
             confirmcanceloption:element(by.xpath("//span[text()='Confirm Cancel']")),
             reasoncodeoption:element(by.xpath("//select[//@ng-model='item.cancelReasonCode'][1]")),
             //plusiconofanothersku:element(by.xpath("(//en-icon[@icon='plus'])[2]")),
             reasoncodeanotheritem:element(by.xpath("(//select[@name='reasonCode'])[2]")),
             itemsubmitcancelbutton:element(by.xpath("//span[text()='Submit Cancellations Below']")),
             firstitemreasoncode:element(by.model('item.cancelReasonCode')),
             seconditemreasoncode:element(by.model('item.cancelReasonCode')),
             restockcheckbox:element(by.model('releaseInventory')),
             riricheckbox:element(by.xpath("//input[@ng-model='releaseInventory']")),
             commentbox:element(by.model('modalObject.reason')),
             releaseinventorybutton:element(by.xpath("//span[@class='ng-binding ng-scope' and text()='Release Inventory']")),
             confirmripopup:element(by.xpath("//span[@class='ng-scope' and text()='Yes']")),
             confirmcancelbutton:element(by.xpath("//span[text()='Confirm Cancel']")),

        // pickupscreen:{

        //   submitpickonlybutton:element(by.xpath('(//span[.="Submit & Pick Only"]')),
        //   confirmpopup:element(by.xpath('(//span[.="Confirm"]')),
        //   backpopup:element(by.xpath('(//span[.="Back"]')),
        //   submitpackbutton:element(by.xpath("//span[text()='Submit & Pack']")),
        //   rejectoption:element(by.xpath('(//select[@name="reasonCode"]')),
        //   frstatus:element(by.xpath('(//span[text()="Status"]')),
        //   quantitydecrementoption:element(by.xpath('(//en-field[1]/button[1]/en-icon[1]')),
          
        // },
        // fulfillorderscreen:{

        //     selectordercheckbox:element(by.xpath('(//input[@class="ng-valid ng-dirty ng-valid-parse ng-touched"]')),
        //     includepackagebutton: element(by.xpath('(//span[.="Include in Package"]')),
        //     rejectbutton:element(by.xpath('(//span[.="Reject Remaining Items"]')),
        //     rejectreasonbutton:element(by.xpath('(//select[@name="reasonCode"]')),
        //     packaging:element(by.xpath('(//select[@name="carrier"]')),
        //     length:element(by.xpath('(//input[@name="length"]')),
        //     width:element(by.xpath('(//input[@name="width"]')),
        //     height:element(by.xpath('(//input[@name="height"]')),
        //     addpackage:element(by.xpath('(//button//span[@class='ng-scope' and text()='Add Package']]')),
        //     removepackage:element(by.xpath('(//button[@class="button-error en-button ng-scope"]/span[@class="ng-scope"]')),
        //     completefulfillment:element(by.xpath('(//span[.="Complete Fulfillment"]')),
        //     plusiconfromfulfillmentscreen:element(by.xpath('(//div[@class="en-collection-row"]//button[2]/en-icon[1]')),
        //     reasoncodedropdown:element(by.xpath('(//select[@name="reasonCode"]')),
        //     minusbutton:element(by.xpath('(//div[@class="en-collection-row"]//button[1]/en-icon[1]')),
        //     frstatusonfulfillmentscreen:element(by.xpath('(//en-title[text()="Status "]')),


        //   },
         
        //  Inventoryassertion:{
        //     searchtabinibscreen:element(by.xpath('(//input[@name="simplified-text-value"]')),
        //     clickonthesite:element(by.xpath('(//span[@class="product-title ng-binding"]')),
        //     searchsku:element(by.xpath('(//input[@class="ng-pristine ng-valid ng-touched"]')),
        //     editbuttonofsku:element(by.xpath('(//button[.="Edit"]')),
        //     enteravailablequantity:element(by.xpath('(//input[@name="availableQty"]')),
        //     savebutton:element(by.xpath('(//en-modal-footer[1]/button[@class="button button-primary en-button button button-primary ng-binding"]')),















         },
        };
















                      
//     };
     
//     this.enterorderid = function (SONumber) {
//         ordersearchbox.sendKeys(SONumber);
//         browser.sleep(2000);
//     }
//    this.pickorderbutton= function (){
//     pickorderbutton.click();
//     browser.sleep(2000);
//    }
//    this.rejectorderbutton= function (){
//     rejectorderbutton.click();
//     browser.sleep(2000);
//    }
//    this.pick_confirmationscreen= function (){
//     submitpackbutton.click();
//     browser.sleep(2000);
//    }
//    this.fulfillorderscreen= function(){
//     selectordercheckbox.click();
//     plusiconfromfulfillmentscreen.click();
//     includepackagebutton.click();
//     browser.sleep(2000);
//    }
//    this.submitnpackbutton=function(){
//     submitpackbutton.click();
//     browser.sleep(2000);
//    }
//    this.enterpackagingdetails= function(){
//     packaging.sendKeys('Default').click();
//     browser.sleep(2000);
//     addpackage.click();
//     completefulfillment.click();
//     browser.sleep(2000);
//    }
//    this.rejectOrder = function (comment) {
//     rejectButton.click();
//     browser.sleep(1000);
//     reasonCodeDropdown.click();
//     browser.sleep(1000);
//     reasonCodeOption.click();
//     browser.sleep(1000);
//     rejectComments.sendKeys(comment);
//     confirmReject.click();

// }

// this.decrementLine = function () {
//     minusIcon.click();
//     browser.sleep(1000);
// }
// this.rejectOrderfrompickconfirmationscreen = function (comment) {
//     rejectoption.click().sendKeys("No Stock");
//     browser.sleep(1000);
   
// }

// this.decrementLine = function () {
//     quantitydecrementoption.click();
//     browser.sleep(1000);
// }
// this.rejectOrderfromfulfillorderscreen = function (comment) {
//     reasoncodedropdown.click().sendKeys("No Stock");
//     browser.sleep(1000);
   
// }

// this.decrementLine = function () {
//     minusbutton.click();
//     browser.sleep(1000);
// }
// this.getFRStatus = function(FRStatus){
//     return FRStatus.getText();
// }
// this.getfulstatus=function(FrStatus){
//     return frstatusonfulfillmentscreen.getText();
// }
// this.selectordercheckboxfromFRscreen=function(){
//     selectordercheckbox.click();
//     browser.sleep(1000);


// }
// //copy from spv2 screen//
// this.navigateToStorePortalv3 = function () {
//     fulfillmentHeader.click();
//     browser.sleep(2000);
//     storePortalHeader3.click();

// }



// this.packAndShipOrder = function () {
//     packAndShipButton.click();
// }

// this.getStatus = function () {
//     return statusText.getText();
// }

// this.getStatusPS = function () {
//     return statusTextPS.getText();
// }
// this.qtyPick = function () {
//     browser.sleep(1000);
//     multiselectButton.click();
//     browser.sleep(1000);
//     incrementPickQty.click();
//     browser.sleep(1000);
//     includeInPackageButton.click();
// }


// this.addpkg = function () {
//     browser.sleep(1000);
//     return addPkgButton.click();

// }
// this.completeFulfill = function () {
//     browser.sleep(1000);
//     finalizeFulfillment.click();
//     console.log("Success");
//     browser.sleep(2000);
// }

// this.rejectRemainingItems = function () {
//     multiselectButton.click();
//     browser.sleep(2000);
//     rejectRemainingItemsButton.click();
// }

// this.printAllDocuments = function () {
//     printAllDocumentsButton.click();
//     console.log("Print Successful");
//     browser.sleep(2000);

// }
// this.pickListByOrderSavePDF = function () {
//     browser.sleep(2000);
//     printPickListByOrder.click();
//     browser.sleep(2000);
//     pickListSavePDFButton.click();
//     browser.sleep(10000);

// }
// this.pickListByItemSavePDF = function () {
//     browser.sleep(2000);
//     printPickListByItem.click();
//     browser.sleep(2000);
//     pickListSavePDFButton.click();
//     browser.sleep(10000);

// }
// this.qtyUpdate = function (qty) {
//     browser.sleep(2000);
//     qtyUpdateBox.clear().sendKeys(qty);
// }

// this.packShipIcon = function () {
//     browser.sleep(2000);
//     packShipIconButton.click();
// }

// this.getStatusHomePage = function () {
//     return statusHomePage.getText();
// }

// this.rejectOrder = function (text) {
//     rejectButton.click();
//     browser.sleep(1000);
//     reasonCodeDropdown.click();
//     browser.sleep(1000);
//     reasonCodeOption.click();
//     browser.sleep(1000);
//     rejectComments.sendKeys(text);
//     confirmReject.click();

// }

// this.decrementLine = function () {
//     minusIcon.click();
//     browser.sleep(1000);
// }

// this.searchQueryCriteria = function (criteria, searchValue) {
//     searchOption.click();
//     browser.sleep(100);
//     filterCriteriaDropdown.sendKeys(criteria);
//     browser.sleep(100);
//     //filterContentDropdown.sendKeys(content);
//     browser.sleep(500);
//     valueDropDown.sendKeys(searchValue);
//     //select/option[text()='Accepted']
//     browser.sleep(1000);

// }







                    
