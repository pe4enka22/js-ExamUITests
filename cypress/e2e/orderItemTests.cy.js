import user from '../fixtures/user.json'
import {findProduct} from '../support/helper'
import loginPage from "../support/pages/LoginPage";
import orderPage from "../support/pages/OrderPage";

describe('Order suite', () => {
  it.only('Order one product from homepage', () => {
    loginPage.visit();
    loginPage.fillLoginFields(user.email, user.password);
    loginPage.getSubmitButton().click();

    findProduct('Banana Juice (1000ml)');

    orderPage.getYourBasketButton().click();
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').should('have.text', ' Banana Juice (1000ml) ');
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').should('have.text', ' 1');

    orderPage.getCheckoutButton().click();
    cy.get('#mat-radio-40').click();
    orderPage.getAddressContinueButton().click();
    cy.get('#mat-radio-42').click();
    orderPage.getDeliveryContinueButton().click();
    cy.get(' #mat-radio-44').click();
    cy.get('[aria-label="Proceed to review"]').click();
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').should('have.text', ' Banana Juice (1000ml) ');
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').should('have.text', ' 1');

    cy.get('[aria-label="Complete your purchase"]').click();
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').should('have.text', 'Banana Juice (1000ml) ');
    cy.get('.cdk-cell.cdk-column-quantity.mat-column-quantity>span').should('have.text', '1');
    cy.get('.confirmation').should('have.text', "Thank you for your purchase!")
  })

  it('Order few products from homepage with changing quantity', () => {
    loginPage.visit();
    loginPage.fillLoginFields(user.email, user.password);
    loginPage.getSubmitButton().click();


    findProduct('Banana Juice (1000ml)');
    findProduct('Banana Juice (1000ml)');
    findProduct('Eggfruit Juice (500ml)');


    orderPage.getYourBasketButton().click();
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').first().should('have.text', ' Banana Juice (1000ml) ');
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').first().should('have.text', ' 2');
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').last().should('have.text', ' Eggfruit Juice (500ml) ');
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').last().should('have.text', ' 1');

    cy.get('[data-icon="minus-square"]').first().click();
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').first().should('have.text', ' 1');
    cy.get('[data-icon="plus-square"]').last().click();
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').last().should('have.text', ' 2');


    orderPage.getCheckoutButton().click();
    cy.get('#mat-radio-40').click();
    orderPage.getAddressContinueButton().click();
    cy.get('#mat-radio-42').click();
    orderPage.getDeliveryContinueButton().click();
    cy.get(' #mat-radio-44').click();
    cy.get('[aria-label="Proceed to review"]').click();

    cy.get('.cdk-cell.cdk-column-product.mat-column-product').first().should('have.text', ' Banana Juice (1000ml) ');
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').first().should('have.text', ' 1');
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').last().should('have.text', ' Eggfruit Juice (500ml) ');
    cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span').last().should('have.text',' 2');


    cy.get('[aria-label="Complete your purchase"]').click();
    cy.get('.confirmation').should('have.text', "Thank you for your purchase!")
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').first().should('have.text', 'Banana Juice (1000ml) ');
    cy.get('.cdk-cell.cdk-column-quantity.mat-column-quantity>span').first().should('have.text', '1');
    cy.get('.cdk-cell.cdk-column-product.mat-column-product').last().should('have.text', 'Eggfruit Juice (500ml) ');
    cy.get('.cdk-cell.cdk-column-quantity.mat-column-quantity>span').last().should('have.text','2');

  })
})



