const mongoose = require("mongoose")
const supertest = require("supertest")
//const _ = require("lodash")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require("../models/user")

const cleanAndInitUserDatabase = async () => {
    User.deleteMany({})
    for (const user of helper.initialUsers) {
        const passwordHash = await bcrypt.hash(user.password, 10)
        const newUser = new User({
            name: user.name,
            username: user.username,
            passwordHash
        })
        await newUser.save()
    }
}

describe("Creating users with existing users in database", () => {
    beforeEach(async () => {
        await cleanAndInitUserDatabase()
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
})

describe("Retreiving users from non-empty database", () => {
    beforeEach(async () => {
        await cleanAndInitUserDatabase()
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