const { element, browser } = require("protractor");

module.exports = function(){

    var ack = element(by.xpath('//strong[contains(text(),"Functional Acknowledged:")]//parent::p'));
    var expandbtn = element(by.xpath('//a[text()="EXPAND ALL"]'));
    var collapsebtn= element(by.xpath('//a[text()="COLLAPSE ALL"]'));
    var doctypeLink = element(by.xpath('(//span[text()="997"])[1]'));
    var transmissionidlink = element(by.xpath('(//a[@en-tap="timeLineController.openTransmissionActivity(attribute.value);"])[1]'));
    var mailboxIdlink = element(by.xpath('(//a[@en-tap="timeLineController.openMailbox(attribute.value);"])[1]'));
    var rightIcon = element(by.xpath('(//en-icon[@icon="chevron-right"])[1]'));
    var downIcon = element(by.xpath('(//en-icon[@icon="chevron-down"])[1]'));
    var rightIcon2 = element(by.xpath('(//en-icon[@icon="chevron-right"])[2]'));
    var rightIcon3 = element(by.xpath('(//en-icon[@icon="chevron-right"])[3]'));
    var rightIcon4 = element(by.xpath('(//en-icon[@icon="chevron-right"])[4]'));
    var rightIcon5 = element(by.xpath('(//en-icon[@icon="chevron-right"])[5]'));

    var slider = element(by.xpath('//span[@class="slider"]'));
    var slideron = element(by.xpath('//span[@class="slider slider-on"]'));
    var alertOff = element(by.xpath('//Label[@class="slider-off"]'));
    var alertOn = element(by.xpath('//Label[@class="slider-on"]'));
    var unHide1events = element(by.xpath('//div[text()="Unhide 1 event"]'));
    var unHide2events = element(by.xpath('//div[text()="Unhide 2 events"]'));
    var unHide4events = element(by.xpath('//div[text()="Unhide 4 events"]'));


    /*validate Functional Acknowledgment Status*/
    this.validateAckStatus = function(status){
        if(status == "Yes")
        ack.getText().then(function(value){
            console.log(value);
            expect(value).toBe("Functional Acknowledged: Yes");
        })
        else if(status = "No")
        ack.getText().then(function(value){
            console.log(value);
            expect(value).toBe("Functional Acknowledged: No");
        })
    }

     this.clickOnExpandAll = function(){
        expandbtn.click();
     }

     this.clickOnCollapseAll = function(){
        collapsebtn.click();
     }

     this.validate997link = function(){
        expect(doctypeLink.isDisplayed()).toBe(true);
     }

     this.validateTransmissionIdLink = function(){
         expect(transmissionidlink.isDisplayed()).toBe(true);
         /**Navigate to transmission Activity */
         transmissionidlink.click();
         browser.sleep(2000);
         expect(element(by.xpath('//span[contains(text(),"Transmission Activity")]')).isDisplayed()).toBe(true);
        }

      this.validateMailentryLink = function(){ 
        expect(mailboxIdlink.isDisplayed()).toBe(true);
        /**Navigate to mailbox */
        mailboxIdlink.click();
        browser.sleep(2000);
        expect(element(by.xpath('//span[contains(text(),"Mailboxes")]')).isDisplayed()).toBe(true);
      }

      this.validateCollapse = function(){
          expect(rightIcon.isPresent()).toBe(true);
      }

      this.validateExpandAll = function(){
        expect(downIcon.isPresent()).toBe(true);
      }

      this.validateCollapseALL = function(){
          expandbtn.click();
          expect(downIcon.isPresent()).toBe(true);
          browser.sleep(200);
          collapsebtn.click();
          expect(rightIcon.isPresent()).toBe(true);
      }

      this.validateAlertOff = function(){
          expect(alertOff.isPresent()).toBe(true);
      }
}