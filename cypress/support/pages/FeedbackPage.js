import BasePage from "./BasePage";

class FeedbackPage extends BasePage {

    visit() {
        cy.log('Open feedback form and close pop-up');
        cy.visit('/#/contact');
        cy.get('#mat-dialog-0 button[color="primary"]').click();
    }

    getAuthorField() {
        return cy.get('#mat-input-1');
    }

    getCommentField() {
        return cy.get('#comment');
    }

    getRatingField() {
        return cy.get('#rating');
    }

    getCaptchaValue() {
        return cy.get('#captcha');
    }

    getResultField() {
        return cy.get('#captchaControl');
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }


}
export default new FeedbackPage()