const router = require("express").Router();

router.use(require("./register"));
router.use("/todos", require("./todos"));

module.exports = router;
