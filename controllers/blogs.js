const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
    /*
    Blog.find({}).then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
    })
    */
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
    /*
    blog.save()
        .then(savedBlog => {
            response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
    */
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    /*
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
    */
})

module.exports = blogsRouter