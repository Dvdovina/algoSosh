import { CHANGING_COLOR, DEFAULT_COLOR, circle, headTail } from "./utils";


describe('queue page works correctly', () => {
    beforeEach(() => {
      cy.visit('queue');
    });
    it('button is disabled when input is empty', () => {
      cy.get('input').should('have.value', '');
      cy.get(circle).should('have.length', 7)
      cy.get('button').should('contains.text', 'Добавить').should('be.disabled');
      cy.get('button').should('contains.text', 'Удалить').should('be.disabled');
      cy.get('button').should('contains.text', 'Очистить').should('be.disabled');
    });
    it('elements are added correctly', () => {
      cy.get('input').type('1').should('have.value', '1');
      cy.contains('Добавить').click();
      cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
      cy.get(headTail).eq(0).contains('head')
      cy.get(headTail).eq(0).contains('tail')
      cy.get('input').should('have.value', '');
      cy.get('input').type('2').should('have.value', '2');
      cy.contains('Добавить').click();
      cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2')
      cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2')
      cy.get(headTail).eq(0).contains('head')
      cy.get(headTail).eq(1).contains('tail')
    });
    it('elements are deleted correctly', () => {
      cy.get('input').type('1').should('have.value', '1');
      cy.contains('Добавить').click();
      cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
      cy.get(headTail).eq(0).contains('head')
      cy.get(headTail).eq(0).contains('tail')
      cy.get('input').should('have.value', '');
      cy.get('input').type('2').should('have.value', '2');
      cy.contains('Добавить').click();
      cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2')
      cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2')
      cy.get(headTail).eq(0).contains('head')
      cy.get(headTail).eq(1).contains('tail')
      cy.contains('Удалить').click();
      cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '')
      cy.get(headTail).eq(1).contains('head')
      cy.get(headTail).eq(1).contains('tail')
    });
    it('clear elements functionality works correctly', () => {
      cy.get('input').type('1').should('have.value', '1');
      cy.contains('Добавить').click();
      cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR).should('have.text', '1')
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '1')
      cy.get(headTail).eq(0).contains('head')
      cy.get(headTail).eq(0).contains('tail')
      cy.get('input').should('have.value', '');
      cy.get('input').type('2').should('have.value', '2');
      cy.contains('Добавить').click();
      cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR).should('have.text', '2')
      cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '2')
      cy.get(headTail).eq(0).contains('head')
      cy.get(headTail).eq(1).contains('tail')
      cy.contains('Очистить').click();
      cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '')
      cy.get(circle).eq(1).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '')
      cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).should('have.text', '')
      cy.get('input').should('have.value', '');
    });
  });