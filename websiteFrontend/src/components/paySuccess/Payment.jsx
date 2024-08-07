import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';


function Payment() {
  const location = useLocation();
  const { email, amount } = location.state || { email: '', amount: 0 };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/about");
  };
  //console.log(amount, email);
  return (
    <div>
      <div className="payment-container">
        <div className="payment-section">
          <div className="payment-success">
            <h3>Payment Success</h3>
            <img src='./img/success.png' style={{ width: "20rem", height: "14rem" }} alt="Payment Success" />
          </div>
          <div className="details-section">
            <div className="payment-details">
              <p>Email</p>
              <p>Amount Paid</p>
            </div>
            <div className="payment-entered">
              <p>{email}</p>
              <p>CHF{amount}</p>
            </div>
          </div>

          <button
            type="button"
            style={{ width: "10rem", fontSize: "2rem" }}
            onClick={handleNavigate}
            className="btn btn-success">Ok</button>

        </div>

      </div>
    </div>
  );
}

export default Payment;
