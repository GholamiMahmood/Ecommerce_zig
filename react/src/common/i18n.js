import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import frTranslation from './fr.json';

const resources = {
    en: {
        translation: enTranslation
    },
    fr: {
        translation: frTranslation
    }
};

// Récupérer la langue stockée ou par défaut 'en
const storedLanguage = localStorage.getItem('i18nextLng') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: storedLanguage, // Utiliser la langue stockée
        fallbackLng: 'en', // Langue de secours si la traduction n'est pas trouvée
        interpolation: {
            escapeValue: false //Lorsque escapeValue est défini sur false, i18next suppose que vous gérez le contenu vous-même et ne protège pas les caractères spéciaux
        }
    });

// Function to change language and store the preference
const changeLanguage = (lng) => {    
    i18n.changeLanguage(lng);    
};

// Exportez à la fois i18n et changeLanguage dans un seul objet
export default { i18n, changeLanguage };
