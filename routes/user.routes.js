const { Router } = require("express");
const router = Router();
const { getUser, getSession } = require("../controllers/user.controllers");



router.get("/users", getUser);
router.post("/users/:session", getSession);


module.exports = router;
