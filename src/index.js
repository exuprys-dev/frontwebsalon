import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import App from './App';
import Services from './pages/services';
import Appointment from './pages/appointment';
import DatePicker from './pages/calendar';
import Myappointment from './pages/myappointment';
import HourPicker from './pages/hour';
import Confirmation from './pages/confirmation';
import Login from './pages/login';
import Register from './pages/register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/calendar" element={<DatePicker />} />
      <Route path="/hour" element={<HourPicker />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/myappointment" element={<Myappointment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);


