import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Service from "../components/service";


const Services = () => {
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
                <div className="row">
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Services;