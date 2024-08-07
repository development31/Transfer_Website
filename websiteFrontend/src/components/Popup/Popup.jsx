import React from "react";
import "./Popup.scss";

function Popup({
  title,
  seats,
  vehicleName,
  suitcases,
  price,
  charge,
  imageUrl,
  email,
  contact,
  onClick,
  disabled,

}) {
  const stars = Array(5).fill(0);
  //console.log(price)

  return (
    <div className="popup">
      <div className="col1">
        <div className="img">
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <div className="col2">

        <h5 style={{ fontSize: "2rem" }} className="vehicleName">{vehicleName}</h5>

        <p className="abc-seats">
          <i className="icon" class="fa-solid fa-user"></i> Seats {seats} people
        </p>

        <p className="suitcase">
          <i className="icon" class="fa-solid fa-suitcase"></i> Fits {suitcases}{" "}
          medium suitcases
        </p>

        <p className="p-0 m-0 text-muted">
        </p>
        <p className="p-0 m-0 text-muted">
        </p>
        {charge && <h5 className="date">Price CHF {price}</h5>}


      </div>
      <div className="col3">
        <p className="icon">

          Price upon request. Please contact us.
        </p>
        <p className="icon">

          {contact} <br />
          WhatsApp, Viber, Telegram, WeChat
        </p>
        <p className="icon">

          Free Waiting Time
        </p>
        <p>{email}</p>

        <button className="abc-choose" onClick={onClick} disabled={disabled}>
          Book vehicle

          <i class="fa fa-chevron-right"></i>
        </button>

      </div>
    </div>
  );
}

export default Popup;
