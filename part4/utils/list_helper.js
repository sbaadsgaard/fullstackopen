// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => {
    return sum + blog.likes
}, 0)

const favouriteBlog = blogs => {
    return blogs.length === 0
        ? null
        : blogs.reduce((currMax, blog) => {
            return blog.likes > currMax.likes
                ? blog
                : currMax
        })
}


console.log(favouriteBlog([]))

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}
