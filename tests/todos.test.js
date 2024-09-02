const request = require("supertest");
const app = require("../apps/app");
const { Todo, User, sequelize } = require("../apps/models");

let user;
let todos;

beforeAll(async () => {
  try {
    user = await User.create({
      email: "test@mail.com",
      password: "rahasia",
    });

    todos = await Todo.bulkCreate([
      { task: "Belajar nodejs", UserId: user.id },
      { task: "Belajar react", UserId: user.id },
    ]);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await Todo.destroy({ truncate: true });
  await User.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Todos resource", () => {

  it("Should be able to get all todos", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Content-Type", "application/json")

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("Should be able to get single todo", async () => {
    const response = await request(app)
      .get(`/todos/${todos[0].id}`)
      .set("Content-Type", "application/json")

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.task).toBeDefined();
    expect(response.body.UserId).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });

  it("Should be able to create new task", async () => {
     const response = await request(app)
       .post("/todos")
       .set("Content-Type", "application/json")
       .send({ task: "Test task", UserId: user.id  });

     expect(response.statusCode).toBe(201);
     expect(response.body.id).toBeDefined();
     expect(response.body.task).toBe("Test task");
     expect(response.body.UserId).toBeDefined();
     expect(response.body.createdAt).toBeDefined();
     expect(response.body.updatedAt).toBeDefined();
  });

});
