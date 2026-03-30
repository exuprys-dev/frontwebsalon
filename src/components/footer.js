import React from 'react';
import logo from "../assets/logo/Logo_footer.png";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container text-center">
                <img src={logo} alt="Chez ELLE Logo" className="mb-3" style={{ maxWidth: '150px' }} />
                <p className="mb-1"><i className="bi bi-geo-alt"></i> Fidjrosse-Station JNP / Direction GOZEM</p>
                <p className="mb-1"><i className="bi bi-whatsapp"></i> +229 0101010101</p>
                <p className="mb-0">© 2026 Chez ELLE. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;