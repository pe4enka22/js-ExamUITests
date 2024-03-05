export function findProduct(productName) {
    return cy.contains(productName).parents('.mat-card').find('[aria-label="Add to Basket"]').click();
}
