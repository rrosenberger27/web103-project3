import React from "react";
import '../styles/globals.css';
import '../styles/Tshirt.css';

const Dropdown = ({label, name, options, value, onChange}) => {
  return (
    <div className="dropdown">
        <label>{label}</label>
        <select name={name} value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  );
}

export default Dropdown;