import user from '../fixtures/user.json'
import {findProduct} from '../support/helper'
import loginPage from "../support/pages/LoginPage";
import orderPage from "../support/pages/OrderPage";
import {faker} from "@faker-js/faker";
import registrationPage from "../support/pages/RegistrationPage";

const randomAnswer = faker.person.fullName();
const orderEmail1 = faker.internet.email({ firstName: 'Johhn', lastName: 'Snow' });
const orderEmail2 = faker.internet.email({ firstName: 'Joe', lastName: 'Tribianni' });
const country = faker.location.country()
const name = faker.person.firstName();
const mobile = faker.phone.number('########');
const zip = faker.location.zipCode('####');
const address = faker.location.streetAddress();
const city = faker.location.city();
const state = faker.location.state();
describe('Order suite', () => {
  it('Order one product from homepage', () => {
    registrationPage.visit();

    cy.log('Fill in the security question field');
    registrationPage.getSecurityQuestionField().click();
    registrationPage.getSecurityQuestionFieldValue().click();
    registrationPage.getSecurityQuestionField().should('have.prop', "textContent", user.question);

    cy.log('Fill in the security answer field');
    registrationPage.getAnswerField().type(randomAnswer).should('have.prop', 'value', randomAnswer);

    cy.log('Fill in the email and password fields');
    registrationPage.getEmailField().type(orderEmail1).should('have.prop', 'value', orderEmail1);
    registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getRepeatPasswordField().type(user.password).should('have.prop', 'value', user.password);

    cy.log('Submit form');
    registrationPage.getRegisterButton().click();

    cy.log('Login with registered data');
    loginPage.getLoginNameField().type(orderEmail1).should('have.prop', 'value', orderEmail1);
    loginPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    loginPage.getSubmitButton().click();

    cy.log('Find product by name and add it to basket');
    findProduct('Banana Juice (1000ml)');

    cy.log('Go to basket and verify product is added with correct quantity');
    orderPage.getYourBasketButton().click();
    cy.reload();
    orderPage.getSelectedProductName().should('have.text', ' Banana Juice (1000ml) ');
    orderPage.getSelectedProductQuantity().should('have.text', ' 1');

    cy.log('Click Checkout and go to Address page ');
    orderPage.getCheckoutButton().click();

    cy.log('Add new Address by filling all the fields and submitting form');
    orderPage.getNewAddressButton().click();
    orderPage.getAddressCountryField().type(country);
    orderPage.getAddressNameField().type(name);
    orderPage.getAddressMobileField().type(mobile);
    orderPage.getAddressZipField().type(zip);
    orderPage.getAddressAddressField().type(address);
    orderPage.getAddressCityField().type(city);
    orderPage.getAddressStateField().type(state);
    orderPage.getSubmitButton().click();

    cy.log('Select address and go to the Delivery Address page');
    orderPage.getAddressRadioButton().click();
    orderPage.getAddressContinueButton().click();

    cy.log('Select delivery option and go to the Payments options page');
    orderPage.getDeliveryRadioButton().click();
    orderPage.getDeliveryContinueButton().click();

    cy.log('Add new card');
    orderPage.getCardField().click();
    orderPage.getCardNameField().type(name);
    orderPage.getCardNumberField().type(user.card);
    orderPage.getCardMonthField().select(1);
    orderPage.getCardYearField().select(3);
    orderPage.getSubmitButton().click();

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
    registrationPage.visit();

    cy.log('Fill in the security question field');
    registrationPage.getSecurityQuestionField().click();
    registrationPage.getSecurityQuestionFieldValue().click();
    registrationPage.getSecurityQuestionField().should('have.prop', "textContent", user.question);

    cy.log('Fill in the security answer field');
    registrationPage.getAnswerField().type(randomAnswer).should('have.prop', 'value', randomAnswer);

    cy.log('Fill in the email and password fields');
    registrationPage.getEmailField().type(orderEmail2).should('have.prop', 'value', orderEmail2);
    registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getRepeatPasswordField().type(user.password).should('have.prop', 'value', user.password);

    cy.log('Submit form');
    registrationPage.getRegisterButton().click();

    cy.log('Login with registered data');
    loginPage.getLoginNameField().type(orderEmail2).should('have.prop', 'value', orderEmail2);
    loginPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    loginPage.getSubmitButton().click();

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

    cy.log('Add new Address by filling all the fields and submitting form');
    orderPage.getNewAddressButton().click();
    orderPage.getAddressCountryField().type(country);
    orderPage.getAddressNameField().type(name);
    orderPage.getAddressMobileField().type(mobile);
    orderPage.getAddressZipField().type(zip);
    orderPage.getAddressAddressField().type(address);
    orderPage.getAddressCityField().type(city);
    orderPage.getAddressStateField().type(state);
    orderPage.getSubmitButton().click();

    cy.log('Select address and go to the Delivery Address page');
    orderPage.getAddressRadioButton().click();
    orderPage.getAddressContinueButton().click();

    cy.log('Select delivery option and go to the Payments options page');
    orderPage.getDeliveryRadioButton().click();
    orderPage.getDeliveryContinueButton().click();

    cy.log('Add new card');
    orderPage.getCardField().click();
    orderPage.getCardNameField().type(name);
    orderPage.getCardNumberField().type(user.card);
    orderPage.getCardMonthField().select(1);
    orderPage.getCardYearField().select(3);
    orderPage.getSubmitButton().click();

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



