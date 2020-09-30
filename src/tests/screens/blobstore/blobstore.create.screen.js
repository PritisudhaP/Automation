module.exports =function(){

    this.newBlobstoreButton = element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.blobstoreNameEntryTextBox = element(by.xpath('//input[@name="displayName"]'));
    this.blobstoreProviderDropdown = element(by.xpath('//select[@name="blobStoreProvider"]'));
    this.blobstoreContainerNameEntryTextBox = element(by.xpath('//input[@name="containerName"]'));
    this.blobstoreAccessKeyEntryTextBox = element(by.xpath('//input[@name="accessKey"]'));
    this.blobstoreSecretAccessKeyEntryTextBox = element(by.xpath('//input[@name="secretAccessKey"]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.newBlobstore = function() {
        return this.newBlobstoreButton.click();
    }

    this.enterBlobstoreName = function(blobstoreName) {
        return this.blobstoreNameEntryTextBox.sendKeys(blobstoreName);
    }


    this.enterBlobstoreProvider = function(blobstoreProvider) {
        commons.selectOption(this.blobstoreProviderDropdown,blobstoreProvider);
    }

    this.enterBlobstoreContainerName = function(blobstoreContainerName) {
        return this.blobstoreContainerNameEntryTextBox.sendKeys(blobstoreContainerName);
    }

    this.enterBlobstoreAccessKey = function(accessKey) {
        return this.blobstoreAccessKeyEntryTextBox.sendKeys(accessKey);
    }

    this.enterBlobstoreSecretAccessKey = function(secretaccessKey) {
        return this.blobstoreSecretAccessKeyEntryTextBox.sendKeys(secretaccessKey);
    }

    this.saveBlobstore = function() {
        return this.saveButton.click();
    }
}

