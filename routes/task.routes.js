const { Router } = require("express");
const router = Router();
const {
  getTasks,
  postTask,
  doneTask,
} = require("../controllers/task.controllers");
const { isAutenticated } = require("../controllers/user.controllers");

router.get("/tasks/:id", isAutenticated, getTasks);
router.post("/tasks/:id", isAutenticated, postTask);
router.patch("/tasks/:id", isAutenticated, doneTask);

module.exports = router;
