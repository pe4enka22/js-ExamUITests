import user from '../fixtures/user.json'
import {faker} from '@faker-js/faker'
import registrationPage from "../support/pages/RegistrationPage";
import loginPage from "../support/pages/LoginPage";

user.email = faker.internet.email({ firstName: 'Jean', lastName: 'Doe' });

describe('register with valid data', () => {
  it('Registration', () => {
    cy.log('Open registration form');
    registrationPage.visit();
    registrationPage.getCookiePopup().click();

    cy.log('Fill in the fields');
    registrationPage.getEmailField().type(user.email).should('have.prop', 'value', user.email);
    registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getRepeatPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getSecurityQuestionField().click().get('#mat-option-5').click();
    registrationPage.getAnswerField().type('Test').should('have.prop', 'value', "Test");
    registrationPage.getRegisterButton().click();

    cy.log('Login with registered data');
    loginPage.getLoginNameField().type(user.email);
    loginPage.getPasswordField().type(user.password);
    loginPage.getSubmitButton().click();

  })
})