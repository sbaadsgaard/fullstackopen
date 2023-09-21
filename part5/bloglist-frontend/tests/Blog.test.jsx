import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'


describe('Blog', () => {
	test('blog renders title and author, not url and likes', () => {
		const blog = {
			author: 'god',
			title: 'the bible',
			likes: 666,
			url: 'heaven.org'
		}

		const { container } = render(<Blog blog={blog}/>)
		screen.debug()
		const div = container.querySelector('.blogEntry')
		expect(div).toHaveTextContent('the bible god')
		expect(div).not.toHaveTextContent('likes: 666')
		expect(div).not.toHaveTextContent('url: heaven.org')
	})

	test('blog renders title and author when details button is clicked', async () => {
		const blog = {
			author: 'god',
			title: 'the bible',
			likes: 666,
			url: 'heaven.org',
			user: {
				name: 'Jørgen'
			}
		}
		const user = userEvent.setup()
		const { container } = render(<Blog blog={blog} />)
		const div = container.querySelector('.blogEntry')
		const viewButton = container.querySelector('.viewButton')
		expect(div).not.toHaveTextContent('666')
		expect(div).not.toHaveTextContent('heaven.org')

		await user.click(viewButton)
		expect(div).toHaveTextContent('likes: 666')
		expect(div).toHaveTextContent('url: heaven.org')
	})

	test('if like button is clicked twice, the event handler received as props is called twice', async () => {
		const blog = {
			author: 'god',
			title: 'the bible',
			likes: 666,
			url: 'heaven.org',
			user: {
				name: 'Jørgen'
			}
		}
		const user = userEvent.setup()
		const mockHandler = jest.fn()
		const { container } = render(<Blog blog={blog} handleUpdate={mockHandler} />)
		const viewButton = container.querySelector('.viewButton')
		await user.click(viewButton)
		const likeButton = container.querySelector('.likeButton')
		await user.click(likeButton)
		await user.click(likeButton)
		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})