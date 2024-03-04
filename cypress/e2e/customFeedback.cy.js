import feedbackPage from "../support/pages/FeedbackPage";
import loginPage from "../support/pages/LoginPage";
import {faker} from '@faker-js/faker'
import user from '../fixtures/user.json'
import registrationPage from "../support/pages/RegistrationPage";
const randomComment = faker.lorem.sentence();
const randomCaptchaResult = faker.number.int({ max: 100 });

const randomAnswer = faker.person.fullName();
const feedbackEmail = faker.internet.email({ firstName: 'Amanda', lastName: 'Free' });
describe('Leave feedback with valid captcha', () => {
   it('Leave feedback as not logged in user', () => {
     feedbackPage.visit();

     cy.log('Check Author field is anonymous')
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
    it('Leave feedback with invalid data as logged in user', () => {
        registrationPage.visit();

        cy.log('Fill in the security question field');
        registrationPage.getSecurityQuestionField().click();
        registrationPage.getSecurityQuestionFieldValue().click();
        registrationPage.getSecurityQuestionField().should('have.prop', "textContent", user.question);

        cy.log('Fill in the security answer field');
        registrationPage.getAnswerField().type(randomAnswer).should('have.prop', 'value', randomAnswer);

        cy.log('Fill in the email and password fields');
        registrationPage.getEmailField().type(feedbackEmail).should('have.prop', 'value', feedbackEmail);
        registrationPage.getPasswordField().type(user.password).should('have.prop', 'value', user.password);
        registrationPage.getRepeatPasswordField().type(user.password).should('have.prop', 'value', user.password);

        cy.log('Submit form');
        registrationPage.getRegisterButton().click();

        loginPage.visit();

        cy.log('Fill in the email and password fields');
        loginPage.fillLoginFields(feedbackEmail, user.password);

        cy.log('Click login');
        loginPage.getSubmitButton().click();

        cy.log('Open feedbackform');
        feedbackPage.getBurgerMenuButton().click();
        feedbackPage.getFeedbackFromBurgerMenu().click();

        cy.log('Check Author field is not anonymous')
        feedbackPage.getKnownAuthorField().should('not.have.prop', 'value', 'anonymous');

        cy.log('Write a comment')
        feedbackPage.getCommentField().type(randomComment).should('have.value', randomComment);

        cy.log('Set rating')
        feedbackPage.getRatingField().trigger('mouseover').click();

        cy.log('Set captcha result different from exactly captcha value')
        feedbackPage.getResultField().type(eval(randomCaptchaResult));

        cy.log('Submit feedback')
        feedbackPage.getSubmitButton().click();

        cy.log('Verify feedback is not submitted')
        feedbackPage.getErrorFeedbackToast().should('have.text', 'Wrong answer to CAPTCHA. Please try again.')
        feedbackPage.getFeedbackForm().should('be.visible');
    })
})
