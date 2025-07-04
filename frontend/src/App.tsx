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
import PatientDetailPage from './pages/PatientDetailPage';
import UsersListPage from './pages/UsersListPage';
import AllAppointmentsPage from './pages/AllAppointmentsPage';
import AdminMedicalRecordsPage from './pages/AdminMedicalRecordsPage';
import VideoCallPage from './pages/VideoCallPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<h2>No autorizado</h2>} />

          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<UsersListPage />} />
            <Route path="/admin/appointments" element={<AllAppointmentsPage />} />
            <Route path="/admin/medical-records" element={<AdminMedicalRecordsPage />} />
          </Route>

          <Route element={<PrivateRoute roles={['doctor']} />}>
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          </Route>

          <Route element={<PrivateRoute roles={['doctor', 'admin']} />}>
            <Route path="/doctor/patient/:patientId" element={<PatientDetailPage />} />
          </Route>

          <Route element={<PrivateRoute roles={['patient']} />}>
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/patient/crear-cita" element={<CreateAppointmentPage />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/medical-history" element={<PatientMedicalHistory />} />
          </Route>

          <Route element={<PrivateRoute roles={['doctor', 'patient']} />}>
            <Route path="/videollamada/:appointmentId" element={<VideoCallPage />} />
          </Route>

          {/* 🔁 Redirige / a /login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
