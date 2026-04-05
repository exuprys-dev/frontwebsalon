import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/Logo Chez ELLE-01 1.png";
import { logout } from "../api/axios";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    const handleLogout = async () => {
        try {
            await logout(); // appelle DELETE /api/auth/logout
        } catch (err) {
            // même si l'API échoue, on déconnecte localement
            console.error(err);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} className="img-fluid rounded-top" alt="logo" />
                </Link>

                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#mainNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav mx-auto gap-1">
                        <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={token ? "/appointment" : "/login"}
                                state={!token ? { from: "/appointment" } : undefined}
                            >
                                Rendez-vous
                            </Link>
                        </li>
                        {/* Mes RDV visible uniquement si connecté */}
                        {token && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/myappointment">Mes RDV</Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-2">
                        {token ? (
                            <>
                                {/* Avatar + nom */}
                                <div className="d-flex align-items-center gap-2">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                border: "2px solid #b5838d",
                                            }}
                                        />
                                    ) : (
                                        // Avatar par défaut si pas de photo
                                        <div style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: "50%",
                                            background: "#b5838d",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontSize: "1rem",
                                        }}>
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    {user?.name && (
                                        <span className="navbar-text" style={{ fontSize: "0.9rem" }}>
                                            {user.name}
                                        </span>
                                    )}
                                </div>

                                <button className="btn btn-nav-login" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-1"></i>
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-nav-login" to="/login">
                                    <i className="bi bi-person me-1"></i>Connexion
                                </Link>
                                <Link className="btn btn-nav-register" to="/register">
                                    <i className="bi bi-person-plus me-1"></i>S'inscrire
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;


// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo/Logo Chez ELLE-01 1.png";

// const Header = () => {
//     return (
//         <>
//             <nav className="navbar navbar-expand-lg sticky-top fixed-top">
//                 <div className="container">
//                     <Link className="navbar-brand" to="/">
//                         <div>
//                             <span><img
//                                 src={logo}
//                                 className="img-fluid rounded-top"
//                                 alt="logo"
//                             />
//                             </span>
//                         </div>
//                     </Link>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="mainNav">
//                         <ul className="navbar-nav mx-auto gap-1">
//                             <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
//                             <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
//                             <li className="nav-item"><Link className="nav-link" to="/appointment">Rendez-vous</Link></li>
//                             <li className="nav-item"><Link className="nav-link" to="/myappointment">Mes RDV</Link></li>
//                         </ul>
//                         <div className="d-flex align-items-center gap-2">
//                             <Link className="btn btn-nav-login" to="/login"><i className="bi bi-person"></i>Connexion</Link>
//                             <Link className="btn btn-nav-register" to="/register"><i className="bi bi-person-plus"></i> S'inscrire</Link>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default Header;