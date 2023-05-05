import express from "express";
import User from "../models/userModels";
import { getToken } from "../util";
import ProductView from "../../frontend/src/views/ProductView";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signInUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (signInUser) {
    res.send({
      _id: signInUser.id,
      name: signInUser.name,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      token: getToken(signInUser)
    });
  } else {
    res.status(401).send({ msg: "invalid email or passpowrd" });
  }
});
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "rudryl",
      email: "rudryl@gmail.com",
      password: "1234",
      isAdmin: true
    });
    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});
router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: getToken(newUser)
    });
  } else {
    res.send("invalid user data");
  }
});

export default router;
