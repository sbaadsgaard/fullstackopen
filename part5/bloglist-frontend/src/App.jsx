import { useEffect, useRef, useState } from 'react'
import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import CurrentUser from './components/CurrentUser'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
function App() {

	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notificationConfig, setNotificationConfig] = useState(null)
	const blogCreatorRef = useRef(null)

	useEffect(() => {
		const getBlogs = async () => {
			const retrieved = await blogService.getAll()
			retrieved.sort((first, second) => second.likes - first.likes) // sort by likes, descending. most likes top
			setBlogs(retrieved)
		}
		getBlogs()
	}, [])

	useEffect(() => {
		const userJSON = window.localStorage.getItem('activeUser')
		if (userJSON) {
			const user = JSON.parse(userJSON)
			blogService.setToken(user.token)
			setUser(user)
		}
	}, [])

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem('activeUser', JSON.stringify(user))
			setUser(user)
			showNotication(`${user.name} logged in`, 'info')
			blogService.setToken(user.token)
		} catch (exception) {
			showNotication(exception.response.data.error, 'error')
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('activeUser')
		setUser(null)
		blogService.setToken('')
	}

	const handleCreate = async (blogData) => {
		blogCreatorRef.current.toggleVisibility()
		const { title, author, url } = blogData
		const blog = {
			title,
			author,
			url,
			user: user._id
		}
		try {
			const newBlog = await blogService.create(blog)
			newBlog.user = user
			setBlogs(blogs.concat(newBlog))
			showNotication(`Blog titled  '${newBlog.title}' by ${newBlog.author} has been created`, 'info')
		} catch (exception) {
			showNotication(exception.response.data.error, 'error')
		}
	}

	const handleUpdate = async (updatedBlogObj) => {
		try {
			const updated = await blogService.update(updatedBlogObj.id, updatedBlogObj)
			const index = blogs.findIndex(blog => blog.id === updated.id)
			const updatedBlogs = [...blogs]
			updatedBlogs[index] = updated
			setBlogs(updatedBlogs)
		} catch (exception) {
			showNotication(exception.response.data.error, 'error')
		}
	}

	const handleRemove = async (removed) => {
		try {
			await blogService.remove(removed.id)
			setBlogs(blogs.filter(blog => blog.id !== removed.id))
			showNotication(`Removed ${removed.title} by ${removed.author}`, 'info')
		} catch (exception) {
			showNotication(exception.response.data.error, 'error')
		}
	}

	const showBlogView = () =>
		<>
			<h1>Blogs</h1>
			<Notification config={notificationConfig} />
			<CurrentUser user={user} handleLogout={handleLogout} />
			<BlogList
				blogs={blogs}
				handleUpdate={handleUpdate}
				handleRemove={handleRemove}
				currentUsername={user.username}
			/>
			<Togglable btnLabel="Create new blog" ref={blogCreatorRef}>
				<h1>Create new</h1>
				<NewBlogForm handleCreate={handleCreate} />
			</Togglable>
		</>

	const showLoginForm = () => <>
		<h1>Log in to application</h1>
		<Notification config={notificationConfig} />
		<LoginForm handleLogin={handleLogin} />
	</>

	const showNotication = (message, className) => {
		setNotificationConfig({ message, className: `notification ${className}` })
		setTimeout(() => {
			setNotificationConfig(null)
		}, 3000)
	}

	return (
		user === null
			? showLoginForm()
			: showBlogView()
	)
}

export default App
