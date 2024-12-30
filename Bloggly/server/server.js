import express from 'express'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";

import authRoutes from './routes/auth.routes.js'
import blogRoutes from './routes/blog.routes.js'

import { connectDB } from './lib/db.js';

dotenv.config();

const app = express()

const port = process.env.PORT || 5000;
const __dirname = path.resolve();


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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'))
    })
}


app.listen(port, () => {
    connectDB()
    console.log('Server is Live on ' + port)
})