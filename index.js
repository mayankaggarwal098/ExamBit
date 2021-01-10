const mongoose = require("mongoose");
const express = require("express");
const { MONOGOURI } = require("./config/keys");
const { createadmin } = require("./services/createAdmin");
const app = express();

const login = require("./routes/login");
const signup = require("./routes/signup");
const question = require("./routes/question");
const testpaper = require("./routes/testPaper");
const student = require("./routes/student");
const result = require("./routes/result");
const admin = require("./routes/admin");
const snapshots = require("./routes/snapshots");
const PORT = process.env.PORT || 3900;
mongoose
  .connect(MONOGOURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/questions", question);
app.use("/api/test", testpaper);
app.use("/api/student", student);
app.use("/api/result", result);
app.use("/api/supervisor", admin);
app.use("/api/snapshot", snapshots);
//createadmin();

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
