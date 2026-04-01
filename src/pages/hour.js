import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";
import { getOccupiedSlots } from "../api/axios";

const ALL_SLOTS = [
    "9:00", "9:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30"
];

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function HourPicker() {
    const [selected, setSelected] = useState(null);
    const [unavailable, setUnavailable] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const date = location.state?.date;
    const serviceId = location.state?.serviceId;

    useEffect(() => {
        const fetchOccupied = async () => {
            if (date) {
                setLoading(true);
                try {
                    // Formatage YYYY-MM-DD pour l'API
                    const formattedDate = `${date.y}-${String(date.m + 1).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
                    const occupiedSlots = await getOccupiedSlots(formattedDate);
                    setUnavailable(occupiedSlots);
                } catch (err) {
                    console.error("Erreur chargement créneaux:", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchOccupied();
    }, [date]);

    const dateLabel = date
        ? `${date.d} ${MONTHS[date.m]} ${date.y}`
        : "Date non sélectionnée";

    // Logique pour bloquer les créneaux trop proches (Heure actuelle + 2h)
    const now = new Date();
    const isToday = date &&
        date.y === now.getFullYear() &&
        date.m === now.getMonth() &&
        date.d === now.getDate();

    // Créer un objet Date de référence pour la limite H+2
    const limitTime = new Date();
    limitTime.setHours(now.getHours() + 2);

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
                {loading ? (
                    <p className="text-center">Vérification des disponibilités...</p>
                ) : (
                    <div className="slots-grid">
                        {ALL_SLOTS.map((slot) => {
                            // On extrait l'heure et les minutes du créneau (ex: "10:30")
                            const [h, m] = slot.split(':').map(Number);
                            const slotDate = new Date(date.y, date.m, date.d, h, m);

                            // Un créneau est indisponible s'il est déjà pris en base OU s'il est trop tôt aujourd'hui
                            const isTooEarly = isToday && slotDate < limitTime;
                            const isUnavailable = unavailable.includes(slot) || isTooEarly;

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
                )}

                <div className="btn-row">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        &#8249; Retour
                    </button>
                    <button
                        className="btn-next"
                        disabled={!selected}
                        onClick={() => navigate("/confirmation", {
                            state: { date, heure: selected, serviceId }
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