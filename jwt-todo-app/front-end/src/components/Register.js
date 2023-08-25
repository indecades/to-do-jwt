import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
	// useState states
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// handles new users
	// if user registers their information will be saved
	// they will be redirected to the login page where they have to enter their email and password
	// the user will then receive a unique jwt token which will be saved in local storage and will have access to the
	// page by using their login information in the future
	const handleUsers = async (e) => {
		e.preventDefault(); // prevents page from reloading
		const response = await fetch("/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});
		const data = await response.json();
		if (data.status === "success") {
			//* if json response = "success"
			alert(`Successfully registered please log in.`); //* user has successfully registered
			window.location.href = "/login"; // redirects users to login page
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleUsers}>
				{" "}
				{/* if the form is submitted the function will run */}
				<label>Name:</label>
				<input
					value={name}
					required
					placeholder="Enter your name"
					onChange={(e) => setName(e.target.value)}
				></input>{" "}
				{/* useState targets the value being enetered in the input box*/}
				<label>Email:</label>
				<input
					value={email}
					required
					placeholder="Enter your email"
					onChange={(e) => setEmail(e.target.value)}
				></input>{" "}
				{/* useState targets the value being enetered in the input box*/}
				<label>Password:</label>
				<input
					value={password}
					required
					placeholder="Enter your password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				></input>{" "}
				{/* useState targets the value being enetered in the input box*/}
				<button type="submit">Submit</button>
				<p>
					Already have an account? <Link to={"/login"}>Login</Link>
				</p>
				{/* redirects user to login page if the user already has an existing account (is registered)*/}
			</form>
		</div>
	);
};

export default Register;
