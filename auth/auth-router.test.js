const request = require("supertest");
const db = require("../database/dbConfig");
const Users = require("./auth-model");
const server = require("../api/server");

describe("auth-router", () => {
	beforeEach(async () => {
		await db("users").truncate();
	});

	//REGISTER ROUTE
	describe("register", () => {
		it("should respond with 201 with valid request", async () => {
			await request(server)
				.post("/api/auth/register")
				.send({ username: "test", password: "test123" })
				.expect(201);
		});
		it("should respond with 400 with invalid request", async () => {
			await request(server)
				.post("/api/auth/register")
				.send({ username: "" })
				.expect(400);
		});
	});

	//LOGIN ROUTE
	describe("login", () => {
		it("should respond with 401 on incorrect username", async () => {
			await Users.add({ username: "testing", password: "testing" });

			await request(server)
				.post("/api/auth/login")
				.send({ username: "test", password: "test123" })
				.expect(401);
		});
		it("should respond with 401 on incorrect password", async () => {
			await Users.add({ username: "test", password: "test123" });

			await request(server)
				.post("/api/auth/login")
				.send({ username: "test", password: "test123" })
				.expect(401);
		});
	});
});
