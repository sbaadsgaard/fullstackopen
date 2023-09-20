import { useState } from 'react'

const BlogCreator = ({ handleCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
        handleCreate({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input type="text" value={author} name="author" onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                <label htmlFor="url">Url:</label>
                <input type="text" value={url} name="title" onChange={(e) => setUrl(e.target.value)} />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogCreator