import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Products() {

    const [products, setProducts] = useState([]);

    const token = useSelector((state) => state.auth.token);
    const email = useSelector((state) => state.auth.email);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const getProducts = async () => {

            try {

                const response = await fetch(
                    "https://worksheet-product.mashupstack.com/product",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    setProducts(data);
                } else {
                    alert(data.message || "Unable to get products");
                }

            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            }
        };

        getProducts();

    }, [token]);


    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");
    };


    return (
        <div>

            <h1>Product List</h1>

            <p>Logged in as: {email}</p>

            <button onClick={handleLogout}>
                Logout
            </button>

            <hr />

            {products.length === 0 ? (

                <p>No products available</p>

            ) : (

                <table border="1" cellPadding="10">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr key={product.id}>

                                <td>{product.name}</td>

                                <td>{product.description}</td>

                                <td>{product.price}</td>

                                <td>{product.quantity}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default Products;