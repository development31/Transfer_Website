import React from "react";
import "./Card.scss";
import { FaStar } from "react-icons/fa";

const Card = ({
  vehicleType,
  title,

  seats,
  suitcases,
  buttonText,
  vehiclePrice,
  image,
  onClick,
}) => {
  const stars = Array(5).fill(0);

  return (
    <div className="abc">
      <div className="abc-card">


        <div className="img">
          <img src={image} alt="image" />
        </div>

        <h3>{title}</h3>
        <p className="abc-seats">
          <i className="icon" class="fa-solid fa-user"></i> Seats {seats} people
        </p>

        <p className="suitcase">
          <i className="icon" class="fa-solid fa-suitcase"></i> Fits {suitcases}{" "}
          medium suitcases
        </p>
        <div className="vehiclePrice" style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <h3 className="price" style={{ margin: "0", paddingLeft: "1rem", fontSize: "2.3rem" }}>
            CHF {vehiclePrice}
          </h3>
        </div>

        <button className="abc-choose" onClick={onClick}>
          Choose this vehicle
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
