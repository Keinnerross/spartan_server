const pool = require("../db/db");

const getTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      "select * from tasks where created_by = ? ",
      [id]
    );
    res.json(rows);
  } catch (error) {
    res.send(`error: ${error}`);
  }
};

const postTask = async (req, res) => {
  try {
    const userid = req.params.id;
    const { name_task, description_task } = req.body;
    pool.query(
      "INSERT INTO tasks (name_task, description_task, created_by, its_done) VALUES (?, ?, ?, 0)",
      [name_task, description_task, userid]
    );
    res.json("New task add");
  } catch (err) {
    res.send(`error: ${err}`);
  }
};

const doneTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { its_done } = req.body;
    await pool.query("UPDATE tasks SET its_done = ? WHERE id_task = ? ", [
      its_done,
      id,
    ]);
    res.json("Done Change");
  } catch (err) {
    res.send(`error: ${err}`);
  }
};

module.exports = {
  getTasks,
  postTask,
  doneTask,
};
