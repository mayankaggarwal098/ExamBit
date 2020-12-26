const mongoose = require("mongoose");
const express = require("express");
const { MONOGOURI } = require("./config/keys");
const { createadmin } = require("./services/createAdmin");
const app = express();

const login = require("./routes/login");
const signup = require("./routes/signup");
const question = require("./routes/question");

const PORT = process.env.PORT || 3900;
mongoose
  .connect(MONOGOURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/questions", question);
//createadmin();

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
