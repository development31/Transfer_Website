import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount
  const navigate = useNavigate();
  const location = useLocation();
  const { initialEmail } = location.state || {};

  // Check if the token exists and is valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if token is not present
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("https://efe-travel.com/api/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();

        const itemsWithParsedPrice = data.map((item) => ({
          ...item,
          price: parseFloat(item.price),
        }));
        setCartItems(itemsWithParsedPrice);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.qty,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if token is not present
      return;
    }
    navigate("/Checkout", { state: { totalAmount, initialEmail } });
  };

  const handleMinus = (index, pId) => {
    handleUpdateCart(pId, "minus");
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const handlePlus = (index, pId) => {
    handleUpdateCart(pId, "add");
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const removeProductFromCart = async (p_id) => {
    try {
      const response = await fetch(`https://efe-travel.com/api/cart/${p_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      const updatedCartItems = cartItems.filter((item) => item.productId !== p_id);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleUpdateCart = async (p_id, type) => {
    try {
      const response = await fetch("https://efe-travel.com/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          productId: p_id,
          type,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
      const data = await response.json();

      const updatedCartItems = data.map((item) => ({
        ...item,
        price: parseFloat(item.price),
      }));
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="proImage">
                <img
                  src={`https://www.panel.efe-travel.com/api/uploads/${item.image}`}
                  alt={item.productname}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="cart-intro">
                <h5>{item.productname}</h5>
                <p>{item.description}</p>
              </div>
              <div className="cart-intro">
                <button
                  className="btn btn-danger"
                  onClick={() => removeProductFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
              <div className="price">
                <p>Price</p>
                <p>CHF{(item.price * item.qty).toFixed(2)}</p>
              </div>
              <div className="cart-quantity">
                <p>Quantity</p>
                <div className="quant flex x-flex s-flex">
                  <div className="quantity-counter">
                    <div
                      className="quantity-button minus"
                      onClick={() => handleMinus(index, item.productId)}
                    >
                      -
                    </div>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.qty}
                      readOnly
                    />
                    <div
                      className="quantity-button plus"
                      onClick={() => handlePlus(index, item.productId)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}

        {/* Total Amount Section */}
        {cartItems.length > 0 && (
          <div className="total-amount">
            <p>Total Amount: CHF {totalAmount.toFixed(2)}</p>
          </div>
        )}

        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <button className="cart-checkout" onClick={handleCheckout}>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
