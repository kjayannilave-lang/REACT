import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  const API_URL =
    "https://worksheet-catalogue.mashupstack.com/products";

  function addProduct(event) {

    event.preventDefault();

    const product = {
      name: name,
      price: Number(price),
      category: category,
      quantity: Number(quantity)
    };

    fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(product)
    })
      .then((response) => response.json())
      .then(() => {

        alert("Product added successfully!");

        navigate("/");

      })
      .catch((error) => {
        console.log("Error adding product:", error);
      });
  }

  return (
    <div className="form-container">

      <h1>Add New Product</h1>

      <form onSubmit={addProduct}>

        <label>Product Name</label>

        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Enter product name"
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
          placeholder="Enter price"
          required
        />

        <label>Category</label>

        <input
          type="text"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          placeholder="Enter category"
          required
        />

        <label>Quantity</label>

        <input
          type="number"
          value={quantity}
          onChange={(event) =>
            setQuantity(event.target.value)
          }
          placeholder="Enter quantity"
          required
        />

        <button type="submit">
          Add Product
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

export default AddProduct;