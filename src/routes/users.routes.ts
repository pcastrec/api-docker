import express from 'express'
import { controller } from '../controllers/users.controller'

export const users = express.Router()

users.get('/users', controller.readAll)
