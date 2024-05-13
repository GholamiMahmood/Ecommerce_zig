import React, { useState } from 'react';


function Panier({ selectedProducts, removeFromList }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item !== product);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="panier-container">
      <div className="left-column">
        <h3>1):Poursuivez pour finaliser votre achat.</h3>
        <table className="table-container">
          <thead className="table-header">
            <tr>
              <th>#</th>
              <th>Code Inventaire</th>
              <th>Pays</th>
              <th>Date</th>
              <th>Type</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-data">
            {selectedProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.codeinventaire}</td>
                <td>{product.pays}</td>
                <td>{product.date}</td>
                <td>{product.type}</td>
                <td>{product.prix}</td>
                <td className="table-actions">
                <div className="row">
                    <div className="col-4 pr-2">
                        <button className="btn btn-danger btn-block" onClick={() => removeFromList(product)}>Delete</button>
                    </div>
                    <div className="col-4 pl-2">
                        <button className="btn btn-primary btn-block" onClick={() => addToCart(product)}>Add</button>
                    </div>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="right-column">
        <h2>Panier principal.</h2>
        <ul>
          {cartItems.map((product, index) => (
            <li key={index}>
              <h4>{product.codeinventaire}</h4>
              <div>Pays: {product.pays}</div>
              <div>Date: {product.date}</div>
              <div>Type: {product.type}</div>
              <div>Prix: {product.prix}</div>
              <button onClick={() => removeFromCart(product)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { Panier };
