const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./src/routers/user.routes");
const communityRouter = require("./src/routers/community.routes");
const db = require("./src/config/db.config");
require("./src/config/db.config");
const { Umzug, SequelizeStorage } = require("umzug");

const app = express();
require("dotenv").config();

app.use(cors("*"));
app.use(bodyParser.json());

app.use("/api", userRouter);
app.use("/api", communityRouter);

db.sequelize.sync();

app.get("/", (req, res) => res.send("message seq new" + process.env.Name));

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: db.sequelize }),
  logger: console,
});

umzug.up().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log("listening on 8080");
  });
});
