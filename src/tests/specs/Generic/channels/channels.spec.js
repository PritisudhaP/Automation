var channelsCreateScreen = require(process.cwd() + '/screens/channels/channels.create.screen.js');
var channelsSummaryScreen = require(process.cwd() + '/screens/channels/channels.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Channels creation Flow  : ', function(){
    var channelsCreate = new channelsCreateScreen();
    var channelsSummary = new channelsSummaryScreen();
    var commons = new common();

        it('Create a channel successfully - TC0001', function(){
             
            browser.get(channelsUrl);

            console.log("navigating to channels screen"); 
           
            channelsCreate.newChannel();
            channelsCreate.enterDisplayName("sarathChannelTC0001");
            channelsCreate.enterOrg(browser.params.orgName);
            channelsCreate.enterMaxSplit("-1");
            channelsCreate.enterCatalog(browser.params.catalog);
            channelsCreate.setPartialRelease("Y");

            channelsCreate.enterCarrier(browser.params.carrier);
            channelsCreate.enterServiceType(browser.params.serviceType);

            channelsCreate.saveChannel();
            browser.sleep(2000);
        });

      
        it('Search and Delete Channels successfully - TC0002', function(){
            browser.get(channelsUrl);       
            channelsSummary.channelsSearch("Name","sarathChannelTC0001");
            browser.sleep(2000);
            channelsSummary.channelsSelectGear("Delete");
        });      

})
