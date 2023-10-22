import express from 'express'

import { getUsers, addUser, updateUser, deleteUser, getUser, logUser } from '../controllers/userController'

const router = express.Router()

router.get('/usuarios', getUsers)

router.get('/usuarios/:id', getUser)

router.post('/usuarios', addUser)
router.post('/usuarios/log', logUser)

router.put('/usuarios/:id', updateUser)

router.delete('/usuarios/:id', deleteUser)


export default router