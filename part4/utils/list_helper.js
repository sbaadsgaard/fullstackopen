const _ = require("lodash")

const blogs = [
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

// eslint-disable-next-line no-unused-vars
const dummy = blogsList => 1

const totalLikes = blogsList => blogsList.reduce((sum, blog) => {
    return sum + blog.likes
}, 0)

const favouriteBlog = blogsList => {
    return blogsList.length === 0
        ? null
        : blogsList.reduce((currMax, blog) => {
            return blog.likes > currMax.likes
                ? blog
                : currMax
        })
}


const mostBlogs = (blogsList) => {
    if (blogsList.length === 0) return null

    const [author, blogs] = _.maxBy(
        _.entries(
            _.countBy(blogsList, "author")),
        ([, count]) => count)
    return { author, blogs }
}



const mostLikes = blogsList => {
    if (blogsList.length === 0) return null
    const groups = _.groupBy(blogsList, "author")
    const likeCounts = _.map(_.entries(groups), ([author, blogs]) => {
        return { author, likes: _.sumBy(blogs, "likes") }
    })
    return _.maxBy(likeCounts, "likes")
}

const initialBlogs = () => blogs

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs
}
