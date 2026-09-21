import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setProducts } from "../redux/productSlice";

function ProductList() {

    const dispatch = useDispatch();

    const token = useSelector(
        (state) => state.auth.token
    );

    const products = useSelector(
        (state) => state.products.products
    );

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

                    dispatch(setProducts(data));

                } else {

                    alert(data.message || "Failed to get products");
                }

            } catch (error) {

                console.log(error);

                alert("Something went wrong");
            }
        };

        /*
           Only call the API if Redux
           does not already have products.
        */
        if (products.length === 0) {
            getProducts();
        }

    }, [token, products.length, dispatch]);

    return (
        <div>

            <h1>Product List</h1>

            {products.length === 0 ? (

                <p>Loading products...</p>

            ) : (

                <div>

                    {products.map((product) => (

                        <div key={product.id}>

                            <h2>{product.name}</h2>

                            <p>
                                {product.description}
                            </p>

                            <p>
                                Price: {product.price}
                            </p>

                            <p>
                                Quantity: {product.quantity}
                            </p>

                            <Link to={`/product/${product.id}`}>
                                <button>
                                    View
                                </button>
                            </Link>

                            <hr />

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default ProductList;