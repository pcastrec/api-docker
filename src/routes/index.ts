import express, { Request, Response } from "express";
import { users } from "./users.routes";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'API endpoint reached!' });
});
router.use('/users', users);

export default router;