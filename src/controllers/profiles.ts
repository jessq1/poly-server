import { Profile } from "../models/profile"
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/express"


export {
  userProfile,
  index,
}

function index(req: IGetUserAuthInfoRequest, res: Response) {
  Profile.find({})
  .populate('friends')
  .populate('payment')
//   .populate('events')
  .then(profiles => {
    res.json(profiles)
  })
}

function userProfile(req: IGetUserAuthInfoRequest, res: Response) {
  Profile.findById(req.user.profile)
  .populate('friends')
  .populate('payment')
//   .populate('events')
  .then(profile => {
    res.json(profile)
  })
}