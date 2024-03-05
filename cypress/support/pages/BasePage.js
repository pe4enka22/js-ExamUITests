export default class BasePage {

    getAccountMenuButton() {
        return cy.get('#navbarAccount');
    }

    getLogoutButton() {
        return cy.get('#navbarLogoutButton');
    }

    getBurgerMenuButton() {
        return cy.get('[aria-label="Open Sidenav"]');
    }

    getFeedbackFromBurgerMenu() {
        return cy.get('[routerlink="/contact"]');
   }

}