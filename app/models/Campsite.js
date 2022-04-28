import mongoose from "mongoose"

export default function CampsiteModel(mongoose) {
  const campsiteSchema = mongoose.Schema({
    name: String,
    type: String,
    address: String,
    glamping: String,
    caravan: String,
    toilet: String,
    shower: String,
    wash: String
  })

  return mongoose.model('Campsite', campsiteSchema)
}