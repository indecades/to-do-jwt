import React from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";
import { Route, Routes } from "react-router-dom";

function App() {
	//setup routes
	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<Register />}
				></Route>
				<Route
					path="/login"
					element={<Login />}
				></Route>
				<Route
					path="/todo"
					element={<TodoList />}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
