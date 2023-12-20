import express, { Request, Response } from "express";
import loginRouter from "./login";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'API endpoint reached!' });
});

router.use('/api', loginRouter);

export default router;