
import React, { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {

        event.preventDefault();

        setError("");

        const loginData = {
            email: email,
            password: password
        };

        fetch("https://worksheet-auth.mashupstack.com/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)
        })

        .then(async (response) => {

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            return data;
        })

        .then((data) => {

            console.log("Token:", data.token);

            alert("Successfully Logged In");
        })

        .catch((error) => {

            setError(error.message);
        });
    }

    return (
        <div className="form-container">

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <label>Email</label>

                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />


                <label>Password</label>

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />


                <button type="submit">
                    Login
                </button>

            </form>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default Login;

