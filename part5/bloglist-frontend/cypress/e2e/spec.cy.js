describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const newUser = {
			name: 'Mr root',
			username: 'root',
			password: 'root'
		}
		cy.newUser(newUser)
		cy.visit('http://localhost:5173')
	})

	it('Login form is shown', function () {
		cy.contains('Log in to application')
		cy.get('.loginForm')
	})

	it('login succeeds with correct credentials', function () {
		cy.login('root', 'root')
		cy.get('.notification.info')
			.should('contain', 'Mr root logged in')
			.and('have.css', 'color', 'rgb(0, 128, 0)')
			.and('have.css', 'border-color', 'rgb(0, 128, 0)')
		cy.contains('Blogs')
		cy.contains('Mr root logged in')
	})

	it('login fails with incorrect credentials', function () {
		cy.login('root', 'wrongPassword')
		cy.get('.notification.error')
			.should('contain', 'Invalid username or password')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-color', 'rgb(255, 0, 0)')
		cy.contains('Blogs').should('not.exist')
		cy.contains('Mr root logged in').should('not.exist')
	})
})