import { Profile } from "../models/profile"
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/express"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const siteUrl = process.env.SITE_URL

export {
  userProfile,
  index,
  stripeAuthLink,
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

async function stripeAuthLink(req: IGetUserAuthInfoRequest, res: Response) {
  const profile = await Profile.findById(req.user.profile)
    
  const accountLink = await stripe.accountLinks.create({
      account: profile.stripeCustomerId,
      refresh_url: siteUrl + '/login',
      return_url: siteUrl + '/',
      type: 'account_onboarding',
    })
  // console.log(accountLink)
  // res.redirect(
  //     accountLink.url
  //   );
  res.json(accountLink)
}