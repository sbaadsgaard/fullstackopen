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


	describe('Before logged in', function () {
		it('Login form is shown', function () {
			cy.contains('Log in to application')
			cy.get('.loginForm')
		})
		it('login succeeds with correct credentials', function () {
			cy.manualLogin('root', 'root')
			cy.get('.notification.info')
				.should('contain', 'Mr root logged in')
				.and('have.css', 'color', 'rgb(0, 128, 0)')
				.and('have.css', 'border-color', 'rgb(0, 128, 0)')
			cy.contains('Blogs')
			cy.contains('Mr root logged in')
		})

		it('login fails with incorrect credentials', function () {
			cy.manualLogin('root', 'wrongPassword')
			cy.get('.notification.error')
				.should('contain', 'Invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-color', 'rgb(255, 0, 0)')
			cy.contains('Blogs').should('not.exist')
			cy.contains('Mr root logged in').should('not.exist')
		})
	})

	describe('After logged in', function () {
		beforeEach(function () {
			cy.login('root', 'root')
		})

		it('is possible to create a new blog when logged in. new blog should appear in list of all blogs', function () {
			cy.contains('Create new blog')
				.click()
			cy.get('#title')
				.type('The bible')
			cy.get('#author')
				.type('God')
			cy.get('#url')
				.type('heaven.org')
			cy.get('.createButton')
				.click()
			cy.contains('The bible God')
		})

		it('is possible  to like a post increasing the likes by 1', function () {
			cy.createBlog('Allah', 'Quran', 'mekkah.org')
			cy.get('.viewButton')
				.click()
			cy.get('.likeButton')
				.click()
			cy.contains('likes: 1')
		})
	})

})