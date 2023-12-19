import express, { Request, Response } from 'express';
import { dataSource } from "../config/database";

const loginRouter =  express.Router();

loginRouter.delete("/users/:id", async (req, res) => {
  
});

export default loginRouter;