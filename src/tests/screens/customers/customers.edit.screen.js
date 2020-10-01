module.exports =function(){

    this.customerEditPencilIcon = element(by.xpath('(//a/en-icon[@icon="edit"])[1]'));
    this.depositLedgerTab = element(by.xpath('//en-tab[contains(text(),"Deposit Ledger")]'));
    this.activityLedgerTab = element(by.xpath('//en-tab[contains(text(),"Activity Ledger")]'));

    this.depositLedgerAdjustmentsTab = element(by.xpath('(//en-tab[contains(text(),"Adjustments")])[1]'));
    this.activityLedgerAdjustmentsTab = element(by.xpath('(//en-tab[contains(text(),"Adjustments")])[2]'));

    this.depositLedgerStatementsTab = element(by.xpath('(//en-tab[contains(text(),"Statements")])[1]'));
    this.activityLedgerStatementsTab = element(by.xpath('(//en-tab[contains(text(),"Statements")])[2]'));


    this.activityLedgerOptionsButton = element(by.xpath('//button[contains(@popover-content-template,"activity")]'));
    
    this.depositLedgerOptionsButton = element(by.xpath('//button[contains(@popover-content-template,"escrow")]'));

    this.depositLedgerRefreshButton = element(by.xpath('(//button/en-icon[@icon="refresh"])[1]'));
    this.activityLedgerRefreshButton = element(by.xpath('(//button/en-icon[@icon="refresh"])[2]'));


    this.addAdjustmentButton = element(by.xpath('//button/span[contains(text(),"Add Adjustment")]/parent::button'));

    this.createDepositStatementButton = element(by.xpath('//button/span[contains(text(),"Create Deposit Statement")]/parent::button'));
    this.createActivityInvoiceStatementButton = element(by.xpath('//button/span[contains(text(),"Create Invoice Statement")]/parent::button'));    
 
    this.adjustmentTypeChargeRadioButton = element(by.xpath('//input[@ng-model="manualEntry.data.entryType" and @value="DEBIT"]'));
    this.adjustmentTypePaymentRadioButton = element(by.xpath('//input[@ng-model="manualEntry.data.entryType" and @value="CREDIT"]'));

    this.adjustmentEnterAmountTextbox = element(by.xpath('//input[@ng-model="manualEntry.data.adjustmentAmount"]'));
    this.adjustmentEnterDateCalendar = element(by.xpath('//input[@ng-model="manualEntry.data.entryDate"]'));

    this.adjustmentEnterDescTextArea = element(by.xpath('//textarea[@name="description"]'));

    this.adjustmentCreateButton = element(by.xpath('//button/span[contains(text(),"Create")]/parent::button'));

    this.generateStatementButton = element(by.xpath('//button/span[contains(text(),"Generate")]/parent::button'));

    this.depositLedgerChargesText = element(by.xpath('(//div[contains(@ng-repeat,"escrowLedgerEntries.data")])[1]/div/div[7]'));
    this.depositLedgerDateText = element(by.xpath('(//div[contains(@ng-repeat,"escrowLedgerEntries.data")])[1]/div/div[4]'));
    this.depositStatementEndingBalanceText = element(by.xpath('(//div[contains(@ng-repeat,"escrowStatementCollection.data")])[1]/div/div[6]'));
    this.depositStatementStatusText = element(by.xpath('(//div[contains(@ng-repeat,"escrowStatementCollection.data")])[1]/div/div[7]'));


    this.activityLedgerChargesText = element(by.xpath('(//div[contains(@ng-repeat,"activityLedgerEntries.data")])[1]/div/div[6]'));
    this.activityLedgerDateText = element(by.xpath('(//div[contains(@ng-repeat,"activityLedgerEntries.data")])[1]/div/div[4]'));

    this.shipOrderLineCompleteCheckbox = element(by.xpath('(//input[@name="shipOrderLineComplete"])[2]'));
    this.shipOrderCompleteCheckbox = element(by.xpath('(//input[@name="shipOrderComplete"])[2]'));
    this.willCallPickCheckbox = element(by.xpath('(//input[@name="willCallPickup"])[2]'));
    this.localDeliveryCheckbox = element(by.xpath('(//input[@name="localDeliveryPreferred"])[2]'));



    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.selectDepositLedgerTab = function() {
        this.depositLedgerTab.click();
    }

    this.selectActivityLedgerTab = function() {
        this.activityLedgerTab.click();
    }

    this.selectDepositLedgerAdjustmentsTab = function() {
        this.depositLedgerAdjustmentsTab.click();
    }

    this.selectDepositLedgerStatementsTab  = function() {
        this.depositLedgerStatementsTab.click();
    }


    this.selectActivityLedgerAdjustmentsTab = function() {
        this.activityLedgerAdjustmentsTab.click();
    }

    this.selectActivityLedgerStatementsTab = function() {
        this.activityLedgerStatementsTab.click();
    }

    this.selectActivityLedgerOptions = function() {
        this.activityLedgerOptionsButton.click();
    }

    this.selectDepositLedgerOptions = function() {
        this.depositLedgerOptionsButton.click();
    }

    this.selectAddAdjustments = function() {
        this.addAdjustmentButton.click();
    }

    this.enterAdjustmentType = function(type) {
        if (type == 'Charge') {
            this.adjustmentTypeChargeRadioButton.click();
        } else if (type == 'Payment') {
            this.adjustmentTypePaymentRadioButton.click();
        }
    }

    this.enterAdjustmentAmount = function(amount) {
        this.adjustmentEnterAmountTextbox.clear();
        this.adjustmentEnterAmountTextbox.sendKeys(amount);
    } 
    
    this.enterAdjustmentDate = function(date) {
        this.adjustmentEnterDateCalendar.sendKeys(date);
    }    

    this.enterAdjustmentDesc = function(desc) {
        this.adjustmentEnterDescTextArea.sendKeys(desc);
    }

    this.createAdjustment = function() {
        this.adjustmentCreateButton.click();
    }

    this.createDepositStatement = function() {
        this.createDepositStatementButton.click();
    }
    
    this.createActivityInvoiceStatement = function() {
        this.createActivityInvoiceStatementButton.click();
    }

    this.generateStatement = function() {
        this.generateStatementButton.click();
    }


    this.depositLedgerRefresh = function() {
        this.depositLedgerRefreshButton.click();
    }


    this.activityLedgerRefresh = function() {
        this.activityLedgerRefreshButton.click();
    }

    this.depositStatementGetEndBalance = function() {
        return this.depositStatementEndingBalanceText.getText();
    }

    this.depositStatementGetStatus = function() {
        return this.depositStatementStatusText.getText();
    }

    this.depositLedgerGetCharges = function() {
        return this.depositLedgerChargesText.getText();
    }

    this.depositLedgerDate = function() {
        return this.depositLedgerDateText.getText();
    }

    this.activityLedgerGetCharges = function(rowCount) {
        temp = "(//div[contains(@ng-repeat,'activityLedgerEntries.data')])[" + rowCount + "]/div/div[6]";
        return element(by.xpath(temp)).getText();
    }


    this.activityLedgerDate = function() {
        return this.activityLedgerDateText.getText();
    }


    this.editCustomerRecord = function() {
        return this.customerEditPencilIcon.click();
    }

    this.shipOrderLineCompleteFlag = function() {
        if (this.shipOrderLineCompleteCheckbox.isSelected()) {
            return "flagSelected";
        } else {
            return "flagUnselected";
        }
    }


    this.shipOrderCompleteFlag = function() {
        if (this.shipOrderCompleteCheckbox.isSelected()) {
            return "flagSelected";
        } else {
            return "flagUnselected";
        }
    }

    this.willCallPickFlag = function() {
        if (this.willCallPickCheckbox.isSelected()) {
            return "flagSelected";
        } else {
            return "flagUnselected";
        }
    }

    this.localDeliveryFlag = function() {
        if (this.localDeliveryCheckbox.isSelected()) {
            return "flagSelected";
        } else {
            return "flagUnselected";
        }
    }






}

