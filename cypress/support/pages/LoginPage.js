import BasePage from "./BasePage";

class LoginPage extends BasePage {

    visit() {
        cy.log('Open authorization form');
        cy.visit('/#/login');
    }

    getLoginNameField() {
        return cy.get('#email');
    }

    getPasswordField() {
        return cy.get('#password');
    }

    getSubmitButton() {
        return cy.get('#loginButton[type="submit"]');
    }

    getErrorMessageText() {
        return cy.get('.error.ng-star-inserted');
    }

    fillLoginFields(username = '', password = '') {
        cy.log('Fill in authorization fields');
        username ? this.getLoginNameField().type(username) : cy.log('Skip username field');
        password ? this.getPasswordField().type(password) : cy.log('Skip password field');
        this.getSubmitButton().click();
    }
}

export default new LoginPage()