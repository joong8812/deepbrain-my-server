import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import CampsiteService from '../services/campsite.js'
import applyDotenv from "../lambdas/applyDotenv.js";

const { origin } = applyDotenv(dotenv);
const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors())
app.use((_req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})
app.get('/', cors(corsOptions), (req, res) => {
  CampsiteService().getCampsites(req, res)
})

export default app