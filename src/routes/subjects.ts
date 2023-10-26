import express from 'express'

import { getSubjects, getSubject, addSubject, updateSubject, deleteSubject} from '../controllers/subjectController'

const router = express.Router()

router.get('/subjects', getSubjects)
router.get('/subjects/:id', getSubject)
router.post('/subjects', addSubject)

router.put('/subjects/:id',updateSubject )

router.delete('/subjects/:id', deleteSubject)

export default router