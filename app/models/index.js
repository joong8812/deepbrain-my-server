import dotenv from 'dotenv'
import mongoose from 'mongoose'
import CampsiteModel from './Campsite.js'

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dotenv.MONGO_URI
db.Campsite = new CampsiteModel(mongoose)

export default db
