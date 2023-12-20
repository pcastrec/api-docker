import { Account } from "../entities/account";
import { Request, Response } from "express";

class UserController {
  async readAll(req: Request, res: Response) {
    try {
      const users = await Account.find();
      res.status(200).send(users);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export const controller = new UserController();
