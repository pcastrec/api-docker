import express from 'express'
import { checkToken } from '../middlewares/checkToken'
import { authenticate } from './auth.routes'
import { users } from './users.routes'

export const router = express.Router()

router.use('/', authenticate)
router.use('/', [checkToken], users)