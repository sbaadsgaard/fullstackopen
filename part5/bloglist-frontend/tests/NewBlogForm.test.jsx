import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from '../src/components/NewBlogForm'

describe('NewBlogForm', () => {
	test('NewBlogForm calls the supplied event handler with the proper details when new blog is created', async () => {
		const createBlog = jest.fn()
		const user = userEvent.setup()
		const { container } = render(<NewBlogForm handleCreate={createBlog} />)
		//screen.debug()
		const titleInput = container.querySelector('input[name="title"')
		const authorInput = container.querySelector('input[name="author"')
		const urlInput = container.querySelector('input[name="url"')
		const createButton = container.querySelector('.createButton')

		await user.type(titleInput, 'The Bible')
		await user.type(authorInput, 'God')
		await user.type(urlInput, 'heaven.org')


		await user.click(createButton)

		expect(createBlog.mock.calls).toHaveLength(1)
		expect(createBlog.mock.calls[0][0].title).toBe('The Bible')
		expect(createBlog.mock.calls[0][0].author).toBe('God')
		expect(createBlog.mock.calls[0][0].url).toBe('heaven.org')
	})
})