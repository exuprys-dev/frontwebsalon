import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Ajouter le token automatiquement
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Intercepteur : gère les erreurs 401 (token expiré)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// ─────────────────────────────────────────────
// SERVICES API
// ─────────────────────────────────────────────

/**
 * Récupère tous les services (route publique)
 * GET /api/services
 */
export const getAllServices = async () => {
    console.log("BASE URL:", process.env.REACT_APP_API_URL);
    console.log("URL complète:", api.defaults.baseURL + "/services/active");
    const response = await api.get("/services/active");
    console.log("response.data:", response.data);
    return response.data.services;
};

/**
 * Récupère un service par ID
 * GET /api/services/:id
 */
export const getServiceById = async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
};

// ─────────────────────────────────────────────
// APPOINTMENTS API
// ─────────────────────────────────────────────
/** * Récupère les rendez-vous de l'utilisateur connecté
 * GET /api/appointments/my
 */
export const getMyAppointments = async () => {
    const response = await api.get("/appointments/my");
    return response.data;
};

export const getOccupiedSlots = async (date) => {
    const response = await api.get(`/appointments/occupied-slots?date=${date}`);
    return response.data;
};

export const createAppointment = async (appointmentData) => {
    const response = await api.post("/appointments", appointmentData);
    return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
};

export const deleteAppointment = async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

// Redirige vers Laravel qui redirige vers Google
export const loginWithGoogle = () => {
    const baseURL = "http://localhost:8000";
    window.location.href = `${baseURL}/auth/google/redirect`;
};

export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

export const register = async (credentials) => {
    const response = await api.post("/auth/register", credentials);
    return response.data;
};


export default api;