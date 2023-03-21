const logger = (req, res, next) => {
  console.log(
    "Time:",
    Date.now(),
    "-- Method: ",
    req.method,
    "-- route :",
    req.path
  );
  next();
};
module.exports = logger;
