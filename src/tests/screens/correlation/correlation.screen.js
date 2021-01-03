'use strict'; 

module.exports = {  
		
	correlationLocators:{
		menuSettings : element(by.xpath('(//*[text()[contains(.,"Settings")]])[1]')),
		sectionMenu : element(by.xpath('(//*[text()[contains(.,"Section Menu")]])[1]')),
		dataManagement : element(by.xpath('//*[@class="en-menu-name" and text()[contains(.,"Data Management")]]')),
		correlations : element(by.xpath('(//*[@class="en-menu-name" and text()[contains(.,"Correlations")]])[2]')),
		correlationSelectFilter : element(by.xpath('(//*[text()[contains(.,"Filters")]])[1]')),
		correlationSelectSearchCriteria : element(by.model('apiSearchFilter.filter')),
		correlationSelectSearchFilter : element(by.model('apiSearchFilter.arg')),
		correlationSearchTextBox : element(by.model('apiSearchFilter.value')),
		selectCorrelation : element(by.xpath('//*[@class="text-muted ng-binding" and text()[contains(.,"autoSaveOrderEnabled")]]')),
		addUpdateViaFile : element(by.xpath('//*[text()[contains(.,"Add/Update Correlation Key-Value via File")]]')),
		chooseFile : element(by.id('correlationFile')),
		saveCorrelation : element(by.xpath('//button[text()[contains(.,"Save")]]')),
	},
		
};

