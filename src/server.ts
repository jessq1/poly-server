import 'dotenv/config.js'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import stripe from 'stripe'
import logger from "morgan";

//routes:

//config:
import('./config/database')

const app = express()

// app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'build')))
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Express is listening on port ${port}.`)
})