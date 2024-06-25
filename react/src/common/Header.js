// import React from 'react';
// import "bootstrap/dist/css/bootstrap.css";
// import '@fortawesome/fontawesome-free/css/all.css';
// import '../index.css';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setUser, logoutUser } from '../services/reducers/AuthSlice';
// import { useTranslation } from "react-i18next";

// function Header() {

//     const { t, i18n } = useTranslation();

//     /* Cette variable récupère les valeurs des variables
//        loggedIn et user, qui sont déjà stockées dans Redux*/
//     const { loggedIn, user } = useSelector((state) => state.auth);

//     /* Cette opération est réalisée pour initialiser 
//        les variables loggedIn à false et user à null.*/
//     const dispatch = useDispatch();
//     const refreshPage = () => {
//         dispatch(logoutUser());
//         window.location.href = '/';
//     };

//     return (
//         <React.Fragment>
//             <header className="navbar navbar-expand-lg navbar-dark bg-black-333">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="#">
//                         <i className="fas fa-bicycle" style={{ fontSize: '30px' }}></i>
//                     </a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <a className="nav-link" aria-current="page" href="Home" style={{ color: 'white' }}>{t('Home')}</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" aria-current="page" href="Produits" style={{ color: 'white' }}>{t('Productions')}</a>
//                             </li>
//                         </ul>
//                         {loggedIn && user === "admin" &&
//                             (
//                                 <ul className="navbar-nav col-md-10 d-flex justify-content-end">
//                                     <li className="nav-item">
//                                         <a className="nav-link" href="Inventaire" style={{ color: 'white' }}>{t('Inventories')}</a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <span className="nav-link" style={{ color: 'white' }}>{t('Hello')} {user}</span>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a className="nav-link" href="#" style={{ color: 'white' }} onClick={refreshPage}>{t('Sign_Out')}</a>
//                                     </li>
//                                 </ul>
//                             )
//                         }
//                         {loggedIn && user !== "admin" && user != null && (
//                             <ul className="navbar-nav col-md-10 d-flex justify-content-end">
//                                 <li className="nav-item">
//                                     <a className="nav-link" href="Utilisateur" style={{ color: 'white' }}>{t('Mon_compt')}</a>
//                                 </li>
//                                 <li className="nav-item">
//                                     <span className="nav-link" style={{ color: 'white' }}>{t('Hello')} {user}</span>
//                                 </li>
//                                 <li className="nav-item">
//                                     <a className="nav-link" href="#" style={{ color: 'white' }} onClick={refreshPage}>{t('Sign_Out')}</a>
//                                 </li>
//                             </ul>
//                         )
//                         }
//                         {!loggedIn &&
//                             (
//                                 <ul className="navbar-nav ms-auto">
//                                     <li className="nav-item">
//                                         <a className="nav-link" href="SignIn" style={{ color: 'white' }}>
//                                             <i className="fas fa-user"></i> {t('Sign_In')}
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a className="nav-link" href="SignUp" style={{ color: 'white' }}>{t('Sign_up')}</a>
//                                     </li>
//                                 </ul>
//                             )
//                         };
//                     </div>
//                 </div>
//               {/* Shopping cart */}
//                 <div >
//                     <a style={{ fontSize: "30px", color: "white", paddingRight: "20px" }} href="/panier">
//                         <i className="fas fa-shopping-cart" onClick={() => { document.querySelector('.dropdown-content').style.display = 'block' }}></i>
//                     </a>
//                 </div>

//                 {/* change languages */}
//                 <div className="language-selector">
//                     <div className="globe-wrapper" style={{ position: "relative", display: "inline-block" }}>
//                    <i className="fas fa-globe" style={{ fontSize: "30px", color: "white", paddingLeft: "17px" }} onMouseEnter={() => { document.querySelector('.dropdown-content').style.display = 'block' }} onMouseLeave={() => { document.querySelector('.dropdown-content').style.display = 'none' }}></i>
//                    <div className="dropdown-content" style={{ display: "none", position: "absolute", top: "100%", left: "0" }} onMouseEnter={() => { document.querySelector('.dropdown-content').style.display = 'block' }} onMouseLeave={() => { document.querySelector('.dropdown-content').style.display = 'none' }}>
//                    <button className="en" onClick={() => i18n.changeLanguage('en')}>English</button>
//                    <button className="fr" onClick={() => i18n.changeLanguage('fr')}>French&nbsp;</button>
//                  </div>
//     </div>
// </div>



//             </header>
//         </React.Fragment>
//     );

// };
// export default Header;
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/css/all.css';
import '../index.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../services/reducers/AuthSlice';
import { useTranslation } from "react-i18next";
import i18nConfig from './i18n'; // Adjust the import path as needed

function Header() {
    const { t, i18n } = useTranslation();
    const { loggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // State to store the count of selected products
    const [selectedProductCount, setSelectedProductCount] = useState(
        JSON.parse(localStorage.getItem('selectedProducts'))?.length || 0
    );

    // Update product count whenever selectedProducts change
    useEffect(() => {
        const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        setSelectedProductCount(selectedProducts.length);
    }, [localStorage.getItem('selectedProducts')]);

    const refreshPage = () => {
        dispatch(logoutUser());
        window.location.href = '/';
    };

    return (
        <React.Fragment>
            <header className="navbar navbar-expand-lg navbar-dark bg-black-333">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <i className="fas fa-bicycle" style={{ fontSize: '30px' }}></i>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="Home" style={{ color: 'white' }}>{t('Home')}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="Produits" style={{ color: 'white' }}>{t('Productions')}</a>
                            </li>
                        </ul>
                        {loggedIn && user === "admin" &&
                            (
                                <ul className="navbar-nav col-md-10 d-flex justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link" href="Inventaire" style={{ color: 'white' }}>{t('Inventories')}</a>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link" style={{ color: 'white' }}>{t('Hello')} {user}</span>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" style={{ color: 'white' }} onClick={refreshPage}>{t('Sign_Out')}</a>
                                    </li>
                                </ul>
                            )
                        }
                        {loggedIn && user !== "admin" && user != null && (
                            <ul className="navbar-nav col-md-10 d-flex justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link" href="Utilisateur" style={{ color: 'white' }}>{t('Mon_compt')}</a>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" style={{ color: 'white' }}>{t('Hello')} {user}</span>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ color: 'white' }} onClick={refreshPage}>{t('Sign_Out')}</a>
                                </li>
                            </ul>
                        )}
                        {!loggedIn &&
                            (
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="SignIn" style={{ color: 'white' }}>
                                            <i className="fas fa-user"></i> {t('Sign_In')}
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="SignUp" style={{ color: 'white' }}>{t('Sign_up')}</a>
                                    </li>
                                </ul>
                            )
                        }
                    </div>

                    {/* Shopping cart with product count */}
                    <div style={{ position: 'relative' }}>
                        <a style={{ fontSize: "30px", color: "white", paddingRight: "20px", position: 'relative', display: 'inline-block' }} href="/panier">
                            <i className="fas fa-shopping-cart" onClick={() => { document.querySelector('.dropdown-content').style.display = 'block' }}>
                                {selectedProductCount > 0 &&
                                    <span style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '25px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        padding: '3px 6px',
                                        fontSize: '10px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}>{selectedProductCount}</span>
                                }
                            </i>
                        </a>
                    </div>

                    {/* Change languages */}
                    <div className="language-selector">
                        <div className="globe-wrapper" style={{ position: "relative", display: "inline-block" }}>
                            <i className="fas fa-globe" style={{ fontSize: "30px", color: "white", paddingLeft: "17px" }} onMouseEnter={() => { document.querySelector('.dropdown-content').style.display = 'block' }} onMouseLeave={() => { document.querySelector('.dropdown-content').style.display = 'none' }}></i>
                            <div className="dropdown-content" style={{ display: "none", position: "absolute", top: "100%", left: "0" }} onMouseEnter={() => { document.querySelector('.dropdown-content').style.display = 'block' }} onMouseLeave={() => { document.querySelector('.dropdown-content').style.display = 'none' }}>
                                <button className="en" onClick={() => i18nConfig.changeLanguage('en')}>English</button>
                                <button className="fr" onClick={() => i18nConfig.changeLanguage('fr')}>French&nbsp;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}

export default Header;
