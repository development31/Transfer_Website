import React from 'react'
import "./tour.css"
import video from "./img/video1.mp4"

function Tour() {
  return (
    <div>

      <div className="banner-section">

      </div>

      <div className="helpContainer">
        <div className="help-section">
          <h1>Tour and Travel</h1>
          <p>Find an answer to anything you need in our knowledge base</p>
        </div>
      </div>

      <div className="tour-container">
        <div className="tour-details" >
          <div className="tour-box" style={{ marginTop: "20px" }}>
            <h3 style={{ color: "black", fontSize: "2.5rem" }}>Can I book a transfer to the airport?</h3>
            <p>Yes, you can book a transfer to the airport or any other destination by choosing them in destination point field.
              <p>
                Absolutely, you can book a transfer to the airport with Efe Travels. Our service is designed to provide you with a hassle-free and comfortable ride to and from the airport. Whether you're traveling for business or pleasure, we ensure timely and convenient transportation, allowing you to start or end your journey smoothly. Simply let us know your flight details, and we'll take care of the rest, ensuring you arrive on time and in comfort.
              </p>
              <p>
                In addition to our vehicle rental services, we also offer a selection of snacks and other products to enhance your travel experience. From delicious treats to essential travel items, we ensure you have everything you need for a comfortable journey.

              </p>
              <p>
                Located at Sihlmatten 7, 8134 Adliswil, we pride ourselves on providing exceptional customer service and high-quality products. Our team is dedicated to making your travel experience seamless and enjoyable.
              </p>
            </p>
          </div>

        </div>

      </div>



      <div className="video-container">
        <video className="responsive-video" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      <div className="tour-bottom">
        <div className="bottomContainer">
          <div className="team-image1">
            <img className="bottomImages" src="/img/faqImage/faq1.jpg" />
          </div>
          <div className="team-image2">
            <img className="bottomImages" src="/img/tour4.jpg" />
          </div>
          <div className="team-image3">
            <img className="bottomImages" src="/img/tour5.jpg" />
          </div>
        </div>
        <div className="bottomContainer">
          <div className="team-image4">
            <img className="bottomImages" src="/img/tour1.jpg" />
          </div>
          <div className="team-image5">
            <img className="bottomImages" src="/img/tour2.jpg" />
          </div>
          <div className="team-image6">
            <img className="bottomImages" src="/img/tour3.jpg" />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Tour
