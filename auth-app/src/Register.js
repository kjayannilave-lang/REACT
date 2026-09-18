
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleRegister(event) {
        event.preventDefault();

        const userData = {
            user_name: name,
            email: email,
            password: password
        };

        fetch("https://worksheet-auth.mashupstack.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Registration failed");
                }

                return data;
            })
            .then((data) => {
                console.log(data);

                alert("Registration Successful");

                navigate("/login");
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>

                <label>Name</label>
                <br />

                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <br />
                <br />

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
                    Register
                </button>

            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default Register;

