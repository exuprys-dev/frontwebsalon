import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";
import { getMyAppointments, deleteAppointment } from "../api/axios";

const STATUS_MAP = {
    confirmed: { label: "Confirmé", cls: "badge-confirmed", closable: true },
    pending: { label: "en attente", cls: "badge-pending", closable: true },
    done: { label: "terminé", cls: "badge-done", closable: false },
    cancelled: { label: "annulé", cls: "badge-cancelled", closable: false },
    no_show: { label: "non présent", cls: "badge-noshow", closable: false },
};

function Myappointment() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMyAppointments();
                console.log("Rendez-vous reçus:", data);
                setAppointments(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.log("Erreur lors du fetch",err);
                setError(err.message);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);
    
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?");
        if (!confirmed) return;

        setDeletingId(id);
        try {
            await deleteAppointment(id);
            // Supprime de la liste localement après succès API
            setAppointments((prev) => prev.filter((a) => a.id !== id));
        } catch (err) {
            alert("Erreur lors de la suppression : " + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <>
            <Header />
            <div className="rdv-page">
                <h1 className="rdv-page-title">Mes <span>Rendez-vous</span></h1>
                <p className="rdv-page-sub">Consultez et gérez vos réservations</p>
                {loading && (
                    <p className="text-center text-muted">Chargement des rendez-vous...</p>
                )}
                {error && (
                    <p className="text-center text-danger">{error}</p>
                )}
                <div className="appt-list">
                    {!loading && !error && appointments && appointments.map((appointment) => {
                        const s = STATUS_MAP[appointment.status] || { label: appointment.status, cls: "badge-default", closable: false };
                        const isDeleting = deletingId === appointment.id;
                        return (
                            <div key={appointment.id} className="appt-card">
                                <div className="appt-header">
                                    <span className="appt-name">{appointment.service?.name}</span>
                                    <span className={`badge ${s.cls}`}>{s.label}</span>
                                </div>
                                <div className="appt-meta">
                                    <span><i className="bi bi-calendar3"></i> {appointment.date}</span>
                                    <span><i className="bi bi-clock"></i> {appointment.service?.duration} min</span>
                                    <span className="appt-price">{appointment.service?.price.toLocaleString()} FCFA</span>
                                </div>
                                {s.closable && (
                                    <button
                                        className="appt-close"
                                        onClick={() => handleDelete(appointment.id)}
                                        disabled={isDeleting}
                                        title="Annuler ce rendez-vous"
                                    >
                                        {isDeleting ? "..." : "✕"}
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    {appointments.length === 0 && (
                        <p style={{ textAlign: "center", color: "#999", marginTop: "2rem" }}>
                            Aucun rendez-vous pour le moment.
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Myappointment;