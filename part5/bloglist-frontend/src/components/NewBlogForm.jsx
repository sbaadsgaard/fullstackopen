import { useState } from 'react'

const NewBlogForm = ({ handleCreate }) => {
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
				<input type="text" value={title} name="title" onChange={(e) => setTitle(e.target.value)} id='title'/>
			</div>
			<div>
				<label htmlFor="author">Author:</label>
				<input type="text" value={author} name="author" onChange={(e) => setAuthor(e.target.value)} id='author'/>
			</div>
			<div>
				<label htmlFor="url">Url:</label>
				<input type="text" value={url} name="url" onChange={(e) => setUrl(e.target.value)} id='url'/>
			</div>
			<button type="submit" className='createButton'>Create</button>
		</form>
	)
}

export default NewBlogForm