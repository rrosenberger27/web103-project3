import React from "react";
import "../styles/globals.css";
import "../styles/Tshirt.css";
import { getImageForLogo, getHexForColor } from "../utils/mappings";

const Tshirt = ({
  logo,
  stripes = "none",
  color = "white",
  fabric_type = "cotton",
}) => {
  const baseColor = getHexForColor?.(color) || "#d9d9d9";
  const logoSrc = logo ? getImageForLogo?.(logo) : null;

  const stripeType = ["none", "horizontal", "vertical", "diagonal"].includes(
    stripes
  )
    ? stripes
    : "none";
  const fabricType = ["cotton", "polyester", "linen", "wool"].includes(
    fabric_type
  )
    ? fabric_type
    : "cotton";

  return (
    <div className="tshirt" role="img" aria-label="T-shirt preview">
      <div
        className={`tshirt-body stripes-${stripeType} fabric-${fabricType}`}
        style={{ "--shirt-color": baseColor }}
      >
        <div className="tshirt-collar" aria-hidden="true" />
        {logoSrc && (
          <img
            className="tshirt-logo"
            src={logoSrc}
            alt={`${logo} logo`}
            draggable="false"
          />
        )}
      </div>
    </div>
  );
};

export default Tshirt;
