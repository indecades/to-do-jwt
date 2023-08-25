const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const gmailCheck = require("../middleware/gmailCheck");

router.post("/register", gmailCheck, async (req, res) => {
	try {
		// encrypting the password by using hash // 10: specify strength of encryption
		const newPassword = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			// creates new user if user registers
			name: req.body.name,
			email: req.body.email,
			password: newPassword, // sets users unique password
		});
		res.send({ status: "success" }); // user has successfully been registered
	} catch (error) {
		console.log(error);
		res.send({ status: "error", error: "duplicate email" }); // an error occurred while registering user
	}
});

router.post("/login", async (req, res) => {
	const user = await User.findOne({
		// finds existing user by using users email
		email: req.body.email,
	});
	if (!user) {
		// if not user
		return res.json({ status: "error", error: "invalid login" }); // user didnt use correct information
	} // compares user password to encrypted password
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (isPasswordValid) {
		// if users password matches encrypted password
		const token = jwt.sign(
			{
				// signs user into their account
				name: user.name,
				email: user.email,
			},
			"jwt-secret"
		);
		res.send({ status: "success", user: token }); // user is logged in
	} else {
		return res.send({ status: "error", user: false }); // an error occured while logging user in
	}
});

module.exports = router;
