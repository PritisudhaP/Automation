
'use strict';

const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');
 //SLSQ FULL CANCELLATION SLSQ
 describe('Store_Portalv3_rstock_Scenario1', function() { 
	
	
	it('Select MLMQ Order and restock', function() {  
		var v3loc = spv3Obj.FRlocators;
        v3loc.orderselectcheckbox.click();//working
        browser.sleep(2000);
        v3loc.releaseinventorybutton.click();//not working
        browser.sleep(2000);
        v3loc.confirmripopup.click();
        browser.sleep(3000);
        

    });


});

