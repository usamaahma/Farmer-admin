import React, { useState } from "react";
import "./farmerproducts.css";
import { crop } from "../../utils/axios"; // Your Axios instance

function Farmerproducts({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    details: "",
    inStock: true,
    reviews: [],
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const newProduct = {
        ...formData,
        postedBy: user.id,
        image:
          "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvcHN8ZW58MHx8MHx8fDA%3D", // default image
      };

      await crop.post("/", newProduct);
      alert("Product added successfully!");
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await crop.delete(`/${id}`);
      alert("Product deleted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="farmer-products-container">
      <div className="products-header">
        <h2>Products</h2>
        <button className="add-product-btn" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Details</th>
              <th>Price (PKR)</th>
              <th>In Stock</th>
              <th>Reviews</th>
              <th>Created At</th>
              <th>Action</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.details}</td>
                <td>{product.price}</td>
                <td>{product.inStock ? "✅ Yes" : "❌ No"}</td>
                <td>
                  <ul>
                    {product.reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Adding Product */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Product</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <textarea
              name="details"
              placeholder="Details"
              value={formData.details}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
              />
              In Stock
            </label>
            <div className="modal-actions">
              <button onClick={handleAddProduct}>Submit</button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Farmerproducts;
