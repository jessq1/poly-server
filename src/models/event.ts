import mongoose from 'mongoose'

export {
    Event
}

const eventSchema = new mongoose.Schema(
  {
    amount: Number,
    initiator: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    note: String,
    paymentFrom: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
    paymentTo: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    completed: Boolean,
    likes: Number,
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('Event', eventSchema)
