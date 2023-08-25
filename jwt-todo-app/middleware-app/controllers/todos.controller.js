const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const charactersCheck = require("../middleware/charactersCheck");
const contentType = require("../middleware/contentTypeCheck");

router.get("/get-todos", async (req, res) => {
	const token = req.headers["x-access-token"];
	try {
		const decoded = jwt.verify(token, "jwt-secret"); //verifies users jwt token
		const email = decoded.email; // verifies user email
		const user = await User.findOne({
			email: email, // finds user email
		});
		return res.send({ status: "success", todos: user.todos }); // user has a jwt token
	} catch (error) {
		console.log(error);
		res.send({ status: "error", error: "Invalid token" }); // user does not have a valid jwt token
	}
});

router.put("/updateTodos", charactersCheck, contentType, async (req, res) => {
	const token = req.headers["x-access-token"];
	try {
		const decoded = jwt.verify(token, "jwt-secret"); // verifies user jwt token
		const email = decoded.email; // verifies user email
		await User.updateOne(
			{
				email: email, // updates user todo if user jwt token is verified
			},
			{ $push: { todos: req.body.todos } } // updates user todo list
		);
		return res.send({ status: "success" }); // user todos is updated
	} catch (error) {
		console.log(error);
		res.send({ status: "error", error: "Invalid token" }); // user todos is not updated an error occurred
	}
});

router.put("/removeTodo", contentType, async (req, res) => {
	const token = req.headers["x-access-token"];
	try {
		const decoded = jwt.verify(token, "jwt-secret"); // verifies user jwt token
		const email = decoded.email; // verifies user jwt token with their email
		const user = await User.findOne({
			email: email, // finds user email
		});
		const removedIndex = user.todos.indexOf(req.body.removeTodo); // targets index of todo being removed
		console.log(req.body.removeTodo);
		if (removedIndex !== -1) {
			// if index of removed todo is not -1
			user.todos.splice(removedIndex, 1); // splice index of the removed todo
			await user.save(); // saves user todo list without completed todo (removed completed todo)
		}
		return res.send({ status: "success" }); // users completed todo is successfully removed
	} catch (error) {
		console.log(error);
		res.send({ status: "error", error: "Invalid token" }); // error occurred while removing users todo
	}
});

module.exports = router;
