import user from '../fixtures/user.json'
import {findProduct} from '../support/helper'
import loginPage from "../support/pages/LoginPage";
import BasePage from "../support/pages/BasePage";
import orderPage from "../support/pages/OrderPage";

describe('Order suite', () => {
  it('Order from homepage', () => {
    loginPage.visit();
    loginPage.fillLoginFields(user.loginname, user.password);

    // this step is not required and was added to obtain a large selection of products
    loginPage.getSearchInput()
        .type('i')
        .closest("form")
        .submit();

    findProduct('Benefit Bella Bamba');

    orderPage.getAddToCartButton().click();
    orderPage.getCheckoutButton().click();
    orderPage.getConfirmOrderButton().click();
    orderPage.getOrderConfirmationPage().click();
  })
})

    ///orderOneItemFromMainPage
    ///orderFewItemsFromDifferentPagesWithDeletion in basket
    //ChangeItemQuantityinBasket at lest 2 tets
    // helper function by name in main page without go to next page
