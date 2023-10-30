describe('Home alive', () => {
  it('Visites the Home page', () => {
    cy.visit('http://localhost:3000')
  }),

  it('Finds the site title', () => {
    cy.visit('http://localhost:3000')
    cy.contains('MegamiShop')
  }),

  it('Go to page "Figures"', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Figuras').click()
    cy.url().should('include', '/figures')
  })
})