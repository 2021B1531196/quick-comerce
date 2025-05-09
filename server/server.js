import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';



const app= express();
const port= process.env.PORT || 4000;

//Allowed origins

const allowedOrigins = ['http://localhost:3000', 'https://your-production-url.com'];


//Middleware config

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));

app.get('/', (req, res) => res.send('Hello api is working!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})