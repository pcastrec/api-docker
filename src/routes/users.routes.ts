import express from 'express'
import { userController } from '../controllers/users.controller'

export const users = express.Router()

users.post('/', userController.create)
users.get('/', userController.readAll)
users.get('/:firmname', userController.readOne)
users.put('/:firmname', userController.updateOne)
