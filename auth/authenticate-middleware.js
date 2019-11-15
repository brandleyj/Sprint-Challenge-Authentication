const jwt = require("jsonwebtoken");

const secrets = require("../Config/secrets");

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, actualToken) => {
			if (err) {
				res.status(401).json({ you: "shall not pass!" });
			} else {
				req.user = {
					username: actualToken.username
				};
				next();
			}
		});
	} else {
		res.status(400).json({ message: "No credentials were given" });
	}
};
