const logger = require("../src/middleware/logger");

describe("logger middleWare", () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log");
  });
  test("logging something or route ", () => {
    logger(res, req, next);
    expect(consoleSpy).toHaveBeenCalled();
  });
  test("calling next ", () => {
    expect(next).toHaveBeenCalled();
  });
});
