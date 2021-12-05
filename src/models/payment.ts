import mongoose from 'mongoose'

export {
    Payment
}

const paymentSchema = new mongoose.Schema(
  {
    amount: Number,
    initiator: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    person:{type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    paymentFrom: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    paymentTo: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
    methodIsPay: { type: Boolean, default: true },
    note: String,
    completed: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    stripePaymentIntentId: String,
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

const Payment = mongoose.model('Payment', paymentSchema)
