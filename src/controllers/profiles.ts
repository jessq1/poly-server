import { Profile } from "../models/profile"
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/express"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const siteUrl = process.env.SITE_URL

export {
  userProfile,
  index,
  stripeAuthLink,
  checkStripeOnboarding,
  friend,
  unfriend,
}

function index(req: IGetUserAuthInfoRequest, res: Response) {
  Profile.find({stripeOnboard: true})
  .populate('friends')
  .populate('payment')
//   .populate('events')
  .then(profiles => {
    res.json(profiles)
  })
}

function userProfile(req: IGetUserAuthInfoRequest, res: Response) {
  Profile.findById(req.user?.profile)
  .populate('friends')
  .populate('payment')
  // .populate('events')
  .then(profile => {
    return checkStripeOnboarding(profile)
  }).then(profile => {
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
  res.json(accountLink)
}

async function checkStripeOnboarding(profile: any) {
  const accountId = profile.stripeCustomerId

  const account = await stripe.accounts.retrieve(
    accountId
  )
  if(account.charges_enabled){
      profile.stripeOnboard =  true
      profile.save()
    }
  return profile
}

function friend(req: IGetUserAuthInfoRequest, res: Response) {
  Profile.findById(req.user.profile)
  .then(profile => {
    profile.friends.push(req.params.id)
    return profile.save()
  })
    .then(profile => {
      return profile.populate('friends').populate('payment')
    })
    .then((profile)=> {
      res.json(profile)
    })
}

function unfriend(req: IGetUserAuthInfoRequest, res: Response) {
  Profile.findById(req.user.profile)
  .populate('friends')
  .populate('payment')
  .then(profile => {
    profile.friends.remove({ _id: req.params.id })
    profile.save()
    .then(()=> {
      res.json(profile)
    })
  })
}