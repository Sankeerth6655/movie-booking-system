import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';
import { app } from './app';

connectDB();
const PORT = process.env.PORT || 3500;
app.listen(PORT,()=>{
    console.log(`Server running on: http://localhost:${PORT}`);
})