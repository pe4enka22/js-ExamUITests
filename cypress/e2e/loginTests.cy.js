import user from '../fixtures/user.json'
import loginPage from "../support/pages/LoginPage";
import registrationPage from "../support/pages/RegistrationPage";
import {faker} from "@faker-js/faker";

const randomAnswer = faker.person.fullName();
const loginEmail = faker.internet.email({ firstName: 'Jordan', lastName: 'Brook' });
describe('Authorization positive scenarios', () => {
  it('Authorization with valid data', () => {
    registrationPage.visit();

    cy.log('Fill in the security question field');
    registrationPage.getSecurityQuestionField().click();
    registrationPage.getSecurityQuestionFieldValue().click();
    registrationPage.getSecurityQuestionField().should('have.prop', "textContent", user.question);

    cy.log('Fill in the security answer field');
    registrationPage.getAnswerField().type(randomAnswer).should('have.prop', 'value', randomAnswer);

    cy.log('Fill in the email and password fields');
    registrationPage.getEmailField().type(loginEmail).should('have.prop', 'value', loginEmail);
    registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getRepeatPasswordField().type(user.password).should('have.prop', 'value', user.password);

    cy.log('Submit form');
    registrationPage.getRegisterButton().click();

    cy.log('Fill in the email and password fields');
    loginPage.fillLoginFields(loginEmail, user.password);

    cy.log('Verify fields are filled in with entered data');
    loginPage.getLoginNameField().should('have.prop', 'value', loginEmail);
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
    loginPage.visit();
    loginPage.getPopupCloseButton().click();

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
    loginPage.visit();
    loginPage.getPopupCloseButton().click();

    loginPage.fillLoginFields(loginEmail, '');

    cy.log('Verify fields are filled in without password');
    loginPage.getLoginNameField().should('have.prop', 'value', loginEmail);
    loginPage.getPasswordField().should('have.prop', 'textContent', "");

    cy.log('Verify user cant login');
    loginPage.getSubmitButton().should('have.prop', 'disabled', true)
    loginPage.getSubmitButton().click({force: true});
    loginPage.getSubmitButton().should('be.visible');

  })

  it('Authorization with empty fields', () => {
    loginPage.visit();
    loginPage.getPopupCloseButton().click();

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