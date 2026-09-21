import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (event) => {

        event.preventDefault();

        const userData = {
            name: name,
            email: email,
            password: password
        };

        try {

            const response = await fetch(
                "https://worksheet-product.mashupstack.com/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(userData)
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                alert("Registration successful");

                navigate("/login");

            } else {

                alert(data.message || "Registration failed");
            }

        } catch (error) {

            console.log(error);

            alert("Something went wrong");
        }
    };

    return (
        <div>

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />
                </div>

                <br />

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
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;