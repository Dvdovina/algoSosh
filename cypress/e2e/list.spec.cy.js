import { CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR, circle, headTail, inputNumber, inputText } from "./utils";


describe('list page works correctly', () => {
    beforeEach(() => {
        cy.visit('list');
    });
    it('button is disabled when input is empty', () => {
        cy.get(inputText).should('have.value', '');
        cy.get(inputNumber).should('have.value', '');
        cy.get(headTail).should('have.length', 4)
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(3).contains('tail')
        cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
    });
    it('default list is rendered correctly', () => {
        cy.get(headTail).should('have.length', 4)
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(3).contains('tail')
        cy.get(circle).each((element) => {
            cy.wrap(element).should('have.css', 'border', DEFAULT_COLOR).and('not.be.empty')
        })
        cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');

    });
    it('element is added to head correctly', () => {
        cy.get(inputText).type('5').should('have.value', '5');
        cy.contains('Добавить в head').click();
        cy.get(headTail).should('have.length', 5)
        cy.get(circle).eq(0).should('have.css', 'border', MODIFIED_COLOR).and('have.text', '5')
        cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '5')
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(4).contains('tail')
        cy.get('button').should('contains.text', 'Удалить из head').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить из tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
    });
    it('element is added to tail correctly', () => {
        cy.get('button').should('contains.text', 'Удалить из head').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить из tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
        cy.get(inputText).type('4').should('have.value', '4');
        cy.contains('Добавить в tail').click();
        cy.get(headTail).should('have.length', 5)
        cy.get(circle).eq(4).should('have.css', 'border', MODIFIED_COLOR).and('have.text', '4')
        cy.get(circle).eq(4).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '4')
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(4).contains('tail')
    });
    it('element is deleted from head correctly', () => {
        cy.get(headTail).should('have.length', 4)
        cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
        cy.contains('Удалить из head').click();
        cy.get(circle).eq(0).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '')
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(2).contains('tail')
        cy.get(headTail).should('have.length', 3)
    });
    it('element is deleted from tail correctly', () => {
        cy.get(headTail).should('have.length', 4)
        cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить по индексу').and('be.disabled');
        cy.contains('Удалить из tail').click();
        cy.get(circle).eq(3).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '')
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(2).contains('tail')
        cy.get(headTail).should('have.length', 3)
    });
    it('element is added by index correctly', () => {
        cy.get(headTail).should('have.length', 4)
        cy.get(inputText).type('3').should('have.value', '3');
        cy.get(inputNumber).type(1).should('have.value', '1');
        cy.contains('Добавить по индексу').click();
        cy.get(circle).eq(1).should('have.css', 'border', MODIFIED_COLOR).and('have.text', '3')
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(4).contains('tail')
        cy.get(headTail).should('have.length', 5)
    });
    it('element is deleted by index correctly', () => {
        cy.get(headTail).should('have.length', 4)
        cy.get(inputNumber).type(2).should('have.value', '2');
        cy.get('button').should('contains.text', 'Добавить в head').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить в tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить из head').and('be.disabled');
        cy.get('button').should('contains.text', 'Удалить из tail').and('be.disabled');
        cy.get('button').should('contains.text', 'Добавить по индексу').and('be.disabled');
        cy.contains('Удалить по индексу').click();
        cy.get(circle).eq(0).should('have.css', 'border', CHANGING_COLOR)
        cy.get(circle).eq(1).should('have.css', 'border', CHANGING_COLOR)
        cy.get(circle).eq(2).should('have.css', 'border', DEFAULT_COLOR).and('have.text', '')
        cy.get(headTail).eq(0).contains('head')
        cy.get(headTail).eq(2).contains('tail')
        cy.get(headTail).should('have.length', 3)
    });
});