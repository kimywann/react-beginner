/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    selectInDialog(testId: string, optionText: string): Chainable<void>;
  }
}
