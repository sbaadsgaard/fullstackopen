const blogsRouter = require("express").Router()

const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const result = await Blog.find({})
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

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })
    const result = await blog.save()
    response.status(201).json(result)
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

