const { _readDb, _insertUser, _deleteDb } = require("../models/mydb.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function to verify token from front-end

const authUser = async (req, res) => {
	const req_token = req.cookies.accessToken;
	const data = jwt.verify(req_token, process.env.JWT_SECRET);
	try {
		// const user = await _readDb("users", "*", "id", "=", data.id, "id", "ASC");
		const user = await _readDb({ email: data.email });
		if (!user) {
			return res.status(400).json({ error: "user not found" });
		}
		const { first_name, last_name, email } = user[0];
		return res.status(200).json({
			first_name: first_name,
			last_name: last_name,
			email: email,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ error: "can't authenticate" });
	}
};

// function to register new user in DB

const register = async (req, res) => {
	const { first_name, last_name, email, password, birth_date, about } =
		req.body;
	const salt = await bcrypt.genSalt();
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		await _insertUser({
			first_name: first_name,
			last_name: last_name,
			email: email,
			password: hashPassword,
			birth_date: birth_date,
			about: about,
		});
		res.json({ msg: "Registered Successfully" });
	} catch (error) {
		res.status(409).json({ error: "Email already exists" });
	}
};

// function to login existing user

const login = async (req, res) => {
	try {
		const user = await _readDb({ email: req.body.email });
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) return res.status(400).json({ error: "Wrong password" });
		const { _id, first_name, last_name, email } = user;
		const accessToken = jwt.sign(
			{ _id, first_name, last_name, email },
			process.env.JWT_SECRET,
			{
				expiresIn: "900s",
			}
		);
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			maxAge: 900 * 1000,
		});
		res.json({
			userId: _id,
			first_name: first_name,
			last_name: last_name,
			email: email,
			accessToken: accessToken,
		});
	} catch (error) {
		res.status(404).json({ error: "Email not found" });
	}
};

// function for logout of current user

const logout = (req, res) => {
	res.clearCookie("accessToken");
	return res.json({ msg: "logging you out" });
};

// function to delete user - can be used by admin

// const deleteUser = async (req, res) => {
// 	try {
// 		const result = await _deleteDb("users", {
// 			id: req.body.user_id,
// 		});
// 		return res.send({ message: "deleted the user" });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(404).json({ error: "couldn't delete user" });
// 	}
// };

module.exports = {
	register,
	login,
	logout,
	// deleteUser,
	authUser,
};
