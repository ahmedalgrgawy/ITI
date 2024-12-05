import express from 'express'
import { insertData, runQueries } from '../controllers/order.controller.js'

const router = express.Router()

router.get('/allQueries', runQueries)

router.post("/insert", insertData)

export default router