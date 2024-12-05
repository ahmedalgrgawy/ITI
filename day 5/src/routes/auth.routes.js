import express from 'express'
import { deleteUser, getAllUsers, login, logout, signup, updateProfile } from '../controllers/auth.controllers.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', protectedRoute, getAllUsers)

router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

router.delete('/:id', deleteUser)

router.put('/update-profile', protectedRoute, updateProfile)

export default router;