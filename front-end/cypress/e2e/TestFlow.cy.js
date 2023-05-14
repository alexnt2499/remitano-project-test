describe("LoginFlow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("login_flow_login_successful", () => {
    cy.get("[name='email']").type("ntd24799@gmail.com");

    cy.get("[name='password']").type("Abc@123456");

    cy.get('[data-cy="submit"]').click();

    cy.location("pathname").should("eq", "/shared");
  });
});
