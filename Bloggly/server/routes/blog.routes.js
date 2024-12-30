import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { editBlog, getAllBlogs, postBlog, deleteBlog, searchBlog } from '../controllers/blog.controllers.js';

const router = express.Router()

router.get('/', getAllBlogs)

router.post('/post', protectedRoute, postBlog)

router.put('/:id', protectedRoute, editBlog)

router.delete('/:id', protectedRoute, deleteBlog)

router.get('/search/:query', searchBlog)

export default router;