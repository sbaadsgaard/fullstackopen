const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const extractToken = request => {
    const auth = request.get("authorization")
    if (auth && auth.startsWith("Bearer ")) {
        return auth.replace("Bearer ", "")
    }
    return null
}

blogsRouter.get("/", async (request, response) => {
    const result = await Blog.find({})
        .populate("user", { name: 1, username: 1 })
    response.json(result)
})

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)

    } else {
        response.status(404).end()
    }
})

blogsRouter.post("/", async (request, response) => {
    const decodedToken = jwt.verify(extractToken(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: "Invalid token"
        })
    }
    const body = request.body
    if (!body.url) {
        return response.status(400).json({ error: "Missing url" })
    }
    if (!body.title) {
        return response.status(400).json({ error: "missing title" })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        user: user._id,
        url: body.url,
        likes: body.likes || 0
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(updatedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter

