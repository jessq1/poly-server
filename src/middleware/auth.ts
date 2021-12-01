import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../types/express"


const SECRET = process.env.SECRET


const decodeUserFromToken = ((req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	let token = req.get('Authorization') || req.query.token || req.body.token
	if (token) {
		token = token.replace('Bearer ', '')
		jwt.verify(token, SECRET, (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
			if (err) {
				next(err)
			} else {
					req.user = decoded?.user
					next()
				}
		})
	} else {
		next()
	}
})

const checkAuth = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	return req.user ? next() : res.status(401).json({ msg: 'Not Authorized' })
}

export {
  decodeUserFromToken,
  checkAuth
}