const express = require("express");
const {
	register,
	login,
	logout,
	authUser,
	// deleteComment,
} = require("../controllers/user.controllers");

const { authJwt } = require("../middleware/auth");

const router = express.Router();

// authentication route for persistent

router.get("/auth", [authJwt.checkToken], authUser);

// routes available to All

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// routes available to Users

// router.post("/delete_comment", [authJwt.checkToken], deleteComment);

module.exports = router;
