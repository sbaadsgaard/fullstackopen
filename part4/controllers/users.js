const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()

const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({})
        .populate("blogs", { title: 1, author: 1, likes: 1, url: 1 })
    response.json(users)
})


usersRouter.post("/", async (request, response) => {
    const { name, username, password } = request.body
    if (!password) {
        return response.status(400).json({ error: "Password must be given" })
    } else if (password.length < 3) {
        return response.status(400).json({ error: "Password must be atleast 3 characters long" })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        name,
        username,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter