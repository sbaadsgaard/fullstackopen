import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, handleUpdate, handleRemove, currentUsername }) => {
	return (
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
	)
}

BlogList.propTypes = {
	blogs: PropTypes.array.isRequired,
	handleUpdate: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	currentUsername: PropTypes.string.isRequired
}

export default BlogList