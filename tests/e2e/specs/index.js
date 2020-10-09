// https://docs.cypress.io/api/introduction/api.html

describe('self-embedding-component', () => {

  it('t', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('#num-exports')
    .should(($el) => {
      expect($el).to.have.text('3')
    })
  })

  it('exports buildLegacyWidget', () => {
    cy.get('#export0')
    .should(($el) => {
      expect($el).to.have.text('buildLegacyWidget')
    })
  })

  it('exports buildWidget', () => {
    cy.get('#export1')
    .should(($el) => {
      expect($el).to.have.text('buildWidget')
    })
  })

  it('exports dependencyRef', () => {
    cy.get('#export2')
    .should(($el) => {
      expect($el).to.have.text('dependencyRef')
    })
  })
})
