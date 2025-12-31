import React, { useEffect, useState } from "react";
import "./Cart.css";
import AddAddress from "../components/AddAddress";
import AddressSelector from "../components/AddressSelector";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ onClose }) => {
  const [cart, setCart] = useState([]);
  const [loggedIn] = useState(!!localStorage.getItem("token"));
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const itemsPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
 
  const shippingPrice = itemsPrice > 50000 ? 0 : 500;
  const totalAmount = itemsPrice  + shippingPrice;

  const openRazorpay = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Humanoid Maker",
      description: "Order Payment",

handler: async (response) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/save`, // <-- COMMA added here
      {
        products: cart.map((item) => ({
          productId: item._id,
          name: item.brand + " " + item.model,
          model: item.model,
          category: item.category,
          quantity: item.qty,
          price: item.price,
        })),

        shippingAddress: selectedAddress,
        itemsPrice,
        shippingPrice,
        totalAmount,
        paymentMethod: "Razorpay",
        paymentId: response.razorpay_payment_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    alert("✅ Order placed successfully!");
    onClose();
  } catch (err) {
    console.error("Save order error:", err.response?.data || err);
    alert("❌ Payment succeeded but order saving failed!");
  }
},
    };

    new window.Razorpay(options).open();
  };

  const handleProceed = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!loggedIn) {
      navigate("/auth");
      return;
    }

    if (selectedAddress) {
      openRazorpay();
      return;
    }

    setShowAddressSelector(true);
  };

  return (
    <div className="cart-overlay">
      {!showAddressSelector && (
        <div className="cart-drawer">
          <div className="cart-header">
            <h1>My Cart</h1>
            <button className="cart-close-btn" onClick={onClose}>✕</button>
          </div>

          {cart.length === 0 ? (
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
              Your Cart is Empty
            </h2>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item._id}>
                    <img src={item.image_url[0]} alt={item.model} className="cart-img" />
                    <div className="cart-details">
                      <h2>{item.brand} {item.model}</h2>
                      <h3>₹{item.price * item.qty}</h3>
                      <div className="qty-section">
                        <button onClick={() => decreaseQty(item._id)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => increaseQty(item._id)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <button className="proceed-btn" onClick={handleProceed}>
                  <span>₹{totalAmount}</span>
                  <span>
                    {selectedAddress ? "Pay Now ›" : loggedIn ? "Proceed ›" : "Login to Proceed ›"}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showAddressSelector && (
        <AddressSelector
          onClose={() => setShowAddressSelector(false)}
          onAddNew={() => setShowAddAddress(true)}
          onSelect={(address) => {
            setSelectedAddress(address);
            setShowAddressSelector(false);
          }}
        />
      )}

      {showAddAddress && (
        <AddAddress
          onClose={() => {
            setShowAddAddress(false);
            setShowAddressSelector(true);
          }}
        />
      )}
    </div>
  );
};

export default Cart;
