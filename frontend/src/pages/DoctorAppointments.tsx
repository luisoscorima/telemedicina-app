import { useEffect, useState } from 'react';
import axios from '../api/axios';
import PatientMedicalHistoryMini from './PatientMedicalHistoryMini';

interface Appointment {
  id: string;
  reason: string;
  date: string;
  status: string;
  patient: { id: string; name?: string; email: string };
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      alert('Error al cargar citas');
    } finally {
      setLoading(false);
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
    <div className="container" style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <h2 style={{ color: '#1565c0', marginBottom: 24 }}>🩺 Mis Citas Médicas</h2>
      {loading && <p>Cargando...</p>}
      {!loading && appointments.length === 0 && <p>No hay citas aún.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {appointments.map((a) => (
          <div key={a.id} style={{
            background: '#f5faff',
            border: '1px solid #dde6f3',
            borderRadius: 10,
            padding: 20,
            boxShadow: '0 1px 8px #e0e9f6'
          }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
              {a.reason}
            </div>
            <div><b>Fecha:</b> {new Date(a.date).toLocaleString()}</div>
            <div>
              <b>Paciente:</b> {a.patient?.name || a.patient?.email} <span style={{ fontSize: 13, color: "#7d8590" }}>({a.patient?.id})</span>
            </div>
            <div>
              <b>Estado:</b> <span style={{
                color:
                  a.status === 'confirmed' ? 'green'
                    : a.status === 'cancelled' ? 'red'
                      : '#ff9800',
                fontWeight: 500
              }}>{a.status}</span>
            </div>

            {/* Botones solo si pendiente */}
            {a.status === 'pending' && (
              <div style={{ margin: '14px 0 4px 0', display: 'flex', gap: 10 }}>
                <button
                  onClick={() => updateStatus(a.id, 'confirmed')}
                  style={{
                    padding: '8px 18px',
                    background: '#388e3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >Confirmar</button>
                <button
                  onClick={() => updateStatus(a.id, 'cancelled')}
                  style={{
                    padding: '8px 18px',
                    background: '#b71c1c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >Cancelar</button>
              </div>
            )}

            {/* Historial médico mini */}
            <div style={{ marginTop: 14 }}>
              <PatientMedicalHistoryMini patientId={a.patient.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
