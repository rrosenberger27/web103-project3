import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/ListView.css';
import TshirtCard from '../components/TshirtCard';
import axios from 'axios';

const ListView = () => {
  const [tshirts, setTshirts] = useState([]);

  useEffect(() => {
    const fetchTshirts = async () => {
    try {
        const response = await axios.get('/api/tshirts');
        setTshirts(response.data);
    } catch (error) {
        console.error("Error fetching t-shirts:", error);
    }
    };
    fetchTshirts();
  }, []);

  return (
    <div className="list-view-container">
      <h1 className='list-view-title'>All T-Shirts</h1>
      <div className="tshirt-list">
        {tshirts.map(tshirt => (
          <div key={tshirt.id}>
            <div className='button-container'>
              <button className='card-button' onClick={() => navigate(`/tshirts/${tshirt.id}`)}>View Details</button>
              <button className='card-button' onClick={() => navigate(`/tshirts/${tshirt.id}/edit`)}>Edit</button>
              <button className='card-button' onClick={() => handleDelete(tshirt.id)}>Delete</button>
            </div>
            <TshirtCard {...tshirt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListView;