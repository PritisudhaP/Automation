'use strict'; 

module.exports = {  
		
	moOrderLocators: { 
		menuCallCenter : element(by.xpath('(//*[text()[contains(.,"Call Center")]])[1]')),
		tileSalesOrders : element(by.xpath('(//div[@class="card card-bordered card-split card-lifted is-clickable"])[3]')),
		newOrderButton : element(by.xpath('//button[@class="button-primary en-button"]')),
		channelEditIcon : element(by.xpath('//*[text()[contains(.,"B2B")]]/en-icon')),
		channelValue : element(by.model('salesOrder.data.header.salesChannel')),
		confirmChannel : element(by.xpath('(//button[@class="default en-button ng-scope"])[2]')),
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
    	selectAllSearchItem : element(by.model('skusCollection.checkAllModel')),
    	searchBtn : element(by.xpath('(//button[@class="en-button button-primary padding-left"])[1]')),
    	selectItem : element(by.xpath('//*[@id="inventoryCollection_checkbox_0_0"]')),
    	selectAllItem : element(by.model('inventoryCollection.checkAllModel')),
    	addToOrder : element(by.xpath('(//*[text()[contains(.,"Add to Order")]])[1]')),
		soQtyBtn : element(by.xpath('//*[@class="trim button-md en-button ng-scope"]')),
    	changePrice : element(by.xpath('(//*[text()[contains(.,"Change Price")]])[1]')),
    	priceTextBox : element(by.model('item.itemUnitPrice')),
    	savePrice : element(by.xpath('(//*[text()[contains(.,"Save")]])[3]')),
    	addItem1Discount : element(by.xpath('(//*[text()[contains(.,"Add Discount")]])[1]')),
    	addItem2Discount : element(by.xpath('(//*[text()[contains(.,"Add Discount")]])[2]')),
    	discountAmount : element(by.model('discount.discountAmount')),
    	discountReason : element(by.model('discount.discountName')),
    	discountDesc : element(by.model('discount.description')),
    	discountNotes : element(by.model('discount.notes[0].text')),
    	applyDiscount : element(by.xpath('//*[text()[contains(.,"Apply")]]')),
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
		SOTotal : element(by.xpath('//*[text()[contains(.,"Balance Due")]]/following-sibling::strong')),
	},
	
	releaseSOLocators: {
    	//Release starts here
    	statusHamburgerBtn : element(by.xpath('(//button[@class="padding-left-sm trim"])[1]')),
    	releaseOrder : element(by.xpath('//*[@class="ng-binding ng-scope" and text()[contains(.,"Release")]]')),
    	confirmRelease : element(by.xpath('(//*[text()[contains(.,"Release")]])[4]')) 
	},
	
	cancelSOLineLocators: {
		//Cancel the SO line
		cancelLine : element(by.xpath('(//*[text()[contains(.,"Cancel Line")]])[1]')),
		//confirmCancelBtn : element(by.xpath('//*[text()[contains(.,"Yes")]]')),
    	cancelQty : element(by.xpath('(//*[@class="en-button"])[3]')),
    	cancelReason : element(by.model('$parent.cancelReason')),
    	confirmCancelBtn : element(by.xpath('//*[@class="ng-scope" and text()[contains(.,"Confirm")]]')),
    	
	},
	
	cancelFRLineLocators: {
		//Cancel the First FR Line
		menuCallCenter : element(by.xpath('(//*[text()[contains(.,"Fulfillment")]])[1]')),
		tileStorePortalV2 : element(by.xpath('(//div[@class="card card-bordered card-split card-lifted is-clickable"])[6]')),
		selectFRCheckBox : element(by.xpath('(//*[text()[contains(.,"AWAITING CUSTOMER PICKUP")]])[1]/preceding::div[4]')),
		cancelOrderBtn : element(by.xpath('(//button[@class="en-button margin-right trim"]/following::en-icon)[1]')),
		cancelOrderOpt : element(by.xpath('(//button[@class="button-popover-dark trim en-button"])[2]')),
		cancelOrder : element(by.xpath('(//*[text()[contains(.,"Cancel Order")]])[2]')),
		reasonCode : element(by.model('modalObject.reasonCode')),
		cancelReason : element(by.model('modalObject.reason')),
		confirmBtn : element(by.xpath('(//*[text()[contains(.,"Confirm")]])[2]')),
		restockFRLineStatus : element(by.xpath('//*[text()[contains(.,"RESTOCK")]]')),
		
	},
	
	reShipSOLocators: {
    	
    	//Re-Ship starts here
		soFilterTextBox : element(by.model('apiSearchText.value')),
    	statusHamburgerBtn : element(by.xpath('(//button[@class="padding-left-sm trim"])[1]')),
    	reShipOrder : element(by.xpath('//*[text()[contains(.,"Re-Ship")]]')),
    	reasonCode : element(by.model('parentLinkedOrder.linkedOrderMemo.type')),
    	reasonComment : element(by.model('parentLinkedOrder.linkedOrderMemo.text')),
    	reShipConfirm : element(by.xpath('(//*[text()[contains(.,"Reship")]])[2]')),
    	saveReShipSO : element(by.xpath('(//button[@class="en-button padding-left-sm button-md trim"])[1]')),
    	confirmReShipSO : element(by.xpath('(//button[@class="button-popover-dark trim en-button"])[2]')),
    	SONo : element(by.xpath('//*[text()[contains(.,"OMS Order #:")]]/following-sibling::strong')),
    	reshipSOBalance : element(by.xpath('//*[text()[contains(.,"Balance Due")]]/following-sibling::strong'))
    	
	},
	
	invLookupLocators: { 
		//For updating Scenario 6 Partial Release
		menuInventory : element(by.xpath('(//*[text()[contains(.,"Inventory")]])[1]')),
		tileInvLookup : element(by.xpath('(//div[@class="card card-bordered card-split card-lifted is-clickable"])[1]')),
		addSkusBtn : element(by.xpath('//*[text()[contains(.,"Add SKUs")]]')),
		skuSelectFilter : element(by.xpath('//*[text()[contains(.,"Filters")]]')),
		skuSelectSearchCriteria : element(by.model('apiSearchFilter.filter')),
		skuSelectSearchFilter : element(by.model('apiSearchFilter.arg')),
		skuSearchTextBox : element(by.model('apiSearchFilter.value')),
		skuDirectSearchTextBox : element(by.model('apiSearchText.value')),
		selectSku : element(by.model('checked')),
		skuSearchQty : element(by.model('item.orderQty')),
		addSkuBtn : element(by.xpath('//*[text()[contains(.,"Add Skus")]]')),
		searchBtn : element(by.xpath('//*[@class="button-primary en-button button-primary ng-binding" and text()[contains(.,"Search")]]')),
		skuHamburgerBtn : element(by.xpath('//*[text()[contains(.,"AcuPartialSKU")]]/preceding::div[1]')),
		skuDetails : element(by.xpath('//*[@class="ng-scope" and text()[contains(.,"Details")]]')),
		entryAdjTab : element(by.xpath('//*[@class="en-tab" and text()[contains(.,"Entry Adjustment")]]')),
		adjQtyBy : element(by.model('entry.data.amountToAdjust')),
		adjReason : element(by.model('entry.data.description')),
		saveBtn : element(by.xpath('//*[@class="ng-scope" and text()[contains(.,"Save")]]')),

	 },
};

