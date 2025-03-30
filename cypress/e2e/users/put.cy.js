const data = require('../../fixtures/users.json')

describe('PUT /usuarios', () => {
  it('update a user', () => {
    const user = data.update_user
    const newUser = data.new_user

    cy.deleteUserByEmail(newUser.email)

    cy.recreateUser(user)
      .then(createdUser => {
        cy.putUser(createdUser.body._id, newUser)
          .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("Registro alterado com sucesso")
          })
      })
  })

  it('register a user', () => {
    const user = data.update_user
    const randon_id = Math.floor(Math.random() * 99999)

    cy.deleteUserByEmail(user.email)

    cy.putUser(randon_id, user)
      .then(response => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq("Cadastro realizado com sucesso")
      })
  })

  context('empty fields', () => {
    it('empty name', () => {
      const user = data.update_user
      const newUser = data.emptyName

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, newUser)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.nome).to.eq("nome não pode ficar em branco")
            })
        })
    })

    it('empty email', () => {
      const user = data.update_user
      const newUser = data.emptyEmail

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, newUser)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.email).to.eq("email não pode ficar em branco")
            })
        })
    })

    it('empty password', () => {
      const user = data.update_user
      const newUser = data.emptyPassword

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, newUser)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.password).to.eq("password não pode ficar em branco")
            })
        })
    })

    it('empty admin', () => {
      const user = data.update_user
      const newUser = data.emptyAdmin

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, newUser)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'")
            })
        })

    })

    it('all empty fields', () => {
      const user = data.empty_all

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.nome).to.eq("nome não pode ficar em branco")
          expect(response.body.email).to.eq("email não pode ficar em branco")
          expect(response.body.password).to.eq("password não pode ficar em branco")
          expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'")
        })
    })
  })

  context('required fields', () => {
    it('required name', () => {
      const user = data.emptyName
      delete user.nome

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, user)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.nome).to.eq("nome é obrigatório")
            })
        })
    })

    it('required email', () => {
      const user = data.emptyEmail
      delete user.email

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, user)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.email).to.eq("email é obrigatório")
            })
        })
    })

    it('required password', () => {
      const user = data.emptyPassword
      delete user.password

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, user)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.password).to.eq("password é obrigatório")
            })
        })
    })

    it('required admin', () => {
      const user = data.emptyAdmin
      delete user.administrador

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id, user)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.administrador).to.eq("administrador é obrigatório")
            })
        })
    })

    it('all required fields', () => {
      const user = data.update_user

      cy.recreateUser(user)
        .then(createdUser => {
          cy.putUser(createdUser.body._id)
            .then(response => {
              expect(response.status).to.eq(400)
              expect(response.body.nome).to.eq("nome é obrigatório")
              expect(response.body.email).to.eq("email é obrigatório")
              expect(response.body.password).to.eq("password é obrigatório")
              expect(response.body.administrador).to.eq("administrador é obrigatório")
            })
        })
    })
  })
})