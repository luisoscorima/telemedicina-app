import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  reason: string;
  date: string;
  status: string;
  doctor: {
    id: string;
    name?: string;
  };
}

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      alert('Error al cargar tus citas');
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      await axios.put(`/appointments/${id}`, { status: 'cancelled' });
      fetchAppointments();
    } catch (err) {
      alert('No se pudo cancelar la cita');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Mis Citas</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{new Date(appt.date).toLocaleString()}</strong> - {appt.reason} - Estado: {appt.status}
            {appt.status === 'pending' && (
              <button onClick={() => cancelAppointment(appt.id)} style={{ marginLeft: '10px' }}>
                Cancelar
              </button>
            )}
            {/* Botón de videollamada para citas confirmadas */}
            {appt.status === 'confirmed' && (
              <button
                style={{ marginLeft: 10 }}
                onClick={() => navigate(`/videollamada/${appt.id}`)}
              >
                Iniciar videollamada
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientAppointments;
