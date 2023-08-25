import React from "react";
import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";

const TodoList = () => {
	// useState states
	const [todos, setTodos] = useState([]);
	const [temptTodos, setTemptTodos] = useState("");

	const populateTodos = async () => {
		const response = await fetch("/get-todos", {
			headers: {
				"x-access-token": localStorage.getItem("token"), // gets user jwt token in local storage
			},
		});
		const data = await response.json();
		if (data.status === "success") {
			setTodos(data.todos);
			// if user has an account their todos will be updated and their todo will be set to the todo list
		} else {
			alert(data.error); // else if the users todo is not added the alrt will run
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token"); // gets user jwt token
		if (token) {
			// if jwt token is found
			populateTodos(); // user has access to the todo page
		} else {
			// else
			localStorage.removeItem("token"); // remove jwt token if user does not have an account
			window.location.href = "/"; // user is redirected to the register page
		}
	});
	// allows user to add a new todo to the todo list
	// thus the put method is being used because a new todo is being put to the todo list
	const updateTodos = (e) => {
		e.preventDefault(); //prevents page from reloading
		fetch("/updateTodos", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"), //
			},
			body: JSON.stringify({
				todos: temptTodos, // adds new todo to todo list by using useStates
			}),
		})
			.then((res) => res.json())
			.then(() => populateTodos()); // updates populate todos so todos can be saved to user account
	};
	// removes users todo form the todo list if the users presses the completed button
	const completedTodo = async (e) => {
		const completed = await e.target.value; // await the targeted todos value
		fetch("/removeTodo", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"), // gets user jwt token from local storage
			},
			body: JSON.stringify({
				removeTodo: completed, // sets removetodo to state value
			}),
		})
			.then((res) => res.json())
			.then(() => populateTodos()); // updates todo list
	};

	return (
		<div>
			<form>
				<label>Add Todo:</label> {/* useState targets input value */}
				<input onChange={(e) => setTemptTodos(e.target.value)}></input>
				<button
					onClick={updateTodos}
					type="submit"
				>
					Add
				</button>{" "}
				{/* runs function onclick to add todo */}
			</form>
			<h1>Todos</h1>{" "}
			{/* maps through todos to get the index of the todo which is marked as complete */}
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo}
						<button
							onClick={completedTodo}
							value={todo}
						>
							Completed
						</button>
					</li>
					// onclick button runs function
				))}
			</ul>
		</div>
	);
};

export default TodoList;
