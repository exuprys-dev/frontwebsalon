import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";
import { getMyAppointments } from "../api/axios";

const STATUS_MAP = {
    confirmed: { label: "Confirmé", cls: "badge-confirmed", closable: true },
    pending: { label: "en attente", cls: "badge-pending", closable: true },
    done: { label: "terminé", cls: "badge-done", closable: false },
    cancelled: { label: "annulé", cls: "badge-cancelled", closable: false },
};

// Ces données viendront de ton API Laravel plus tard
// const INITIAL_APPOINTMENTS = [
//     { id: 1, name: "Tresses Africaines", date: "16 mars 2026", duration: 180, price: 15000, status: "confirmed" },
//     { id: 2, name: "Tresses Africaines", date: "16 mars 2026", duration: 180, price: 15000, status: "pending" },
//     { id: 3, name: "Tresses Africaines", date: "16 mars 2026", duration: 180, price: 15000, status: "done" },
//     { id: 4, name: "Tresses Africaines", date: "16 mars 2026", duration: 180, price: 15000, status: "cancelled" },
// ];

function Myappointment() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMyAppointments();
                setAppointments(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const remove = (id) => setAppointments(prev => prev.filter(a => a.id !== id));

    return (
        <>
            <Header />
            <div className="rdv-page">
                <h1 className="rdv-page-title">Mes <span>Rendez-vous</span></h1>
                <p className="rdv-page-sub">Consultez et gérez vos réservations</p>

                <div className="appt-list">
                    {appointments.map(appt => {
                        const s = STATUS_MAP[appt.status] || { label: appt.status, cls: "badge-default", closable: false };
                        return (
                            <div key={appt.id} className="appt-card">
                                <div className="appt-header">
                                    <span className="appt-name">{appt.name}</span>
                                    <span className={`badge ${s.cls}`}>{s.label}</span>
                                </div>
                                <div className="appt-meta">
                                    <span><i className="bi bi-calendar3"></i> {appt.date}</span>
                                    <span><i className="bi bi-clock"></i> {appt.duration} min</span>
                                    <span className="appt-price">{appt.price.toLocaleString()} FCFA</span>
                                </div>
                                {s.closable && (
                                    <button className="appt-close" onClick={() => remove(appt.id)}>✕</button>
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