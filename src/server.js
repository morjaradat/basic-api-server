const express = require("express");
const app = express();
const notFoundHandler = require("./error-handler/404");
const serverErrorHandler = require("./error-handler/500");
const logger = require("./middleware/logger");

const peopleRouter = require("./routes/people.route");
const clothesRouter = require("./routes/clothes.route");

app.use(express.json());
app.use(logger);
app.use(peopleRouter);
app.use(clothesRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("*", notFoundHandler);
app.use(serverErrorHandler);

function start(port) {
  app.listen(port, () => console.log(`APT SERVER listening on port ${port}!`));
}

module.exports = {
  app: app,
  start: start,
};
