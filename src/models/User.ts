import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required: [true, 'please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: 'String',
    required: [true, 'please provide password'],
    minlength: 6,
    select: false,
  },
  refreshToken: {
    type: 'String',
  },
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}
UserSchema.methods.createRefreshToken = function () {
  this.refreshToken = jwt.sign({ userId: this._id }, process.env.JWT_REFRESH_TOKEN, {})
}
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}
export default mongoose.model('User', UserSchema)
