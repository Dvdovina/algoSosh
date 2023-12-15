import { CHANGING_COLOR, MODIFIED_COLOR, DEFAULT_COLOR, circle } from "./utils";

describe('string page works correctly', () => {
  beforeEach(() => {
    cy.visit('recursion');
  });
  it('start button is disabled when input is empty', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').should('contains.text', 'Развернуть').and('be.disabled');
  });
  it('string renders correctly', () => {
    cy.get('input').type('work').should('have.value', 'work');
    cy.get('button').should('contains.text', 'Развернуть').should('not.be.disabled');
    cy.contains('Развернуть').click();
    cy.get('input').should('have.value', 'work');
    cy.get(circle).should('have.length', 4)

    cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'w')
    cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).and('have.text', 'o')
    cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).and('have.text', 'r')
    cy.get(circle).eq(3).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'k')

    cy.get(circle).eq(0).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'k')
    cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'o')
    cy.get(circle).eq(2).should('have.css', 'border', CHANGING_COLOR).and('have.text', 'r')
    cy.get(circle).eq(3).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'w')

    cy.get(circle).eq(0).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'k')
    cy.get(circle).eq(1).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'r')
    cy.get(circle).eq(2).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'o')
    cy.get(circle).eq(3).should('have.css', 'border', MODIFIED_COLOR).and('have.text', 'w')
  });
});