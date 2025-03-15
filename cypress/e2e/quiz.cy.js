describe('Tech Quiz End-to-End Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
  });

  // Test the initial rendering
  it('should load the quiz page', () => {
    cy.visit('/');
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and display questions', () => {
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    // Check if the question is displayed
    cy.get('h2').should('be.visible');

    // Wait for the options to be rendered and check their visibility
    cy.get('button').contains('1').should('be.visible');
    cy.get('button').contains('2').should('be.visible');
    cy.get('button').contains('3').should('be.visible');
    cy.get('button').contains('4').should('be.visible');
  });

  // Test the quiz completing
  it('should complete the quiz and display the score', () => {
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    
    // Answer all questions randomly
    cy.fixture('questions.json').then((questions) => {
      const numberOfQuestions = questions.length;
      for (let i = 0; i < numberOfQuestions; i++) {
          const randomAnswer = Math.floor(Math.random() * 4) + 1;
          cy.get('button').contains(randomAnswer.toString()).click();
          if (i < numberOfQuestions - 1) {
              cy.wait(500); // Wait for the next question to load
          }
      }
    });
    
    // Check for "Quiz Completed" once all questions are answered
    cy.contains('Quiz Completed').should('be.visible');
    cy.get('.alert-success').should('be.visible');
  });
});
