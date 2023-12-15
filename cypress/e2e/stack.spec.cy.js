import { CHANGING_COLOR, DEFAULT_COLOR, circle } from "./utils";


describe('stack page works correctly', () => {
    beforeEach(() => {
      cy.visit('stack');
    });
    it('start button is disabled when input is empty', () => {
      cy.get('input').should('have.value', '');
      cy.get('button').should('contains.text', 'Добавить').should('be.disabled');
      cy.get('button').should('contains.text', 'Удалить').should('be.disabled');
      cy.get('button').should('contains.text', 'Очистить').should('be.disabled');
    });
    it('elements are added correctly', () => {
      cy.get('input').type('3').should('have.value', '3');
      cy.contains('Добавить').click();
      cy.get(circle).should('have.length', 1)
      cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '3')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '3')
      cy.get('input').should('have.value', '');
    });
    it('elements are deleted correctly', () => {
      cy.get('input').type('1').should('have.value', '1');
      cy.contains('Добавить').click();
      cy.get(circle).should('have.length', 1)
      cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
      cy.get('input').type('2').should('have.value', '2');
      cy.contains('Добавить').click();
      cy.get(circle).should('have.length', 2)
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
      cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2')
      cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2')
      cy.contains('Удалить').click();
      cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
      cy.get(circle).should('have.length', 1)
      cy.get('input').should('have.value', '');
    });
    it('clear elements functionality works correctly', () => {
      cy.get('input').type('5').should('have.value', '5');
      cy.contains('Добавить').click();
      cy.get(circle).should('have.length', 1)
      cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '5')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '5')
      cy.get('input').type('6').should('have.value', '6');
      cy.contains('Добавить').click();
      cy.get(circle).should('have.length', 2)
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '5')
      cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '6')
      cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '6')
      cy.contains('Очистить').click();
      cy.get(circle).should('not.exist')
      cy.get('input').should('have.value', '');
    });
  });