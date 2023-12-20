import express from 'express'
import { checkToken } from '../middlewares/checkToken'
import { users } from './users.routes'

export const router = express.Router()

router.use('/', [checkToken], users)