import { Payment } from '../models/payment'
import {Profile} from '../models/profile'
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/express"

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
    newPayment.populate('initiator').populate('paymentFrom').populate('paymentTo')
    .then((payment: any) => {
      res.json(payment)
    })
  })
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

function deletepayment(req: IGetUserAuthInfoRequest, res: Response) {
  Payment.findByIdAndDelete(req.params.id)
  .then(payment => {
    res.json(payment)
  })
}

function update(req: IGetUserAuthInfoRequest, res: Response) {
  Payment.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedPayment => {
    updatedPayment.populate('author')
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
  indexProfilePayment
}