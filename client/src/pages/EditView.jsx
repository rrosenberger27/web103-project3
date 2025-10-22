import React from "react";
import '../styles/globals.css';
import '../styles/EditView.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { category_to_options } from "../utils/mappings";
import Dropdown from "../components/Dropdown";
import TshirtCard from "../components/TshirtCard";


const EditView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tshirt, setTshirt] = useState(null);

    useEffect(() => {
        const fetchTshirtDetails = async () => {
            await axios.get(`/api/tshirts/${id}`).then((response) => {
                setTshirt(response.data);
            }).catch((error) => {
                console.error("Error fetching t-shirt details:", error);
            });
        }
        fetchTshirtDetails();
    }, [id]);

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

    const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this t-shirt?")) {
      await axios.delete(`/api/tshirts/${id}`).then(() => {
        console.log("T-shirt deleted successfully");
        navigate('/tshirts');
      }).catch((error) => {
        console.error("Error deleting t-shirt:", error);
      });
    }
  };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!tshirt.name.trim()) {
            alert("Please enter a name for the t-shirt.");
            return;
        }

        if (tshirt.stripes === 'none' && tshirt.logo === 'none') {
        alert("Please select at least a logo or stripes for the t-shirt.");
        return;
        }
        await axios.put(`/api/tshirts/${id}`, tshirt).then((response) => {
            console.log("T-shirt updated successfully:", response.data);
            navigate(`/tshirts/${id}`);
        }).catch((error) => {
            console.error("Error updating t-shirt:", error);
        });
    }

  return (
    <div className="edit-view-container">
        <div className="edit-view-header">
            <h1>Edit T-Shirt</h1>
            <div className="buttons-container">
                <button className="card-button" onClick={() => navigate(`/tshirts/${id}`)}>Back to Details</button>
                <button className="card-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        {tshirt ? (
            <div>
            <div className="edit-view-content">
                <div className="edit-form">
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

             </div>
        ) : (
          <p>Loading t-shirt details...</p>
        )}
        <button className="submit-button" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditView;
