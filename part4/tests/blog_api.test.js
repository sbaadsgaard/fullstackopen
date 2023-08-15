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

describe("Deleting a blog from the database", () => {
    test("A Delete request with an existing ID should result in status code 204 and the blog with that id should not be in the database", async () => {
        const blogsBefore = await helper.blogsInDb()
        const blogToDelete = blogsBefore[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const blogsAfter = await helper.blogsInDb()
        expect(blogsAfter).toHaveLength(blogsBefore.length - 1)
        expect(blogsAfter).not.toContainEqual(blogToDelete)
    })

    test("A delete request with a non-existing ID should result in status code 204 but the database remains unchanged", async () => {
        const blogsBefore = await helper.blogsInDb()
        const nonExistingID = await helper.nonExistingID()
        await api
            .delete(`/api/blogs/${nonExistingID}`)
            .expect(204)
        const blogsAfter = await helper.blogsInDb()
        expect(blogsAfter).toHaveLength(blogsBefore.length)
        blogsBefore.forEach(blog => expect(blogsAfter).toContainEqual(blog))

    })
})

describe("Updating a blog from database", () => {
    test("You can update the number of likes of an existing blogpost", async () => {
        const blogs = await helper.blogsInDb()
        const previous = blogs[0]
        const updated = {
            ...previous,
            likes: previous.likes + 1
        }
        delete updated.id
        await api.
            put(`/api/blogs/${previous.id}`)
            .send(updated)
            .expect(200)
            .expect("Content-Type", /application\/json/)
        const result = await api.get(`/api/blogs/${previous.id}`)
        expect(result.body.likes).toBe(updated.likes)
    })
})





afterAll(async () => {
    mongoose.connection.close()
})