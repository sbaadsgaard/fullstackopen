import { useEffect, useRef, useState } from "react"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import LoginForm from "./components/LoginForm"
import BlogList from "./components/BlogList"
import CurrentUser from "./components/CurrentUser"
import BlogCreator from "./components/BlogCreator"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationConfig, setNotificationConfig] = useState(null)
  const blogCreatorRef = useRef(null)

  useEffect(() => {
    const getBlogs = async () => {
      const retrieved = await blogService.getAll()
      setBlogs(retrieved)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem("activeUser")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem("activeUser", JSON.stringify(user))
      setUser(user)
      showNotication(`${user.name} logged in`, 'info')
      blogService.setToken(user.token)
    } catch (exception) {
      showNotication(exception.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("activeUser")
    setUser(null)
    blogService.setToken("")
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
      setBlogs(blogs.concat(newBlog))
      showNotication(`Blog titled  \'${newBlog.title}\' by ${newBlog.author} has been created`, 'info')
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

  const showBlogView = () =>
    <>
      <h1>Blogs</h1>
      <Notification config={notificationConfig} />
      <CurrentUser user={user} handleLogout={handleLogout} />
      <BlogList blogs={blogs} handleUpdate={handleUpdate} />
      <Togglable btnLabel="Create new blog" ref={blogCreatorRef}>
        <h1>Create new</h1>
        <BlogCreator handleCreate={handleCreate} />
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
