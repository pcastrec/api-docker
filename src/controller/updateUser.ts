

import { Request, Response } from 'express';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import { Account } from '../entities/account';


export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id

        const existingUser = await Account.findOneBy({ firmname: req.params.id  });

        if (!existingUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const updateData = req.body;
        await Account.save(updateData);

        return res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user: existingUser });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
    }
};