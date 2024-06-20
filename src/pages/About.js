import React from 'react';
import './About.scss';
import lisaPhoto from '../img/Lisa-About.webp'; // Chemin mis à jour
import ContactForm from '../components/ContactForm';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-left">
          <div className="about-header">
            <h1>Lisa, la Pet Sitter qu'ils vous faut!</h1>
          </div>
          <div className="about-presentation">
            <p>
              Je m'appelle Lisa et je suis née dans le Nord Pas de Calais. Depuis toujours, j'ai une passion profonde pour les animaux. Enfant, j'ai souvent négocié pour avoir un animal de compagnie, mais comme cela n'était pas possible, je prenais soin des chats qui venaient dans notre jardin familial. Une fois indépendante, j'ai eu la joie d'adopter mon chat Bounty et mon chien Floki.
              <br /><br />
              Pendant le confinement de 2020, j'ai décidé de retourner à l'école pour obtenir mon diplôme d'auxiliaire vétérinaire, motivée par ma passion inébranlable. J'ai ensuite choisi de transformer cette passion en métier en obtenant mon Certificat de Capacité pour Animaux Domestiques en janvier 2024. C'est ainsi que j'ai fondé mon entreprise à Lille sous le nom de "Les P'tites Pattounes".
            </p>
          </div>
          <div className="contact-button-container">
            <ContactForm />
          </div>
        </div>
        <div className="about-right">
          <div className="about-photo">
            <img src={lisaPhoto} alt="Lisa" />
          </div>
        </div>
      </div>
      <div className="certifications">
        <h2>Certifications</h2>
        <div className="certification-item">
          <p>Certificat de Capacité Animaux Domestiques - Janvier 2024</p>
          <p>Diplôme d'Auxiliaire Vétérinaire - 2020</p>
        </div>
      </div>
    </div>
  );
};

export default About;
