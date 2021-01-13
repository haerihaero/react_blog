import express from "express";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";
import config from "../../config/index";
const { JWT_SECRET } = config;

//Model
import User from "../../models/user";

const router = express.Router();

//@routes Get api/user
//@desc Get all user
//@access public

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users");
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

//@routes Post api/user
//@desc Register user
//@access public

router.post("/", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  //Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "모든 필드를 채워주세요" });
  }

  //Check for exising user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "이미 가입된 유저" });
    const newUser = new User({
      name,
      email,
      password,
    });

    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

export default router;
