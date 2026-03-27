import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";
import salonImage from "../assets/images/salonImage 1.png";

function Dashboard() {
    return (
        <>
            <Header />
            <div className="container mt-5">
                <section className="hero">
                    <img src={salonImage} alt="Salon Chez Elle" />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1>
                            Votre beauté,<br />notre passion
                        </h1>
                        <p>
                            Bienvenue Chez Elle, votre salon de<br />
                            beauté et de bien-être au cœur de la ville.
                        </p>
                        <div className="hero-actions">
                            <Link to="/appointment" className="btn-hero-primary">
                                Prendre rendez-vous <i className="bi bi-arrow-right"></i>
                            </Link>
                            <Link to="/services" className="btn-hero-secondary">
                                Nos services
                            </Link>
                        </div>
                    </div>
                </section>
                <div className="stripe-divider"></div>
                <section className="section-why">
                    <div className="container">
                        <h2 className="section-title">
                            Pourquoi choisir <span>Salon Chez Elle</span> ?
                        </h2>

                        <div className="row g-4 justify-content-center">

                            <div className="col-6 col-md-3">
                                <div className="feature-card">
                                    <div className="feature-icon">
                                        <i className="bi bi-stars"></i>
                                    </div>
                                    <h5>Services Premium</h5>
                                    <p>Coiffure, tresses, soins, manicure et plus</p>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="feature-card">
                                    <div className="feature-icon">
                                        <i className="bi bi-calendar2-check"></i>
                                    </div>
                                    <h5>Réservation Facile</h5>
                                    <p>Prenez rendez-vous en quelques clics</p>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="feature-card">
                                    <div className="feature-icon">
                                        <i className="bi bi-trophy"></i>
                                    </div>
                                    <h5>Expertise</h5>
                                    <p>Des professionnelles passionnées à votre service</p>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="feature-card">
                                    <div className="feature-icon">
                                        <i className="bi bi-clock-history"></i>
                                    </div>
                                    <h5>Flexibilité</h5>
                                    <p>Des horaires adaptées à votre emploi du temps</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cta-section mt-5 mb-5 d-flex align-items-center justify-content-center">
                    <div className="container">
                        <div className="content">
                            <h2>Prête à vous faire sublimer ?</h2>
                            <p>
                                Réservez votre prochain soin dès maintenant et offrez-vous un
                                moment de beauté et de bien-être.
                            </p>
                            <Link to="/appointment" class="btn-cta">
                                Réservez maintenant <i class="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;