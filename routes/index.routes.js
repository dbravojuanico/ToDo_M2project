const express = require("express");
const { isLoggedOut } = require("../middleware/protect-routes");
const router = express.Router();

/* GET home page */
router.get("/", isLoggedOut, (req, res, next) => {
  let logged;
  res.render("index");
});

module.exports = router;
