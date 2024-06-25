// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../index.css';

// /*
// les fonction des  selectedProducts, removeFromList sont
// dans la App.js.
// */

// function Panier({ selectedProducts, removeFromList }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState(selectedProducts); // Local state for selected products
//   const { loggedIn, user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [isAdding, setIsAdding] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);
//   const [progressPercentage, setProgressPercentage] = useState(0);
//   const [currentPage, setCurrentPage] = useState('liste-de-courses'); // Default to 'liste-de-courses'

//   useEffect(() => {
//     setProducts(selectedProducts);
//   }, [selectedProducts]);

//   const addToCart = (product) => {
//     if (loggedIn) {
//       setCartItems((prevCartItems) => [
//         ...prevCartItems,
//         { ...product, user }
//       ]);
//     } else {
//       navigate('/SignIn');
//     }
//   };

//   const removeFromCart = (product) => {
//     const updatedCartItems = cartItems.filter((item) => item.codeinventaire !== product.codeinventaire);
//     setCartItems(updatedCartItems);
//   };

//   const handleRemoveFromList = (product) => {
//     removeFromList(product);
//     removeFromCart(product);
//     setProducts(products.filter(p => p.codeinventaire !== product.codeinventaire)); // Update local state
//   };

//   const handleAddProductWithAnimation = async () => {
//     setIsAdding(true);
//     setShowMessage(false);

//     let percent = 0;
//     const interval = setInterval(async () => {
//       percent += 1;
//       setProgressPercentage(percent);

//       if (percent >= 100) {
//         clearInterval(interval);
//         setIsAdding(false);
//         setShowMessage(true);
//         setTimeout(() => {
//           setShowMessage(false);
//         }, 2000);

//         const cartData = cartItems.map(item => ({
//           inventaireId: item.codeinventaire,
//           utilisateurId: item.user,
//           prix: item.prix,
//         }));

//         try {
//           const response = await axios.post('http://localhost:8080/api/achat/create', cartData);
          
//           // Update local state to clear both cartItems and selectedProducts
//           setProducts([]);
//           setCartItems([]);
//         } catch (error) {
//           console.error('Error submitting cart:', error);
//         }
//       }
//     }, 20);
//   };

//   // Function to switch between pages
//   const switchPage = (pageName) => {
//     setCurrentPage(pageName);
//   };

//   return (
//     <div className="panier-container">
//       {/* Red Background Column with Vertical Buttons */}
//       <div className="navigation-column" style={{ backgroundColor: 'red', width: '150px', padding: '10px', marginRight: '10px' }}>
//         <button onClick={() => switchPage('liste-de-courses')} style={{ display: 'block', marginBottom: '10px' }}>Liste de courses</button>
//         <button onClick={() => switchPage('finaliser-achat')} style={{ display: 'block' }}>Finaliser l'achat</button>
//       </div>

//       {/* Content Area */}
//       <div className="content-area" style={{ display: 'flex', flexGrow: 1 }}>
//         {/* Conditionally render Liste de courses */}
//         {currentPage === 'liste-de-courses' && (
//           <div className="left-column">
//             <h5>1- Liste de courses.</h5>
//             <table className="table-container">
//               <thead className="table-header">
//                 <tr>
//                   <th>#</th>
//                   <th>Code Inventaire</th>
//                   <th>Pays</th>
//                   <th>Date</th>
//                   <th>Type</th>
//                   <th>Prix</th>
//                   <th>Image</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="table-data">
//                 {products.map((product, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{product.codeinventaire}</td>
//                     <td>{product.pays}</td>
//                     <td>{product.date}</td>
//                     <td>{product.type}</td>
//                     <td>{product.prix}</td>
//                     <td>
//                       <img
//                         src={`/images/${product.image}`}
//                         alt={product.codeinventaire}
//                         style={{ width: '30px', height: '30px', transition: 'transform 0.3s ease-in-out' }}
//                         className="hover-zoom"
//                       />
//                     </td>
//                     <td className="table-actions">
//                       <div className="row">
//                         <div className="col-4 pr-2">
//                           <button className="btn btn-danger btn-block" onClick={() => handleRemoveFromList(product)}>Supprimer</button>
//                         </div>
//                         <div className="col-4 pl-2">
//                           <button className="btn btn-primary btn-block" onClick={() => addToCart(product)}>Check out</button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Conditionally render Finaliser l'achat */}
//         {currentPage === 'finaliser-achat' && (
//           <div className="right-column" style={{ overflowY: 'auto' }}>
//             <h5>2- Finaliser l'achat:</h5>
//             <table className="table-container">
//               <thead className="table-header">
//                 <tr>
//                   <th>Information</th>
//                   <th>Image</th>
//                 </tr>
//               </thead>
//               <tbody className="table-data">
//                 {cartItems.map((product, index) => (
//                   <tr key={index}>
//                     <td>
//                       <div>Code de produit: {product.codeinventaire}</div>
//                       <div>Pays: {product.pays}</div>
//                       <div>Type: {product.type}</div>
//                       <div>Prix(+ 15% Tax ): {(product.prix * 1.15).toFixed(2)}</div>
//                       {product.user && <div style={{ display: 'none' }}>User: {product.user}</div>}
//                       <button onClick={() => removeFromCart(product)}>Retirer</button>
//                     </td>
//                     <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                       <img
//                         src={`/images/${product.image}`}
//                         alt={product.codeinventaire}
//                         style={{ width: '150px', height: '150px', transition: 'transform 0.3s ease-in-out' }}
//                         className="hover-zoom"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button onClick={handleAddProductWithAnimation} style={{ background: 'blue', fontSize: '30px', color: 'white', width: '100%', padding: '10px' }}>Continuer</button>
//           </div>
//         )}

//         {/* Progress Circle and Message */}
//         {isAdding && (
//           <div className="progress-container">
//             <div className="progress-circle">
//             </div>
//             <div className="progress-text">{progressPercentage}%</div>
//           </div>
//         )}
//         {showMessage && (
//           <div className="message">La transaction est terminée.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export { Panier };

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

/*
les fonction des selectedProducts, removeFromList sont
dans la App.js.
*/

function Panier({ selectedProducts, setSelectedProducts, removeFromList }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(selectedProducts); // Local state for selected products
  const { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentPage, setCurrentPage] = useState('liste-de-courses'); // Default to 'liste-de-courses'

  useEffect(() => {
    setProducts(selectedProducts);
  }, [selectedProducts]);

  const addToCart = () => {
    if (loggedIn) {
      setCartItems(products.map(product => ({ ...product, user })));
      switchPage('finaliser-achat'); // Automatically switch to "finaliser-achat"
    } else {
      navigate('/SignIn');
    }
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.codeinventaire !== product.codeinventaire);
    setCartItems(updatedCartItems);
  };

  const handleRemoveFromList = (product) => {
    removeFromList(product);
    removeFromCart(product);
    setProducts(products.filter(p => p.codeinventaire !== product.codeinventaire)); // Update local state
  };

  const handleAddProductWithAnimation = async () => {
    setIsAdding(true);
    setShowMessage(false);

    let percent = 0;
    const interval = setInterval(async () => {
      percent += 1;
      setProgressPercentage(percent);

      if (percent >= 100) {
        clearInterval(interval);
        setIsAdding(false);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);

        const cartData = cartItems.map(item => ({
          inventaireId: item.codeinventaire,
          utilisateurId: item.user,
          prix: item.prix,
        }));

        try {
          const response = await axios.post('http://localhost:8080/api/achat/create', cartData);
          
          // Update local state to clear both cartItems and selectedProducts
          setProducts([]);
          setCartItems([]);
          setSelectedProducts([]); // Clear selectedProducts
        } catch (error) {
          console.error('Error submitting cart:', error);
        }
      }
    }, 20);
  };

  // Function to switch between pages
  const switchPage = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="panier-container">
      {/* Red Background Column with Vertical Buttons */}
      <div className="navigation-column" style={{ backgroundColor: 'red', width: '150px', padding: '10px', marginRight: '10px' }}>
        <button onClick={() => switchPage('liste-de-courses')} style={{ display: 'block', marginBottom: '10px' }}>Liste de courses</button>
        <button onClick={() => switchPage('finaliser-achat')} style={{ display: 'block' }}>Finaliser l'achat</button>
      </div>

      {/* Content Area */}
      <div className="content-area" style={{ display: 'flex', flexGrow: 1 }}>
        {/* Conditionally render Liste de courses */}
        {currentPage === 'liste-de-courses' && (
          <div className="left-column">
            <h5>1- Liste de courses.</h5>
            <table className="table-container">
              <thead className="table-header">
                <tr>
                  <th>#</th>
                  <th>Code Inventaire</th>
                  <th>Pays</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Prix</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-data">
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.codeinventaire}</td>
                    <td>{product.pays}</td>
                    <td>{product.date}</td>
                    <td>{product.type}</td>
                    <td>{product.prix}</td>
                    <td>
                      <img
                        src={`/images/${product.image}`}
                        alt={product.codeinventaire}
                        style={{ width: '30px', height: '30px', transition: 'transform 0.3s ease-in-out' }}
                        className="hover-zoom"
                      />
                    </td>
                    <td className="table-actions">
                      <div className="row">
                        <div className="col-4 pr-2">
                          <button className="btn btn-danger btn-block" onClick={() => handleRemoveFromList(product)}>Supprimer</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="checkout-button-container">
              <button className="btn btn-primary btn-block" onClick={addToCart}>Check out</button>
            </div>
          </div>
        )}

        {/* Conditionally render Finaliser l'achat */}
        {currentPage === 'finaliser-achat' && (
          <div className="right-column" style={{ overflowY: 'auto' }}>
            <h5>2- Finaliser l'achat:</h5>
            <table className="table-container">
              <thead className="table-header">
                <tr>
                  <th>Information</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody className="table-data">
                {cartItems.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <div>Code de produit: {product.codeinventaire}</div>
                      <div>Pays: {product.pays}</div>
                      <div>Type: {product.type}</div>
                      <div>Prix(+ 15% Tax ): {(product.prix * 1.15).toFixed(2)}</div>
                      {product.user && <div style={{ display: 'none' }}>User: {product.user}</div>}
                      <button onClick={() => removeFromCart(product)}>Retirer</button>
                    </td>
                    <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img
                        src={`/images/${product.image}`}
                        alt={product.codeinventaire}
                        style={{ width: '150px', height: '150px', transition: 'transform 0.3s ease-in-out' }}
                        className="hover-zoom"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleAddProductWithAnimation} style={{ background: 'blue', fontSize: '30px', color: 'white', width: '100%', padding: '10px' }}>Continuer</button>
          </div>
        )}

        {/* Progress Circle and Message */}
        {isAdding && (
          <div className="progress-container">
            <div className="progress-circle">
            </div>
            <div className="progress-text">{progressPercentage}%</div>
          </div>
        )}
        {showMessage && (
          <div className="message">La transaction est terminée.</div>
        )}
      </div>
    </div>
  );
}

export { Panier };
