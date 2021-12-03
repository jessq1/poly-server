import { User } from '../models/user'
import { Profile } from '../models/profile'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export {
  signup,
  login
}

async function login(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ err: "bad credentials" })
    user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
      if (isMatch) {
        const token = createJWT(user)
        res.json({ token })
      } else {
        return res.status(401).json({ err: "bad credentials" })
      }
    });
  } catch (err) {
    return res.status(400).json(err)
  }
}

async function signup(req: Request, res: Response) {
  const profile = new Profile(req.body)
  req.body.profile = profile._id
  const user = new User(req.body)
  try {
    await user.save();
    await profile.save();

    const token = createJWT(user)
    res.json({ token })
  
  } catch (err: any) {
    res.status(400).send({ err: err.errmsg })
  }
}

/*----- Helper Functions -----*/

function createJWT(user: any) {
  return jwt.sign(
    { user }, 
    process.env.SECRET,
    { expiresIn: "24h" }
  )
}
