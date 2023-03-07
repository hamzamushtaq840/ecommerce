import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js'
import { errorHandler } from './middlewares/errorHandler.js'
import userRoutes from './routes/userRoutes.js'
const app = express()

dotenv.config({ path: "./.env" })
mongoose.set('strictQuery', true);
app.use(express.json());
app.use(cors(corsOptions))
app.use('/user', userRoutes)

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected');
    })
    .catch((e) => {
        console.log(e.code, '=>', e.message);
    })

app.use(errorHandler)
app.listen(process.env.PORT, () => console.log('Server listening on port 5000'))