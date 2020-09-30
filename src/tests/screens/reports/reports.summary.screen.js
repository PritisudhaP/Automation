module.exports =function(){

    this.purchaseOrderWIPCSVDownloadLink = element(by.xpath('(//div[contains(text(),"PurchaseOrderWIPCSV")]/../div/a)[2]'));
    this.vendorInventoryReportCSVLink = element(by.xpath('(//div[contains(text(),"VendorInventoryReportCSV")]/../div/a)[2]'));
   
    this.purchaseOrderWIPCSVDownload = function() {
        return this.purchaseOrderWIPCSVDownloadLink.click();
    }


    this.vendorInventoryReportCSVDownload = function() {
        return this.vendorInventoryReportCSVLink.click();
    }
}

