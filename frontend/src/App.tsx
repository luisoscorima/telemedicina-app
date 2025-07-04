import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { PrivateRoute } from './auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DoctorPage from './pages/DoctorPage';
import PatientPage from './pages/PatientPage';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import PatientAppointments from './pages/PatientAppointments';
import DoctorAppointments from './pages/DoctorAppointments';
import PatientMedicalHistory from './pages/PatientMedicalHistory';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<h2>No autorizado</h2>} />

          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route element={<PrivateRoute roles={['doctor']} />}>
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          </Route>

          <Route element={<PrivateRoute roles={['patient']} />}>
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/patient/crear-cita" element={<CreateAppointmentPage />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/medical-history" element={<PatientMedicalHistory />} />
          </Route>

          {/* 🔁 Redirige / a /login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
