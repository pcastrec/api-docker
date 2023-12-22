import express, { Request, Response } from "express";
<<<<<<< HEAD
import loginRouter from "./login";
import thomasRouter from "./thomas.routes";
=======
import { users } from "./users.routes";
>>>>>>> daf2541 (correction tests)

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'API endpoint reached!' });
});

<<<<<<< HEAD
router.use('/api', loginRouter);
router.use('/thomas', thomasRouter);
=======
router.use('/users', users);
>>>>>>> daf2541 (correction tests)

export default router;