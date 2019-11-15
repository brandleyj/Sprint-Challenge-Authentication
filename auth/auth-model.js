const db = require("../database/dbConfig");

module.exports = {
	add,
	findBy
};

async function add(user) {
	const newUser = await db("users").insert(user);
}

function findBy(filter) {
	return db("users").where(filter);
}
