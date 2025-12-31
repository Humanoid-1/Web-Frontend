import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${API_URL}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="loading">Loading orders...</p>;
  if (!orders.length) return <p className="empty">No orders found</p>;

  return (
    <div className="amazon-orders">
      {orders.map((order) => {
        const product = order.products?.[0];

        const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        return (
          <div key={order._id} className="amazon-order-box">
            {/* Header */}
            <h2>Order Details</h2>
            <p className="order-meta">
              Order placed on {orderDate} | Order number{" "}
              <strong>{order._id}</strong>
            </p>

            {/* Product Details */}
            <div className="product-info">
              <p><strong>Payment ID:</strong> {order?.paymentId}</p>
              <p><strong>Product ID:</strong> {product?.productId}</p>
              <p><strong>Name:</strong> {product?.name}</p>
              <p><strong>Model:</strong> {product?.model}</p>
              <p><strong>Category:</strong> {product?.category}</p>
              <p><strong>Quantity:</strong> {product?.quantity}</p>
              <p><strong>Price:</strong> ₹{product?.price}</p>
            </div>

            {/* Summary Box */}
            <div className="summary-box">
              <div>
                <h4>Ship to</h4>
                <h2>{order.shippingAddress?.name}</h2>
                <p>{order.shippingAddress?.flat}</p>
                <p>{order.shippingAddress?.street}</p>
                <p>
                  {order.shippingAddress?.city}{" "}
                  {order.shippingAddress?.postalCode}
                </p>
                <p>{order.shippingAddress?.country}</p>
              </div>

              <div>
                <h4>Payment method</h4>
                <p>{order.paymentMethod}</p>
              </div>

              <div>
                <h4>Order Summary</h4>
                <p>
                  Item(s) Subtotal: <span>₹{order.itemsPrice}</span>
                </p>
                <p>
                  Shipping: <span>₹{order.shippingPrice}</span>
                </p>
                <p className="total">
                  Order Total: <strong>₹{order.totalAmount}</strong>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
