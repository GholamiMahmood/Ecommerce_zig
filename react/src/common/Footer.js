import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import '../index.css';
import { useTranslation } from "react-i18next";


const Footer = () => {
  const { t } = useTranslation(); // Using useTranslation hook to access t function

  return (
    <footer className="page-footer font-small blue pt-4 common"> 
      <div className="row">
        <div className="col-md-11 d-flex justify-content-end">
          <h5 style={{ paddingRight:'20px' }}>{t('Contact')} <i className="fas fa-phone"> (514)836-8020</i></h5>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="https://facebook.com" target="_blank"><i className="fab fa-facebook fa-2x"></i></a></li>
            <li className="list-inline-item"><a href="https://twitter.com" target="_blank"><i className="fab fa-x-twitter fa-2x"></i></a></li>
            <li className="list-inline-item"><a href="https://instagram.com" target="_blank"><i className="fab fa-instagram fa-2x"></i></a></li>
            <li className="list-inline-item"><a href="https://linkedin.com" target="_blank"><i className="fab fa-linkedin fa-2x"></i></a></li>
          </ul>
        </div>
      </div><br/> 
    </footer>
  );
}

export default Footer;
