import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 6

export { User }

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, lowercase: true, unique: true },
  password: String,
  profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true,
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password
    return ret
  },
})

userSchema.pre("save", function (next) {
  const user = this
  if (!user.isModified("password")) return next()
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

userSchema.methods.comparePassword = function (tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb)
}

const User = mongoose.model('User', userSchema)