const Post = require('../models/Post.js')
const User = require('../models/User.js')

class PostController {
  async getAllPosts(req, res, next) {
    try {
      const posts = await Post.find()

      res.status(200).json({
        status: 'success',
        data: {
          results: posts.lengh,
          posts,
        },
      })
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'something went wrong',
      })
    }
  }

  async getPost(req, res, next) {
    try {
      const id = req.params.id
      const post = await Post.findById(id)

      res.status(200).json({
        status: 'success',
        data: {
          post,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no post found with this id',
      })
    }
  }

  async createPost(req, res, next) {
    try {
      const { title, content, author } = req.body

      const post = await Post.create({
        title,
        content,
        author,
      })

      const user = await User.findById(author)
      
      user.posts.push(post)
      await user.save()

      res.status(201).json({
        status: 'success',
        data: {
          post,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no post found with this id',
      })
    }
  }

  async updatePost(req, res, next) {
    try {
      const { id } = req.params

      const post = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })

      res.status(200).json({
        status: 'success',
        data: {
          post,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no post found with this id',
      })
    }
  }

  async deletePost(req, res, next) {
    try {
      const id = req.params.id
      await Post.findByIdAndDelete(id)
      res.status(204).json({
        status: 'success',
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no post found with this id',
      })
    }
  }
}

module.exports = new PostController()
