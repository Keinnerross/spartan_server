const { Router } = require("express");
const router = Router();
const { getTasks, postTask, doneTask} = require("../controllers/task.controllers");

router.get("/tasks/:id", getTasks);
router.post("/tasks/:id", postTask);
router.patch("/tasks//:id", doneTask);


module.exports = router;
