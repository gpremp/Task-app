const router = require("express").Router();
const bcrypt = require("bcrypt");
const {createUser,authUser} = require("./user.contoller")

router.post("/auth",authUser);

router.post("/", createUser)

module.exports = router;
