const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('returns all blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
        'React patterns'
    )
})

test('blogs can be added', async () => {
    const newBlog = [
        {
            title: "uusi blogi",
            author: "blog_api.test",
            url: "----",
            likes: 0
        }
    ]
    let blogObject = new Blog(newBlog[0])
    await blogObject.save()

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'uusi blogi'
    )
})

test('blogs can be deleted', async () => {
    const newBlog = [
        {
            title: "poistettava blogi",
            author: "blog_api.test",
            url: "----",
            likes: 0
        }
    ]
    let blogObject = new Blog(newBlog[0])
    await blogObject.save()

    await blogObject.delete()
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).not.toContain(
        'poistettava blogi'
    )
})

afterAll(() => {
    mongoose.connection.close()
})