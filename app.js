const express = require("express");
const { PORT } = require("./config/config");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/app.routes"));
app.use("/api", require("./routes/user.routes"));
app.use("/api", require("./routes/task.routes"));
app.use("/api", require("./routes/habit.routes"));

app.listen(PORT, () => {
  console.log(`Server Running in ${PORT} port...`);
});
