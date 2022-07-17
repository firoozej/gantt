/// <reference types="cypress" />

Cypress.Commands.add("getByDataTest", (selector, ...args) => {
    return cy.get(`[data-test="${selector}"]`, ...args);
});


Cypress.Commands.add("selectDate", (selector, date: string) => {
    cy.getByDataTest(selector).within(el => cy.get("input").click({force: true}));
    cy.get(`[aria-label="calendar view is open, go to text input view"]`).click();
    cy.get(`[aria-labelledby="${selector} Dialog"] input`).clear().type(date);
    cy.get(`[aria-labelledby="${selector} Dialog"]`).contains("OK").click();
});

Cypress.Commands.add("selectGridRow", (selector, rowNumber: number = 1) => {
    cy.get(`[data-test="${selector}"] tbody .MuiTableRow-root:nth-of-type(${rowNumber})`);
});

Cypress.Commands.add("selectEditGridRow", (selector, rowNumber: number = 1) => {
    cy.selectGridRow(selector, rowNumber).within(() => cy.getByDataTest("Edit Row").click());
});

Cypress.Commands.add("randomString", (selector, rowNumber: number = 1) => {
    const uniqueSeed = Date.now().toString();
    return Cypress._.uniqueId(uniqueSeed);
});