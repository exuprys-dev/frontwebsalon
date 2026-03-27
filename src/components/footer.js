import React from 'react';
import logo from "../assets/logo/Logo Chez ELLE-01 1.png";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <img
                            src={logo}
                            className="img-fluid rounded-top"
                            alt="Logo Chez ELLE"
                        />
                        
                    </div>
                    <div className="col-md-5">
                        <h5>Nous contacter</h5>
                        <p>Route des peches, Fidjrossè rue de la Station JNP</p>
                        <p>Tél: 01 23 45 67 89</p>
                        <p>Email: contact@chezellesalon.com</p>
                    </div>
                    <div className="col-md-5">
                        <h5>Horaires d'ouverture</h5>
                        <p>Lundi - Samedi: 9h - 21h</p>
                        <p>Dimanche: Fermé</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <p>&copy; {new Date().getFullYear()} L'Onglerie Chez ELLE. Tous droits réservés.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;