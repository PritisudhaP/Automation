'use strict'; 

module.exports = {  
		
	settingsSalesChannelsLocators:{
//		menuSettings : element(by.xpath('(//*[text()[contains(.,"Settings")]])[1]')),
//		sectionMenu : element(by.xpath('(//*[text()[contains(.,"Section Menu")]])[1]')),
		company : element(by.xpath('(//*[@class="en-menu-name" and text()[contains(.,"Company")]])[2]')),
		salesChannels : element(by.xpath('//*[@class="en-menu-name" and text()[contains(.,"Sales Channels")]]')),
		channelB2B : element(by.xpath('//*[@class="product-title ng-binding" and text()[contains(.,"B2B")]]')),
		reqCustChkBox : element(by.model('channel.data.requireCustomerFirst')),
		saveChannelSettings : element(by.xpath('//button[text()[contains(.,"Save")]]')),
		
	},
		
};