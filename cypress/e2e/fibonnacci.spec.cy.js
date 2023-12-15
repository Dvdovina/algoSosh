import { DEFAULT_COLOR, circle } from "./utils";

describe('fibonacci page works correctly', () => {
    beforeEach(() => {
        cy.visit('fibonacci');
    });
    it('start button is disabled when input is empty', () => {
        cy.get('input').should('have.value', '');
        cy.get('button').should('contains.text', 'Рассчитать').should('be.disabled');
    });
    it('fibonacci numbers are generated correctly', () => {
        cy.get('input').type('4').should('have.value', '4');
        cy.get('button').should('contains.text', 'Рассчитать').should('not.be.disabled');
        cy.contains('Рассчитать').click();
        cy.get(circle).should('have.length', 5)
        cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
        cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
        cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2')
        cy.get(circle).eq(3).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '3')
        cy.get(circle).eq(4).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '5')
    });
});