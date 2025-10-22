import React from "react";
import '../styles/globals.css';
import '../styles/TshirtCard.css';
import Tshirt from "./Tshirt";
import { calculatePrice } from "../utils/mappings";

const TshirtCard = ({ color, logo, stripes, fabric_type}) => {
  return (
    <div className="tshirt-card">
        <h2 className="t-shirt-name">{name}</h2>
        <div className="price">
            Price: ${calculatePrice({ color, logo, stripes, fabric_type })}
        </div>
      <Tshirt color={color} logo={logo} stripes={stripes} fabric_type={fabric_type} />
    </div>
  );
}

export default TshirtCard;