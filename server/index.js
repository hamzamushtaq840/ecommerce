import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js'
import { errorHandler } from './middlewares/errorHandler.js'
import user from './routes/user.js'
import books from './routes/books.js'
import refreshToken from './routes/token.js'
import verifyJWT from './middlewares/verifyJWT.js'
import cookieParser from 'cookie-parser'
const app = express()

dotenv.config({ path: "./.env" })
mongoose.set('strictQuery', true);
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())
app.use('/user', user)
app.use('/refreshToken', refreshToken)
app.use('/books', verifyJWT, books)

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected');
    })
    .catch((e) => {
        console.log(e.code, '=>', e.message);
    })

app.use(errorHandler)
app.listen(process.env.PORT, () => console.log('Server listening on port 5000'))