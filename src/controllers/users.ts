import { User } from '../models/user.js'
import { Request, Response } from "express";

function index(req: Request, res: Response) {
  User.find({})
  .then(users => res.json(users))
}

export {
  index,
}