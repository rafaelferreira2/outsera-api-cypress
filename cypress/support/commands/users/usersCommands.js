Cypress.Commands.add('postUser', (user) => {
  cy.api({
    url: '/usuarios',
    method: 'POST',
    body: user,
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('buildQueryGetUser', (type = '', data = '') => {
  let query = ''
  switch (type) {
    case "id":
      query = { _id: data }
      break;
    case "nome":
      query = { nome: data }
      break;
    case "email":
      query = { email: data }
      break;
    case "password":
      query = { password: data }
      break;
    case "administrador":
      query = { administrador: data }
      break;
  }
  return query
})

Cypress.Commands.add('getUserByQuery', (type = '', data = '') => {
  cy.buildQueryGetUser(type, data)
    .then(query => {
      cy.api({
        url: '/usuarios',
        method: 'GET',
        qs: query,
        failOnStatusCode: false
      }).then(response => { return response })
    })
})

Cypress.Commands.add('getUniqueUser', (id) => {
  cy.api({
    url: `/usuarios/${id}`,
    method: 'GET',
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('putUser', (id, user) => {
  cy.api({
    url: `/usuarios/${id}`,
    method: 'PUT',
    body: user,
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('deleteUser', (id) => {
  cy.api({
    url: `/usuarios/${id}`,
    method: 'DELETE',
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('deleteUserByEmail', (email) => {
  cy.getUserByQuery('email', email)
    .then(getResponse => {
      if (getResponse.body.quantidade > 0) {
        cy.deleteUser(getResponse.body.usuarios[0]._id)
      }
    })
})

Cypress.Commands.add('recreateUser', (user) => {
  cy.deleteUserByEmail(user.email)
  cy.postUser(user)
    .then(response => { return response })
})