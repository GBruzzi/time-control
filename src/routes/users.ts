import express from 'express'

import { getUsers, addUser, updateUser, deleteUser, getUser } from '../controllers/user'

const router = express.Router()

router.get('/usuarios', getUsers)

router.get('/usuarios/:id', getUser)

router.post('/usuarios', addUser)

router.put('/usuarios/:id', updateUser)

router.delete('/usuarios/:id', deleteUser)


export default router