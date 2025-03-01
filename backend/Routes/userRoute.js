const express = require("express");
const { addUser, validateUser } = require("../Controller/userController");
const router = express.Router();

router.post("/addUser", addUser);
router.post("/validateUser", validateUser);

module.exports = router