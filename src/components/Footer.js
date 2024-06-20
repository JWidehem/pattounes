// Footer.js
import React from 'react';
import SocialButtons from './SocialButtons';
import Map from './Map'; // Importez le composant Map
import './Footer.scss'; // Importation du fichier SCSS spécifique

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <SocialButtons />
        </div>
        <div className="footer-map">
          <Map /> {/* Ajoutez le composant Map ici */}
        </div>
        <div className="footer-right">
          <h4>Mentions Légales</h4>
          <ul>
            <li><a href="#privacy">Politique de Confidentialité</a></li>
            <li><a href="#terms">Conditions d'Utilisation</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
