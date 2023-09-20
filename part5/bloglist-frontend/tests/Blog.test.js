import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'

describe('Blog', () => {
    test('blog renders title and author, not url and likes', () => {
        const blog = {
            author: 'god',
            title: 'the bible',
            likes: 666,
            url: 'heaven.org',
            user: null
        }

        const { container } = render(<Blog blog={blog}/>)
        screen.debug()
        const div = container.querySelector('.blogEntry')
        expect(div).toHaveTextContent('the bible god')
        expect(div).not.toHaveTextContent('666')
        expect(div).not.toHaveTextContent('heaven.org')
    })
})