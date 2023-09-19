import Blog from "./Blog"

const BlogList = ({ blogs, toggledBlogId }) => {
    return (
        <>
            <div>
                {
                    blogs.map(blog => <Blog key={blog.id} blog={blog}></Blog>)
                }
            </div>
        </>
    )
}

export default BlogList