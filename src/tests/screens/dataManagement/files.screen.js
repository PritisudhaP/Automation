const { element, browser } = require("protractor");
const path = require('path');
var fs = require("fs");
global.readContent = "";
var stringSearch = require('string-search');

var moment = require('moment-timezone');
var NowMoment = moment();
//sku generation
var interChangeNbr = 02 + NowMoment.format('DDHHmmss');

global.interChangeNbr = "";


var replace = require("replace");

module.exports = function () {

    var addFiles = element(by.xpath('//span[contains(text(),"Add Files")]'));
    var close = element(by.xpath('//span[text()="Close"]'));
    var fileElem = element(by.css('input[type="file"]'));
    var uploadbtn = element(by.xpath('//span[contains(text(),"Upload Files")]'));
    var search = element(by.buttonText('Search'));
    var fileto850Upload = './autoFiles/850.txt';
    var temp850 = './autoFiles/850_temp.txt';
    var temp997 = './autoFiles/997_temp.txt';
    var absolutePath850 = path.resolve(process.cwd(), fileto850Upload);
    //var absolutePath850 = path.resolve(process.cwd(), temp850);
    var fileto997Upload = './autoFiles/997.txt';
    var absolutePath997 = path.resolve(process.cwd(), fileto997Upload);
    var file810Upload = './autoFiles/810.txt';
    var absolutePath810 = path.resolve(process.cwd(), file810Upload);

    var filter = element(by.model('apiSearchText.value'));
    var centerText = element(by.xpath('//span[@class="ellipsis is-clickable ng-binding"]'));
    var fileElem = element(by.css('input[type="file"]'));
    var uploadbtn = element(by.xpath('//span[contains(text(),"Upload")]'));

    this.filterText = function (value) {
        filter.sendKeys(value);
    }

    this.clickOnfile = function () {
        centerText.click();
    }

    /*Upload document type */
    this.uploadFile = function (file) {
        if (file == "850") {
            addFiles.click();
            fileElem.sendKeys(absolutePath850);
            uploadbtn.click();
            close.click();
        } else if (file == "997") {
            addFiles.click();
            fileElem.sendKeys(absolutePath997);
            uploadbtn.click();
            close.click();
        } else if (file == "810") {
            fileElem.sendKeys(absolutePath810);
            uploadbtn.click();
        }
    }

    /**Document 850 & 997 data setup*/
    this.dataSetup = function () {
        fs.copyFile(temp850, fileto850Upload, (err) => {
            if (err) throw err;
            console.log('File was copied to destination');
          });
          replace({
            regex:"<ICN>",
            replacement: interChangeNbr,
            paths: [fileto850Upload],
            recursive: true,
            silent: true,
        });
        fs.readFile(fileto850Upload, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log(" 850: " + data.toString());
        }); 

    fs.copyFile(temp997, fileto997Upload, (err) => {
        if (err) throw err;
        console.log('File was copied to destination');
      });
      replace({
        regex:"<ICN>",
        replacement: interChangeNbr,
        paths: [fileto997Upload],
        recursive: true,
        silent: true,
    });
    fs.readFile(fileto997Upload, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(" 997: " + data.toString());
    }); 
}
    
}