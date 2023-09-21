// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('newUser', (newUser) => {
	cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
})

Cypress.Commands.add('manualLogin', (username, password) => {
	cy.get('#username')
		.type(username)
	cy.get('#password')
		.type(password)
	cy.get('#loginBtn')
		.click()
})


Cypress.Commands.add('login', (username, password) => {
	cy.request('POST', `${Cypress.env('BACKEND')}/login`, { username, password })
		.then(response => {
			localStorage.setItem('activeUser', JSON.stringify(response.body))
			cy.visit('http://localhost:5173')
		})
})

Cypress.Commands.add('createBlog', (author, title, url) => {
	const userJSON = window.localStorage.getItem('activeUser')
	const user = JSON.parse(userJSON)
	const blog = { author, title, url }
	console.log(user)
	cy.request({
		url: `${Cypress.env('BACKEND')}/blogs`,
		method: 'POST',
		body: blog,
		headers: {
			'Authorization': `Bearer ${user.token}`
		}
	})
	cy.visit('http://localhost:5173')
})