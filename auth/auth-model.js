const db = require("../database/dbConfig");

module.exports = {
	add,
	find,
	findBy,
	findById
};

function find(username) {
	return db("users")
		.select("id", "username")
		.where("username", username);
}

function findBy(filter) {
	return db("users").where(filter);
}

async function add(user) {
	const [id] = await db("users").insert(user);

	return findById(id);
}

function findById(id) {
	return db("users")
		.where({ id })
		.first();
}
