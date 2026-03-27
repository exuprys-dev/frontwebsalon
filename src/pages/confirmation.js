import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function Confirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, heure, service } = location.state || {};

    const dateLabel = date
        ? `${date.d} ${MONTHS[date.m]} ${date.y}`
        : "—";

    return (
        <>
            <Header />
            <div className="rdv-wrap">
                <h1 className="rdv-title">Prendre <span>Rendez-vous</span></h1>
                <p className="rdv-sub">Réservez votre créneau en quelques clics</p>

                {/* Stepper — toutes les étapes done */}
                <div className="steps">
                    {["Services", "Date", "Heure", "Confirmation"].map((label, i) => (
                        <React.Fragment key={i}>
                            <div className="step">
                                <div className="step-circle done">{i + 1}</div>
                                <span className="step-label done">{label}</span>
                            </div>
                            {i < 3 && <div className="step-line done"></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* Icône check */}
                <div className="check-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff"
                        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        width="36" height="36">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h2 className="confirm-title">Rendez-vous confirmé !</h2>
                <p className="confirm-sub">Vous recevrez une confirmation par email</p>

                {/* Récapitulatif */}
                <div className="recap-card">
                    <div className="recap-row">
                        <span className="recap-label">Service :</span>
                        <span className="recap-value">{service?.name || "—"}</span>
                    </div>
                    <div className="recap-row">
                        <span className="recap-label">Date :</span>
                        <span className="recap-value">{dateLabel}</span>
                    </div>
                    <div className="recap-row">
                        <span className="recap-label">Heure :</span>
                        <span className="recap-value">{heure || "—"}</span>
                    </div>
                    <div className="recap-row">
                        <span className="recap-label">Prix :</span>
                        <span className="recap-value">
                            {service?.price ? service.price.toLocaleString() + " FCFA" : "—"}
                        </span>
                    </div>
                </div>

                <button className="btn-home" onClick={() => navigate("/")}>
                    Retour à l'accueil
                </button>
            </div>
            <Footer />
        </>
    );
}

export default Confirmation;