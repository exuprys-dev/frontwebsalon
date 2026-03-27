import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";

const ALL_SLOTS = [
    "9:00", "9:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30"
];

// Ces créneaux viendront de l'API Laravel plus tard
const UNAVAILABLE = ["12:00", "12:30", "15:30"];

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function HourPicker() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const date = location.state?.date;

    const dateLabel = date
        ? `${date.d} ${MONTHS[date.m]} ${date.y}`
        : "Date non sélectionnée";

    return (
        <>
            <Header />
            <div className="rdv-wrap">
                <h1 className="rdv-title">Prendre <span>Rendez-vous</span></h1>
                <p className="rdv-sub">Réservez votre créneau en quelques clics</p>

                {/* Stepper */}
                <div className="steps">
                    {["Services", "Date", "Heure", "Confirmation"].map((label, i) => (
                        <React.Fragment key={i}>
                            <div className="step">
                                <div className={`step-circle ${i < 2 ? "done" : i === 2 ? "active" : "inactive"}`}>
                                    {i + 1}
                                </div>
                                <span className={`step-label ${i <= 2 ? "active" : ""}`}>{label}</span>
                            </div>
                            {i < 3 && <div className={`step-line ${i < 2 ? "done" : ""}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* Badge date */}
                <div className="date-badge">
                    <i className="bi bi-calendar3" style={{ color: "#e91e8c" }}></i>
                    {dateLabel}
                </div>

                {/* Grille des créneaux */}
                <div className="slots-grid">
                    {ALL_SLOTS.map((slot) => {
                        const isUnavailable = UNAVAILABLE.includes(slot);
                        const isSelected = selected === slot;
                        return (
                            <div
                                key={slot}
                                className={`slot ${isUnavailable ? "unavailable" : ""} ${isSelected ? "selected" : ""}`}
                                onClick={() => !isUnavailable && setSelected(slot)}
                            >
                                {slot}
                            </div>
                        );
                    })}
                </div>

                <div className="btn-row">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        &#8249; Retour
                    </button>
                    <button
                        className="btn-next"
                        disabled={!selected}
                        onClick={() => navigate("/confirmation", {
                            state: { date, heure: selected }
                        })}
                    >
                        Suivant &#8250;
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HourPicker;