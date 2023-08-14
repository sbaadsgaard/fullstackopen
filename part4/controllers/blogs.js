const blogsRouter = require("express").Router()

const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const result = await Blog.find({})
    response.json(result)
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    if (!body.url) {
        return response.status(400).json({ error: "Missing url" })
    }
    if (!body.title) {
        return  response.status(400).json({ error: "missing title" })
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

module.exports = blogsRouter

