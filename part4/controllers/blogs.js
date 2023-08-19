const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

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
    const body = request.body

    if (!body.url) {
        return response.status(400).json({ error: "Missing url" })
    }
    if (!body.title) {
        return response.status(400).json({ error: "missing title" })
    }
    const user = await User.findOne({})
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
    console.log("REEE", request.body)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(updatedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter

