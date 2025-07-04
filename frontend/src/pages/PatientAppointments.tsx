import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- AGREGA ESTO
import axios from '../api/axios';

interface Appointment {
  id: string;
  reason: string;
  date: string;
  status: string;
  doctor: {
    id: string;
    name?: string;
    email: string;
  };
}

const statusColors: Record<string, string> = {
  pending: '#ff9800',
  confirmed: '#388e3c',
  cancelled: '#b71c1c'
};

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada'
};

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- AGREGA ESTO

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      alert('Error al cargar tus citas');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas cancelar esta cita?')) return;
    try {
      await axios.put(`/appointments/${id}`, { status: 'cancelled' });
      fetchAppointments(); // recargar citas
    } catch (err) {
      alert('No se pudo cancelar la cita');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <h2 style={{ color: '#1565c0', marginBottom: 24 }}>📅 Mis Citas Agendadas</h2>
      {loading && <p>Cargando...</p>}
      {!loading && appointments.length === 0 && <p>No tienes citas registradas aún.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {appointments.map((appt) => (
          <div key={appt.id} style={{
            background: '#fff',
            border: '1px solid #dde6f3',
            borderRadius: 10,
            padding: 20,
            boxShadow: '0 1px 8px #e0e9f6',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {appt.reason}
            </div>
            <div><b>Fecha:</b> {new Date(appt.date).toLocaleString()}</div>
            <div>
              <b>Doctor:</b> {appt.doctor?.name || appt.doctor?.email}
            </div>
            <div>
              <b>Estado:</b> <span style={{
                color: statusColors[appt.status] || 'black',
                fontWeight: 600
              }}>{statusLabels[appt.status] || appt.status}</span>
            </div>
            {appt.status === 'pending' && (
              <button
                onClick={() => cancelAppointment(appt.id)}
                style={{
                  marginTop: 12,
                  background: '#b71c1c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 18px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >Cancelar cita</button>
            )}
            {/* BOTÓN DE VIDEOLLAMADA para citas confirmadas */}
            {appt.status === 'confirmed' && (
              <button
                onClick={() => navigate(`/videocall/${appt.id}`)}
                style={{
                  marginTop: 12,
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 18px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >Unirse a videollamada</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
