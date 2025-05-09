import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';


import connectDB from './configs/db.js';
import 'dotenv/config';

import userRouter from './routes/UserRoute.js';


const app= express();
const port= process.env.PORT || 4000;

await connectDB()

//Allowed origins

const allowedOrigins = ['http://localhost:5173', 'https://quick-comerce.vercel.app'];


//Middleware config

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));

app.get('/', (req, res) => res.send('Hello api is working!'));
app.use('/api/user',userRouter); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})