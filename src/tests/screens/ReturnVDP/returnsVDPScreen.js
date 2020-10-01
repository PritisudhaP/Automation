module.exports = function () {

    var selectShipment = element(by.model("filterCollection.checkAllModel"));
    var selectOrderInResults = element(by.xpath("//input[contains(@id,'returnsCollection_checkbox')]"));
    var inspectReturnButton = element(by.xpath("//span[text()='INSPECT RETURN']"));
    var addDispositionButton = element(by.xpath("//span[text()='Add Disposition']"));
    var enterQty = element(by.xpath("//input[@type='number']"));
    var reasonCode = element(by.model("x.disposition"));
    var returnText = element(by.model("x.notes"));
    var saveButton = element(by.xpath("//span[text()='Save']"));
    var reasonErrorText = element(by.xpath("(//div[contains(@ng-if,'isDispositionValid')])[2]"));
    var deleteRowButton = element(by.xpath("//button[contains(@ng-click,'deleteRow')]"));
    var viewButton = element(by.xpath("//span[text()='View']"));
    var closeButton = element(by.xpath("//span[text()='close']"));
    var submitButton = element(by.xpath("//button[contains(@ng-disabled,'returnsDetailsApi')]"));
    var recordRMA = element(by.xpath("//div[@class='en-collection-row']/parent::div"));
    var RMAStatus = element(by.xpath("//div[@class='en-collection-row']/div"));
    var rmaID = element(by.xpath("//div[@class='en-collection-row']/parent::div//div[2]"));
    var rmaIDs = element.all(by.xpath("//div[@class='en-collection-row']/parent::div//div[2]"));
    var returnQty = element(by.xpath("//en-icon[@icon='doc-edit']/parent::div/../following-sibling::div[4] "));
    var creditAmountText = element(by.xpath("//input[@name='creditAmount']"));
    var saveButton = element(by.xpath("//button/span[text()='Save']"));
    var creditTypeDropdown = element(by.model("return.data.rma.creditType"));
    var submitButton = element(by.xpath("//span[text()='Submit']"));
    var RMAScreenStatus = element(by.xpath("//en-label[contains(@ng-class,'returnMerchandiseAuthorizationStatus')]"));
    var errorMessage = element(by.xpath("//div[@ng-class='alertClasses(message)']//div/span"));
    var matchCriteria = element(by.xpath("//select[@name='filter']"));
    var searchButton = element(by.xpath("//div/button[text()='Search']"));
    var multiselectButton = element(by.model("returnsCollection.checkAllModel"));
    var taxValue = element(by.xpath("(//small[contains(text(),'Tax')]/following-sibling::strong)[3]"));
var onScreenId = element(by.xpath("//en-title[contains(text(),'Return Merchandise Authorization:')]"));

    this.selectOrderFromSearch = function () {
        return selectShipment.click();

    }

    this.selectOrderFromResults = function () {
        return selectOrderInResults.click();

    }

    this.inspectReturn = function () {
        inspectReturnButton.click();
    }

    //*******<<<< get return qty value here from returns: disposition screen
    this.getReturnQty = function () {
        return returnQty.getText()
    }
    this.enterDisposition = function (line) {
        temp = "(//en-icon[@icon='doc-edit'])[" + line + "]";
        console.log(temp);
        return element(by.xpath(temp)).click();

    }

    this.addDisposition = function (qty, reason, text) {
        addDispositionButton.click();
        browser.sleep(1000);
        enterQty.sendKeys(qty);
        reasonCode.sendKeys(reason);
        browser.sleep(1000);
        returnText.sendKeys(text);
    }

    this.clickSave = function () {
        saveButton.click();

    }

    this.validateMissingReason = function (qty) {
        addDispositionButton.click();
        browser.sleep(1000);
        enterQty.sendKeys(qty);
        saveButton.click();
        return reasonErrorText.getText();
    }

    this.deleteRow = function () {
        deleteRowButton.click();
    }

    this.clickView = function (item) {
        temp = "(//span[text()='View'])[" + item + "]";
        element(by.xpath(temp)).click();
        closeButton.click();
    }

    this.submitDispositionStatus = function () {
        return submitButton.getAttribute("disabled");

    }

    this.submitReturns = function () {
        submitButton.click();
        browser.sleep(1000);

    }

    this.clickRMA = function () {
        recordRMA.click();
    }

    this.clickMultipleRMA  = function (index) {
        temp = "(//div[@class='en-collection-row']/parent::div)[" + index + "]";
        return element(by.xpath(temp)).click();
    }
    this.getRMAStatus = function () {
        return RMAStatus.getText();
    }

    this.getRMAId = function () {
        return rmaID.getText();

    }

    this.getMultipleRMAId = function () {
      // return element.all(by.xpath("//div[@class='en-collection-row']/parent::div//div[2]")).getText();
       let rmaid =  element.all(by.xpath("//div[@class='en-collection-row']/parent::div//div[2]"))
        return rmaid.getText();

    }


    this.confirmAttribute = function (index) {
        temp = "//div[contains(@class,'en-collection-body')]//div[@class='en-collection-row']//div[" + index + "]";
        return element(by.xpath(temp)).getText();
    }

    this.enterCreditAmount = function (reqLine, credit) {
        browser.sleep(5000);
        temp = "(//input[@name='creditAmount'])[" + reqLine + "]";
        element(by.xpath(temp)).clear();
        element(by.xpath(temp)).sendKeys(credit);
        browser.sleep(3000);
        saveButton.click();
    }

    this.selectCreditType = function (creditType) {
        creditTypeDropdown.sendKeys(creditType);
        saveButton.click();
    }
    this.clickSubmit = function () {
        submitButton.click();
    }
    this.getRMAStatusOnScreen = function () {
        return RMAScreenStatus.getText();
    }

    this.errorMessages = function () {
        return errorMessage.getText();
    }

    this.clickMatchCriteria = function () {
        matchCriteria.click();
    }

    this.clickSearch = function () {
        searchButton.click();
    }

    this.multiSelect = function () {
        multiselectButton.click();
    }

    this.getTaxDiscount = function(index){
        temp = "(//span/following-sibling::span)[" + index + "]";
        return element(by.xpath(temp)).getText();
    }
this.preTax = function(){
    return taxValue.getText();
}
this.getScreenId = function () {
    return onScreenId.getText();
}

}
