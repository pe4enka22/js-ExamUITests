import feedbackPage from "../support/pages/FeedbackPage";
import {faker} from '@faker-js/faker'
const randomComment = faker.lorem.sentence();

describe('Leave feedback', () => {
   it('Feedback when user is not logged in', () => {
     feedbackPage.visit();

     cy.log('Check Author field')
     feedbackPage.getAuthorField().should('have.prop', 'value', 'anonymous');

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

