import mongoose from 'mongoose'

export {
  Profile
}

const profileSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    avatar: {
      type: String,
      default: '/images/Account/user.svg'
    },
    balance: Number,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
    payment: [{type: mongoose.Schema.Types.ObjectId, ref: "Payment"}],
    events:[{type: mongoose.Schema.Types.ObjectId, ref: "Event"}],
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Profile', profileSchema)
