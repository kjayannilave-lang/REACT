import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const API_URL =
    "https://worksheet-catalogue.mashupstack.com/products";

  // GET single product
  function getProduct() {

    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {

        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setQuantity(data.quantity);

      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }

  // Get product when page loads
  useEffect(() => {
    getProduct();
  }, [id]);

  // UPDATE product
  function updateProduct(event) {

    event.preventDefault();

    const updatedProduct = {
      name: name,
      price: Number(price),
      category: category,
      quantity: Number(quantity)
    };

    fetch(`${API_URL}/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updatedProduct)

    })
      .then((response) => response.json())
      .then(() => {

        alert("Product updated successfully!");

        navigate("/");

      })
      .catch((error) => {
        console.log("Error updating product:", error);
      });
  }

  return (
    <div className="form-container">

      <h1>Edit Product</h1>

      <form onSubmit={updateProduct}>

        <label>Product Name</label>

        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

        <label>Price</label>

        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(event) =>
            setPrice(event.target.value)
          }
          required
        />

        <label>Category</label>

        <input
          type="text"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          required
        />

        <label>Quantity</label>

        <input
          type="number"
          value={quantity}
          onChange={(event) =>
            setQuantity(event.target.value)
          }
          required
        />

        <button type="submit">
          Update Product
        </button>

        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}

export default EditProduct;