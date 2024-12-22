import express from 'express'
import { getUserBlogs, login, logout, signup } from '../controllers/auth.controllers.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get("/blogs", protectedRoute, getUserBlogs)

router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

export default router;