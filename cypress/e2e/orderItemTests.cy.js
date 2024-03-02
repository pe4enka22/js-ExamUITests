import user from '../fixtures/user.json'
import {findProduct} from '../support/helper'
import loginPage from "../support/pages/LoginPage";
import orderPage from "../support/pages/OrderPage";

beforeEach(() => {
  loginPage.visit();
  cy.log('Login to account');
  loginPage.fillLoginFields(user.email, user.password);
  loginPage.getSubmitButton().click();

})
describe('Order suite', () => {
  it('Order one product from homepage', () => {

    cy.log('Find product by name and add it to basket');
    findProduct('Banana Juice (1000ml)');

    cy.log('Go to basket and verify product is added with correct quantity');
    orderPage.getYourBasketButton().click();
    cy.reload();
    orderPage.getSelectedProductName().should('have.text', ' Banana Juice (1000ml) ');
    orderPage.getSelectedProductQuantity().should('have.text', ' 1');

    cy.log('Click Checkout and go to Address page ');
    orderPage.getCheckoutButton().click();

    cy.log('Select address and go to the Delivery Address page');
    orderPage.getAddressRadioButton().click();
    orderPage.getAddressContinueButton().click();

    cy.log('Select delivery option and go to the Payments options page');
    orderPage.getDeliveryRadioButton().click();
    orderPage.getDeliveryContinueButton().click();

    cy.log('Select card and go to the Order Summary page');
    orderPage.getPaymentRadioButton().click();
    orderPage.getPaymentContinueButton().click();

    cy.log('Verify order and complete purchase');
    orderPage.getSelectedProductName().should('have.text', ' Banana Juice (1000ml) ');
    orderPage.getSelectedProductQuantity().should('have.text', ' 1');
    orderPage.getOrderContinueButton().click();

    cy.log('Verify order is confirmed with correct data');
    orderPage.getSelectedProductName().should('have.text', 'Banana Juice (1000ml) ');
    orderPage.getSelectedProductQuantityOnFinish().should('have.text', '1');
    orderPage.getConformationOrderText().should('have.text', "Thank you for your purchase!")
  })

  it('Order few products from homepage with changing quantity', () => {

    cy.log('Find a few products by name and add them to basket');
    findProduct('Banana Juice (1000ml)');
    findProduct('Eggfruit Juice (500ml)');

    cy.log('Go to basket and verify products are added with correct quantity');
    orderPage.getYourBasketButton().click();
    cy.reload();
    orderPage.getSelectedProductName().first().should('have.text', ' Banana Juice (1000ml) ');
    orderPage.getSelectedProductQuantity().first().should('have.text', ' 1');
    orderPage.getSelectedProductName().last().should('have.text', ' Eggfruit Juice (500ml) ');
    orderPage.getSelectedProductQuantity().last().should('have.text', ' 1');

    cy.log('Increase second product quantity');
    orderPage.getSelectedProductQuantity().first().should('have.text', ' 1');
    orderPage.getIncreaseQuantity().last().click();
    orderPage.getSelectedProductQuantity().last().should('have.text', ' 2');

    cy.log('Click Checkout and go to Address page ');
    orderPage.getCheckoutButton().click();

    cy.log('Select address and go to the Delivery Address page');
    orderPage.getAddressRadioButton().click();
    orderPage.getAddressContinueButton().click();

    cy.log('Select delivery option and go to the Payments options page');
    orderPage.getDeliveryRadioButton().click();
    orderPage.getDeliveryContinueButton().click();

    cy.log('Select card and go to the Order Summary page');
    orderPage.getPaymentRadioButton().click();
    orderPage.getPaymentContinueButton().click();

    cy.log('Verify order and complete purchase');
    orderPage.getSelectedProductName().first().should('have.text', ' Banana Juice (1000ml) ');
    orderPage.getSelectedProductQuantity().first().should('have.text', ' 1');
    orderPage.getSelectedProductName().last().should('have.text', ' Eggfruit Juice (500ml) ');
    orderPage.getSelectedProductQuantity().last().should('have.text',' 2');
    orderPage.getOrderContinueButton().click();

    cy.log('Verify order is confirmed with correct data');
    orderPage.getConformationOrderText().should('have.text', "Thank you for your purchase!")
    orderPage.getSelectedProductName().first().should('have.text', 'Banana Juice (1000ml) ');
    orderPage.getSelectedProductQuantityOnFinish().first().should('have.text', '1');
    orderPage.getSelectedProductName().last().should('have.text', 'Eggfruit Juice (500ml) ');
    orderPage.getSelectedProductQuantityOnFinish().last().should('have.text','2');
  })
})



