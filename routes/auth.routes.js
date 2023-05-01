const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");

const { isLoggedIn, isLoggedOut } = require("../middleware/protect-routes");

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

router.get("/signup", isLoggedOut, (req, res, next) => {
  let logged;
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = await User.findOne({ username: req.body.username });
    if (!newUser) {
      if (pwdRegex.test(req.body.password)) {
        const salt = bcryptjs.genSaltSync(13);
        const passwordHash = bcryptjs.hashSync(req.body.password, salt);
        await User.create({
          username: req.body.username,
          password: passwordHash,
        });
        res.redirect("/auth/login");
      } else {
        res.render("auth/signup", {
          errorMessage: "Password too weak",
        });
      }
    } else {
      res.render("auth/signup", {
        errorMessage: "Usarname in use",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", isLoggedOut, (req, res, next) => {
  let logged;
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  try {
    const checkUser = await User.findOne({ username: req.body.username });
    if (!!checkUser) {
      const checkPassword = bcryptjs.compareSync(
        req.body.password,
        checkUser.password
      );
      if (checkPassword) {
        req.session.currentUser = checkUser;
        res.redirect("/task");
      } else {
        res.render("auth/login", {
          errorMessage: "Password incorrect",
        });
      }
    } else {
      res.render("auth/login", {
        errorMessage: "User incorrect",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
