
 var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');
 //var objloc=new spv3locator();
 describe('Store_Portalv3_Scenario1', function() { 
	//var salesOrderSummary = new salesOrdersummaryscreen();
     //Place an Order and Release it 
	
	it('Assertion_scenario_01', function() {  //button should be enabled at header level        
               //Navigating to spv3
               spv3Obj.navigateToStorePortalv3();
               //enter SOnumber in the search  box
               spv3Obj.enterorderid(123);
               //check 'Pick Order Button' enable or not
          
                this.checkpickorderbutton = function(){
                    expect(this.pickorderbutton.isPresent()).toBe(true);
                    this.pickorderbutton.getText().then(console.log);
                
                }
                // (or)expect(spv3Obj.FRlocators.pickorderbutton.isEnabled()).toBe(true);
                //click On Pick Order button
                spv3Obj.pickorderbutton();


           });
            });
    
            it('Assertion_scenario_02', function() {   
                spv3Obj.pickorderbutton();
                browser.sleep(2000);
                //check FR status in PC screen
                 var expstatus=spv3Obj.getFRStatus();
                 if(expstatus=="ACCEPTED"){
                     console.log("Status is correct");
                 
                    }
                    it('processing to fulfillment', function() {   
                        spv3Obj.submitnpackbutton;
                        browser.sleep(2000);
                        //fulfillment starts here
                        spv3Obj.fulfillorderscreen;
                        //packing
                        spv3Obj.enterpackagingdetails;
                });
                it('Assertation_scenario', function() {   
                    //verify FR Status
                    var expfrstatus=spv3Obj.getfulstatus();
                 if(expfrstatus=="AWAITING CUSTOMER PICKUP"){
                     console.log("Fulfillment is completed");
                 
                    }
            });
            

            });
            
    
            
        
            
            
            
             

                  


        
    

    

    
    
    
    
    




