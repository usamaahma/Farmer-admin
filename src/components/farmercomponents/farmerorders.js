import React from "react";
import "./farmerorders.css";
import { orders } from "../../utils/axios"; // Make sure this is defined like `event`

function Farmerorders({ orders }) {
  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      await orders.delete(`/${id}`);
      alert("Order deleted successfully.");
      window.location.reload(); // You can replace this with state update if needed
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order.");
    }
  };

  return (
    <div className="farmer-orders-container">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Payment Method</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem) => (
              <tr key={orderItem._id}>
                <td>{orderItem.product}</td>
                <td>{orderItem.price}</td>
                <td>{orderItem.quantity}</td>
                <td>{orderItem.user.name}</td>
                <td>{orderItem.user.email}</td>
                <td>{orderItem.paymentMethod}</td>
                <td>{new Date(orderItem.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteOrder(orderItem.id)}
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

export default Farmerorders;
