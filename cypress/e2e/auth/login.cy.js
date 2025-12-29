/* eslint-disable no-undef */

beforeEach(() => {
    cy.request('DELETE', Cypress.env('apiUrl') + 'public/test/database');
    cy.request('POST', Cypress.env('apiUrl') + 'public/test/populate');
});

describe('authenticate', () => {
    beforeEach(() => {
        cy.visit('/login');
    });
    it('login_disabled_button', () => {
        cy.get('button[type=submit]').should('be.disabled');
        cy.get('input[data-cy=username_input]').type('e2e');
        cy.get('button[type=submit]').should('be.disabled');
        cy.get('input[data-cy=password_input]').type('1234');
        cy.get('button[type=submit]').should('be.enabled');
    });
    it('login_wrong', () => {
        cy.get('input[data-cy=username_input]').type('e2e');
        cy.get('input[data-cy=password_input]').type('12345');
        cy.get('button[type=submit]').click();
        cy.get('p[data-cy=toast_text]')
            .should('be.visible')
            .should('contain', 'Wrong credentials');
    });
    it('login_ok', () => {
        cy.get('input[data-cy=username_input]').type('e2e');
        cy.get('input[data-cy=password_input]').type('1234');
        cy.get('button[type=submit]').click();
        cy.get('span[data-cy=top_menu_username]')
            .should('be.visible')
            .should('contain', 'e2e');
    });
});
