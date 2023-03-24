const pool = require("../db/db");

const getHabit = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      "select * from habits where created_by = ? ",
      [id]
    );
    res.json(rows);
  } catch (error) {
    res.send(`error: HAY UN ERROR ${error}`);
  }
};

const postHabit = async (req, res) => {
  try {
    const userid = req.params.id;
    const { name_habit, description_habit } = req.body;
    pool.query(
      "INSERT INTO habits (name_habit, description_habit, created_by, done_habit) VALUES (?, ?, ?, 0)",
      [name_habit, description_habit, userid]
    );
    res.json("New habit added");
  } catch (err) {
    res.send(`error: ${err}`);
  }
};
module.exports = { getHabit, postHabit };
