import mongoose from 'mongoose'

export {
    Payment
}

const paymentSchema = new mongoose.Schema(
  {
    amount: Number,
    initiator: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    paymentFrom: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
    paymentTo: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    completed: Boolean,
    likes: Number,
    note: String,
  },
  {
    timestamps: true,
  }
)

const Payment = mongoose.model('Payment', paymentSchema)
