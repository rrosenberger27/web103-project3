import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router";
import '../styles/globals.css';
import '../styles/DetailView.css';
import axios from "axios";
import TshirtCard from "../components/TshirtCard";


const DetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tshirt, setTshirt] = useState(null);

    useEffect(() => {
        const fetchTshirtDetails = async () => {
            await axios.get(`/api/tshirts/${id}`).then((response) => {
                setTshirt(response.data);
            }).catch((error) => {
                console.error("Error fetching t-shirt details:", error);
            });
        };
        fetchTshirtDetails();
    }, [id]);


    const handleDelete = async (id) => {
        await axios.delete(`/api/tshirts/${id}`).then(() => {
            console.log("T-shirt deleted successfully");
            navigate('/tshirts');
        }).catch((error) => {
            console.error("Error deleting t-shirt:", error);
        });
    };


    return (
        <div className="detail-view-container">
            <div className="detail-view-header">
                <h1>T-Shirt Details</h1>
                <div className="buttons-container">
                <button className="card-button" onClick={() => navigate(`/tshirts/edit/${id}`)}>Edit</button>
                <button className="card-button" onClick={() => handleDelete(id)}>Delete</button>
                </div>
            </div>
            {tshirt ? (
                <TshirtCard {...tshirt} />
            ) : (
                <p>Loading t-shirt details...</p>
            )}
        </div>
    );
};

export default DetailView;
