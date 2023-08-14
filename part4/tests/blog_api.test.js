const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../utils/list_helper")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs())
})

test("Blogs are returned in JSON format", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("There are 6 blogs in the database", async () => {
    const result = await api.get("/api/blogs")
    expect(result.body).toHaveLength(6)
})

test("The unique identifier of a blog is named id", async () => {
    const testBlog = (await api.get("/api/blogs")).body[0]
    expect(testBlog.id).toBeDefined()
})

test("the returned blog should not have a __v property", async () => {
    const testBlog = (await api.get("/api/blogs")).body[0]
    expect(testBlog.__v).not.toBeDefined()
})


afterAll(async () => {
    mongoose.connection.close()
})