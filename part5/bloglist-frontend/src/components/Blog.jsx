import { useState } from "react"

const Blog = ({ blog, handleUpdate }) => {
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

    const detailedView = () => {
        return <div>
            <div>{blog.title} <button onClick={toggleVisibility}>Hide</button></div>
            <p>url: {blog.url}</p>
            <div>likes: {blog.likes} <button onClick={handleLikeClicked}>Like</button></div>
            <p>user: {blog.user.name}</p>
        </div>
    }

    const simpleView = () => {
        return <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>View</button></div>
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