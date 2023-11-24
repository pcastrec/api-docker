import express from 'express'
import { controller } from '../controllers/auth.controller'
import { controller as users } from '../controllers/users.controller'
import { checkToken } from '../middlewares/checkToken'

export const authenticate = express.Router()

authenticate.post('/register', users.create)
authenticate.post('/login', controller.signin)
authenticate.post('/logout', controller.signout)
authenticate.get('/authorize', [checkToken], controller.authorize)