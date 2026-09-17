import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const API_URL =
    "https://worksheet-catalogue.mashupstack.com/products";

  // GET all products
  function getProducts() {

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }

  // Get products when page loads
  useEffect(() => {
    getProducts();
  }, []);

  // DELETE product
  function deleteProduct(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("Product deleted successfully!");

        getProducts();
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
  }

  // Search products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Electronics Product Catalog</h1>

      <div className="top-section">

        <input
          type="text"
          placeholder="Search product by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Link to="/add">
          <button>Add New Product</button>
        </Link>

      </div>

      <h2>All Products</h2>

      {filteredProducts.length === 0 ? (

        <p>No products found.</p>

      ) : (

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr key={product.id}>

                <td>{product.name}</td>

                <td>₹{product.price}</td>

                <td>{product.category}</td>

                <td>{product.quantity}</td>

                <td>

                  <button
                    onClick={() =>
                      navigate(`/edit/${product.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default Home;