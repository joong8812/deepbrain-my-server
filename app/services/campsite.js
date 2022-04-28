import db from "../models/index.js";

export default function CampsiteService() {
  const Campsite = db.Campsite;

  return {
    getCampsites(req, res) {
      Campsite.find().exec((err, campsites) => {
        res.status(200).json(campsites);
      });
    },
  };
}
