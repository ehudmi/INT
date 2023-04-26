const { _readDb } = require("../models/mydb.models");
const jwt = require("jsonwebtoken");

// middleware for checking if token exists

const checkToken = async (req, res, next) => {
	const req_token = req.cookies.accessToken;
	if (!req_token) {
		return res.status(200).json({ message: "Please login" });
	}
	if (!jwt.verify(req_token, process.env.JWT_SECRET)) {
		return res.status(401).json({ message: "token verification failed" });
	} else {
		next();
	}
};

const authJwt = {
	checkToken: checkToken,
};
module.exports = { authJwt };
