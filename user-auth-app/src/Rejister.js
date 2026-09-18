
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleRegister(event) {

        event.preventDefault();

        setError("");

        // Check password
        if (password !== confirmPassword) {
            setError("Password and Confirm Password do not match");
            return;
        }

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
                throw new Error(
                    data.message || "Registration failed"
                );
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
        <div className="form-container">

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

                <label>Name</label>

                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />


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


                <label>Confirm Password</label>

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                        setConfirmPassword(event.target.value)
                    }
                    required
                />


                <button type="submit">
                    Register
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

export default Register;

