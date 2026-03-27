import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import imageService from "../assets/images/Screenshot 2026-03-18 162102.png";

function Service() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    return (
        <>
            <div className="col-md-4">
                <div className="card mb-4 w-100 p-3 gap-1 d-flex ">
                    <div className="service-image flex justify-content-center w-80 mx-auto">
                        <img src={imageService} alt="Service 1" />
                    </div>
                    <div className="badge align-self-start">Coiffure</div>
                    <div className="service-title">Coloration</div>
                    <div className="service-desc">Coloration complète ou mèches avec produits de qualité</div>
                    <div className="service-meta d-flex flex-wrap justify-content-between align-items-center mt-3 gap-1">
                        <span className="price">15000 FCFA</span>
                        <span className="duration">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            180 min
                        </span>
                    </div>
                    <button
                        type="button"
                        className="btn-reserver d-flex align-items-center justify-content-center gap-2 mt-4 mx-auto"
                        onClick={() => navigate("/calendar", { state: { serviceId: selected } })}
                    >
                        
                        <i className="bi bi-calendar-check"></i>
                        Réserver
                    </button>
                </div>
            </div>
        </>
    );
}

export default Service;