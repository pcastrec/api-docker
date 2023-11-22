import { Account } from "../entities/account";
import { Request, Response } from "express";
import { validate } from "class-validator";

class UserController {

    async readAll(req: Request, res: Response) {
        try {
            const users = await Account.find()
            return res.status(200).send(users)
        } catch (e) {
            console.error('ERRORS', e)
        }
    }

    async readOne(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await Account.findOneBy({ id: parseInt(id) })
            return res.status(200).send(user)
        } catch (e) {
            console.error('ERRORS', e)
        }
    }

    async create(req: Request, res: Response) {
        try {
            const user = new Account(req.body)
            const errors = await validate(user)
            if (errors.length > 0) throw errors
            return res.status(201).json(await Account.save(user))
        } catch (e) {
            console.error('ERRORS', e)
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await Account.findOneByOrFail({ id: parseInt(id) })
            return res.status(200).send(await Account.update(user.id, new Account({
                ...user,
                ...req.body
            })))
        } catch (e) {
            console.error('ERRORS', e)
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            return res.status(200).send(await Account.delete(id))
        } catch (e) {
            console.error('ERRORS', e)
        }
    }
}

export const controller = new UserController()