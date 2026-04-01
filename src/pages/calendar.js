import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../assets/css/style.css";


const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const DAY_NAMES = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

function DatePicker() {
    const today = new Date();
    const [cur, setCur] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [selectedDate, setSelectedDate] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const daysInMonth = new Date(cur.year, cur.month + 1, 0).getDate();
    const firstDay = new Date(cur.year, cur.month, 1).getDay();
    const daysInPrev = new Date(cur.year, cur.month, 0).getDate();

    const isPast = (d) =>
        new Date(cur.year, cur.month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const isToday = (d) =>
        d === today.getDate() && cur.month === today.getMonth() && cur.year === today.getFullYear();

    const isSelected = (d) =>
        selectedDate?.d === d && selectedDate?.m === cur.month && selectedDate?.y === cur.year;

    const prevMonth = () => setCur(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
    const nextMonth = () => setCur(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

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
                                <div className={`step-circle ${i === 0 ? "done" : i === 1 ? "active" : "inactive"}`}>{i + 1}</div>
                                <span className={`step-label ${i <= 1 ? "active" : ""}`}>{label}</span>
                            </div>
                            {i < 3 && <div className={`step-line ${i === 0 ? "done" : ""}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* Calendrier */}
                <div className="calendar-wrap">
                    <div className="cal-nav">
                        <button className="cal-nav-btn" onClick={prevMonth}>&#8249;</button>
                        <div className="cal-selects">
                            <select className="cal-select" value={cur.month}
                                onChange={e => setCur(c => ({ ...c, month: parseInt(e.target.value) }))}>
                                {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                            </select>
                            <select className="cal-select" value={cur.year}
                                onChange={e => setCur(c => ({ ...c, year: parseInt(e.target.value) }))}>
                                {[0, 1, 2, 3].map(i => <option key={i} value={today.getFullYear() + i}>{today.getFullYear() + i}</option>)}
                            </select>
                        </div>
                        <button className="cal-nav-btn" onClick={nextMonth}>&#8250;</button>
                    </div>

                    <div className="cal-grid">
                        {DAY_NAMES.map(d => <div key={d} className="cal-day-name">{d}</div>)}
                        {Array.from({ length: firstDay }, (_, i) => (
                            <div key={`p${i}`} className="cal-day other-month">{daysInPrev - firstDay + 1 + i}</div>
                        ))}
                        {Array.from({ length: daysInMonth }, (_, i) => {
                            const d = i + 1;
                            return (
                                <div key={d}
                                    className={`cal-day ${isPast(d) ? "disabled" : isSelected(d) ? "selected" : isToday(d) ? "today" : ""}`}
                                    onClick={() => !isPast(d) && setSelectedDate({ d, m: cur.month, y: cur.year })}>
                                    {d}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="btn-row">
                    <button className="btn-back" onClick={() => navigate(-1)}>&#8249; Retour</button>
                    <button className="btn-next" disabled={!selectedDate}
                        onClick={() => navigate("/hour", { state: { date: selectedDate, serviceId: location.state?.serviceId } })}>
                        Suivant &#8250;
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DatePicker;