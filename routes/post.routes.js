const router = require('express').Router()
const postController = require('../controllers/post.controller.js')

// Post CRUD Operations

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost)

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router
