
/*
browser.get(productUrl);
console.log("navigating to product screen");
browser.sleep(5000);
productCreate.newProduct();
productCreate.enterDisplayName(browser.params.skuWithVariant1);
productCreate.enterTitle(browser.params.skuWithVariant1);
productCreate.enterIdType("SKU");
productCreate.enterId(browser.params.skuWithVariant1);
productCreate.selectOrg(browser.params.orgName);
productCreate.checkActiveProductCheckBox();
productCreate.checkIsPurchaseItemCheckBox();
productCreate.checkIsSellableItemCheckBox();
productCreate.enterUOM("inches");
productCreate.enterHeight("1.5");
productCreate.enterLength("2.5");
productCreate.enterWidth("3");

//adding variant to the product
productCreate.clickOnAddVariantButton();
browser.sleep(1000);
productCreate.clickOnVariant();
productCreate.enterVariantName(browser.params.firstVariantName);

//add a value to variant
productCreate.clickaddValueToVariantButton();
browser.sleep(1000);
productCreate.EnterVariantValue(browser.params.firstVariantValue1, "B");
productCreate.markAsDefaultValue();
productCreate.saveVariantValue();
browser.sleep(2000);

//add one more value to variant
productCreate.clickaddValueToVariantButton();
browser.sleep(1000);
productCreate.EnterVariantValue(browser.params.firstVariantValue2, "O");
productCreate.saveVariantValue();
browser.sleep(2000);

//Add second variant to the product
// element(by.xpath("//div/en-section/en-header/span/input[@ng-model = 'variantAttribute.variantName']")).click();
productCreate.clickOnAddVariantButton();
browser.sleep(1000);
productCreate.enterVariantName(browser.params.secondVariantName);


//add a value to variant
productCreate.clickaddValueToVariantButton();
browser.sleep(1000);
productCreate.EnterVariantValue(browser.params.secondVariantValue1, "L");
productCreate.markAsDefaultValue();
productCreate.saveVariantValue();
browser.sleep(2000);

//add one more value to variant
productCreate.clickaddValueToVariantButton();
browser.sleep(1000);
productCreate.EnterVariantValue(browser.params.secondVariantValue2, "M");
productCreate.saveVariantValue();
browser.sleep(2000);

//save the product
productCreate.clickOnSaveButton();
browser.sleep(3000);

//add catalog to the sku that is created for the product
browser.get(skuUrl);
browser.sleep(3000);
productEdit.searchWithCriteria("Name", "contains", browser.params.skuWithVariant1);
browser.sleep(3000);
productEdit.clickOnSelectGear();
productEdit.clickOnEditButton();
browser.sleep(1000);
skuCreate.selectCatalog();
skuCreate.attachCatalog();
skuCreate.enterCatalogId(browser.params.catalog);
skuCreate.enterCategoryName(browser.params.catalogCategoryName);
skuCreate.savePopup();
skuCreate.saveSku();
browser.sleep(2000);

 */
