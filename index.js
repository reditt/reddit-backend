const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./src/routers/user.routes");
const db = require("./src/config/db.config");
require("./src/config/db.config");
const app = express();
require("dotenv").config();

app.use(cors("*"));
app.use(bodyParser.json());

app.use("/api", userRouter);

// db.sequelize.sync();

app.get("/", (req, res) => res.send("message" + process.env.Name));

app.listen(process.env.PORT || 8080, () => {
  console.log("listening on 8080");
});
