const router = require("express").Router();
const { register } = require("../controllers/register.controller");

router.post("/register", register);

module.exports = router;
