const { index, show, create } = require("../controllers/todos.controller");

const router = require("express").Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", create);

module.exports = router;
