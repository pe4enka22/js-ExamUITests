import BasePage from "./BasePage";

class FeedbackPage extends BasePage {

    visit() {
        cy.log('Open feedback form');
        cy.visit('/#/contact');
    }

    getPopupbutton() {
       return cy.get('#mat-dialog-0 button[color="primary"]');
    }
    getUnknownAuthorField() {
        return cy.get('#mat-input-1');
    }
    getKnownAuthorField() {
        return cy.get('#mat-input-3');
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

    getSuccessFeedbackToast() {
        return cy.get('.cdk-overlay-container ');
    }

    getErrorFeedbackToast() {
        return cy.get('.mat-simple-snack-bar-content ');
    }
    getFeedbackForm() {
        return cy.get('#feedback-form');
    }

}
export default new FeedbackPage()