import BasePage from "./BasePage";
class OrderPage extends BasePage {

    getAddToCartButton() {
        return cy.get('.productpagecart');
    }

    getCheckoutButton() {
        return cy.get('#cart_checkout1');
    }

    getConfirmOrderButton() {
        return  cy.get('#checkout_btn');
    }

    getOrderConfirmationPage() {
        return cy.get('.contentpanel');
    }

}

export default new OrderPage()