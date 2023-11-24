import { Account } from "../entities/account";
import { Request, Response } from "express";
import { compare } from "bcrypt";

import jwt from 'jsonwebtoken'

class AuthController {

    async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const account = await Account.findOne({ where: { email } })
            if (!account) throw new Error('No account find')
            if (!await compare(password, account.password)) throw new Error('Wrong password')
            const token = jwt.sign(
                { id: account.id },
                process.env.JWT_SECRET!,
                { expiresIn: '3d' }
            )
            res.cookie('token', token)
            res.status(200).send(account)
        } catch (e) {
            res.status(400).send(e)
        }
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token')
        res.status(200).send({ message: true })
    }

    async authorize(req: Request, res: Response) {
        try {
            res.status(200).send({ id: res.locals.payload.id })
        } catch (e) {
            res.status(400).send(e)
        }
    }
}

export const controller = new AuthController()