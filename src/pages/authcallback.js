import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthCallback() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params   = new URLSearchParams(location.search);
        const token    = params.get("token");
        const id       = params.get("id");
        const name     = params.get("name");
        const email    = params.get("email");
        const avatar   = params.get("avatar");
        const error    = params.get("error");

        if (error || !token) {
            navigate("/login?error=google_failed");
            return;
        }

        // Sauvegarde le token et les infos utilisateur
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ id, name, email, avatar }));

        // Redirige vers la page demandée avant le login ou l'accueil
        const savedFrom = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(savedFrom);

    }, [navigate, location]);

    return (
        <div className="auth-callback">
            <p>Connexion en cours...</p>
        </div>
    );
}

export default AuthCallback;