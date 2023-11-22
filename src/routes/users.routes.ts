import express from 'express'
import { controller } from '../controllers/users.controller'

export const users = express.Router()

users.get('/users', controller.readAll)
users.get('/users/:id', controller.readOne)
users.post('/users', controller.create)
users.put('/users/:id', controller.update)
users.delete('/users/:id', controller.delete)