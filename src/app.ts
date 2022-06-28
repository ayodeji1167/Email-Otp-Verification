import express from 'express';
import "express-async-errors"

import mongoose from 'mongoose';
import { errorHandler } from './middleware/ErrorHandler';
import { config } from './config/config';
import { notFound } from './middleware/NotFound';
import authRouter from './router/AuthRouter';

const app = express();
app.use(express.json());

app.use("/user" , authRouter)

app.use(notFound)
app.use(errorHandler)

const start =async () => {
    await mongoose.connect(config.mongo_uri);
    app.listen(config.server_port , ()=> console.log(`Server started  at port ${config.server_port}`)
    )
}

start()
