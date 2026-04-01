import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Service from "../components/service";
import { getAllServices } from "../api/axios";


const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch services from API on component mount
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const data = await getAllServices();
                console.log("Données reçues dans le composant:", data);

                // On s'assure que services est toujours un tableau
                setServices(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur lors du fetch:", err);
                setError("Impossible de charger les services");
                setServices([]);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Nos Services</h1>
                <p className="text-center mb-5">
                    Découvrez notre gamme complète de services de beauté et de bien-être, conçus pour vous offrir une expérience inoubliable.
                    Que vous cherchiez une nouvelle coiffure, un soin du visage revitalisant ou une manucure parfaite, notre équipe d'experts est là pour répondre à tous vos besoins.
                    Explorez nos services et trouvez celui qui vous convient le mieux pour révéler votre beauté intérieure et extérieure.
                </p>
                {loading && (
                    <p className="text-center text-muted">Chargement des services...</p>
                )}
                {error && (
                    <p className="text-center text-danger">{error}</p>
                )}
                <div className="row">
                    {!loading && !error && services && services.map((service) => (
                        // Le "service ?" vérifie si l'objet n'est pas null/undefined
                        <Service key={service.id} {...service} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Services;