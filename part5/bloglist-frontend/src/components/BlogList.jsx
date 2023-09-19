import Blog from "./Blog"

const BlogList = ({ blogs, handleUpdate }) => {
    return (
        <>
            <div>
                {
                    blogs.map(blog => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate}></Blog>)
                }
            </div>
        </>
    )
}

export default BlogList