const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const initialUsers = [
    {
        name: "mr root",
        username: "root",
        password: "RootPassword"
    },
    {
        name: "Michael Chan",
        username: "MrChan",
        password: "Chan123"
    },
    {
        name: "Edsger W. Dijkstra",
        username: "Dijkstra",
        password: "Edsger W. Dijkstra246"
    },
    {
        name: "Robert C. Martin",
        username: "MartinTheMan",
        password: "Martin314"
    }
]

const blogsInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const nonExistingID = async () => {
    const dummy = new Blog({
        title: "dummy",
        author: "dummy",
        url: "dummy",
        likes: 0
    })

    const result = await dummy.save()
    await result.deleteOne()
    return result._id.toString()
}

const cleanAndInitUserDatabase = async () => {
    await User.deleteMany({})
    for (const user of initialUsers) {
        const passwordHash = await bcrypt.hash(user.password, 10)
        const newUser = new User({
            name: user.name,
            username: user.username,
            passwordHash
        })
        await newUser.save()
    }
}


module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb, nonExistingID, cleanAndInitUserDatabase
}