import { useState } from "react"

const Blog = ({ blog }) => {
    const [showDetails, setShowDetails] = useState(false)

    const toggleVisibility = e => {
        e.preventDefault()
        setShowDetails(!showDetails)
    }

    const detailedView = () => {
        return <div>
            <div>{blog.title} <button onClick={toggleVisibility}>Hide</button></div>
            <p>url: {blog.url}</p>
            <div>likes: {blog.likes} <button>Like</button></div>
            <p>author: {blog.author}</p>
        </div>
    }

    const simpleView = () => {
        return <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>View</button></div>
    }

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