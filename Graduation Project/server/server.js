import express from 'express'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from './routes/auth.routes.js'
import blogRoutes from './routes/blog.routes.js'

import { connectDB } from './lib/db.js';

dotenv.config();

const app = express()

const port = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use('/api/user', authRoutes)
app.use("/api/blog", blogRoutes);

app.listen(port, () => {
    connectDB()
    console.log('Server is Live on ' + port)
})