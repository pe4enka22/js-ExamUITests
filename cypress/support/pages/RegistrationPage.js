import BasePage from "./BasePage";
class RegistrationPage extends BasePage {
// personal info
    visit() {
        cy.log('Open authorization form');
        cy.visit('/#/register');
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

}

export default new RegistrationPage()