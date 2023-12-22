import { validate } from "class-validator";
import { Account } from "../entities/account";
import { Request, Response } from "express";

class UserController {

  async create(req: Request, res: Response) {
    try {
      const account = new Account(req.body)
      const errors = await validate(account)
      if (errors.length > 0) throw errors
      await Account.insert(account)
      return res.status(201).send(account)
    } catch (e) {
      return res.status(400).send(e)
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      res.status(200).send(await Account.find());
    } catch (e) {
      return res.status(400).send(e)
    }
  }

  async readOne(req: Request, res: Response) {
    const { firmname } = req.params
    try {
      const account = await Account.findOneBy({ firmname: firmname })
      res.status(200).send(account)
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async updateOne(req: Request, res: Response) {
    const { firmname } = req.params
    try {
      const updated = await Account
        .createQueryBuilder()
        .update(Account)
        .set({ ...req.body })
        .where("firmname = :firmname", { firmname })
        .returning('*')
        .execute()
      res.status(200).send(updated.raw[0])
    } catch (e) {
      console.error(e)
      return res.status(400).send(e)
    }
  }

}

export const userController = new UserController();