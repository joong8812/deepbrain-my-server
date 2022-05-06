import dotenv from 'dotenv'
import mongoose from 'mongoose'
import CampsiteModel from './Campsite.js'
import UserModel from './User.js'

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dotenv.MONGO_URI
db.Campsite = new CampsiteModel(mongoose)
db.User = new UserModel(mongoose)

export default db
