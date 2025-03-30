const data = require('../../fixtures/users.json')

describe('POST /usuarios', () => {
  it('delete a user', () => {
    const user = data.delete_user

    cy.recreateUser(user)
      .then(userCreated => {
        cy.deleteUser(userCreated.body._id)
          .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("Registro excluído com sucesso")
          })
      })
  })

  it('user not found', () => {
    const user = data.delete_user

    cy.postUser(user)
      .then(userCreated => {
        cy.deleteUser(userCreated.body._id)
        cy.deleteUser(userCreated.body._id)
          .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("Nenhum registro excluído")
          })
      })
  })
})