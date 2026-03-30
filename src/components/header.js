import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/Logo Chez ELLE-01 1.png";

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <div> 
                            <span><img
                                src={logo}
                                className="img-fluid rounded-top"
                                alt="logo"
                            />
                            </span>
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav mx-auto gap-1">
                            <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/appointment">Rendez-vous</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/myappointment">Mes RDV</Link></li>
                        </ul>
                        <div className="d-flex align-items-center gap-2">
                            <Link className="btn btn-nav-login" to="/login"><i className="bi bi-person"></i>Connexion</Link>
                            <Link className="btn btn-nav-register" to="/register"><i className="bi bi-person-plus"></i> S'inscrire</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;