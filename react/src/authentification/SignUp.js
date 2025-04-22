// import React, { useState } from "react";
// import axios from "axios";
// import "../index.css"; 


// /*
// Sur cette page, j'utilise les bibliothèques Formik(formik, errurmeaasage,) et Yup.
// >> npm install formik yup
// */

// function SignUp() {
//   const [data, setData] = useState({
//     nom: "",
//     adresse: "",
//     codePostal: "",
//     couriel: "",
//     identity: "",
//     password: "",
//     telephone: ""
//   });
//   const [message, setMessage] = useState("");
//   const [showContainer, setShowContainer] = useState(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({
//       ...data,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//    e.preventDefault();
//     const userData = {
//       nom: data.nom,
//       adresse: data.adresse,
//       codePostal: data.codePostal,
//       couriel: data.couriel,
//       identity: data.identity,
//       password: data.password,
//       telephone: data.telephone
//     };

//     axios.post("http://localhost:8080/api/sign-up", userData)
//       .then((response) => {
//         setMessage("Les informations ont été enregistrées dans le système avec succès.");
//         setTimeout(() => {
//           setMessage("");
//           window.location.href = '/SignIn'; 
//         }, 3000);
//        })
//       .catch((error) => {
//         setMessage("Veuillez utiliser un identifiant différent, s'il vous plaît.");
//         setTimeout(() => {
//           setMessage("");
//         }, 3000);
//       });
//   };
//   const handleToggleContainer = () => {
//     setShowContainer(!showContainer);
//   };

//   return (
//     <>
//     {showContainer && (
//             <div className="sign-container">      
//               <form onSubmit={handleSubmit} className="sign-form">
//                 <div className="form-group">
//                 <label id="nom">Nom:</label>
//                   <input
//                     type="text"
//                     name="nom"
//                     value={data.nom}
//                     onChange={handleChange}
//                     placeholder="Entrez votre nom"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label id="adresse">Adresse:</label>
//                   <input
//                     type="text"
//                     name="adresse"
//                     value={data.adresse}
//                     onChange={handleChange}
//                     placeholder="Entrez votre adresse"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label id="codepostal">Code Postal:</label>
//                   <input
//                     type="text"
//                     name="codePostal"
//                     value={data.codePostal}
//                     onChange={handleChange}
//                     placeholder="Entrez votre code postal"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label id="couriel">Couriel:</label>
//                   <input
//                     type="email"
//                     name="couriel"
//                     value={data.couriel}
//                     onChange={handleChange}
//                     placeholder="Entrez votre couriel."
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label id="identity">Id:</label>
//                   <input
//                     type="identity"
//                     name="identity"
//                     value={data.identity}
//                     onChange={handleChange}
//                     placeholder="Entrez votre Id"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label id="password">Mot de passe:</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={data.password}
//                     onChange={handleChange}
//                     placeholder="Entrez votre mot de passe"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label id="telephone">Téléphone:</label>
//                   <input
//                     type="text"
//                     name="telephone"
//                     value={data.telephone}
//                     onChange={handleChange}
//                     placeholder="Entrez votre numéro de téléphone"
//                     required
//                   />
//                 </div>

//                 <button type="submit" className="register-button">S'inscrire</button><br/><br/>
//                 <button onClick={handleToggleContainer} className="close-button">Se fermer</button>
//                 {message && <p className="message_sign">{message}</p>}
//               </form>        
//             </div>
//       )}
//       </>
//   );
// }

// export { SignUp };

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../index.css";

/*
Sur cette page, j'utilise les bibliothèques Formik(formik, errurmeaasage,) et Yup.
>> npm install formik yup
*/

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est requis"),
    adresse: Yup.string().required("L'adresse est requise"),
    codePostal: Yup.string()
      .matches(/^[a-zA-Z0-9]{6}$/, "Le code postal doit contenir exactement 6 caractères alphanumériques")
      .required("Le code postal est requis"),
    couriel: Yup.string()
      .email("Format de couriel invalide")
      .required("Le couriel est requis"),
    identity: Yup.string().required("L'identité est requise"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, "Le mot de passe doit contenir des chiffres et des caractères")
      .required("Le mot de passe est requis"),
    telephone: Yup.string()
      .matches(/^\d+$/, { message: "Le numéro de téléphone ne doit contenir que des chiffres", excludeEmptyString: true })
      .required("Le numéro de téléphone est requis"),
  });

  const initialValues = {
    nom: "",
    adresse: "",
    codePostal: "",
    couriel: "",
    identity: "",
    password: "",
    telephone: "",
  };

  const [message, setMessage] = useState("");
  const [showContainer, setShowContainer] = useState(true);

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post("http://localhost:8080/api/sign-up", values)
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
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleToggleContainer = () => {
    setShowContainer(!showContainer);
  };

  return (
    <>
      {showContainer && (
        <div className="sign-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="sign-form">
                <div className="form-group">
                  <label htmlFor="nom">Nom:</label>
                  <Field type="text" name="nom" placeholder="Entrez votre nom" />
                  <ErrorMessage name="nom" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="adresse">Adresse:</label>
                  <Field type="text" name="adresse" placeholder="Entrez votre adresse" />
                  <ErrorMessage name="adresse" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="codePostal">Code Postal:</label>
                  <Field type="text" name="codePostal" placeholder="Entrez votre code postal" />
                  <ErrorMessage name="codePostal" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="couriel">Couriel:</label>
                  <Field type="email" name="couriel" placeholder="Entrez votre couriel" />
                  <ErrorMessage name="couriel" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="identity">Id:</label>
                  <Field type="text" name="identity" placeholder="Entrez votre Id" />
                  <ErrorMessage name="identity" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mot de passe:</label>
                  <Field type="password" name="password" placeholder="Entrez votre mot de passe" />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Téléphone:</label>
                  <Field type="text" name="telephone" placeholder="Entrez votre numéro de téléphone" />
                  <ErrorMessage name="telephone" component="div" className="error-message" />
                </div>

                <button type="submit" className="register-button" disabled={isSubmitting}>
                  S'inscrire
                </button>
                <br /><br />
                <button type="button" className="close-button" onClick={handleToggleContainer}>
                  Se fermer
                </button>
                {message && <p className="message_sign">{message}</p>}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export { SignUp };

