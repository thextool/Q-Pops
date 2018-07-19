describe('testing for Q-Pops', function(){
    it('should visit the page', () => {
        cy.visit('localhost:3000')
        .get('h1')
        .should('contain', 'Q-Pops')
    })
    it('have a quote loaded', () => {
        cy.get('#randomQuote')
        .its('length')
        .should('be.gt', 0)
    })
    it('test the picture click', () => {
        cy.get('#breakingGuess').click()
        cy.get('#answer').its('length').should('be.gt', 0)
        cy.get('li').its('length').should('be.gt', 0)
    })
    it('test the end game', () => {
        cy.get('button').click()
        cy.get('#breakingGuess').click()
        cy.get('button').click()
        cy.get('#breakingGuess').click()
        cy.get('button').click()
        cy.get('#breakingGuess').click()
        cy.get('button').click()
        cy.get('#breakingGuess').click()
        cy.get('#scoreText').should('contain', 'You')
        cy.get('button').should('contain', 'Play Again')
    })
    it('test the game reset', () => {
        cy.get('button').click()
        .should('contain', 'New Quote')
        cy.get('.answerList').next().children().should('have.length', 0)
    })
    
})