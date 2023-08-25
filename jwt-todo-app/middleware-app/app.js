// imports
let PORT = 8080 || process.env.PORT;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
let jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require('mongoose')
// imports controllers
const todosController = require('./controllers/todos.controller');
const usersController = require('./controllers/users.controller');
//impots express
const app = express();
// use cors
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// connects controllers with front-end file paths
app.use('/', todosController);
app.use('/', usersController);

const url =
	"mongodb+srv://chellamans:Chellamans2004@cluster.yk51olc.mongodb.net/?retryWrites=true&w=majority";
// connects to database
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
// logs error if one occurs when connecting to database
mongoose.connection.on("error", function () {
	console.log("Could not connect to the database. Exiting now...");
	process.exit();
});
// runs if database is successfully connected to
mongoose.connection.once("open", function () {
	console.log("Successfully connected to the database!");
});
//launches port
app.listen(PORT, () => {
console.log("Application up and running on port: " + PORT);
});
