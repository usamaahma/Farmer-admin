import React from "react";
import "./farmerorders.css"; // optional CSS file for styling

function Farmerorders({ orders }) {
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
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.product}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.user.name}</td>
                <td>{order.user.email}</td>
                <td>{order.paymentMethod}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Farmerorders;
