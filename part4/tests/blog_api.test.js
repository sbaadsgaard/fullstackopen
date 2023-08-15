const mongoose = require("mongoose")
const supertest = require("supertest")
const _ = require("lodash")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe("Getting existing notes in database", () => {
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
})


describe("Viewing a spefic blog", () => {
    test("The unique identifier of a blog is named id", async () => {
        const testBlog = (await api.get("/api/blogs")).body[0]
        expect(testBlog.id).toBeDefined()
    })

    test("the returned blog should not have a __v property", async () => {
        const testBlog = (await api.get("/api/blogs")).body[0]
        expect(testBlog.__v).not.toBeDefined()
    })
})

describe("creating a new blog in database", () => {
    test("creating a POST request to /api/blogs/ successfully creates new blogpost", async () => {
        const testBlogObject = {
            title: "Musings about things",
            author: "Mr. Anderson",
            url: "www.fourohfour.com",
            likes: 0
        }

        const blogsBefore = await helper.blogsInDb()
        await api
            .post("/api/blogs")
            .send(testBlogObject)
            .expect(201)

        const blogsAfter = await helper.blogsInDb()
        expect(blogsAfter.length).toBe(blogsBefore.length + 1)

        const blogsWithoutID = blogsAfter.map(b => _.omit(b, "id"))
        expect(blogsWithoutID).toContainEqual(testBlogObject)

    })

    test("if likes is missing from request, it should default to 0", async () => {
        const testBlogObject = {
            title: "Musings about things 2.0",
            author: "Mr. Anderson",
            url: "www.fourohfour.com/twopointoh"
        }

        const result = await api
            .post("/api/blogs")
            .send(testBlogObject)
            .expect(201)

        expect(result.body.likes).toBe(0)
    })

    test("if url missing from request, backend should respond with status code 400 bad request", async () => {
        const testBlogObject = {
            title: "Musings about things 3.0",
            author: "Mr. Anderson",
            likes: 0
        }

        await api
            .post("/api/blogs")
            .send(testBlogObject)
            .expect(400)
    })

    test("if title is missing from request, backend should respond with status code 400 bad request", async () => {
        const testBlogObject = {
            url: "www.fourohfour.com/threepointoh",
            author: "Mr. Anderson",
            likes: 0
        }

        await api
            .post("/api/blogs")
            .send(testBlogObject)
            .expect(400)
    })
})







afterAll(async () => {
    mongoose.connection.close()
})