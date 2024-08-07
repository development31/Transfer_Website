import React from 'react'
import "./Faq.scss"
function FaqSection() {
  return (
    <div className='faq'>
      <header id="faqHeader">
        <div className="Faqbackground">
          <div className="row">

          </div>
        </div>
      </header>
      <div className="helpContainer">
        <div className="help-section">
          <h1>Help & Support</h1>
          <p>Find an answer to anything you need in our knowledge base</p>
        </div>
      </div>

      <div className="faq-container">
        <div className="faq-details" >
          <div className="faq-box" style={{ marginTop: "20px" }}>
            <h3 style={{ color: "black", fontSize: "2.5rem" }}>1. Can I book a transfer to the airport?</h3>
            <p>Yes, you can book a transfer to the airport or any other destination by choosing them in destination point field.</p>
          </div>
          <div className="faq-box">
            <h3 style={{ color: "black", fontSize: "2.5rem" }}>2.How can I upgrade the vehicle?</h3>
            <p>You will receive your driver's number 30 minutes before your transfer via SMS and email. You can also contact our customer service on the number visible in your Confirmation.</p>
          </div>
          <div className="faq-box">
            <h3 style={{ color: "black", fontSize: "2.5rem" }}>3.Will I be charged extra if I have extra luggage?</h3>
            <p>The allowed luggage per passenger seat is one piece of medium size and one piece of hand luggage and is already included in the price of your transfer. If you have extra luggage per passenger seat and that require a larger vehicle category, you need to book a larger vehicle.</p>
          </div>
          <div className="faq-box">
            <h3 style={{ color: "black", fontSize: "2.5rem" }}>4. What should I do if I can't find the driver?</h3>
            <p>Please contact your driver on a number received. You can also contact our Customer Service on the number visible in your Confirmation in order to assist you.</p>
          </div>
          <div className="faq-box">
            <h3 style={{ color: "black", fontSize: "2.5rem" }}>5. I need a payment confirmation for my transfer, how can I get it?</h3>
            <p>You can request a payment confirmation after your card has been charged for the amount specified in the Confirmation.</p>
          </div>

        </div>

      </div>
      <div className="bottom-section">
        <div className="image-section">
          <div className="faq-images">
            <img className="Image" src="/img/faqImage/faq1.jpg" />
          </div>
          <div className="faq-images">
            <img className="Image" src="/img/faqImage/faq2.jpg" />
          </div>
          <div className="faq-images">
            <img className="Image" src="/img/faqImage/faq3.jpg" />
          </div>
        </div>
      </div>


    </div>
  )
}

export default FaqSection
