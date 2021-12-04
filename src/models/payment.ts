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
    note: String,
    completed: Boolean,
    likes: Number,
    stripePaymentIntentId: String,
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

const Payment = mongoose.model('Payment', paymentSchema)
