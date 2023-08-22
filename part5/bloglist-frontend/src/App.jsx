import { useEffect, useState } from "react"
import blogService from "./services/blogService"
import Blog from "./components/Blog"
function App() {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      const retrieved = await blogService.getAll()
      console.log(blogs)
      setBlogs(retrieved)
    }
    getBlogs()
  }, [])
  return (
    <>
      <h1>Blog Frontend</h1>
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog}></Blog>)
      }
    </>
  )
}

export default App
