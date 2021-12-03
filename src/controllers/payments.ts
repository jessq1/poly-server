import { Payment } from '../models/payment'
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/express"

function create(req: IGetUserAuthInfoRequest, res: Response) {
//   req.body.author = req.user.profile
//   Payment.create(req.body)
//   .then(newPayment => {
//     newPayment.populate('author')
//     .then((payment: any) => {
//       res.json(payment)
//     })
//   })
console.log(req.body)
console.log(req.user)
}

function index(req: IGetUserAuthInfoRequest, res: Response) {
  Payment.find({})
  .populate([
    {
      path: 'author'
    },
    {
      path: 'comments',
      populate: {
        path: 'author'
      }
    }
  ])
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
}