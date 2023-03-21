require("dotenv").config();

const server = require("./src/server");

const port = process.env.PORT || 5000;

const { db, ConnectionTest } = require("./src/models/index");

db.sync().then(() => {
  server.start(port);
  ConnectionTest();
});
