const data = require('../../../fixtures/users.json')
const user = data.adminToken

Cypress.Commands.add('getToken', () => {
  cy.request({
    url: `${Cypress.env('apiUrl')}/login`,
    method: 'POST',
    body: {
      "email": user.email,
      "password": user.password
    },
    failOnStatusCode: false
  }).then(response => { return response })
})

