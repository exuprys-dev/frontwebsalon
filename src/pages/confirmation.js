import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";
import { getServiceById, createAppointment } from "../api/axios";

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function Confirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, heure, serviceId } = location.state || {};

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const bookingAttempted = useRef(false);

    // Calcul de l'heure de fin basé sur la durée du service
    const calculateEndTime = (startTime, durationMinutes) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + durationMinutes;
        const endHours = Math.floor(totalMinutes / 60);
        const endMinutes = totalMinutes % 60;
        return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    };

    useEffect(() => {
        const processBooking = async () => {
            // Éviter les doubles réservations sur le StrictMode ou refresh
            if (!serviceId || !date || !heure || bookingAttempted.current) return;

            bookingAttempted.current = true;
            setLoading(true);

            try {
                // 1. Récupérer les détails du service pour l'affichage et la durée
                const sData = await getServiceById(serviceId);
                const serviceObj = sData.service;
                setService(serviceObj);

                // 2. Préparer les données pour l'API
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.id) {
                    setError("Vous devez être connecté pour réserver.");
                    return;
                }

                const formattedDate = `${date.y}-${String(date.m + 1).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
                const startTime = heure.padStart(5, '0'); // Format HH:mm
                const endTime = calculateEndTime(startTime, serviceObj.duration);

                // 3. Appel API (le backend notifie l'admin automatiquement via l'événement AppointmentCreated)
                await createAppointment({
                    date: formattedDate,
                    start_time: startTime,
                    end_time: endTime,
                    client_id: user.id,
                    service_id: serviceId
                });

            } catch (err) {
                console.error("Erreur confirmation:", err);
                setError(err.response?.data?.message || "Une erreur est survenue lors de la réservation.");
            } finally {
                setLoading(false);
            }
        };

        processBooking();
    }, [serviceId, date, heure]);

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

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-pink" role="status"></div>
                        <p className="mt-3">Finalisation de votre réservation...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-5">
                        <div className="alert alert-danger">{error}</div>
                        <button className="btn-back" onClick={() => navigate(-1)}>Réessayer</button>
                    </div>
                ) : (
                    <>
                        <div className="check-circle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#fff"
                                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                width="36" height="36">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>

                        <h2 className="confirm-title">Rendez-vous confirmé !</h2>
                        <p className="confirm-sub">L'administrateur a été notifié de votre demande.</p>

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
                    </>
                )}

                <button className="btn-home" onClick={() => navigate("/")}>
                    Retour à l'accueil
                </button>
            </div>
            <Footer />
        </>
    );
}

export default Confirmation;