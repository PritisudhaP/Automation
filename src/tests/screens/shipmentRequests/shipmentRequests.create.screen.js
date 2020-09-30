module.exports =function(){

    this.acknowledgeButton = element(by.xpath('(//button/span[contains(text(), "Accept")]/parent::button)[1]'));
    this.confirmAcknowledgeButton = element(by.xpath('//button/span[contains(text(), "Yes")]/parent::button'));


    this.shipmentOptionsButton = element(by.xpath('(//button/en-icon[@icon="more-vertical"])[1]'));
    this.createShipmentButton = element(by.xpath('(//button/span[contains(text(), "Create Shipment")]/parent::button)[2]'));

    this.cancelButton = element(by.xpath('(//button/span[contains(text(), "Cancel")]/parent::button)[2]'));

    this.shipmentAccount = element(by.xpath('//select[@name="shipAccount"]'));

    this.packageSelectionDropdown = element(by.xpath('(//select[@name="carrier"])[2]'));
    this.itemQtyInPackageEntryTextBox = element(by.xpath('//input[@ng-model="item.qtyInPackageDefault"]'));
    this.addPackageToShipmentButton = element(by.xpath('//button/span[contains(text(), "Add Package to Shipment")]/parent::button'));
    this.finalizeShipmentButton = element(by.xpath('//button/span[contains(text(), "Finalize Shipment")]/parent::button'));


    this.shipmentCreateErrorAlert = element(by.xpath('//en-content[@id="finalShipmentErrors"]//en-alert/span'));
    this.donotgenerateLabelCheckBox = element(by.xpath("(//input[@ng-model='skipLabelGeneration'])[1]"));
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.acknowledgeLineItem = function(lineCount) {
    	temp = "(//button/span[contains(text(), 'Accept')]/parent::button)[" + lineCount + "]";
    	return element(by.xpath(temp)).click();
    }

	this.confirmAcknowledgement = function() {
		return this.confirmAcknowledgeButton.click();
	}

	this.createShipment = function() {
                this.shipmentOptionsButton.click();
                browser.sleep(1000);
		return this.createShipmentButton.click();
	}


       this.selectShippingAccount = function(value) {
           commons.selectOption(this.shipmentAccount,value);
       }

	this.packageSelection = function(packageValue) {
                commons.selectOption(this.packageSelectionDropdown,packageValue);
	}

	this.enterItemQty = function(qtyValue) {
		return this.itemQtyInPackageEntryTextBox.sendKeys(qtyValue);
	}

	this.addPackageToShipment = function() {
		return this.addPackageToShipmentButton.click();
	}


	this.finalizeShipment = function() {
		return this.finalizeShipmentButton.click();
	}

        this.shipmentErrorMsg = function() {


                return this.shipmentCreateErrorAlert.getText();
        }


    this.shipmentCancel = function() {
        return this.cancelButton.click();
    }
   /* this.doNotGenerateLabel = function()
    {
      return this.donotgenerateLabelCheckBox.click();
    } */

     this.doNotGenerateLabel = function(option)

     {
        temp='(//input[@ng-model="skipLabelGeneration"])[1]';
        element(by.xpath(temp)).isSelected().then(function(value){
                console.log("value is "+value);

         if(value==true && option=='Check')
         {
          console.log("no operations required");
         }
         else if(value==true && option=='Uncheck')
         {
           return element(by.xpath(temp)).click();

         }
         else if(value==false && option=='Check')
         {
          return element(by.xpath(temp)).click();
         }
         else if(value==false && option=='Uncheck')
         {
           console.log("not required anything");
         }
            });

     }
}

