import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import defaultImage from "../assets/images/Screenshot 2026-03-18 162102.png";


function Service({ id, image_url, name, description, price, duration }) {
    const IMAGE_URL = image_url ?? defaultImage;
    const navigate = useNavigate();

    const handleReserve = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { state: { from: "/appointment", serviceId: id } });
        } else {
            navigate("/calendar", { state: { serviceId: id } });
        }
    };

    return (
        <div className="col-md-4">
            <div className="card mb-4 w-100 p-3 gap-1 d-flex">
                <div className="service-image flex justify-content-center w-80 mx-auto">
                    <img
                        src={IMAGE_URL}
                        alt={name}
                        className="img-fluid w-11"
                        onError={(e) => {
                            e.target.onerror = null; // évite la boucle infinie
                            e.target.src = defaultImage;
                        }}
                    />
                </div>
                <div className="badge align-self-start">{name}</div>
                <div className="service-desc">{description}</div>
                <div className="service-meta d-flex flex-wrap justify-content-between align-items-center mt-3 gap-1">
                    <span className="price">{price} FCFA</span>
                    <span className="duration d-flex align-items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {duration} min
                    </span>
                </div>
                <button
                    type="button"
                    className="btn-reserver d-flex align-items-center justify-content-center gap-2 mt-4 mx-auto"
                    onClick={handleReserve}
                >
                    <i className="bi bi-calendar-check"></i>
                    Réserver
                </button>
            </div>
        </div>
    );
}

export default Service;