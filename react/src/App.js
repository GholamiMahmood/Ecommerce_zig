import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import { Home } from './pages/Home';
import { Utilisateur } from './pages/Utilisateur';
import { Inventaire } from './pages/Inventaire';
import { Produits } from './pages/Produits';
import { Panier } from './pages/Panier';
import { SignIn } from './authentification/SignIn';
import { SignUp } from './authentification/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [selectedProducts, setSelectedProducts] = useState(
    JSON.parse(localStorage.getItem('selectedProducts')) || []
  );

  function handleAddProduct(product) {
    const updatedSelectedProducts = [...selectedProducts, product];
    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
  }

  function removeFromList(index) {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts.splice(index, 1);
    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
  }

  useEffect(() => {
    console.log("Updated selected products:", selectedProducts);
  }, [selectedProducts]);

  return (
    <div>
      <Header />
      <div className='browser-router-container'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Inventaire" element={<Inventaire />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Utilisateur" element={<Utilisateur />} />
            <Route path="/Produits" element={<Produits handleAddProduct={handleAddProduct} />} />
            <Route path="/Panier" element={<Panier selectedProducts={selectedProducts} removeFromList={removeFromList} />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
