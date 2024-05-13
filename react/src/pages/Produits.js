import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { useTranslation } from "react-i18next";

function Produits({ handleAddProduct }) {
  const { t, i18n } = useTranslation();

  const [inventaires, setInventaires] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const fetchInventaires = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/toutInventaires');
        if (Array.isArray(response.data)) {
          setInventaires(response.data);
        } else {
          console.error('Error fetching inventaires: Data is not an array');
        }
      } catch (error) {
        console.error('Error fetching inventaires:', error);
      }
    };

    fetchInventaires();
  }, []);

  const handleAddProductWithAnimation = (produit) => {
    setIsAdding(true); // Show animation
    setShowMessage(false); // Hide message if shown
    let percent = 0;
    const interval = setInterval(() => {
      percent += 1;
      setProgressPercentage(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setIsAdding(false); // Hide animation after 2 seconds
        setShowMessage(true); // Show message
        setTimeout(() => {
          setShowMessage(false); // Hide message after 2 seconds
        }, 2000);
      }
    }, 20);
    handleAddProduct(produit); 
  };

  return (
    <div>
      <h3>{t("ProductionsList")}</h3>
      <div className="card-container">
        {inventaires.map((produit) => (
          <div className="card" key={produit.codeinventaire}>
            <img
              src={`/images/${produit.image}`}
              alt={produit.codeinventaire}
              style={{ width: '240px', height: '200px', transition: 'transform 0.3s ease-in-out' }}
              className="hover-zoom"
            />            
            <h4>{produit.codeinventaire}</h4>
            <div>Pays: {produit.pays}</div>
            <div>Date:{produit.date}</div>
            <div>Type: {produit.type}</div>
            <div>Prix: {produit.prix}</div>
            <button className="btn btn-primary" onClick={() => handleAddProductWithAnimation(produit)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {isAdding && (
        <div className="progress-container">       
          <div className="progress-circle">            
          </div>
          <div className="progress-text" >{progressPercentage}%</div>
        </div>
      )}
      {showMessage && (
        <div className="message">L'article a été ajouté au panier</div>
      )}
    </div>
  );
}

export { Produits};


