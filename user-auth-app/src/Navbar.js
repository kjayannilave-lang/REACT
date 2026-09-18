
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <h2>User System</h2>

            <div>
                <Link to="/register">Register</Link>

                <Link to="/login">Login</Link>
            </div>

        </nav>
    );
}

export default Navbar;

