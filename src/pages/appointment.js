import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";

const services = [
    { id: 1, name: "Tresses Africaines", duration: 180, price: 15000 },
    { id: 2, name: "Coiffure & Brushing", duration: 60, price: 8000 },
    { id: 3, name: "Soin du visage", duration: 45, price: 10000 },
];

function Appointment() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const toggleSelect = (id) => {
        setSelected(selected === id ? null : id);
    };

    return (
        <>
            <Header />
            <div className="rdv-wrap">
                <h1 className="rdv-title">
                    Prendre <span>Rendez-vous</span>
                </h1>
                <p className="rdv-sub">Réservez votre créneau en quelques clics</p>

                {/* Stepper */}
                <div className="steps">
                    {["Services", "Date", "Heure", "Confirmation"].map((label, i) => (
                        <React.Fragment key={i}>
                            <div className="step">
                                <div className={`step-circle ${i === 0 ? "active" : "inactive"}`}>
                                    {i + 1}
                                </div>
                                <span className={`step-label ${i === 0 ? "active" : ""}`}>
                                    {label}
                                </span>
                            </div>
                            {i < 3 && <div className="step-line"></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* Liste des services */}
                <div className="services-list">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`service-card ${selected === service.id ? "selected" : ""}`}
                            onClick={() => toggleSelect(service.id)}
                        >
                            <div>
                                <div className="service-name">{service.name}</div>
                                <div className="service-duration">
                                    <i className="bi bi-clock"></i> {service.duration} min
                                </div>
                            </div>
                            <div className="service-price">
                                {service.price.toLocaleString()} FCFA
                            </div>
                        </div>
                    ))}
                </div>

                {/* Boutons */}
                <div className="btn-row">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        ← Retour
                    </button>
                    <button
                        className="btn-next"
                        disabled={!selected}
                        onClick={() => navigate("/calendar", { state: { serviceId: selected } })}
                    >
                        Suivant →
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Appointment;