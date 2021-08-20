const User = require('../models/User')

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await User.find().populate('posts')

      res.status(200).json({
        status: 'success',
        data: {
          results: users.lengh,
          users,
        },
      })
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'something went wrong',
      })
    }
  }

  async getUser(req, res, next) {
    try {
      const id = req.params.id
      const user = await User.findById(id).populate('posts')

      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no user found with this id',
      })
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, password, passwordConfirm } = req.body

      const user = await User.create({
        name,
        email,
        password,
        passwordConfirm,
      })

      user.password = undefined
      user.passwordConfirm = undefined

      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no user found with this id',
      })
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.id

      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })

      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no user found with this id',
      })
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id
      await User.findByIdAndDelete(id)
      res.status(204).json({
        status: 'success',
      })
    } catch (err) {
      res.status(404).json({
        status: 'error',
        message: 'Not Found, no user found with this id',
      })
    }
  }
}

module.exports = new UserController()
