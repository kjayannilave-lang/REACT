import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductView() {

    const { id } = useParams();

    const products = useSelector(
        (state) => state.products.products
    );

    const product = products.find(
        (item) => item.id === id
    );

    if (!product) {

        return (
            <div>
                <h1>Product not found</h1>
            </div>
        );
    }

    return (
        <div>

            <h1>Product Details</h1>

            <h2>{product.name}</h2>

            <p>
                Description: {product.description}
            </p>

            <p>
                Price: {product.price}
            </p>

            <p>
                Quantity: {product.quantity}
            </p>

        </div>
    );
}

export default ProductView;