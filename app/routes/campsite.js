import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import CampsiteService from "../services/campsite.js";
import applyDotenv from "../lambdas/applyDotenv.js";

const { origin } = applyDotenv(dotenv);
const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});
app
  .route("/")
  .post(cors(corsOptions), (req, res) => {
    CampsiteService().createCampsite(req, res);
  })
  .get(cors(corsOptions), (req, res) => {
    CampsiteService().getCampsites(req, res);
  });
app
  .route("/:id")
  .patch(cors(corsOptions), (req, res) => {
    CampsiteService().updateCampsite(req, res);
  })
  .delete(cors(corsOptions), (req, res) => {
    CampsiteService().deleteCampsite(req, res);
  });

export default app;
