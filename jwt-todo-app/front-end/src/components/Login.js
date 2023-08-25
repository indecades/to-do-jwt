import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	// useState states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// allows users to login who already registered or did register
	const handleLogin = async (e) => {
		e.preventDefault(); // prevents the page from reloading
		const response = await fetch("/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password,
			}),
		});
		const data = await response.json();
		if (data.user) {
			// if the user is logged in their jwt token is set in local storage
			localStorage.setItem("token", data.user);
			alert(`Successfully logged in.`); // user is logged in
			window.location.href = "/todo"; // user is then taken to todo application
		} else {
			// if user entered information incorrectly
			alert(`Please retry email or password!`);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				{" "}
				{/* if form is submitted function will run */}
				<label>Email:</label>{" "}
				{/* user enters email and value is set to useState */}
				<input
					value={email}
					required
					placeholder="Enter your email"
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<label>Password:</label>{" "}
				{/* user enters password and value is set useState*/}
				<input
					value={password}
					required
					placeholder="Enter your password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<button type="submit">Submit</button>
				<p>
					Create an account? <Link to={"/"}>Create</Link>
				</p>
				{/* if user does not have an account they can easily be redirected to register page */}
			</form>
		</div>
	);
};

export default Login;
