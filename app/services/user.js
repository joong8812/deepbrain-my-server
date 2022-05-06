import db from "../models/index.js";
import getDatabase from "../lambdas/getDatabase.js";

export default function UserService() {
  const User = db.User;

  return {
    signup(req, res) {
      new User(req.body).save(function (err) {
        if (err) {
          res.status(500).json({ message: err });
          console.log("### Signup fail ###");
          return;
        } else {
          console.log("### Signup success ###");
          res.status(200).json({ ok: "ok" });
        }
      });
    },
    login(req, res) {
      User.findOne(
        {
          userid: req.body.userid,
        },
        function (err, user) {
          if (err) throw err;
          if (!user) {
            res.status(401).send({ success: false, message: "해당 ID가 존재하지 않습니다" });
          } else {
            user.comparePassword(req.body.password, function (_err, isMatch) {
              if (!isMatch) {
                res.status(401).send({ message: "FAIL" });
              } else {
                user.generateToken((err, user) => {
                  if (err) res.status(400).send(err);
                  res.status(200).json(user);
                });
              }
            });
          }
        }
      );
    },
    logout(req, res) {
      req.logout();
      res.json({ msg: "LOGOUT" });
    },
  };
}
