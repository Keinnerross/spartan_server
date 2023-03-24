const { Router } = require("express");
const router = Router();
const { getHabit, postHabit } = require("../controllers/habit.controllers");

router.get("/habits/:id", getHabit);
router.post("/habits/:id", postHabit);

module.exports = router;
