import React, { useEffect, useState } from "react";
import "./orders.css";
import { orders, users } from "../utils/axios"; // axios instances

function Orders() {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders and enrich them with farmer names
    useEffect(() => {
        const fetchOrdersWithFarmerNames = async () => {
            try {
                const res = await orders.get("/");
                const ordersData = res.data;

                // Fetch farmer info for each order
                const enrichedOrders = await Promise.all(
                    ordersData.map(async (order) => {
                        try {
                            const farmerRes = await users.get(`/${order.farmerId}`);
                            const farmerName = farmerRes.data?.name || "Unknown Farmer";
                            return { ...order, farmerName };
                        } catch (err) {
                            console.error("Error fetching farmer:", err);
                            return { ...order, farmerName: "Unknown Farmer" };
                        }
                    })
                );

                setOrderList(enrichedOrders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersWithFarmerNames();
    }, []);

    // Function to handle order deletion
    const deleteOrder = async (orderId) => {
        try {
            // Call the delete API for the selected order
            await orders.delete(`/${orderId}`);

            // Remove the deleted order from the state
            setOrderList((prevOrders) =>
                prevOrders.filter((order) => order.id !== orderId)
            );
        } catch (error) {
            console.error("Failed to delete order:", error);
        }
    };

    return (
        <div className="orders-container">
            <h2>All Orders</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : orderList.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list">
                    {orderList.map((order, index) => (
                        <div key={index} className="order-card">
                            <h3>Product: {order.product}</h3>
                            <p>Quantity: {order.quantity}</p>
                            <p>Price: Rs {order.price}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Ordered By: {order.user?.name} ({order.user?.email})</p>
                            <p>Farmer: {order.farmerName}</p>
                            {/* Delete button */}
                            <button onClick={() => deleteOrder(order.id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;
