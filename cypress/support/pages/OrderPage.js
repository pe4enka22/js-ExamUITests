import BasePage from "./BasePage";
class OrderPage extends BasePage {

    getYourBasketButton() {
        return cy.get('[aria-label="Show the shopping cart"]');
    }

    getCheckoutButton() {
        return cy.get('#checkoutButton');
    }

    getDecreaseQuantity() {
        return cy.get('[data-icon="minus-square"]')
    }

    getIncreaseQuantity() {
        return cy.get('[data-icon="plus-square"]')
    }
    getSelectedProductName() {
       return cy.get('.cdk-cell.cdk-column-product.mat-column-product')
    }

    getSelectedProductQuantity() {
        return cy.get('.content-align.cdk-column-quantity.mat-column-quantity>span')
    }

    getDeliveryContinueButton(){
        return cy.get('[ aria-label="Proceed to delivery method selection"]')
    }

    getAddressContinueButton(){
      return cy.get('[aria-label="Proceed to payment selection"]')
    }

    getPaymentContinueButton(){
        return cy.get('[aria-label="Proceed to review"]')
    }

    getOrderContinueButton(){
        return cy.get('[aria-label="Complete your purchase"]')
    }

    getSelectedProductQuantityOnFinish() {
       return cy.get('.cdk-cell.cdk-column-quantity.mat-column-quantity>span')
    }

    getConformationOrderText() {
        return cy.get('.confirmation')
    }

}

export default new OrderPage()