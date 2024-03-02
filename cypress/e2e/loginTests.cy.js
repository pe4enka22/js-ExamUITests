import user from '../fixtures/user.json'
import loginPage from "../support/pages/LoginPage";
beforeEach(() => {
  loginPage.visit();
})

describe('Authorization positive scenarios', () => {
  it('Authorization with valid data', () => {
    cy.log('Fill in the email and password fields');
    loginPage.fillLoginFields(user.email, user.password);

    cy.log('Verify fields are filled in with entered data');
    loginPage.getLoginNameField().should('have.prop', 'value', user.email);
    loginPage.getPasswordField().should('have.prop', 'value', user.password);

    cy.log('Click login');
    loginPage.getSubmitButton().click();

    cy.log('Verify user is in Account page');
    loginPage.getAccountMenuButton().click();
    loginPage.getLogoutButton();
  })
})

describe('Authorization negative scenarios', () => {
  it('Authorization without entered username', () => {
    loginPage.fillLoginFields('', user.password);

    cy.log('Verify fields are filled without email');
    loginPage.getPasswordField().should('have.prop', 'value', user.password);
    loginPage.getLoginNameField().should('have.prop', 'textContent', "");

    cy.log('Verify user cant login');
    loginPage.getSubmitButton().should('have.prop', 'disabled', true)
    loginPage.getSubmitButton().click({force: true});
    loginPage.getSubmitButton().should('be.visible');

  })

  it('Authorization without entered password', () => {
    loginPage.fillLoginFields(user.email, '');

    cy.log('Verify fields are filled in without password');
    loginPage.getLoginNameField().should('have.prop', 'value', user.email);
    loginPage.getPasswordField().should('have.prop', 'textContent', "");

    cy.log('Verify user cant login');
    loginPage.getSubmitButton().should('have.prop', 'disabled', true)
    loginPage.getSubmitButton().click({force: true});
    loginPage.getSubmitButton().should('be.visible');

  })

  it('Authorization with empty fields', () => {
    loginPage.fillLoginFields('', '');

    cy.log('Verify fields are empty');
    loginPage.getLoginNameField().should('have.prop', 'textContent', "");
    loginPage.getPasswordField().should('have.prop', 'textContent', "");

    cy.log('Verify user cant login');
    loginPage.getSubmitButton().should('have.prop', 'disabled', true)
    loginPage.getSubmitButton().click({force: true});
    loginPage.getSubmitButton().should('be.visible');
  })
})