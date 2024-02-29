export default class BasePage {

    getAccountMenuButton() {
        return cy.get('#navbarAccount');
    }

    getLogoutButton() {
        return cy.get('#navbarLogoutButton');
    }

    //getCookiePopup() {
      //  return cy.get('#mat-dialog-0 button[color="primary"]');
   // }

}