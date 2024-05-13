import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; // pour list de pays
import "bootstrap/dist/css/bootstrap.css";
import InventaireTable from './InventaireTable';
import { useTranslation } from "react-i18next";

/* Cette page comprend deux sections distinctes : un formulaire
 pour enregistrer de nouveaux éléments dans l'inventaire et un
formulaire pour afficher la liste des éléments de l'inventaire.
Ces deux sections sont basées sur le concept de CRUD, permettant
de créer, lire, mettre à jour et supprimer des informations dans
l'inventaire en fonction des besoins.
***************************************************************
1- le formulaire est rempli, nous utilisons d'abord la fonction 
handleChange() pour gérer les changements de saisie. 
2-, lors de la soumission du formulaire, nous utilisons la fonction handleSubmit().
Cette dernière envoie les informations saisies vers le backend.
3- le backend renvoie une réponse. 
4- Si l'opération est réussie, un message de succès est affiché.
5-pour préparer le formulaire à une nouvelle entrée, nous utilisons
la fonction clearForm() pour réinitialiser les champs.
*/
function Inventaire() {
    const { t, i18n } = useTranslation();

    const [formData, setFormData] = useState({
        codeinventaire: '',
        pays: '',
        image: '',
        date: '',
        type: '',
        prix: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [countries, setCountries] = useState([]);
    const [images, setImages] = useState([]); 

/*React hook: Lorsque la page est ouverte, deux 
méthodes fonctionnent pour préparer deux listes distinctes.
*/
    useEffect(() => {
        fetchCountries();
        fetchImagesFromDirectory();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countriesData = response.data.map(country => ({
                value: country.name.common,
                label: country.name.common
            }));
            setCountries(countriesData);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchImagesFromDirectory = async () => {
        try {
            const response = await axios.get('/images');
            setImages(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            pays: selectedOption.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/inventory/create', formData);
            console.log(response.data);
            setSuccessMessage("Inventaire est enregistré avec succès");
            clearForm();
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); 
        } catch (error) {
            console.error(error);
            setSuccessMessage("Une erreur s'est produite lors de l'enregistrement de l'inventaire");
        }
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData[key] === '') {
                alert('Veuillez remplir tous les champs.');
                return false;
            }
        }
        if (formData.codeinventaire.length !== 6) {
            alert("ID doit comporter exactement 6 caractères.");
            return false;
        }
        return true;
    };

    const clearForm = () => {
        setFormData({
            codeinventaire: '',
            pays: '',
            image: '',
            date: '',
            type: '',
            prix: ''
        });
    };

    return (
        <div style={{ paddingLeft: '10px' }}>
            <div className="row">
                <div className="col-md-4">
                    <br/>
                    <form onSubmit={handleSubmit}>
                    <div className="row p-1">
                        <label htmlFor="codeinventaire" className="col-sm-2 col-form-label">ID:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="codeinventaire" name="codeinventaire" value={formData.codeinventaire} onChange={handleChange} placeholder="Ex: MR4120" maxLength="6" required />
                        </div>
                    </div>
                        <div className="row p-1">
                            <label htmlFor="pays" className="col-sm-2 col-form-label">{t("Country")}:</label>
                            <div className="col-sm-10">
                                    <Select
                                        options={countries}
                                        onChange={handleSelectChange}
                                        value={{ label: formData.pays, value: formData.pays }}
                                        placeholder="Sélectionner un pays"
                                        required
                                    />
                            </div>
                        </div>
                        <div className="row p-1">
                            <label htmlFor="image" className="col-sm-2 col-form-label">Image:</label>
                            <div className="col-sm-10">
                                    <select className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} required>
                                        <option value="">{t("Select2")}</option>
                                        {images.map((imageName, index) => (
                                            <option key={index} value={imageName}>{imageName}</option>
                                        ))}
                                    </select>
                            </div>        
                        </div>
                        <div className="row p-1">
                            <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
                            <div className="col-sm-10">
                                 <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row p-1">
                            <label htmlFor="type" className="col-sm-2 col-form-label">Type:</label>
                               <div className="col-sm-10">
                                    <select className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} required>
                                        <option value="">{t("Select1")}</option>
                                        <option value="Terrain">Vélo Tout Terrain</option>
                                        <option value="ville">Vélo de ville</option>
                                        <option value="course">Vélo de course</option>
                                        <option value="pliant">pliant</option>
                                        <option value="electrique">electrique</option>
                                    </select>
                                </div>
                        </div>
                        <div className="row p-1">
                            <label htmlFor="prix" className="col-sm-2 col-form-label">{t("Price")}:</label>
                            <div className="col-sm-10">
                               <input type="number" step="0.01" className="form-control" id="prix" name="prix" value={formData.prix} onChange={handleChange} placeholder="0.00" required />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                <i className="fas fa-plus-circle"></i> {t("Save")}
                            </button>
                        </div> 
                        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}                       
                    </form>                    
                </div>                               
                <div className="col-md-8">                
                <br/>                    
                    <InventaireTable />
                </div>
            </div>
        </div>
    );
}
export { Inventaire };
