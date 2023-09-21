import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove, currentUsername }) => {
	const [showDetails, setShowDetails] = useState(false)

	const toggleVisibility = e => {
		e.preventDefault()
		setShowDetails(!showDetails)
	}

	const handleLikeClicked = e => {
		e.preventDefault()
		const updatedBlog = {
			...blog,
			user: blog.user.id,
			likes: blog.likes + 1
		}
		handleUpdate(updatedBlog)
	}

	const handleRemoveClicked = e => {
		e.preventDefault()
		if (window.confirm(`Removing ${blog.title} by ${blog.author}`)) {
			handleRemove(blog)
		}
	}

	const detailedView = () => {
		return <div>
			<div>{blog.title} <button onClick={toggleVisibility}>Hide</button></div>
			<p>url: {blog.url}</p>
			<div>likes: {blog.likes} <button onClick={handleLikeClicked} className='likeButton'>Like</button></div>
			<p>user: {blog.user.name}</p>
			{currentUsername === blog.user.username
				? <button onClick={handleRemoveClicked}>Remove</button>
				: null}
		</div>
	}

	const simpleView = () => {
		return <div>{blog.title} {blog.author}<button onClick={toggleVisibility} className='viewButton'>View</button></div>
	}
	//64e0ebeb132d8ce4bc4f2003
	return (
		<div className="blogEntry">
			{showDetails
				? detailedView()
				: simpleView()
			}
		</div>
	)
}


export default Blog