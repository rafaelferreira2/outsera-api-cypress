const data = require('../../fixtures/users.json')

describe('POST /usuarios', () => {

  it('register a admin new user', () => {
    const user = data.admin_user

    cy.deleteUserByEmail(user.email)
    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq("Cadastro realizado com sucesso")
        expect(response.body._id.length).to.eq(16)
      })
  })

  it('register a normal user', () => {
    const user = data.normal_user

    cy.deleteUserByEmail(user.email)
    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq("Cadastro realizado com sucesso")
        expect(response.body._id.length).to.eq(16)
      })
  })

  it('duplicated email', () => {
    const user = data.duplicate

    cy.deleteUser(user.email)
    cy.postUser(user)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq("Este email já está sendo usado")
      })
  })

  context('empty fields', () => {
    it('empty name', () => {
      const user = data.empty_name

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.nome).to.eq("nome não pode ficar em branco")
        })
    })

    it('empty email', () => {
      const user = data.empty_email

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.email).to.eq("email não pode ficar em branco")
        })
    })

    it('empty password', () => {
      const user = data.empty_password

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.password).to.eq("password não pode ficar em branco")
        })
    })

    it('empty admin', () => {
      const user = data.empty_admin

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'")
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
      const user = data.create_user
      delete user.nome

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.nome).to.eq("nome é obrigatório")
        })
    })

    it('required email', () => {
      const user = data.empty_email
      delete user.email

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.email).to.eq("email é obrigatório")
        })
    })

    it('required password', () => {
      const user = data.empty_password
      delete user.password

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.password).to.eq("password é obrigatório")
        })
    })

    it('required admin', () => {
      const user = data.empty_admin
      delete user.administrador

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.administrador).to.eq("administrador é obrigatório")
        })
    })

    it('all required fields', () => {
      cy.postUser()
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

