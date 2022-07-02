describe("My First Test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/projects");
    });
    it("creates a project", () => {
        cy.getBySel("create-project").click();
        
    });
});
