import BasePage from "./BasePage";
class OrderPage extends BasePage {

    getYourBasketButton() {
        return cy.get('[aria-label="Show the shopping cart"]');
    }

    getCheckoutButton() {
        return cy.get('#checkoutButton');
    }

    getNewAddressCheckbox() {
        return cy.get('[role="table"]');
    }

    getAddressContinueButton(){
      return cy.get('[aria-label="Proceed to payment selection"]')
    }

    getFastDeliveryCheckbox() {
        return cy.get('[for="mat-radio-42-input"]');
    }

    getDeliveryContinueButton(){
        return cy.get('[ aria-label="Proceed to delivery method selection"]')
    }

}

export default new OrderPage()