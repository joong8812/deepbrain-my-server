import express from "express";

const indexRouter = express.Router();

indexRouter.route("/").get((_req, res) => {
  res.json({ "Now time : ": new Date().toLocaleString() });
});

export default indexRouter;
