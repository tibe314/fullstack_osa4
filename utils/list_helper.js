const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = (sum, item) => {
        return sum + item.likes
    }
    return blogs.lenght === 0
        ? 0
        : blogs.reduce(total, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}