import db from "../models/index.js";

export default function CampsiteService() {
  const Campsite = db.Campsite;

  return {
    createCampsite(req, res) {
      const data = req.body;
      new Campsite(data).save((err) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log("create new campsite fail");
          return;
        } else {
          res.status(200).json({ ok: "ok" });
        }
      });
    },
    getCampsites(req, res) {
      Campsite.find()
        .limit(10)
        .sort([["_id", -1]])
        .exec((err, campsites) => {
          res.status(200).json(campsites);
        });
    },
    getCampsite(req, res) {
      const { id } = req.params;
      console.log("id", id);
      Campsite.findById(id).exec((err, campsite) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log("read a campsite fail");
        } else {
          res.status(200).json(campsite);
        }
      });
    },
    updateCampsite(req, res) {
      const { id } = req.params;
      Campsite.findByIdAndUpdate(id, { ...req.body }, (err) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log("update a campsite fail");
          return;
        } else {
          res.status(200).json({ ok: "ok" });
        }
      });
    },
    deleteCampsite(req, res) {
      const { id } = req.params;
      Campsite.findByIdAndDelete(id, (err) => {
        if (err) {
          res.status(500).json({ message: err });
          console.log("delete a campsite fail");
          return;
        } else {
          res.status(200).json({ ok: "ok" });
        }
      });
    },
  };
}
