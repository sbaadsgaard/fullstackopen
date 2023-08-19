const mongoose = require("mongoose")
const supertest = require("supertest")
//const _ = require("lodash")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)


describe("Creating users with existing users in database", () => {
    beforeEach(async () => {
        await helper.cleanAndInitUserDatabase()
    })

    test("Can successfully create new user with fresh username", async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            name: "Alan Turing",
            username: "TheTuringMachine",
            password: "password"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toHaveLength(usersBefore.length + 1)
        expect(usersAfter.map(user => user.username)).toContain(newUser.username)
    })

    test("Cannot create new user without a username", async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            name: "Mr. Anderson",
            password: "TheMatrixIsReal"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toEqual(usersBefore)
        expect(result.body.error).toContain("Username is required")
    })

    test("Cannot create a user  with username that is less than 3 characters long", async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            name: "Mr. Anderson",
            username: "Mr",
            password: "TheMatrixIsReal"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toEqual(usersBefore)
        expect(result.body.error).toContain("Username must be atleast 3 characters long")
    })

    test("Cannot create new user with a username that is already in use", async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            name: "Fake root",
            username: "root",
            password: "Root314"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toEqual(usersBefore)
        expect(result.body.error).toContain("username must be unique")
    })

    test("Cannot create new user without a password", async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            name: "Mr. Anderson",
            username: "TheMatrixIsReal"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toEqual(usersBefore)
        expect(result.body.error).toContain("Password must be given")
    })

    test("Cannot create a new user with a password that is less than 3 characters long", async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            name: "Mr. Anderson",
            username: "TheMaxtrixIsReal",
            password: "12"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)
        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toEqual(usersBefore)
        expect(result.body.error).toContain("Password must be atleast 3 characters long")
    })
})

describe("Retreiving users from non-empty database", () => {
    beforeEach(async () => {
        await helper.cleanAndInitUserDatabase()
    })

    test("Can retrieve all users from database with a GET request", async () => {
        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})