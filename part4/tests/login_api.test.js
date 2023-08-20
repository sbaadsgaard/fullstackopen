const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)

describe("Logging in to existing users", () => {
    beforeEach(async () => {
        await helper.cleanAndInitUserDatabase()
    })

    test("Can succesfully login in to user with correct username and password", async () => {
        const loginRequest = {
            username: "root",
            password: "RootPassword"
        }
        const result = await api
            .post("/api/login")
            .send(loginRequest)
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(result.body.username).toEqual(loginRequest.username)
        expect(result.body.token).toBeDefined()
    })

    test("Fails to login with an incorrect username", async () => {
        const loginRequest = {
            username: "wrongroot",
            password: "RootPassword"
        }
        const result = await api
            .post("/api/login")
            .send(loginRequest)
            .expect(401)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("Invalid username or password")
    })

    test("Fails to login with an incorrect password", async () => {
        const loginRequest = {
            username: "root",
            password: "WrongPassword"
        }
        const result = await api
            .post("/api/login")
            .send(loginRequest)
            .expect(401)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("Invalid username or password")
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})