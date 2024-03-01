export function findProduct(productName) {
    cy.contains(productName).parents('.mat-card').find('[aria-label="Add to Basket"]').click();
}
