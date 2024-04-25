describe("AppRoutes", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
  });
  it("should contain About Us and Sign in buttons", () => {
    cy.visit("/");

    cy.contains("About us").should("be.visible");
    cy.contains("Sign in").should("be.visible");
  });

  it('should contain a h2 with text "Little story about the company"', () => {
    cy.visit("/");

    cy.contains("Little story about the company").should("be.visible");
  });

  it('should navigate to SignIn page when clicking "Sign in" button', () => {
    cy.visit("/");
    cy.contains("Sign in").click();
    cy.url().should("include", "/signin");
  });

  it("should be able to login", () => {
    cy.visit("/signin");
    cy.get("#email").type("your-email@example.com");
    cy.get("#email").should("have.value", "your-email@example.com");
    cy.get("#password").type("12345");
    cy.get("#password").should("have.value", "12345");
    cy.contains("Submit").click();
    cy.contains("Access denied.");

    cy.get("#email").clear().type("aleksei@example.com");
    cy.get("#email").should("have.value", "aleksei@example.com");
    cy.get("#password").clear().type("lkJlkn8hj");
    cy.get("#password").should("have.value", "lkJlkn8hj");
    cy.contains("Submit").click();

    cy.url().should("include", "/profile");
    cy.contains("Welcome,");
    cy.contains("Update");
    cy.contains("About us");
    cy.contains("Profile");
    cy.contains("Sign out");
    cy.get('img[src="logo.png"]').should("exist");

    cy.contains("Sign out").click();
    cy.url().should("not.include", "/profile");
    cy.contains("Sign in").should("exist");
    cy.contains("About us");
  });
});
