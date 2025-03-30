Cypress.Commands.add('apiGetProduct', (name) => {
  cy.request({
    url: `${Cypress.env('apiUrl')}/produtos`,
    method: 'GET',
    qs: { nome: name },
    failOnStatusCode: false
  }).then(response => { return response })
})

Cypress.Commands.add('apiDeleteProduct', (name) => {
  cy.getToken()
    .then(response => {
      Cypress.env('token', response.body.authorization)
    })

  cy.apiGetProduct(name)
    .then(response => {
      expect(response.status).to.eq(200)
      if (response.body.quantidade > 0) {
        cy.request({
          url: `${Cypress.env('apiUrl')}/produtos/${response.body.produtos[0]._id}`,
          method: 'DELETE',
          headers: {
            Authorization: Cypress.env('token')
          },
        }).then(response => {
          expect(response.status).to.eq(200)
        })
      }
    })
})

Cypress.Commands.add('apiPostProduct', (product) => {
  cy.getToken()
    .then(response => {
      Cypress.env('token', response.body.authorization)
      cy.request({
        url: `${Cypress.env('apiUrl')}/produtos`,
        method: 'POST',
        body: product,
        headers: {
          Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
      })
    })
})

Cypress.Commands.add('apiRecreateProduct', (product) => {
  cy.apiDeleteProduct(product.nome)
  cy.getToken()
    .then(response => {
      Cypress.env('token', response.body.authorization)
      cy.request({
        url: `${Cypress.env('apiUrl')}/produtos`,
        method: 'POST',
        body: product,
        headers: {
          Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
      })
    })
})