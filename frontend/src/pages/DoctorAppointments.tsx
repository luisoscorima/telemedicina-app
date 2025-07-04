import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Appointment {
  id: string;
  reason: string;
  date: string;
  status: string;
  patient: { id: string; name: string };
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = async () => {
    try {
      const res = await axios.get('/appointments');
      const doctorAppointments = res.data.filter((a: Appointment) => a.patient); // asegura que tiene paciente asociado
      setAppointments(doctorAppointments);
    } catch (err) {
      alert('Error al cargar citas');
    }
  };

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await axios.patch(`/appointments/${id}`, { status });
      await loadAppointments(); // recarga después de actualizar
    } catch (err) {
      alert('Error al actualizar estado');
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div>
      <h2>Citas Agendadas</h2>
      {appointments.length === 0 && <p>No hay citas aún.</p>}
      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            <strong>{a.reason}</strong> - {new Date(a.date).toLocaleString()}<br />
            Paciente: {a.patient?.name || 'N/A'}<br />
            Estado: <b>{a.status}</b>
            <div>
              {a.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(a.id, 'confirmed')}>Confirmar</button>
                  <button onClick={() => updateStatus(a.id, 'cancelled')} style={{ marginLeft: '10px' }}>Cancelar</button>
                </>
              )}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
