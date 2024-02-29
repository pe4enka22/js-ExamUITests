import feedbackPage from "../support/pages/FeedbackPage";
import loginPage from "../support/pages/LoginPage";
import {faker} from '@faker-js/faker'
import user from '../fixtures/user.json'
const randomComment = faker.lorem.sentence();
const randomCaptchaResult = faker.number.int({ max: 100 });

describe('Leave feedback with valid captcha', () => {
   it('Leave feedback as not logged in user', () => {
     feedbackPage.visit();
     feedbackPage.getPopupbutton().click();

     cy.log('Check Author field')
     feedbackPage.getUnknownAuthorField().should('have.prop', 'value', 'anonymous');

     cy.log('Write a comment')
     feedbackPage.getCommentField().type(randomComment).should('have.value', randomComment);

     cy.log('Set rating')
     feedbackPage.getRatingField().trigger('mouseover').click();

     cy.log('Get captcha value')
     feedbackPage.getCaptchaValue().should('be.visible').invoke('text').then((CaptchaValue) => {
         let result = eval(CaptchaValue);

         cy.log('Fill result')
         feedbackPage.getResultField().type(result).should('have.value', result);
     })

       cy.log('Submit feedback')
       feedbackPage.getSubmitButton().click();

       cy.log('Verify feedback is submitted')
       feedbackPage.getSuccessFeedbackToast().should('have.text', 'Thank you for your feedback.X')
       feedbackPage.getFeedbackForm().should('be.visible');
   })
})

describe('Leave feedback with invalid captcha', () => {
    it('Leave feedback as logged in user', () => {
        loginPage.visit();

        cy.log('Fill in the email and password fields');
        loginPage.fillLoginFields(user.email, user.password);

        cy.log('Click login');
        loginPage.getSubmitButton().click();

        cy.log('Open feedbackform');
        feedbackPage.getBurgerMenuButton().click();
        feedbackPage.getFeedbackFromBurgerMenu().click();

        cy.log('Check Author field')
        feedbackPage.getKnownAuthorField().should('have.prop', 'value', '***t1@test.test');

        cy.log('Write a comment')
        feedbackPage.getCommentField().type(randomComment).should('have.value', randomComment);

        cy.log('Set rating')
        feedbackPage.getRatingField().trigger('mouseover').click();

        cy.log('Set captcha result different from exactly captcha value')
        feedbackPage.getResultField().type(eval(randomCaptchaResult));


        cy.log('Submit feedback')
        feedbackPage.getSubmitButton().click();

        cy.log('Verify feedback is submitted')
        feedbackPage.getErrorFeedbackToast().should('have.text', 'Wrong answer to CAPTCHA. Please try again.')
        feedbackPage.getFeedbackForm().should('be.visible');
    })
})
