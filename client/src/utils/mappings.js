import thumbsUp from "../assets/thumbs-up.png";
import checkmark from "../assets/checkmark.jpg";
import tiger from "../assets/tiger.jpg";
import train from "../assets/train.jpg";
import fire from "../assets/fire.jpg";
import tree from "../assets/tree.webp";

export const category_to_options = {
  "color": ["red", "blue", "green", "black", "white"],
  "logo": ["none", "thumbs up", "check mark", "tiger", "train", "fire", "tree"],
  "stripes": ["none", "horizontal", "vertical", "diagonal"],
  "fabric_type": ["cotton", "polyester", "linen", "wool"]
};

const price_boost_to_color_options = {
    "red": 3,
    "blue": 2,
    "green": 2,
    "black": 1,
    "white": 0
}

const price_to_fabric_options = {
    "cotton": 5,
    "polyester": 3,
    "linen": 7,
    "wool": 10
}

const price_boost_to_stripe_options = {
 "none": 0,
 "horizontal": 2,
 "vertical": 3,
 "diagonal": 4
}

const price_boost_to_logo_options = {
 "none": 0,
 "tiger": 5,
 "train": 7,
 "fire": 4,
 "tree": 3,
 "check mark": 2,
 "thumbs up": 1
}

const color_to_hex = {
  "red": "#9b0c0cff",
  "blue": "#1414b9ff",
  "green": "#2e892eff",
  "black": "#030303ff",
  "white": "#f8f6f6ff"
}

const logo_to_image = {
  "none": null,
  "thumbs up": thumbsUp,
  "check mark": checkmark,
  "tiger": tiger,
  "train": train,
  "fire": fire,
  "tree": tree
};

export const getImageForLogo = (logo) => {
  return logo_to_image[logo] || null;
}

export const getHexForColor = (color) => {
  return color_to_hex[color] || "#ffffff";
}

export const getOptionsForCategory = (category) => {
  return category_to_options[category] || [];
}

export const calculatePrice = (tshirt) => {
    let basePrice = 10; // Base price for any t-shirt

    basePrice += price_boost_to_color_options[tshirt.color] || 0;
    basePrice += price_to_fabric_options[tshirt.fabric_type] || 0;
    basePrice += price_boost_to_stripe_options[tshirt.stripes] || 0;
    basePrice += price_boost_to_logo_options[tshirt.logo] || 0;

    return basePrice;
}
