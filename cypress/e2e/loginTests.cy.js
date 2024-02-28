import user from '../fixtures/user.json'
import loginPage from "../support/pages/LoginPage";
//import accountPage from "../support/pages/AccountPage";

describe('Authorization positive scenarios', () => {
  it('Authorization', () => {
    loginPage.visit();
    cy.get('#mat-dialog-0 button[color="primary"]').click();
    loginPage.fillLoginFields(user.email, user.password);

    cy.log('User first name should display on page');
    //accountPage.getFirstNameText().should('contain', user.firstname);
  })
})

describe('Authorization negative scenarios', () => {

  it('Authorization without entered username', () => {
    loginPage.visit();
    cy.get('#mat-dialog-0 button[color="primary"]').click();
    loginPage.fillLoginFields('', user.password);

    cy.log('User first name should display on page');
    loginPage.getSubmitButton().should('have.attr', "disabled", 'true')
  })

  it('Authorization without entered password', () => {
    loginPage.visit();
    cy.get('#mat-dialog-0 button[color="primary"]').click();
    loginPage.fillLoginFields(user.email);

    cy.log('User first name should display on page');
    loginPage.getErrorMessageText().should('contain', 'Invalid email or password.');
  })

  it('Authorization with empty fields', () => {
    loginPage.visit();
    cy.get('#mat-dialog-0 button[color="primary"]').click();
    loginPage.fillLoginFields();

    cy.log('User first name should display on page');
    loginPage.getErrorMessageText().should('contain', 'Invalid email or password.');
  })
})