import { Payment } from '../models/payment'
import {Profile} from '../models/profile'
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/express"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function create(req: IGetUserAuthInfoRequest, res: Response) {
  req.body.initiator = req.user.profile
  if (req.body.methodIsPay) {
    req.body.paymentFrom = req.user.profile
    req.body.paymentTo = req.body.person
  } else {
    req.body.paymentTo = req.user.profile
    req.body.paymentFrom = req.body.person
  }
  Payment.create(req.body)
  .then(newPayment => {
    return createPaymentIntent(newPayment)
  })
    .then((payment: any) => {
      res.json(payment)
    })
}

async function createPaymentIntent(payment: any) {
  const paymentAmount = payment.amount
  const accountPaymentTo = payment.paymentTo.stripeCustomerId
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    amount: paymentAmount * 100,
    currency: 'usd',
    application_fee_amount: 0,
    setup_future_usage: 'off_session',
  }, {
    stripeAccount: accountPaymentTo,
  });
  payment.stripePaymentIntentId = paymentIntent.client_secret
  payment.save()
  return payment
}

function index(req: IGetUserAuthInfoRequest, res: Response) {
  Payment.find({'completed': false})
  .populate([
    {
      path: 'initiator',
    },
    {
      path: 'paymentFrom',
    },
    {
      path: 'paymentTo',
    },
  ])
  .then(payments => {
    res.json(payments)
  })
}

function indexPendingPayment(req: IGetUserAuthInfoRequest, res: Response) {
  const profileId = req.user.profile
  Payment.find({'initiator': profileId, 'completed': false})
  .populate([
    {
      path: 'initiator',
    },
    {
      path: 'paymentFrom',
    },
    {
      path: 'paymentTo',
    }
  ])
  .then(payments => {
    res.json(payments)
  })
}

function indexIncompletePayment(req: IGetUserAuthInfoRequest, res: Response) {
  const profileId = req.user.profile
  Payment.find({'person': profileId, 'completed': false})
  .populate([
    {
      path: 'initiator',
    },
    {
      path: 'paymentFrom',
    },
    {
      path: 'paymentTo',
    }
  ])
  .then(payments => {
    res.json(payments)
  })
}

function indexProfilePayment(req: IGetUserAuthInfoRequest, res: Response) {
  const profileId = req.user.profile
  Payment.find({
    $or: [
      { 'paymentFrom': profileId },
      { 'paymentTo': profileId }
    ]
  })
  .populate([
    {
      path: 'initiator',
    },
    {
      path: 'paymentFrom',
    },
    {
      path: 'paymentTo',
    },
  ])
  .then(payments => {
    return payments.filter(p => p.completed)
  })
  .then(filterPayments => {
    res.json(filterPayments)
  })
}

function getPayemnt(req: IGetUserAuthInfoRequest, res: Response) {
  Payment.findById(req.params.id)
  .populate('initiator').populate('paymentFrom').populate('paymentTo')
  .then(payments => {
    res.json(payments)
  })
}

function deletepayment(req: IGetUserAuthInfoRequest, res: Response) {
  Payment.findByIdAndDelete(req.params.id)
  .then(payment => {
    res.json(payment)
  })
}

function update(req: IGetUserAuthInfoRequest, res: Response) {
  Payment.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedPayment => {
    updatedPayment.populate('initiator').populate('paymentFrom').populate('paymentTo')
    .then((payment: any) => {
      res.json(payment)
    })
  })
}



export {
  create,
  index,
  deletepayment as delete,
  update,
  indexIncompletePayment,
  indexPendingPayment,
  indexProfilePayment,
  getPayemnt,
}