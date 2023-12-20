import express, { Request, Response } from 'express';
import { dataSource } from '../config/database';
import { Account } from '../entities/account';
import { validate } from 'class-validator';

const thomasRouter = express.Router();

thomasRouter.get("/", (req: Request, res: Response) => {
    res.send("test");
});

thomasRouter.get("/users", async (req: Request, res: Response) => {
    const repo = dataSource.getRepository(Account);

    try {
        const users = await repo.find();

        if (users.length === 0) {
            res.status(404);
            res.send("no users");
            return;
        }

        res.status(200);
        res.send(users);
    }
    catch (e) {
        console.error(e);
        res.status(500);
        res.send("Internal Server Error");
    }
});

thomasRouter.get("/users/:firmname", async (req: Request, res: Response) => {
    const { firmname } = req.params;
    const repo = dataSource.getRepository(Account);

    try {
        const user = await repo.findOne({where: { firmname }});

        if (!user) {
            res.status(404).json({error: "No user found"});
            return;
        }

        res.status(200);
        res.send(user);
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.send("Internal Server Error");
    }
});

thomasRouter.post("/users", async (req: Request, res: Response) => {
    const repo = dataSource.getRepository(Account);

    try {
        const userData = req.body;
        const user = new Account(userData);

        if (!userData || !userData.password) {
            res.status(400).json({ error: "Invalid data" });
            return;
        }

        const existingUser = await repo.findOne({ where: { email: userData.email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        await repo.save(user);

        res.status(201).json(user);
    }
    catch(err) {
        console.error(err);

        if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        res.status(500);
        res.send("Internal Server Error");
    }

});

thomasRouter.put("/users/:firmname", async (req: Request, res: Response) => {
    const { firmname } = req.params;
    const repo = dataSource.getRepository(Account);

    try {
        const user = await repo.findOneOrFail({ where: { firmname } });

        const { firstname, lastname, phone, email } = req.body;

        if (firstname !== undefined) user.firstname = firstname;
        if (lastname !== undefined) user.lastname = lastname;
        if (phone !== undefined) user.phone = phone;
        if (email !== undefined) user.email = email;

        const errors = await validate(user, { skipMissingProperties: true });
        if (errors.length > 0) {
            return res.status(400).json({ error: "Validation failed", validationErrors: errors });
        }

        await repo.save(user);

        return res.status(200).json({ message: "User updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.send("Internal Server Error");
    }
});

thomasRouter.delete("/users/:firmname", async (req: Request, res: Response) => {
    const { firmname } = req.params;
    const repo = dataSource.getRepository(Account);

    try {
        const user = await repo.findOne({ where: { firmname }});

        if (!user) {
            res.status(404).json({ error: "No user found" });
            return;
        }

        const remove = await repo.remove(user);

        if (!remove) {
            res.status(500).json({ error: "Failed to remove user" });
            return;
        }

        res.status(200).json({message: "success on removing user"});
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.send("Internal Server Error");
    }
});

export default thomasRouter;