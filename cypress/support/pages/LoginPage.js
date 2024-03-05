import BasePage from "./BasePage";

class LoginPage extends BasePage {

    visit() {
        cy.log('Open login form');
        cy.visit('/#/login');
    }

    getPopupCloseButton(){
        cy.log('Close pop-up');
        return cy.get('#mat-dialog-0 button[color="primary"]');
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

    fillLoginFields(email = '', password = '') {
        cy.log('Fill in authorization fields');
        email ? this.getLoginNameField().type(email) : cy.log('Skip username field');
        password ? this.getPasswordField().type(password) : cy.log('Skip password field');
    }
}
export default new LoginPage()