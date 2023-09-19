import Blog from "./Blog"

const BlogList = ({ blogs, handleUpdate, handleRemove, currentUsername}) => {
    return (
        <>
            <div>
                {
                    blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleUpdate={handleUpdate}
                            handleRemove={handleRemove}
                            currentUsername={currentUsername}
                        >
                            </Blog>)
                }
            </div>
        </>
    )
}

export default BlogList