import BasePage from "./BasePage";
class OrderPage extends BasePage {

    getYourBasketButton() {
        return cy.get('[aria-label="Show the shopping cart"]');
    }

    getCheckoutButton() {
        return cy.get('#checkoutButton');
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

    getAddressRadioButton() {
        return cy.get('#mat-radio-40')
    }

    getDeliveryRadioButton() {
        return cy.get('#mat-radio-42')
    }

    getPaymentRadioButton() {
        return cy.get('#mat-radio-44')
    }

    getNewAddressButton() {
        return cy.get('[aria-label="Add a new address"]')
    }

    getAddressCountryField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-7')
    }

    getAddressNameField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-8')
    }

    getAddressMobileField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-9')
    }

    getAddressZipField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-10')
    }

    getAddressAddressField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-11')
    }

    getAddressCityField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-12')
    }

    getAddressStateField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-13')
    }

    getCardField() {
        return cy.get('#mat-expansion-panel-header-0')
    }
    getCardNameField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-17')
    }

    getCardNumberField() {
        return cy.get('.mat-form-field-infix.ng-tns-c119-18')
    }

    getCardMonthField() {
        return cy.get('#mat-input-10')
    }

    getCardYearField() {
        return cy.get('#mat-input-11')
    }

    getSubmitButton() {
        return cy.get('#submitButton')
    }
}

export default new OrderPage()