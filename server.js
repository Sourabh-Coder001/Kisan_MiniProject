import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoute.js';
import cors from 'cors';

//Configure env
dotenv.config();

//database config
connectDB();

//rest object
const app=express();

//middelware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


//routes
app.use('/api',authRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);

//rest api
app.get("/",(req,res)=>{
    res.send({
        message:"Welcome to Kisan mart"
    });
});

//PORT
const PORT=process.env.PORT ||8080;

//run Listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
}
) 