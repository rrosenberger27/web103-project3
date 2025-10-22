import React, {useState} from 'react';
import '../styles/globals.css';
import '../styles/CreateView.css';
import { calculatePrice, category_to_options } from '../utils/mappings';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import { useNavigate } from 'react-router';
import TshirtCard from '../components/TshirtCard';

const CreateView = () => {
  const [tshirt, setTshirt] = useState({
    name: '',
    color: 'black',
    logo: 'none',
    stripes: 'none',
    fabric_type: 'cotton',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const sanitized = value.replace(/[\r\n]/g, '').slice(0, 100);
      setTshirt(prev => ({ ...prev, name: sanitized }));
      return;
    }

    setTshirt(prev => ({ ...prev, [name]: value }));
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tshirt.name.trim()) {
        alert("Please enter a name for the t-shirt.");
        return;
    }

    if (tshirt.stripes === 'none' && tshirt.logo === 'none') {
        alert("Please select at least a logo or stripes for the t-shirt.");
        return;
    }
    await axios.post('/api/tshirts', tshirt).then((response) => {
        console.log("T-shirt created successfully:", response.data);
        navigate(`/tshirts/${response.data.id}`);
    }).catch((error) => {
        console.error("Error creating t-shirt:", error);
    });

  }

  return (
    <div className="create-view-container">
      <h1>Create a New T-Shirt</h1>
      <div className="create-view-content">
        <div className="create-form">
            <input
              type="text"
              name="name"
              value={tshirt.name}
              onChange={handleInputChange}
              onKeyDown={handleNameKeyDown}
            />
          <Dropdown
            label="Color"
            name="color"
            options={category_to_options.color}
            value={tshirt.color}
            onChange={handleInputChange}
          />
          <Dropdown
            label="Logo"
            name="logo"
            options={category_to_options.logo}
            value={tshirt.logo}
            onChange={handleInputChange}
          />
          <Dropdown
            label="Stripes"
            name="stripes"
            options={category_to_options.stripes}
            value={tshirt.stripes}
            onChange={handleInputChange}
          />
          <Dropdown
            label="Fabric Type"
            name="fabric_type"
            options={category_to_options.fabric_type}
            value={tshirt.fabric_type}
            onChange={handleInputChange}
          />
        </div>
        <div className="preview-container">
            <h2>Preview</h2>
            <div className="tshirt-preview">
                <TshirtCard {...tshirt} />
            </div>
        </div>
      </div>

      <button className='submit-button' onClick={handleSubmit}>
        Create T-Shirt!
      </button>
      
    </div>
  );
};

export default CreateView;

