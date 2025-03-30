const data = require('../../fixtures/users.json')

describe('GET /usuarios', () => {
  it('get all users', () => {
    const user = data.adminUser
    cy.recreateUser(user)

    cy.getUserByQuery()
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.gte(1)
        expect(response.body.usuarios.length).to.gte(1)
      })
  })

  it('get user by id', () => {
    const user = data.adminUser

    cy.recreateUser(user)
      .then(userCreated => {
        cy.getUserByQuery('id', userCreated.body._id)
          .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.eq(1)
            expect(response.body.usuarios.length).to.eq(1)
            expect(response.body.usuarios[0].nome).to.eq(user.nome)
            expect(response.body.usuarios[0].email).to.eq(user.email)
            expect(response.body.usuarios[0].password).to.eq(user.password)
            expect(response.body.usuarios[0].password).to.eq(user.password)
            expect(response.body.usuarios[0]._id).to.eq(userCreated.body._id)
          })
      })
  })

  it('get users by name', () => {
    const user = data.adminUser
    cy.recreateUser(user)

    cy.getUserByQuery('nome', user.nome)
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.gte(1)
        expect(response.body.usuarios.length).to.gte(1)
      })
  })

  it('get users by email', () => {
    const user = data.adminUser
    cy.recreateUser(user)
      .then(userCreated => {
        cy.getUserByQuery('email', user.email)
          .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.eq(1)
            expect(response.body.usuarios[0].nome).to.eq(user.nome)
            expect(response.body.usuarios[0].email).to.eq(user.email)
            expect(response.body.usuarios[0].password).to.eq(user.password)
            expect(response.body.usuarios[0].password).to.eq(user.password)
            expect(response.body.usuarios[0]._id).to.eq(userCreated.body._id)
          })
      })
  })

  it('get users by password', () => {
    const user = data.adminUser

    cy.recreateUser(user)

    cy.getUserByQuery('password', user.password)
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.gte(1)
        expect(response.body.usuarios.length).to.gte(1)
      })
  })

  it('get users by admin', () => {
    const user = data.adminUser

    cy.recreateUser(user)

    cy.getUserByQuery('administrador', user.administrador)
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.gte(1)
        expect(response.body.usuarios.length).to.gte(1)
      })
  })

  it('get users by not admin', () => {
    const user = data.normalUser

    cy.recreateUser(user)

    cy.getUserByQuery('administrador', user.administrador)
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.gte(1)
        expect(response.body.usuarios.length).to.gte(1)
      })
  })

  context('Not found', () => {
    it('inexistent id', () => {
      const user = data.create_user

      cy.recreateUser(user)
        .then(userDeleted => {
          cy.deleteUser(userDeleted.body._id)
          cy.getUserByQuery('id', userDeleted.body._id)
            .then(response => {
              expect(response.status).to.eq(200)
              expect(response.body.quantidade).to.eq(0)
              expect(response.body.usuarios).to.be.empty
            })
        })
    })

    it('inexistent email', () => {
      const user = data.create_user

      cy.recreateUser(user)
        .then(userDeleted => {
          cy.deleteUser(userDeleted.body._id)
          cy.getUserByQuery('email', user.email)
            .then(response => {
              expect(response.status).to.eq(200)
              expect(response.body.quantidade).to.eq(0)
              expect(response.body.usuarios).to.be.empty
            })
        })
    })
  })
})

describe('GET /usuarios/:id', () => {
  it('get user by id', () => {
    const user = data.adminUser

    cy.recreateUser(user)
      .then(postResponse => {
        cy.getUniqueUser(postResponse.body._id)
          .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.nome).to.eq(user.nome)
            expect(response.body.email).to.eq(user.email)
            expect(response.body.password).to.eq(user.password)
            expect(response.body.password).to.eq(user.password)
            expect(response.body._id).to.eq(postResponse.body._id)
          })
      })
  })

  it('user not found', () => {
    const user = data.adminUser

    cy.recreateUser(user)
      .then(postResponse => {
        cy.deleteUser(postResponse.body._id)
        cy.getUniqueUser(postResponse.body._id)
          .then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.eq("Usuário não encontrado")
          })
      })
  })
})