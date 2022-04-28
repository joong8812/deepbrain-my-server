import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import morgan from "morgan";

import db from "./app/models/index.js";

import index from './app/routes/index.js'

import getResponse from "./app/lambdas/getResponse.js";
import applyPassport from "./app/lambdas/applyPassport.js";
import applyDotenv from "./app/lambdas/applyDotenv.js";

const startServer = async () => {
  const app = express();
  const { mongoUri, port, jwtSecret } = applyDotenv(dotenv);

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const _passport = applyPassport(passport, jwtSecret);

  app.use(_passport.initialize());
  app.use("/", index);
  app.use(morgan("dev"));

  db.mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(" ### MongoDB connection success ### ");
    })
    .catch((err) => {
      console.log(" ### MongoDB connection fail ###", err);
      process.exit();
    });

  app.all("*", (_req, res) => {
    return getResponse.notFoundResponse(res, "Not Found Page!!!");
  });

  app.use((err, _req, res) => {
    if (err.name === "UnauthorizedError") {
      return getResponse.unauthorizedResponse(res, err.message);
    }
  });

  app.listen(port, () => {
    console.log("***************** ***************** *****************");
    console.log("********** 서버가 정상적으로 실행되고 있습니다 *********");
    console.log("***************** ***************** *****************");
  });
};

startServer()