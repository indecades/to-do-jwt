const mongoose = require("mongoose");
// creates new collection and document in database
const user = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		todos: { type: Array },
	},
	{ collection: "user-data" }
);
const model = mongoose.model("user-data", user);
module.exports = model;
