import React, { useEffect, useState } from "react";
import "./product.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [clickedProducts, setClickedProducts] = useState({});
  const [showAllProducts, setShowAllProducts] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://efe-travel.com/api/cart/product");
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        //console.log({ data });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedClickedProducts = localStorage.getItem("clickedProducts");
    if (storedClickedProducts) {
      setClickedProducts(JSON.parse(storedClickedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clickedProducts", JSON.stringify(clickedProducts));
  }, [clickedProducts]);

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      const userResponse = window.confirm(
        "Please log in to add items to your cart. Would you like to log in now?"
      );
      if (userResponse) {
        navigate("/Login");
      }
      return;
    }
    try {
      if (clickedProducts[product.productname]) {
        alert("Product already in the cart");
        return;
      }

      const response = await fetch("https://efe-travel.com/api/cart/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ product }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const result = await response.json();
      //console.log("Product added to cart:", result);

      setClickedProducts((prevState) => ({
        ...prevState,
        [product.productname]: true,
      }));
      const initialEmail=result.email;
      navigate('/cart', { state: { initialEmail } });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleRemoveFromCart = (productName) => {
    setClickedProducts((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[productName];
      return updatedState;
    });
  };

  const handleViewAll = () => {
    setShowAllProducts(true);
  };

  return (
    <>
      <div className="product-banner">
      </div>
      <div className="product-page">
        <div className="text">
          <h2>Products</h2>
          <p>Buy your products</p>
        </div>

        <div className="product">
          <div className="container">
            <div className="product-row">
              {showAllProducts
                ? products.map((product) => (
                  <div key={product.productname} className="product-item">
                    {product.image && (
                      <div className="img">
                        <img
                          className="image"
                          src={`'https://www.panel.efe-travel.com/api/uploads/${product.image}`}
                          alt={product.productname}
                        />
                      </div>
                    )}
                    <p>{product.description}</p>
                    <div className="price-button">
                      <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                        CHF {product.price}
                      </p>
                      <button
                        className="proButton"
                        onClick={() => {
                          if (clickedProducts[product.productname]) {
                            handleRemoveFromCart(product.productname);
                          } else {
                            handleAddToCart(product);
                          }
                        }}
                      >
                        <i
                          className="fa-solid fa-cart-shopping"
                          style={{ marginRight: "10px" }}
                        ></i>
                        {clickedProducts[product.productname]
                          ? "In Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))
                : products.slice(0, 6).map((product) => (
                  <div key={product.productname} className="product-item">
                    {product.image && (
                      <div className="img">
                        <img
                          className="image"
                          src={`https://www.panel.efe-travel.com/api/uploads/${product.image}`}
                          alt={product.productname}
                          style={{ width: "100px" }}
                        />
                      </div>
                    )}
                    <p>{product.description}</p>
                    <div className="price-button">
                      <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                        Price CHF {product.price}
                      </p>
                      <button
                        className="proButton"
                        onClick={() => {
                          if (clickedProducts[product.productname]) {
                            handleRemoveFromCart(product.productname);
                          } else {
                            handleAddToCart(product);
                          }
                        }}
                      >
                        <i
                          className="fa-solid fa-cart-shopping"
                          style={{ marginRight: "10px" }}
                        ></i>
                        {clickedProducts[product.productname]
                          ? "In Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {!showAllProducts && products.length > 6 && (
              <div className="viewsButton">
                <button className="views" onClick={handleViewAll}>
                  View All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
