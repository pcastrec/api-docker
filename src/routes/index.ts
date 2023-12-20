import express, { Request, Response } from "express";
import loginRouter from "./login";
import thomasRouter from "./thomas.routes";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'API endpoint reached!' });
});

router.use('/api', loginRouter);
router.use('/thomas', thomasRouter);

export default router;