describe("LoginFlow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("login_flow_login_successful", () => {
    cy.get("[name='email']").type("dung+octopus4@101digital.io");

    cy.get("[name='password']").type("Abc@123456");

    cy.get('[data-cy="submit"]').click();

    cy.location("pathname").should("eq", "/shared");
  });
});
