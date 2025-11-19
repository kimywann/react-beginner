Cypress.Commands.add("login", () => {
  cy.visit(Cypress.env("baseUrl"));
  cy.get("button").contains("로그인").click();
  cy.get("input[name='email']").type("test@test.com");
  cy.get("input[name='password']").type("123123123");
  cy.get("form").within(() => {
    cy.get("button[type='submit']").click();
  });
});

Cypress.Commands.add("selectInDialog", (testId: string, optionText: string) => {
  cy.get("[role='dialog']").within(() => {
    cy.get(`[data-testid="${testId}"]`).click();
  });
  cy.get("[role='listbox']").should("be.visible");
  cy.get("[role='option']").contains(optionText).click();
});
