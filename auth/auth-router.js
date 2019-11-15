const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./auth-model");
const secrets = require("../Config/secrets");

router.get("/", (req, res) => {
	Users.find(req.user)
		.then(users => {
			res.json({ users, loggedInUser: req.user.username });
		})
		.catch(err => res.send(err));
});

router.post("/register", (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 8);
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			console.log(err);
			res.status(500).json(error);
		});
});

router.post("/login", (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ token });
			} else {
				res.status(401).json({ message: "Invalid Credentials" });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

function generateToken(user) {
	const payload = {
		username: user.username,
		department: user.department
	};

	const options = {
		expiresIn: "1d"
	};

	return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
