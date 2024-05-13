import React, { useState } from "react";
import axios from "axios";
import "../index.css"; 

function SignUp() {
  const [data, setData] = useState({
    nom: "",
    adresse: "",
    codePostal: "",
    couriel: "",
    identity: "",
    password: "",
    telephone: ""
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
    const userData = {
      nom: data.nom,
      adresse: data.adresse,
      codePostal: data.codePostal,
      couriel: data.couriel,
      identity: data.identity,
      password: data.password,
      telephone: data.telephone
    };

    axios.post("http://localhost:8080/api/sign-up", userData)
      .then((response) => {
        setMessage("Les informations ont été enregistrées dans le système avec succès.");
        setTimeout(() => {
          setMessage("");
          window.location.href = '/SignIn'; 
        }, 3000);
       })
      .catch((error) => {
        setMessage("Veuillez utiliser un identifiant différent, s'il vous plaît.");
        setTimeout(() => {
          setMessage("");
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
                <label id="nom">Nom:</label>
                  <input
                    type="text"
                    name="nom"
                    value={data.nom}
                    onChange={handleChange}
                    placeholder="Entrez votre nom"
                    required
                  />
                </div>

                <div className="form-group">
                  <label id="adresse">Adresse:</label>
                  <input
                    type="text"
                    name="adresse"
                    value={data.adresse}
                    onChange={handleChange}
                    placeholder="Entrez votre adresse"
                    required
                  />
                </div>

                <div className="form-group">
                  <label id="codepostal">Code Postal:</label>
                  <input
                    type="text"
                    name="codePostal"
                    value={data.codePostal}
                    onChange={handleChange}
                    placeholder="Entrez votre code postal"
                    required
                  />
                </div>

                <div className="form-group">
                  <label id="couriel">Couriel:</label>
                  <input
                    type="email"
                    name="couriel"
                    value={data.couriel}
                    onChange={handleChange}
                    placeholder="Entrez votre couriel."
                    required
                  />
                </div>
                <div className="form-group">
                  <label id="identity">Id:</label>
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

                <div className="form-group">
                  <label id="telephone">Téléphone:</label>
                  <input
                    type="text"
                    name="telephone"
                    value={data.telephone}
                    onChange={handleChange}
                    placeholder="Entrez votre numéro de téléphone"
                    required
                  />
                </div>

                <button type="submit" className="register-button">S'inscrire</button><br/><br/>
                <button onClick={handleToggleContainer} className="close-button">Se fermer</button>
                {message && <p className="message_sign">{message}</p>}
              </form>        
            </div>
      )}
      </>
  );
}

export { SignUp };
