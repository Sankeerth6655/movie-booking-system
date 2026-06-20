import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import router from './routes/index.js';

export const app = express();
app.use(cors({
    origin:"*",
    credentials:true
}));
app.use(express.json());

app.use('/',router);





