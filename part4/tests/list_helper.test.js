const listHelper = require("../utils/list_helper")

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



/** Just for fun
 * @param {*} listOfLikes number of likes for each blog
 * @returns list of blog objects with dummy data and the supplied likes values
 */
const generateListOfBlogsWithLikes = (listOfLikes) => {
    const blogs = []
    listOfLikes.forEach(likes => {
        blogs.push({
            _id: `dummy id ${likes}`,
            title: `dummy title ${likes}`,
            author: `dummy author ${likes}`,
            url: `http://www.dummyurl${likes}.com`,
            likes: likes,
            __v: 0
        })
    })

    return blogs
}

test("dummy returns 1", () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe("total likes", () => {
    const listWithNoBlogs = []
    test("When the list has zero elements, total likes is zero", () => {
        const result = listHelper.totalLikes(listWithNoBlogs)
        expect(result).toBe(0)
    })

    const listWith1Blog = generateListOfBlogsWithLikes([5])
    test("When list of blogs has one blog, total likes is likes of that blog", () => {
        const result = listHelper.totalLikes(listWith1Blog)
        expect(result).toBe(5)
    })

    const listWith4Blogs = generateListOfBlogsWithLikes([2, 4, 6, 8])
    test("when list has multiple blogs, total likes is the sum of each", () => {
        const result = listHelper.totalLikes(listWith4Blogs)
        console.log(listWith4Blogs)
        expect(result).toBe(20)
    })

})

describe("favourite blog", () => {
    const listWith0Blogs = []
    test("When list has no blogs, favourite should be null", () => {
        const result = listHelper.favouriteBlog(listWith0Blogs)
        expect(result).toBe(null)
    })

    const listWith4Blogs = generateListOfBlogsWithLikes([0, 2, 1, 7])
    const blogWithMaxLikes = generateListOfBlogsWithLikes([10])[0]
    test("List with several blogs, should be blog with max likes", () => {
        const result = listHelper.favouriteBlog(listWith4Blogs.concat(blogWithMaxLikes))
        expect(result).toBe(blogWithMaxLikes)
    })
})

describe("most blogs", () => {
    test("no blogs should give null", () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBe(null)
    })

    test("List with several blogs should return author with most blogs", () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe("most like", () => {
    test("no blogs should give null", () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe(null)
    })

    test("List with several blogs should return author with most likes", () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})
