const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const { isEmail } = require('validator')

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    validate: [isEmail, 'Email is not valid'],
    unique: [true, 'This email is already used'],
  },
  password: {
    type: String,
    required: [true, 'There is no password'],
    minlength: [8, 'Password must be more than 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'There is no password'],
    minlength: [8, 'Password must be more than 8 characters'],
    select: false,
  },
  posts: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    default: [],
  },
})

// Hooks
UserSchema.pre('save', async function(next){
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    this.passwordConfirm = ''
  }
  next()
})

module.exports = mongoose.model('User', UserSchema)
