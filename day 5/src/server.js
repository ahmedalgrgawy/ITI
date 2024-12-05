import express from 'express'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes
import authRoutes from './routes/auth.routes.js'
import listRoutes from './routes/list.routes.js'

import { connectDB } from './lib/db.js';

dotenv.config();

const app = express()

const port = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use('/api/user', authRoutes)
app.use('/api/list', listRoutes)

app.listen(port, () => {
    connectDB()
    console.log('Server is Live on ' + port)
})