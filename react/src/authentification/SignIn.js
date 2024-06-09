import React, { useState } from "react";
import axios from "axios";
import "../index.css"; 
import { useDispatch } from "react-redux";
import { setUser } from "../services/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [data, setData] = useState({
    identity: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [showContainer, setShowContainer] = useState(true);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const identityData = {
      identity: data.identity,
      password: data.password,
  };

  /* La méthode setUser est présente dans Authslice.js.
  Lorsqu'on utilise cette méthode, la valeur de "admin" 
  ou "utilisateur" est enregistrée dans le stockage 
  local (localStorage),tout en faisant passer la valeur
  de "loggedIn" à true */

  axios.post("http://localhost:8080/api/sign-in", identityData)
      .then((response) => { 
        setMessage("Bonjour :"+response.data); 
          setTimeout(() => {
          setMessage("");
          if (response.data === "admin") {            
              dispatch(setUser(data.identity));
              navigate("/Inventaire");
              
          } else {
            dispatch(setUser(data.identity));
             navigate('/Utilisateur');
          } 
        }, 3000);
           
      })
      .catch((error) => {
        setMessage("Le mot de passe ou l'identifiant n'est pas correct.");  
        setTimeout(() => {
          setMessage("");
          window.location.href = '/SignIn'; 
        }, 3000);
                   
      });
  };

  const handleToggleContainer = () => {
    setShowContainer(!showContainer);
  };
  
  return (
    <>
    {showContainer && (
            <div className="sign-container">      
              <form onSubmit={handleSubmit} className="sign-form">
              <div className="form-group">
                  <label id="identity">Nom d'usager:</label>
                  <input
                    type="identity"
                    name="identity"
                    value={data.identity}
                    onChange={handleChange}
                    placeholder="Entrez votre Id"
                    required
                  />
                </div>
              
                <div className="form-group">
                  <label id="password">Mot de passe:</label>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                </div>
                
                <button type="submit"  className="register-button">Se connecter</button><br/><br/>
                <button onClick={handleToggleContainer} className="close-button">Fermer</button>
                {message && <p className="message_sign">{message}</p>}
              </form>
              
            </div>
    )}
    </>
  );
}export {SignIn} ;
