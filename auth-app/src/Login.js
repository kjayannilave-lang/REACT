
import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();

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
                    throw new Error(data.message || "Login failed");
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
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <label>Email</label>
                <br />

                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <br />
                <br />

                <label>Password</label>
                <br />

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <br />
                <br />

                <button type="submit">
                    Login
                </button>

            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;







