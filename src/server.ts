import 'dotenv/config.js'

import { Express } from 'express'
const express = require('express');
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import stripe from 'stripe'
import logger from "morgan";

//routes:
import { router as authRouter } from './routes/auth'
import { router as profilesRouter } from './routes/profiles'

//config:
import('./config/database')


const app: Express = express()

// app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'build')))
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter)


const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Express is listening on port ${port}.`)
})