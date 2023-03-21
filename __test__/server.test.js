const { app } = require("../src/server"); // destructing assignment
const supertest = require("supertest");
const mockRequest = supertest(app);

const { db, people, Clothes } = require("../src/models/index");

// before any of the test create a connection
beforeAll(async () => {
  await db.sync();
});

describe("Web server", () => {
  // Check if 404 is handled

  it("Should respond with hello world for home route", async () => {
    const response = await mockRequest.get("/");
    expect(response.text).toBe("hello world");
  });
  it("Should respond with 404 status on an bad route", async () => {
    const response = await mockRequest.get("/foo");
    expect(response.status).toBe(404);
  });
  it("Should respond with 404 status on an bad method", async () => {
    const response = await mockRequest.put("/people");
    expect(response.status).toBe(404);
  });
});

describe("people router", () => {
  // test if can create a people`
  it("can add a people", async () => {
    const response = await mockRequest.post("/people").send({
      name: "mohamma",
    });
    await mockRequest.post("/people").send({
      name: "alaa",
    });
    await mockRequest.post("/people").send({
      name: "sead",
    });
    expect(response.status).toBe(201);
  });

  // test if can read people
  it("can get all people", async () => {
    const response = await mockRequest.get("/people");
    expect(response.status).toBe(200);
  });

  // test if can read one people
  it("can get one people ", async () => {
    const response = await mockRequest.get("/people/1");
    expect(response.status).toBe(200);

    // you can test the body object or any part of it
    // expect(response.body.message).toBe('pass!')
  });

  // test if can update a people
  it("can update a people record", async () => {
    const response = await mockRequest.put("/people/1").send({
      name: "mohammad-jaradat",
    });
    expect(response.status).toBe(201);
  });

  // test if can delete a people
  it("can delete a people record", async () => {
    const response = await mockRequest.delete("/people/1");
    expect(response.status).toBe(204);
  });
});

describe("clothes router", () => {
  // test if can create a clothes
  it("can add a clothes", async () => {
    const response = await mockRequest.post("/clothes").send({
      type: "T-shirt",
      color: "blue",
      cost: 9.99,
      peopleId: 2,
    });
    await mockRequest.post("/clothes").send({
      type: "T-shirt",
      color: "red",
      cost: 9.99,
      peopleId: 2,
    });
    await mockRequest.post("/clothes").send({
      type: "T-shirt",
      color: "blue",
      cost: 9.99,
      peopleId: 3,
    });
    expect(response.status).toBe(201);
  });

  // test if can read  clothes
  it("can get all clothes", async () => {
    const response = await mockRequest.get("/clothes");
    expect(response.status).toBe(200);
  });
  // test if can read one clothes
  it("can get one clothes ", async () => {
    const response = await mockRequest.get("/clothes/1");
    expect(response.status).toBe(200);

    // you can test the body object or any part of it
    // expect(response.body.message).toBe('pass!')
  });

  // test if can update a clothes
  it("can update a clothes record", async () => {
    const response = await mockRequest.put("/clothes/1").send({
      type: "T-shirt",
      color: "red",
      cost: 7.99,
    });
    expect(response.status).toBe(201);
  });

  // test if can delete a clothes
  it("can delete a clothes record", async () => {
    const response = await mockRequest.delete("/clothes/1");
    expect(response.status).toBe(204);
  });
});

// after all the tests are done
// afterAll(async () => {
//   await db.drop(); // drop the database tables
// });
