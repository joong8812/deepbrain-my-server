import { MongoClient } from "mongodb";
import applyDotenv from "../lambdas/applyDotenv.js";

const { mongoUri } = applyDotenv(dotenv);

const getDatabase = () => {
  const client = new MongoClient(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let dbConnect = null;
  return {
    acceptDb(callback) {
      client.connect((err, db) => {
        if (err || !db) {
          return callback(err);
        }
        dbConnect = db.db("campdb");
        return callback();
      });
    },
    getDb() {
      return dbConnect;
    },
  };
};

export default getDatabase;
