import user from '../fixtures/user.json'
import {findProduct} from '../support/helper'
import loginPage from "../support/pages/LoginPage";
import BasePage from "../support/pages/BasePage";
import orderPage from "../support/pages/OrderPage";

describe('Order suite', () => {
  it('Order one product from homepage', () => {
    loginPage.visit();
    loginPage.fillLoginFields(user.email, user.password);
    loginPage.getSubmitButton().click();

    findProduct('Banana Juice (1000ml)');
    orderPage.getYourBasketButton().click();

    orderPage.getCheckoutButton().click();
    cy.get('#mat-radio-40').click();
    orderPage.getAddressContinueButton().click();
    cy.get('#mat-radio-42').click();
    orderPage.getDeliveryContinueButton().click();
    cy.get(' #mat-radio-44').click();
    cy.get('[aria-label="Proceed to review"]').click();
    cy.get('[aria-label="Complete your purchase"]').click();
    cy.get('.confirmation').should('have.text', "Thank you for your purchase!")
  })

  it('Order few products from homepage with changing quantity', () => {
    loginPage.visit();
    loginPage.fillLoginFields(user.email, user.password);
    loginPage.getSubmitButton().click();


    findProduct('Banana Juice (1000ml)');
    findProduct('Banana Juice (1000ml)');
    findProduct('Eggfruit Juice (500ml) ');
    orderPage.getYourBasketButton().click();


    orderPage.getCheckoutButton().click();
    cy.get('#mat-radio-40').click();
    orderPage.getAddressContinueButton().click();
    cy.get('#mat-radio-42').click();
    orderPage.getDeliveryContinueButton().click();
    cy.get(' #mat-radio-44').click();
    cy.get('[aria-label="Proceed to review"]').click();
    cy.get('[aria-label="Complete your purchase"]').click();
    cy.get('.confirmation').should('have.text', "Thank you for your purchase!")

  })
})



