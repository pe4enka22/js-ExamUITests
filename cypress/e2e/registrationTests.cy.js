import user from '../fixtures/user.json'
import {faker} from '@faker-js/faker'
import registrationPage from "../support/pages/RegistrationPage";
import loginPage from "../support/pages/LoginPage";

user.email = faker.internet.email({ firstName: 'Jeanny', lastName: 'Doe' });
const invalidEmail = faker.internet.userName({ firstName: 'Jeanny', lastName: 'Doe' })
const randomAnswer = faker.person.fullName();

beforeEach(() => {
  registrationPage.visit();

  cy.log('Fill in the security question field');
  registrationPage.getSecurityQuestionField().click();
  registrationPage.getSecurityQuestionFieldValue().click();
  registrationPage.getSecurityQuestionField().should('have.prop', "textContent", user.question);

  cy.log('Fill in the security answer field');
  registrationPage.getAnswerField().type(randomAnswer).should('have.prop', 'value', randomAnswer);

})
describe('register with valid data', () => {
  it('Registration with valid fields', () => {
    cy.log('Fill in the email and password fields');
    registrationPage.getEmailField().type(user.email).should('have.prop', 'value', user.email);
    registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getRepeatPasswordField().type(user.password).should('have.prop', 'value', user.password);

    cy.log('Submit form');
    registrationPage.getRegisterButton().click();

    cy.log('Login with registered data');
    loginPage.getLoginNameField().type(user.email).should('have.prop', 'value', user.email);
    loginPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    loginPage.getSubmitButton().click();

    cy.log('User is logged in - logout button is displayed')
    registrationPage.getAccountMenuButton().click();
    registrationPage.getLogoutButton();
  })
})
describe('register with invalid data', () => {
  it('Registration with invalid email', () => {
    cy.log('Fill in the password fields with same data');
    registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getRepeatPasswordField().type(user.password).should('have.prop', 'value', user.password);

    cy.log('Fill in the email field with invalid data');
    registrationPage.getEmailField().type(invalidEmail).should('have.prop', 'value', invalidEmail);

    cy.log('Change focus');
    registrationPage.getPasswordField().click();

    cy.log('Verify email field is not valid');
    registrationPage.getRegisterButton().should('have.prop', 'disabled', true);
    registrationPage.getRegisterButton().click({force: true});
    registrationPage.getRegisterButton().should('be.visible');
    registrationPage.getEmailErrorMessageText().should('have.text', 'Email address is not valid.');
  })

  it('Registration when passwords do not match', () => {
    cy.log('Fill in the email field with valid data');
    registrationPage.getEmailField().type(user.email).should('have.prop', 'value', user.email);

    cy.log('Fill in the password fields with different values')
    registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
    registrationPage.getRepeatPasswordField().type(user.password2).should('have.prop', 'value', user.password2);

    cy.log('Change focus');
    registrationPage.getEmailField().click();

    cy.log('Verify passwords are different');
    registrationPage.getRegisterButton().should('have.prop', 'disabled', true);
    registrationPage.getRegisterButton().click({force: true});
    registrationPage.getRegisterButton().should('be.visible');
    registrationPage.getPasswordErrorMessageText().should('have.prop', 'textContent',' Passwords do not match ');
  })
})