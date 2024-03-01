//export function findProduct(productName) {
  //  cy.get('body').find(`[alt="${productName}"]`).click('[aria-label="Add to Basket"]');
//}


export function findProduct(productName) {
    cy.contains(productName)
        .parents('.mat-card').find('[aria-label="Add to Basket"]').click();
}
