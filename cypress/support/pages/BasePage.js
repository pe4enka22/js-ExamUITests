export default class BasePage {

    constructor() {
        this.dropdown = '.dropdown';
        this.button = '.button';
    }

    getSearchInput() {
        return cy.get('#filter_keyword');
    }
    getCookiePopup() {
        return cy.get('#mat-dialog-0 button[color="primary"]');
    }

}