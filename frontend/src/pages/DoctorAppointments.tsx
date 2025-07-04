import { useEffect, useState } from 'react';
import axios from '../api/axios';
import PatientMedicalHistoryMini from './PatientMedicalHistoryMini';
import NewMedicalRecordForm from './NewMedicalRecordForm';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  reason: string;
  date: string;
  status: string;
  patient: { id: string; name: string };
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  const loadAppointments = async () => {
    try {
      const res = await axios.get('/appointments');
      const doctorAppointments = res.data.filter((a: Appointment) => a.patient);
      setAppointments(doctorAppointments);
    } catch (err) {
      alert('Error al cargar citas');
    }
  };

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await axios.patch(`/appointments/${id}`, { status });
      await loadAppointments();
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
            Paciente:{" "}
            <span
              style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => navigate(`/doctor/patient/${a.patient.id}`)}
            >
              {a.patient?.name || 'N/A'}
            </span>
            <br />
            Estado: <b>{a.status}</b>
            <div>
              {a.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(a.id, 'confirmed')}>Confirmar</button>
                  <button onClick={() => updateStatus(a.id, 'cancelled')} style={{ marginLeft: '10px' }}>Cancelar</button>
                </>
              )}
            </div>

            {/* Botón de videollamada para confirmadas */}
            {a.status === 'confirmed' && (
              <button
                style={{ marginTop: 8, marginBottom: 5 }}
                onClick={() => navigate(`/videollamada/${a.id}`)}
              >
                Iniciar videollamada
              </button>
            )}

            {/* Formulario para registrar diagnóstico */}
            {a.status === 'confirmed' && (
              <NewMedicalRecordForm patientId={a.patient.id} onCreated={() => {}} />
            )}

            {/* Historial médico del paciente */}
            {a.patient?.id && (
              <PatientMedicalHistoryMini patientId={a.patient.id} />
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
