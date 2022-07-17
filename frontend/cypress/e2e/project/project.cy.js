import { randomString } from "../utility/randomString";

describe("Projects", () => {
    beforeEach(() => {
        cy.visit("projects");
    });
    it("Creates a project", () => {
        const title = cy.randomString();
        cy.getByDataTest("Create Project").click();
        cy.getByDataTest("Title").type(title);
        cy.selectDate("Start Date", "2022-07-16");
        cy.selectDate("Predicted End", "2022-08-16");
        cy.getByDataTest("Create Project Dialog").contains("OK").click();
        cy.selectGridRow("Projects Grid", 1).should("include.text", title);
    });
    it.only("Edits a project", () => {
        cy.getByDataTest("Loading Row").should('not.exist');
        const editedTitle = randomString();
        cy.selectEditGridRow("Projects Grid", 1);
        cy.getByDataTest("Title").clear().type(editedTitle);
        cy.selectDate("Start Date", "2022-08-16");
        cy.selectDate("Predicted End", "2022-09-16");
        cy.getByDataTest("Create Project Dialog").contains("OK").click();
        cy.selectGridRow("Projects Grid", 1).should("include.text", editedTitle);
        cy.selectGridRow("Projects Grid", 1).should("include.text", "2022/08/16");
        cy.selectGridRow("Projects Grid", 1).should("include.text", "2022/09/16");
    });
});
