import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../redux/authSlice";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {

        event.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        try {

            const response = await fetch(
                "https://worksheet-product.mashupstack.com/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(loginData)
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                dispatch(
                    loginSuccess({
                        email: email,
                        token: data.token
                    })
                );

                alert("Login successful");

                navigate("/products");

            } else {

                alert(data.message || "Login failed");
            }

        } catch (error) {

            console.log(error);

            alert("Something went wrong");
        }
    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;