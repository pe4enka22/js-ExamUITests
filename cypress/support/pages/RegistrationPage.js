import BasePage from "./BasePage";
class RegistrationPage extends BasePage {
// personal info
    visit() {
        cy.log('Open registration form and close pop-up');
        cy.visit('/#/register');
        cy.get('#mat-dialog-0 button[color="primary"]').click();
    }

    getEmailField() {
        return cy.get('#emailControl');
    }

    getPasswordField() {
        return cy.get('#passwordControl');
    }

    getRepeatPasswordField() {
        return cy.get('#repeatPasswordControl');
    }

    getSecurityQuestionField() {
        return cy.get('[name="securityQuestion"]');
    }

    getSecurityQuestionFieldValue() {
        return cy.get('#mat-option-5');
    }

    getAnswerField() {
        return cy.get('#securityAnswerControl');
    }

    getRegisterButton() {
        return cy.get('#registerButton[type="Submit"]');
    }

    getEmailErrorMessageText() {
        return cy.get('#mat-error-7');
    }

    getPasswordErrorMessageText() {
        return cy.get('#mat-error-8');
    }

}

export default new RegistrationPage()