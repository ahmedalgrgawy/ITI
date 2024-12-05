import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { createList, deleteList, editList, getAllList } from '../controllers/list.controllers.js';

const router = express.Router()

router.get("/", protectedRoute, getAllList)

router.post("/create", protectedRoute, createList)

router.put("/edit/:id", protectedRoute, editList)

router.delete("/:id", protectedRoute, deleteList)

export default router;