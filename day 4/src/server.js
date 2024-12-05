import express from 'express'
import dotenv from "dotenv";
import { connectDB } from './lib/connectDb.js';
import orderRoutes from './routes/order.routes.js'

dotenv.config();

const app = express()

const port = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));

app.use('/api/orders', orderRoutes)

app.listen(port, () => {
    connectDB()
    console.log('Server is Live on ' + port)
})