import CONF from './core/conf.js'
import express from 'express'
import pokemonRouter from './entities/pokemon/router.js'
import userRouter from './entities/user/router.js'
import mongoose from 'mongoose'
import { handlerError } from './core/middlewares.js'


mongoose.connect(CONF.DB_URL, {})
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.error('Error in DB connection:', err))

const app = express();


app.use(express.json());

app.use('/pokemon', pokemonRouter)
app.use('/user', userRouter)

app.use(handlerError);


app.listen(3000,()=>console.log('Servidor levantado en 3000'));


