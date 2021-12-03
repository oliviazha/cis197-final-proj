const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true },
  savedPrompts: [{ type: String}],
  completedPrompts: [{ type: String}]
})

module.exports = model('User', userSchema)
